import { useI18n } from "../i18n/i18n.jsx";

export default function Marquee() {
  const { t } = useI18n();
  const loop = [...t.marquee, ...t.marquee];

  return (
    <div className="marquee">
      <div className="marquee-track">
        {loop.map((phrase, i) => (
          <span key={i} className="marquee-item">
            {phrase}
            <span className="sep">✶</span>
          </span>
        ))}
      </div>
    </div>
  );
}
