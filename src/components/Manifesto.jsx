import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Media from "./Media.jsx";
import { photos } from "../data/products.js";
import { useI18n } from "../i18n/i18n.jsx";

export default function Manifesto() {
  const { t } = useI18n();
  const rangeRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.to(rangeRef.current, {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: rangeRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="manifesto">
      <Media image={photos.mountain} alt="Snowy alpine peak" className="range" innerRef={rangeRef} eager />
      <span className="graffiti">FRZN</span>

      <div className="manifesto-grid" data-reveal="up">
        <div className="story">
          <p>{t.manifesto.story}</p>
          <span className="label bracket">{t.manifesto.protocol}</span>
        </div>
        <p className="manifesto-claim">
          {t.manifesto.claim.map((line, i) => (
            <span key={i}>
              {line}
              {i < t.manifesto.claim.length - 1 && <br />}
            </span>
          ))}
        </p>
        <p className="aside-note">{t.manifesto.aside}</p>
      </div>
    </section>
  );
}
