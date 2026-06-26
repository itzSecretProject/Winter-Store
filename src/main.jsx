import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { I18nProvider } from "./i18n/i18n.jsx";
import { CartProvider } from "./cart/CartProvider.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </I18nProvider>
  </React.StrictMode>
);
