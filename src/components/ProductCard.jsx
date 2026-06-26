import Media from "./Media.jsx";
import { useI18n } from "../i18n/i18n.jsx";
import { useCart } from "../cart/CartProvider.jsx";
import { formatPrice } from "../utils/format.js";

export default function ProductCard({ product }) {
  const { t, locale } = useI18n();
  const { addItem } = useCart();

  const add = () =>
    addItem({
      id: product.id,
      name: product.name,
      desc: product.desc,
      price: product.price,
      image: product.image,
      size: "M",
      colour: product.colours[0].name,
    });

  return (
    <article className="card" data-reveal="up">
      <Media image={product.image} alt={product.name} className="card-media" />
      <button className="card-add" aria-label={t.common.addToCart} onClick={add}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <div className="meta">
        <h3>{product.name}</h3>
        <p>{t.desc[product.desc] ?? product.desc}</p>
        <div className="meta-foot">
          <div className="dots">
            {product.colours.map((c) => (
              <span key={c.name} style={{ "--dot": c.dot }}>
                {t.colours[c.name] ?? c.name}
              </span>
            ))}
          </div>
          <span className="price">{formatPrice(product.price, locale)}</span>
        </div>
      </div>
    </article>
  );
}
