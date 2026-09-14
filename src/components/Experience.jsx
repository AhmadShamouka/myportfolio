import { useSite } from "../i18n/LocaleContext.jsx";

export function Experience() {
  const { experience } = useSite();

  return (
    <section className="experience-section snap-section" id="experience" aria-labelledby="experience-title">
      <div className="experience-inner">
        <p className="section-label">{experience.kicker}</p>
        <h2 className="experience-title" id="experience-title">
          {experience.title}
        </h2>

        <ol className="experience-list">
          {experience.items.map((item, index) => (
            <li key={item.company} className="experience-item">
              <div className="experience-rail" aria-hidden="true">
                <span className="experience-dot" />
                {index < experience.items.length - 1 ? <span className="experience-line" /> : null}
              </div>

              <div className="experience-main">
                <div className="experience-top">
                  <div>
                    <p className="experience-company">{item.company}</p>
                    <h3 className="experience-role">{item.role}</h3>
                  </div>
                  <p className="experience-dates">{item.dates}</p>
                </div>
                <p className="experience-place">{item.place}</p>
                <p className="experience-body">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
