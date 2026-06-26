import { useEffect } from "react";
import { useCart } from "../cart/CartProvider.jsx";
import { useI18n } from "../i18n/i18n.jsx";
import { formatPrice } from "../utils/format.js";

export default function CartDrawer() {
  const { items, total, open, closeCart, setQty, removeItem } = useCart();
  const { t, locale } = useI18n();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeCart();
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, closeCart]);

  return (
    <div className={`cart-root ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="cart-scrim" onClick={closeCart} />
      <aside className="cart-panel" role="dialog" aria-modal="true" aria-label={t.cart.title}>
        <header className="cart-head">
          <h2>
            {t.cart.title}
            <span className="cart-head-count">{items.length}</span>
          </h2>
          <button className="icon-btn" aria-label="Close" onClick={closeCart}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2 L12 12 M12 2 L2 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart-empty">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path d="M2 3h3l2.4 12h10l1.8-9H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="20" r="1.4" fill="currentColor" />
              <circle cx="17" cy="20" r="1.4" fill="currentColor" />
            </svg>
            <p>{t.cart.empty}</p>
          </div>
        ) : (
          <ul className="cart-list">
            {items.map((line) => (
              <li key={line.key} className="cart-line">
                <div
                  className="cart-thumb"
                  style={{ backgroundImage: `url(${line.image.src})` }}
                />
                <div className="cart-line-body">
                  <div className="cart-line-top">
                    <h3>{line.name}</h3>
                    <button
                      className="cart-remove"
                      aria-label={t.cart.remove}
                      onClick={() => removeItem(line.key)}
                    >
                      {t.cart.remove}
                    </button>
                  </div>
                  <p className="cart-line-meta">
                    {line.size && `${t.cart.size} ${line.size}`}
                    {line.size && line.colour && " · "}
                    {line.colour && `${t.cart.colour} ${t.colours[line.colour] ?? line.colour}`}
                  </p>
                  <div className="cart-line-foot">
                    <div className="qty">
                      <button aria-label="-" onClick={() => setQty(line.key, line.qty - 1)}>–</button>
                      <span>{line.qty}</span>
                      <button aria-label="+" onClick={() => setQty(line.key, line.qty + 1)}>+</button>
                    </div>
                    <span className="price">{formatPrice(line.price * line.qty, locale)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <footer className="cart-foot">
            <div className="cart-subtotal">
              <span className="label">{t.cart.subtotal}</span>
              <span className="price">{formatPrice(total, locale)}</span>
            </div>
            <button className="cart-checkout">{t.cart.checkout}</button>
          </footer>
        )}
      </aside>
    </div>
  );
}
