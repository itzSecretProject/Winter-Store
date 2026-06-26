import { useState } from "react";
import ProductCard from "./ProductCard.jsx";
import Media from "./Media.jsx";
import { featured, collection, photos, auroraProduct } from "../data/products.js";
import { useI18n } from "../i18n/i18n.jsx";
import { useCart } from "../cart/CartProvider.jsx";
import { formatPrice } from "../utils/format.js";

const tagKeys = ["New Collection", "Signature", "Puffers"];

export default function Collection() {
  const { t, locale } = useI18n();
  const { addItem } = useCart();
  const [tag, setTag] = useState(tagKeys[0]);

  return (
    <section>
      <div className="section-head">
        <h2 className="section-title display" data-reveal="up">
          {t.section.title}
        </h2>
        <div className="tag-row" data-reveal="up">
          {tagKeys.map((key) => (
            <button key={key} className="label bracket" aria-pressed={tag === key} onClick={() => setTag(key)}>
              {t.section.tags[key]}
            </button>
          ))}
        </div>
        <div className="cat-row" data-reveal="up">
          {t.section.categories.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
        <button className="filters" data-reveal="up">
          {t.common.filters}
        </button>
      </div>

      <div className="grid-feature">
        <article className="feature" data-reveal="left">
          <Media image={photos.feature} alt="Aurora puffer jacket" className="feature-media" />
          <span className="graffiti">FRZN</span>
          <h3 className="feature-head">
            Aurora<span className="tm">™</span>
          </h3>
          <div className="feature-buy">
            <button
              className="round"
              aria-label={t.common.addToCart}
              onClick={() => addItem({ ...auroraProduct, size: "M" })}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5h8M7.5 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="col">
              <span className="label">{t.common.addToCart}</span>
              <span className="price">{formatPrice(auroraProduct.price, locale)}</span>
            </div>
          </div>
        </article>

        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="grid-row" data-reveal-batch>
        {collection.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
