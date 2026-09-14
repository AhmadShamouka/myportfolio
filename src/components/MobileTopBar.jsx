import { useEffect, useRef } from "react";
import { useSite } from "../i18n/LocaleContext.jsx";

export function MobileTopBar({ active, onNav }) {
  const site = useSite();
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return undefined;

    const syncHeight = () => {
      document.documentElement.style.setProperty(
        "--mobile-topbar-h",
        `${bar.offsetHeight}px`,
      );
    };

    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(bar);
    window.addEventListener("resize", syncHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeight);
      document.documentElement.style.removeProperty("--mobile-topbar-h");
    };
  }, []);

  const loopBits = [
    site.fullName,
    site.role,
    site.bio.line,
    ...site.stats.map((stat) => `${stat.value} ${stat.label}`),
    site.email,
    `${site.ui.whatsapp} ${site.whatsapp}`,
  ];
  const loopItems = [...loopBits, ...loopBits];

  return (
    <header className="mobile-topbar" aria-label={site.ui.mobileProfile} ref={barRef}>
      <div className="mobile-topbar-row">
        <div className="mobile-topbar-identity">
          <div className="mobile-topbar-photo">
            <img src={`${import.meta.env.BASE_URL}portrait.png`} alt="" />
          </div>
          <div className="mobile-topbar-copy">
            <p className="mobile-topbar-name">{site.fullName}</p>
            <p className="mobile-topbar-role">{site.role}</p>
          </div>
        </div>
      </div>

      <div className="mobile-loop" aria-hidden="true">
        <div className="mobile-loop-track">
          {loopItems.map((text, index) => (
            <span key={`${text}-${index}`} className="mobile-loop-item">
              {text}
            </span>
          ))}
        </div>
      </div>

      <nav className="mobile-nav" aria-label={site.ui.sections}>
        {site.nav.map((item) => (
          <button
            key={item.id}
            type="button"
            className={active === item.id ? "is-active" : ""}
            onClick={() => onNav(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
