import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useReveal(scope) {
  useEffect(() => {
    const root = scope?.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.querySelectorAll("[data-reveal]").forEach((el) => {
        gsap.set(el, { opacity: 1, x: 0, y: 0 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal='up']").forEach((el) => {
        gsap.from(el, {
          y: 34,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray("[data-reveal='left']").forEach((el) => {
        gsap.from(el, {
          x: -36,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray("[data-reveal-batch]").forEach((group) => {
        ScrollTrigger.batch(group.children, {
          start: "top 92%",
          onEnter: (batch) =>
            gsap.from(batch, {
              y: 30,
              opacity: 0,
              stagger: 0.08,
              duration: 0.65,
              ease: "power3.out",
            }),
        });
      });
    }, root);

    return () => ctx.revert();
  }, [scope]);
}
