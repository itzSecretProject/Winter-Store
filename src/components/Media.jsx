import { useEffect, useRef, useState } from "react";

export default function Media({ image, alt, className = "", eager = false, sizes, innerRef }) {
  const [near, setNear] = useState(eager);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);

  const setRefs = (node) => {
    ref.current = node;
    if (innerRef) innerRef.current = node;
  };

  useEffect(() => {
    if (eager || near) return;
    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [eager, near]);

  return (
    <div ref={setRefs} className={`media ${className} ${loaded ? "is-loaded" : ""}`}>
      {image.lqip && (
        <div className="media-lqip" style={{ backgroundImage: `url(${image.lqip})` }} />
      )}
      {near && (
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={sizes}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "auto"}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
}
