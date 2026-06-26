const LOCALE_TAG = { en: "en-US", es: "es-ES", fr: "fr-FR", de: "de-DE" };

export function formatPrice(value, locale = "en") {
  return new Intl.NumberFormat(LOCALE_TAG[locale] ?? "en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}
