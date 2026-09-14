import { useEffect, useRef, useState } from "react";
import { useSite } from "../i18n/LocaleContext.jsx";

function WorkCard({ item, onOpen, labels }) {
  const hasVideo = Boolean(item.video);
  const hasCaseStudy = Boolean(item.caseStudy);
  const hasPreview = Boolean(item.preview);
  const hasMedia = hasVideo || hasCaseStudy || hasPreview;

  const handleClick = (event) => {
    if (hasCaseStudy) {
      event.preventDefault();
      window.location.hash = `/work/${item.caseStudy}`;
      return;
    }
    if (!hasVideo) return;
    event.preventDefault();
    onOpen(item);
  };

  return (
    <a
      className={`work-card tone-${item.tone}${hasVideo || hasCaseStudy ? " has-demo" : ""}`}
      href={item.href}
      target={hasVideo || hasCaseStudy ? undefined : "_blank"}
      rel={hasVideo || hasCaseStudy ? undefined : "noopener noreferrer"}
      data-work-card=""
      onClick={handleClick}
    >
      <div className="work-browser">
        <div className="work-browser-bar">
          <span />
          <span />
          <span />
          <div className="work-url">
            {hasVideo
              ? labels.clickWatch
              : hasCaseStudy
                ? labels.clickCase
                : item.href.replace(/^https?:\/\//, "")}
          </div>
        </div>
        <div className={`work-preview${hasMedia ? " has-video" : ""}`}>
          {hasVideo ? (
            <>
              <video
                className="work-preview-video"
                src={item.video}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
              />
              <span className="work-play-badge" aria-hidden="true">
                {labels.watchDemo}
              </span>
            </>
          ) : hasCaseStudy ? (
            <>
              <img
                className="work-preview-shot"
                src="/case-studies/flashmed/01-admin-home.png"
                alt=""
              />
              <span className="work-play-badge" aria-hidden="true">
                {labels.caseStudy}
              </span>
            </>
          ) : hasPreview ? (
            <img className="work-preview-shot" src={item.preview} alt="" />
          ) : (
            <div className="work-preview-ui">
              <div className="work-preview-line wide" />
              <div className="work-preview-line" />
              <div className="work-preview-grid">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="work-meta">
        <div>
          <p className="work-type">
            {item.id} — {item.type}
          </p>
          <h3 className="work-name">{item.title}</h3>
          <p className="work-sub">{item.subtitle}</p>
        </div>
        <p className="work-year">{item.year}</p>
      </div>
    </a>
  );
}

function ProjectModal({ item, onClose, labels }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      className="project-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="project-modal-panel"
        ref={dialogRef}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="project-modal-close"
          aria-label={labels.close}
          onClick={onClose}
        >
          ×
        </button>

        <div className="project-modal-media">
          <video
            className="project-modal-video"
            src={item.video}
            controls
            autoPlay
            playsInline
            preload="auto"
          />
        </div>

        <div className="project-modal-copy">
          <p className="project-modal-kicker">
            {item.id} — {item.type} · {item.year}
          </p>
          <h3 className="project-modal-title" id="project-modal-title">
            {item.title}
          </h3>
          <p className="project-modal-sub">{item.subtitle}</p>
          <p className="project-modal-body">{item.description}</p>
          {item.href ? (
            <a
              className="contact-btn contact-btn-page"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {labels.viewProject}
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const BASE_SPEED = 0.55;
const BOOST_SPEED = 3.2;

export function SelectedWork() {
  const site = useSite();
  const { selectedWork, ui } = site;
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const speedRef = useRef(BASE_SPEED);
  const pausedRef = useRef(false);
  const halfRef = useRef(0);
  const boostTimerRef = useRef(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    pausedRef.current = Boolean(activeProject);
  }, [activeProject]);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return undefined;

    const section = sectionRef.current;
    if (!section) return undefined;

    const onMove = (event) => {
      if (activeProject) {
        setCursor((prev) => ({ ...prev, visible: false }));
        return;
      }
      const overCard = event.target.closest(".work-card");
      setCursor({
        x: event.clientX,
        y: event.clientY,
        visible: Boolean(overCard),
      });
    };

    const onLeave = () => setCursor((prev) => ({ ...prev, visible: false }));

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [activeProject]);

  useEffect(() => {
    const rail = railRef.current;
    const track = trackRef.current;
    if (!rail || !track) return undefined;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;

    const measure = () => {
      halfRef.current = track.scrollWidth / 2;
    };

    const wrap = () => {
      const half = halfRef.current;
      if (half <= 0) return;
      while (offsetRef.current >= half) offsetRef.current -= half;
      while (offsetRef.current < 0) offsetRef.current += half;
    };

    const apply = () => {
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    };

    const updateFocus = () => {
      const cards = track.querySelectorAll("[data-work-card]");
      const railRect = rail.getBoundingClientRect();
      if (railRect.width < 2) return;

      const centerX = railRect.left + railRect.width / 2;
      const maxDist = Math.max(railRect.width * 0.4, 1);

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - centerX);
        const t = Math.min(1, dist / maxDist);
        card.style.setProperty("--work-scale", (1.18 - t * 0.32).toFixed(3));
        card.style.setProperty("--work-opacity", (1 - t * 0.45).toFixed(3));
        card.classList.toggle("is-center", t < 0.16);
      });
    };

    const tick = () => {
      if (!pausedRef.current && !reduced && halfRef.current > 0) {
        offsetRef.current += speedRef.current;
        wrap();
        apply();
      }
      updateFocus();
      frame = requestAnimationFrame(tick);
    };

    measure();
    apply();
    updateFocus();

    const resizeObserver = new ResizeObserver(() => {
      const ratio =
        halfRef.current > 0 ? offsetRef.current / halfRef.current : 0;
      measure();
      offsetRef.current = ratio * halfRef.current;
      wrap();
      apply();
      updateFocus();
    });
    resizeObserver.observe(track);

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(boostTimerRef.current);
      resizeObserver.disconnect();
    };
  }, []);

  const getStep = () => {
    const track = trackRef.current;
    const card = track?.querySelector("[data-work-card]");
    if (!track || !card) return 408;
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 28;
    return card.getBoundingClientRect().width + gap;
  };

  const jump = (direction) => {
    const track = trackRef.current;
    if (!track || activeProject) return;

    pausedRef.current = false;
    offsetRef.current += direction * getStep();

    const half = track.scrollWidth / 2;
    halfRef.current = half;
    while (offsetRef.current >= half) offsetRef.current -= half;
    while (offsetRef.current < 0) offsetRef.current += half;

    track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;

    speedRef.current = BOOST_SPEED;
    window.clearTimeout(boostTimerRef.current);
    boostTimerRef.current = window.setTimeout(() => {
      speedRef.current = BASE_SPEED;
    }, 900);
  };

  const loopItems = [...selectedWork.items, ...selectedWork.items];

  return (
    <section
      className="work-section snap-section"
      id="selected-work"
      aria-labelledby="work-title"
      ref={sectionRef}
    >
      <div className="work-header">
        <h2 className="work-kicker" id="work-title">
          {selectedWork.kicker}
        </h2>
        <div className="work-controls">
          <button
            type="button"
            className="work-arrow"
            aria-label={ui.previousProject}
            onClick={() => jump(-1)}
          >
            ←
          </button>
          <button
            type="button"
            className="work-arrow"
            aria-label={ui.nextProject}
            onClick={() => jump(1)}
          >
            →
          </button>
          <span className="work-dot" aria-hidden="true" />
        </div>
      </div>

      <div className="work-rail" ref={railRef}>
        <div className="work-rail-track" ref={trackRef}>
          {loopItems.map((item, index) => (
            <WorkCard
              key={`${item.title}-${index}`}
              item={item}
              onOpen={setActiveProject}
              labels={ui}
            />
          ))}
        </div>
      </div>

      <div
        className={`view-cursor${cursor.visible && !activeProject ? " is-on" : ""}`}
        style={{ left: cursor.x, top: cursor.y }}
        aria-hidden="true"
      >
        {cursor.visible ? ui.view : null}
      </div>

      {activeProject ? (
        <ProjectModal
          item={activeProject}
          onClose={() => setActiveProject(null)}
          labels={ui}
        />
      ) : null}
    </section>
  );
}
