import { useI18n } from "../i18n/i18n.jsx";
import { SUPPORTED, LANGUAGE_NAMES } from "../i18n/translations.js";
import { useCart } from "../cart/CartProvider.jsx";

export default function Topbar() {
  const { t, locale, setLocale } = useI18n();
  const { count, openCart } = useCart();
  const links = [t.nav.catalog, t.nav.puffers, t.nav.boots, t.nav.lookbook, t.nav.stories];

  return (
    <header className="topbar">
      <a className="brand" href="#">
        <span>F</span>RZN
      </a>
      <nav className="menu-wrap">
        <ul className="menu">
          {links.map((label, i) => (
            <li key={i}>
              <a href="#">{label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="tools">
        <label className="lang" aria-label="Language">
          <select value={locale} onChange={(e) => setLocale(e.target.value)}>
            {SUPPORTED.map((code) => (
              <option key={code} value={code}>
                {LANGUAGE_NAMES[code]}
              </option>
            ))}
          </select>
          <span aria-hidden="true">{LANGUAGE_NAMES[locale]}</span>
        </label>
        <button className="icon-btn" aria-label="Search">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
            <line x1="9.5" y1="9.5" x2="13" y2="13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
        <button className="icon-btn cart-btn" aria-label={t.cart.title} onClick={openCart}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1.5h2L4.4 9h6.2l1.4-5.5H4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="5.5" cy="12" r="1" fill="currentColor" />
            <circle cx="10" cy="12" r="1" fill="currentColor" />
          </svg>
          {count > 0 && <span className="cart-badge">{count}</span>}
        </button>
      </div>
    </header>
  );
}
