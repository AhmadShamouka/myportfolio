import { useSite } from "../i18n/LocaleContext.jsx";

export function Contact() {
  const site = useSite();
  const { contact } = site;

  return (
    <section
      className="contact-section snap-section"
      id="contact"
      data-nav="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-inner">
        <p className="section-label">{contact.kicker}</p>
        <h2 className="contact-title" id="contact-title">
          {contact.title}
        </h2>
        <p className="contact-body">{contact.body}</p>

        <div className="contact-actions">
          <a
            className="contact-btn contact-btn-page"
            href={site.whatsappHref}
            target="_blank"
            rel="noreferrer"
          >
            {site.ui.whatsapp} {site.whatsapp}
          </a>
          <a className="contact-link" href={site.emailHref}>
            {site.email}
          </a>
          <a
            className="contact-link"
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            {site.ui.linkedIn}
          </a>
          <a
            className="contact-link"
            href={site.github}
            target="_blank"
            rel="noreferrer"
          >
            {site.ui.github}
          </a>
        </div>
      </div>
    </section>
  );
}
