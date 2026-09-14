export const LOCALE_STORAGE_KEY = "portfolio-locale";

export const locales = [
  { id: "en", label: "EN", native: "English", dir: "ltr", lang: "en" },
  { id: "ar", label: "ع", native: "العربية", dir: "rtl", lang: "ar" },
  { id: "de", label: "DE", native: "Deutsch", dir: "ltr", lang: "de" },
  { id: "fr", label: "FR", native: "Français", dir: "ltr", lang: "fr" },
];

export function getStoredLocaleId() {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (locales.some((locale) => locale.id === saved)) return saved;
  } catch {
    /* ignore */
  }
  return "en";
}

export function applyDocumentLocale(localeId) {
  const locale = locales.find((entry) => entry.id === localeId) || locales[0];
  const root = document.documentElement;
  root.setAttribute("lang", locale.lang);
  root.setAttribute("dir", locale.dir);
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale.id);
  } catch {
    /* ignore */
  }
  return locale;
}
