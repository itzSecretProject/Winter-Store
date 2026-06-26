import { Component, Suspense, lazy } from "react";

const FrozenBackground = lazy(() => import("./FrozenBackground.jsx"));

class WebGLBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return <div className="webgl webgl-fallback" aria-hidden="true" />;
    return this.props.children;
  }
}

export default function Background() {
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) return <div className="webgl webgl-fallback" aria-hidden="true" />;

  return (
    <WebGLBoundary>
      <Suspense fallback={<div className="webgl webgl-fallback" aria-hidden="true" />}>
        <FrozenBackground />
      </Suspense>
    </WebGLBoundary>
  );
}
