import { useEffect, useState } from "react";
import { applyMode, getStoredModeId } from "../content/mode.js";
import { applyTheme, getStoredThemeId, themes } from "../content/themes.js";
import { useSite } from "../i18n/LocaleContext.jsx";

export function ThemeSwitcher({ compact = false }) {
  const { ui } = useSite();
  const [themeId, setThemeId] = useState(() => getStoredThemeId());
  const [modeId, setModeId] = useState(() => getStoredModeId());

  useEffect(() => {
    applyTheme(themeId);
  }, [themeId]);

  useEffect(() => {
    applyMode(modeId);
  }, [modeId]);

  return (
    <div className={`theme-switcher${compact ? " is-compact" : ""}`}>
      {!compact ? <p className="theme-switcher-label">{ui.theme}</p> : null}
      <div className="theme-swatches" role="group" aria-label={ui.theme}>
        {themes.map((theme) => (
          <button
            key={theme.id}
            type="button"
            className={`theme-swatch${themeId === theme.id ? " is-active" : ""}`}
            style={{ "--swatch": theme.accent }}
            aria-label={theme.label}
            title={theme.label}
            aria-pressed={themeId === theme.id}
            onClick={() => setThemeId(theme.id)}
          />
        ))}
      </div>

      {!compact ? <p className="theme-switcher-label mode-label">{ui.mode}</p> : null}
      <div
        className={`mode-toggle${compact ? " is-compact" : ""}`}
        role="group"
        aria-label={ui.mode}
      >
        <button
          type="button"
          className={modeId === "dark" ? "is-active" : ""}
          aria-pressed={modeId === "dark"}
          onClick={() => setModeId("dark")}
        >
          {ui.dark}
        </button>
        <button
          type="button"
          className={modeId === "light" ? "is-active" : ""}
          aria-pressed={modeId === "light"}
          onClick={() => setModeId("light")}
        >
          {ui.light}
        </button>
      </div>
    </div>
  );
}
