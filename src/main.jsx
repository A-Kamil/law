import React from "react";
import { createRoot } from "react-dom/client";
import App from "./fiche-droit-bancaire.jsx";

if (!window.storage) {
  window.storage = {
    get: async (key) => {
      try {
        const value = localStorage.getItem(key);
        return value !== null ? { value } : null;
      } catch {
        return null;
      }
    },
    set: async (key, value) => {
      try { localStorage.setItem(key, value); } catch {}
    },
  };
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
