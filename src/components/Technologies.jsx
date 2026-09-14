import { useSite } from "../i18n/LocaleContext.jsx";

export function Technologies() {
  const { technologies } = useSite();

  return (
    <section className="tech-section snap-section" id="skills" aria-labelledby="tech-title">
      <p className="tech-kicker">{technologies.kicker}</p>
      <h2 className="tech-title" id="tech-title">
        {technologies.titleBefore}
        <span>{technologies.titleAccent}</span>
      </h2>
      <p className="tech-subtitle">{technologies.subtitle}</p>

      <ul className="tech-cards">
        {technologies.items.map((item) => (
          <li key={item.name}>
            <div className="tech-card">
              <span className="tech-mark" aria-hidden="true">
                {item.mark}
              </span>
              <span className="tech-name">{item.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
