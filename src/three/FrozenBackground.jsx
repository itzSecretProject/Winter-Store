import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const fogVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fogFragment = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;

  vec3 hash3(vec2 p) {
    vec3 q = vec3(dot(p, vec2(127.1, 311.7)),
                  dot(p, vec2(269.5, 183.3)),
                  dot(p, vec2(419.2, 371.9)));
    return fract(sin(q) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash3(i + vec2(0.0, 0.0)).x;
    float b = hash3(i + vec2(1.0, 0.0)).x;
    float c = hash3(i + vec2(0.0, 1.0)).x;
    float d = hash3(i + vec2(1.0, 1.0)).x;
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      v += amp * noise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv * 3.0;
    p += uMouse * 0.4;
    float t = uTime * 0.04;

    float n = fbm(p + vec2(t, t * 0.6));
    n = fbm(p + n + vec2(-t * 0.8, t));

    vec3 deep = vec3(0.110, 0.150, 0.190);
    vec3 steel = vec3(0.235, 0.290, 0.335);
    vec3 ice = vec3(0.420, 0.500, 0.560);

    vec3 col = mix(deep, steel, smoothstep(0.2, 0.8, n));
    col = mix(col, ice, smoothstep(0.55, 1.0, n) * 0.5);

    float vig = smoothstep(1.2, 0.2, length(uv - 0.5));
    col *= 0.7 + 0.3 * vig;

    float grain = hash3(uv * 1000.0 + t).x;
    col += (grain - 0.5) * 0.025;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function FogPlane({ mouse }) {
  const material = useRef();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
    uniforms.uMouse.value.lerp(mouse.current, 0.05);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        vertexShader={fogVertex}
        fragmentShader={fogFragment}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

function Snow({ count = 700 }) {
  const points = useRef();
  const { positions, speeds, drift } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const drift = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      speeds[i] = 0.4 + Math.random() * 1.1;
      drift[i] = Math.random() * Math.PI * 2;
    }
    return { positions, speeds, drift };
  }, [count]);

  useFrame((state, delta) => {
    const arr = points.current.geometry.attributes.position.array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= speeds[i] * delta;
      arr[i * 3] += Math.sin(t * 0.5 + drift[i]) * delta * 0.15;
      if (arr[i * 3 + 1] < -6) {
        arr[i * 3 + 1] = 6;
        arr[i * 3] = (Math.random() - 0.5) * 18;
      }
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color="#dfe8ef"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  );
}

export default function FrozenBackground() {
  const mouse = useRef(new THREE.Vector2(0, 0));
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;
  const snowCount = isMobile ? 220 : 600;

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (event) => {
      mouse.current.set(
        event.clientX / window.innerWidth - 0.5,
        0.5 - event.clientY / window.innerHeight
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="webgl" aria-hidden="true">
      <Canvas
        gl={{ antialias: !isMobile, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, isMobile ? 1.25 : 1.6]}
        camera={{ position: [0, 0, 8], fov: 55 }}
      >
        <FogPlane mouse={mouse} />
        <Snow count={snowCount} />
      </Canvas>
    </div>
  );
}
