import { useEffect, useId, useRef, useState } from "react";
import { useSite } from "../i18n/LocaleContext.jsx";
import { LanguageSwitcher } from "./LanguageSwitcher.jsx";
import { ThemeSwitcher } from "./ThemeSwitcher.jsx";

export function SettingsMenu({ compact = false }) {
  const { ui } = useSite();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return undefined;

    const onPointer = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      className={`settings-menu${compact ? " is-compact" : ""}${open ? " is-open" : ""}`}
      ref={rootRef}
    >
      <button
        type="button"
        className="settings-trigger"
        aria-label={ui.settings}
        aria-expanded={open}
        aria-controls={panelId}
        title={ui.settings}
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="settings-icon">
          <path
            fill="currentColor"
            d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.03 7.03 0 0 0-1.63-.94l-.36-2.54A.5.5 0 0 0 13.9 2h-3.8a.5.5 0 0 0-.49.42l-.36 2.54c-.59.24-1.13.55-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.71 8.48a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94L2.83 14.52a.5.5 0 0 0-.12.64l1.92 3.32c.14.24.43.34.68.24l2.39-.96c.5.39 1.04.7 1.63.94l.36 2.54c.05.24.25.42.49.42h3.8c.24 0 .44-.18.49-.42l.36-2.54c.59-.24 1.13-.55 1.63-.94l2.39.96c.25.1.54 0 .68-.24l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7Z"
          />
        </svg>
        {!compact ? <span>{ui.settings}</span> : null}
      </button>

      {open ? (
        <div
          className="settings-panel"
          id={panelId}
          role="dialog"
          aria-label={ui.settings}
        >
          <div className="settings-panel-head">
            <p className="settings-panel-title">{ui.settings}</p>
            <button
              type="button"
              className="settings-close"
              aria-label={ui.close}
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      ) : null}
    </div>
  );
}
