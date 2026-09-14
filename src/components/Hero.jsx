import { useEffect, useRef } from "react";
import { useSite } from "../i18n/LocaleContext.jsx";

function IntroBio({ text, strong }) {
  const parts = text.split(strong);
  if (parts.length < 2) {
    return <p className="intro-bio">{text}</p>;
  }
  return (
    <p className="intro-bio">
      <span>{parts[0]}</span>
      <strong>{strong}</strong>
      <span>{parts.slice(1).join(strong)}</span>
    </p>
  );
}

export function Hero({ ready, setReady }) {
  const site = useSite();
  const readyRef = useRef(ready);

  useEffect(() => {
    readyRef.current = ready;
    document.body.classList.toggle(
      "intro-locked",
      !ready && window.innerWidth > 900,
    );
    document.body.classList.toggle(
      "has-sidebar",
      ready && window.innerWidth > 900,
    );
  }, [ready]);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const mobile = window.innerWidth <= 900;
    if (reduced || mobile || readyRef.current) {
      setReady(true);
      document.body.classList.remove("intro-locked");
      if (mobile) {
        document.body.classList.remove("has-sidebar");
      } else {
        document.body.classList.add("has-sidebar");
      }
      if (reduced || mobile) return undefined;
    } else {
      document.body.classList.add("intro-locked");
    }

    let locked = false;
    let touchY = 0;

    const lockBriefly = (ms = 1100) => {
      locked = true;
      window.setTimeout(() => {
        locked = false;
      }, ms);
    };

    const getScrollTop = () => {
      const main = document.querySelector(".page-main");
      return main && document.body.classList.contains("has-sidebar")
        ? main.scrollTop
        : window.scrollY;
    };

    const onWheel = (event) => {
      if (locked) {
        if (!readyRef.current || getScrollTop() < 2) event.preventDefault();
        return;
      }

      const scrollingDown = event.deltaY > 8;
      const scrollingUp = event.deltaY < -8;
      if (!scrollingDown && !scrollingUp) return;

      if (!readyRef.current && scrollingDown) {
        event.preventDefault();
        setReady(true);
        lockBriefly(1100);
        return;
      }

      if (readyRef.current && scrollingUp && getScrollTop() < 2) {
        event.preventDefault();
        const main = document.querySelector(".page-main");
        if (main) main.scrollTop = 0;
        setReady(false);
        lockBriefly(700);
      }
    };

    const onTouchStart = (event) => {
      touchY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchEnd = (event) => {
      if (locked) return;
      const endY = event.changedTouches[0]?.clientY ?? touchY;
      const delta = touchY - endY;

      if (!readyRef.current && delta > 40) {
        setReady(true);
        lockBriefly();
      } else if (readyRef.current && delta < -40 && getScrollTop() < 2) {
        setReady(false);
        lockBriefly();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      document.body.classList.remove("intro-locked");
      document.body.classList.remove("has-sidebar");
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [setReady]);

  return (
    <section
      className={`hero-shell snap-section${ready ? " is-ready" : ""}`}
      aria-label={site.ui.hero}
      id="top"
    >
      {!ready && (
        <p className="scroll-hint" aria-hidden="true">
          {site.ui.scroll}
        </p>
      )}

      <div className="giant-name" aria-hidden="true">
        <span>{site.name}</span>
      </div>

      <div className="portrait" aria-hidden="true">
        <img src={`${import.meta.env.BASE_URL}portrait.png`} alt="" />
      </div>

      <IntroBio text={site.introBio} strong={site.introBioStrong} />
    </section>
  );
}
