import { useLocale } from "../i18n/LocaleContext.jsx";

export function LanguageSwitcher({ compact = false }) {
  const { localeId, locales, setLocaleId, site } = useLocale();

  return (
    <div className={`lang-switcher${compact ? " is-compact" : ""}`}>
      {!compact ? (
        <p className="theme-switcher-label">{site.ui.language}</p>
      ) : null}
      <div className="lang-pills" role="group" aria-label={site.ui.language}>
        {locales.map((locale) => (
          <button
            key={locale.id}
            type="button"
            className={localeId === locale.id ? "is-active" : ""}
            aria-pressed={localeId === locale.id}
            title={locale.native}
            onClick={() => setLocaleId(locale.id)}
          >
            {locale.label}
          </button>
        ))}
      </div>
    </div>
  );
}
