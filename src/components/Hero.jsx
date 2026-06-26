import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Media from "./Media.jsx";
import { photos, heroProduct } from "../data/products.js";
import { useI18n } from "../i18n/i18n.jsx";
import { useCart } from "../cart/CartProvider.jsx";
import { formatPrice } from "../utils/format.js";

const sizes = ["S", "M", "L", "XL"];
const colourKeys = ["White", "Silver"];
const colourDots = { White: "oklch(95% 0.005 230)", Silver: "oklch(74% 0.015 228)" };

export default function Hero() {
  const { t, locale } = useI18n();
  const { addItem } = useCart();
  const [size, setSize] = useState("S");
  const [colour, setColour] = useState("White");
  const [angle, setAngle] = useState(0);
  const figureRef = useRef(null);
  const graffitiRef = useRef(null);

  const addToCart = () => addItem({ ...heroProduct, size, colour });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const quickFig = {
      x: gsap.quickTo(figureRef.current, "x", { duration: 0.9, ease: "power2.out" }),
      y: gsap.quickTo(figureRef.current, "y", { duration: 0.9, ease: "power2.out" }),
    };
    const quickGfx = {
      x: gsap.quickTo(graffitiRef.current, "x", { duration: 1.2, ease: "power2.out" }),
      y: gsap.quickTo(graffitiRef.current, "y", { duration: 1.2, ease: "power2.out" }),
    };

    const onMove = (event) => {
      const dx = (event.clientX / window.innerWidth - 0.5) * 16;
      const dy = (event.clientY / window.innerHeight - 0.5) * 12;
      quickFig.x(dx);
      quickFig.y(dy);
      quickGfx.x(dx * 0.4);
      quickGfx.y(dy * 0.3);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section className="hero">
      <div className="hero-panel">
        <div className="hero-tags">
          <span className="label bracket">{t.hero.badge}</span>
          <span className="label bracket">{t.hero.series}</span>
        </div>
        <h1 className="hero-title display">
          {t.hero.collection}
          <br />
          Artic 01<span className="tm">™</span>
        </h1>

        <div className="spec">
          <div className="spec-row">
            <span className="spec-key">{t.hero.size}</span>
            <div className="swatch-set">
              {sizes.map((s) => (
                <button key={s} className="swatch" aria-pressed={size === s} onClick={() => setSize(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="spec-row">
            <span className="spec-key">{t.hero.colour}</span>
            <div className="colour-set">
              {colourKeys.map((c) => (
                <button
                  key={c}
                  className="colour"
                  aria-pressed={colour === c}
                  style={{ "--dot": colourDots[c] }}
                  onClick={() => setColour(c)}
                >
                  {t.colours[c]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="buy">
          <button className="hex" aria-label={t.hero.addToCart} onClick={addToCart}>
            <svg className="hex-shape" viewBox="0 0 64 72" fill="none">
              <path className="hex-face" d="M16 4 L48 4 L62 36 L48 68 L16 68 L2 36 Z" />
            </svg>
            <span className="arrow">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M5 13 L13 5 M6 5 h7 v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
          <button className="buy-meta" onClick={addToCart}>
            <span className="label">{t.hero.addToCart}</span>
            <span className="price">{formatPrice(heroProduct.price, locale)}</span>
          </button>
        </div>
      </div>

      <div className="hero-stage">
        <div className="graffiti" ref={graffitiRef}>FRZN</div>
        <Media
          image={photos.hero}
          alt="FRZN Artic 01 puffer jacket"
          className="hero-media"
          eager
        />
      </div>

      <div className="hero-aside">
        {photos.heroAngles.map((image, i) => (
          <button
            key={i}
            className="angle"
            aria-pressed={angle === i}
            onClick={() => setAngle(i)}
          >
            <Media image={image} alt={`Artic 01 — ${i + 1}`} eager />
          </button>
        ))}
        <div className="pager">
          <span>0{angle + 1}</span>
          <span className="track" />
          <span>07</span>
        </div>
      </div>

      <div className="social">
        <button className="icon-btn" aria-label="Instagram">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <rect x="1" y="1" width="11" height="11" rx="3" stroke="currentColor" strokeWidth="1.1" />
            <circle cx="6.5" cy="6.5" r="2.6" stroke="currentColor" strokeWidth="1.1" />
            <circle cx="9.6" cy="3.4" r="0.7" fill="currentColor" />
          </svg>
        </button>
        <button className="icon-btn" aria-label="Facebook">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M8 4H7q-1 0-1 1v1.5h2L7.6 8H6v4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="icon-btn" aria-label="X">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 2 L11 11 M11 2 L2 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
