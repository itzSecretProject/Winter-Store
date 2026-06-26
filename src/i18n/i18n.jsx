import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations, SUPPORTED } from "./translations.js";

const I18nContext = createContext(null);
const STORAGE_KEY = "frzn-locale";

function detectLocale() {
  if (typeof navigator === "undefined") return "en";

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED.includes(stored)) return stored;

  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of candidates) {
    const base = tag.toLowerCase().split("-")[0];
    if (SUPPORTED.includes(base)) return base;
  }
  return "en";
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState("en");

  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    const t = translations[locale];
    document.title = t.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t.meta.description);
  }, [locale]);

  const setLocale = (next) => {
    if (!SUPPORTED.includes(next)) return;
    localStorage.setItem(STORAGE_KEY, next);
    setLocaleState(next);
  };

  const value = useMemo(
    () => ({ locale, setLocale, t: translations[locale] }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
