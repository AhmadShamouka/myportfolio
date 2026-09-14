import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { buildSite } from "../content/siteMeta.js";
import { ar } from "./ar.js";
import { de } from "./de.js";
import { en } from "./en.js";
import { fr } from "./fr.js";
import {
  applyDocumentLocale,
  getStoredLocaleId,
  locales,
} from "./locales.js";

const copies = { en, ar, de, fr };

const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
  const [localeId, setLocaleId] = useState(() => getStoredLocaleId());

  useEffect(() => {
    applyDocumentLocale(localeId);
  }, [localeId]);

  const value = useMemo(() => {
    const locale = locales.find((entry) => entry.id === localeId) || locales[0];
    const site = buildSite(copies[locale.id] || en);
    return {
      localeId: locale.id,
      locale,
      locales,
      site,
      setLocaleId,
    };
  }, [localeId]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

export function useSite() {
  return useLocale().site;
}
