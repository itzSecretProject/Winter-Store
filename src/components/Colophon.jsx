import { useI18n } from "../i18n/i18n.jsx";

const bars = [2, 1, 3, 1, 2, 1, 3, 1, 2, 2, 1, 3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2];

export default function Colophon() {
  const { t } = useI18n();
  let x = 0;

  return (
    <footer className="colophon">
      <span className="label">{t.footer.rights}</span>
      <div className="colophon-end">
        <svg viewBox="0 0 120 30" fill="none" aria-hidden="true">
          <g fill="currentColor">
            {bars.map((w, i) => {
              const rect = <rect key={i} x={x} y="0" width={w} height="30" />;
              x += w + 1;
              return rect;
            })}
          </g>
        </svg>
        <span className="brand">FRZN WEAR</span>
      </div>
    </footer>
  );
}
