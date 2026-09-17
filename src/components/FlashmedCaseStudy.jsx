import { useEffect, useState } from "react";
import { site } from "../content/site.js";
import { flashmedErp } from "../content/flashmedErp.js";
import { asset } from "../lib/asset.js";

function shotSources(file) {
  return [".png", ".jpg", ".webp", ".jpeg", ".svg"].map((ext) =>
    asset(`case-studies/flashmed/${file}${ext}`),
  );
}

function ShotImage({ file, alt }) {
  const sources = shotSources(file);
  const [index, setIndex] = useState(0);
  const src = sources[index];
  const missing = index >= sources.length;

  if (missing || !src) {
    return (
      <div className="cs-frame is-empty" role="img" aria-label={alt}>
        <p className="cs-frame-file">{file}.png</p>
        <p className="cs-frame-hint">
          Add a blurred screenshot with this filename.
        </p>
      </div>
    );
  }

  return (
    <div className="cs-frame">
      <img
        src={src}
        alt={alt}
        onError={() => setIndex((current) => current + 1)}
      />
    </div>
  );
}

function ShotFrame({ files, alt, n }) {
  const list = files?.length ? files : [];

  if (!list.length) {
    return (
      <div className="cs-frame is-empty" role="img" aria-label={alt}>
        <span className="cs-frame-n">{n}</span>
        <p className="cs-frame-hint">Missing screenshot.</p>
      </div>
    );
  }

  if (list.length === 1) {
    return <ShotImage file={list[0]} alt={alt} />;
  }

  return (
    <div className="cs-frame-stack">
      {list.map((file, index) => (
        <ShotImage key={file} file={file} alt={`${alt} — view ${index + 1}`} />
      ))}
    </div>
  );
}

export function FlashmedCaseStudy({ onBack }) {
  const study = flashmedErp;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${study.title} — ${site.fullName}`;
    window.scrollTo(0, 0);
    return () => {
      document.title = previousTitle;
    };
  }, [study.title]);

  return (
    <article className="cs-page">
      <header className="cs-top">
        <button type="button" className="cs-back" onClick={onBack}>
          ← Work
        </button>
        <p className="cs-top-name">{site.fullName}</p>
      </header>

      <div className="cs-hero">
        <p className="cs-kicker">{study.kicker}</p>
        <h1 className="cs-title">{study.title}</h1>
        <p className="cs-sub">{study.subtitle}</p>
        <ul className="cs-meta">
          <li>{study.year}</li>
          <li>{study.role}</li>
        </ul>
        <p className="cs-summary">{study.summary}</p>
        <ul className="cs-stack">
          {study.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <p className="cs-drop">{study.replaceHint}</p>

      <ol className="cs-shots">
        {study.shots.map((shot, index) => {
          const files = shot.images || [shot.file];
          return (
            <li
              key={shot.file}
              className={`cs-shot${index % 2 === 1 ? " is-flip" : ""}`}
            >
              <ShotFrame
                files={files}
                n={shot.n}
                alt={`${shot.n} — ${shot.title}`}
              />
              <div className="cs-copy">
                <p className="cs-shot-n">{shot.n}</p>
                <h2 className="cs-shot-title">{shot.title}</h2>
                <div className="cs-story">
                  <div className="cs-story-block">
                    <p className="cs-story-label">Problem</p>
                    <p className="cs-story-text">{shot.problem}</p>
                  </div>
                  <div className="cs-story-block is-built">
                    <p className="cs-story-label">What I built</p>
                    <p className="cs-story-text">{shot.built}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <footer className="cs-end">
        <p>
          Built as the sole engineer on FlashMed’s operations stack — schema,
          permissions, UI, and the AI layer on top.
        </p>
        <button type="button" className="cs-back cs-back-end" onClick={onBack}>
          Back to selected work
        </button>
      </footer>
    </article>
  );
}

export function isFlashmedCaseStudyHash(hash = window.location.hash) {
  const value = hash.replace(/^#/, "").replace(/^\//, "");
  return value === "work/flashmed-erp" || value === "work/flashmedErp";
}
