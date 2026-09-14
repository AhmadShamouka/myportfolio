import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { applyMode, getStoredModeId } from "./content/mode.js";
import { applyTheme, getStoredThemeId } from "./content/themes.js";
import { LocaleProvider } from "./i18n/LocaleContext.jsx";
import { applyDocumentLocale, getStoredLocaleId } from "./i18n/locales.js";
import "./index.css";

applyTheme(getStoredThemeId());
applyMode(getStoredModeId());
applyDocumentLocale(getStoredLocaleId());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>,
);
