import { useSite } from "../i18n/LocaleContext.jsx";

export function Sidebar({ active, onNav, visible }) {
  const site = useSite();
  const loopStats = [...site.stats, ...site.stats];

  return (
    <aside
      className={`sidebar${visible ? " is-visible" : ""}`}
      aria-label={site.ui.profile}
      aria-hidden={!visible}
    >
      <div className="side-card side-card-profile">
        <div className="side-profile-top">
          <div className="side-profile-copy">
            <h1 className="side-name">{site.fullName}</h1>
            <p className="side-role">{site.role}</p>
          </div>
          <div className="side-photo" id="side-photo-slot">
            <img src={`${import.meta.env.BASE_URL}portrait.png`} alt="" />
          </div>
        </div>
        <p className="side-bio">{site.bio.line}</p>
      </div>

      <div className="side-card side-card-stats">
        <div className="stats-marquee" aria-label={site.ui.highlights}>
          <div className="stats-marquee-track">
            {loopStats.map((stat, index) => (
              <div key={`${stat.label}-${index}`} className="stat-chip">
                <span className="stat-n">{stat.value}</span>
                <span className="stat-l">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="side-card side-card-nav">
        <nav className="side-nav" aria-label={site.ui.sections}>
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
      </div>

      <div className="side-card side-card-contact">
        <button
          type="button"
          className="contact-btn"
          onClick={() => onNav("contact")}
        >
          {site.ui.contactUs}
        </button>
      </div>
    </aside>
  );
}
