import { useEffect, useRef, useState } from "react";
import { Hero } from "./components/Hero.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { MobileTopBar } from "./components/MobileTopBar.jsx";
import { CornerControls } from "./components/CornerControls.jsx";
import { Technologies } from "./components/Technologies.jsx";
import { SelectedWork } from "./components/SelectedWork.jsx";
import { Experience } from "./components/Experience.jsx";
import { Contact } from "./components/Contact.jsx";
import {
  FlashmedCaseStudy,
  isFlashmedCaseStudyHash,
} from "./components/FlashmedCaseStudy.jsx";
import {
  animateScroll,
  getNearestSectionIndex,
  getSectionElements,
  NAV_BY_SECTION,
} from "./lib/smoothScroll.js";
import { flyPortraitToSidebar, resetPortraitFlight } from "./lib/portraitFlight.js";

const SECTION_MAP = {
  technology: "skills",
  project: "selected-work",
  certification: "experience",
  contact: "contact",
};

export default function App() {
  const [ready, setReady] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 900 : false,
  );
  const [active, setActive] = useState("project");
  const [caseStudy, setCaseStudy] = useState(() =>
    isFlashmedCaseStudyHash(),
  );
  const mainRef = useRef(null);
  const animatingRef = useRef(false);
  const pagingArmedRef = useRef(false);
  const pendingSectionRef = useRef(null);

  useEffect(() => {
    const syncHash = () => {
      setCaseStudy(isFlashmedCaseStudyHash());
    };
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    if (caseStudy) {
      document.body.classList.add("is-case-study");
      document.body.classList.remove("intro-locked", "has-sidebar");
      return () => {
        document.body.classList.remove("is-case-study");
      };
    }

    if (ready && window.innerWidth > 900) {
      document.body.classList.remove("intro-locked");
      document.body.classList.add("has-sidebar");
    } else if (window.innerWidth <= 900) {
      document.body.classList.remove("has-sidebar", "intro-locked");
    }

    return undefined;
  }, [caseStudy, ready]);

  const closeCaseStudy = () => {
    pendingSectionRef.current = "selected-work";
    setReady(true);
    setActive("project");
    window.location.hash = "selected-work";
  };

  useEffect(() => {
    if (caseStudy) return undefined;
    if (!ready) {
      resetPortraitFlight();
      document.querySelector(".hero-shell")?.classList.remove("is-collapsed");
      pagingArmedRef.current = false;
      return undefined;
    }

    const backToWork = pendingSectionRef.current === "selected-work";
    const main = mainRef.current;

    setActive("project");
    pagingArmedRef.current = false;

    const armTimer = window.setTimeout(() => {
      pagingArmedRef.current = true;
    }, 1100);

    // Capture portrait rect first, then collapse the empty career hero.
    const cleanupFlight = backToWork ? undefined : flyPortraitToSidebar();
    document.querySelector(".hero-shell")?.classList.add("is-collapsed");
    if (main) main.scrollTop = 0;
    pendingSectionRef.current = null;

    return () => {
      window.clearTimeout(armTimer);
      cleanupFlight?.();
    };
  }, [ready, caseStudy]);

  const scrollToSectionId = async (id) => {
    const main = mainRef.current;
    const el = document.getElementById(id);
    if (!main || !el) return;

    if (
      window.innerWidth <= 900 ||
      !document.body.classList.contains("has-sidebar")
    ) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    animatingRef.current = true;
    await animateScroll(main, el.offsetTop, 1000);
    animatingRef.current = false;
  };

  const onNav = (id) => {
    setActive(id);
    if (!ready) setReady(true);
    const targetId = SECTION_MAP[id] || "top";
    requestAnimationFrame(() => {
      scrollToSectionId(targetId);
    });
  };

  useEffect(() => {
    if (caseStudy) return undefined;
    if (!ready) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    if (window.innerWidth <= 900) return undefined;

    const main = mainRef.current;
    if (!main) return undefined;

    let touchY = 0;

    const go = async (direction) => {
      if (animatingRef.current) return;
      if (!pagingArmedRef.current) return;

      const sections = getSectionElements(main);
      if (!sections.length) return;

      const current = getNearestSectionIndex(main, sections);
      const next = current + direction;

      if (next < 0) {
        main.scrollTop = 0;
        setReady(false);
        return;
      }
      if (next >= sections.length) return;

      animatingRef.current = true;
      const target = sections[next];
      await animateScroll(main, target.offsetTop, 1000);
      const navId = NAV_BY_SECTION[target.id];
      if (navId) setActive(navId);
      animatingRef.current = false;
    };

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) < 6) return;
      event.preventDefault();
      if (!pagingArmedRef.current) return;
      go(event.deltaY > 0 ? 1 : -1);
    };

    const onTouchStart = (event) => {
      touchY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchEnd = (event) => {
      const endY = event.changedTouches[0]?.clientY ?? touchY;
      const delta = touchY - endY;
      if (Math.abs(delta) < 50) return;
      go(delta > 0 ? 1 : -1);
    };

    const onKey = (event) => {
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        go(1);
      }
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        go(-1);
      }
    };

    main.addEventListener("wheel", onWheel, { passive: false });
    main.addEventListener("touchstart", onTouchStart, { passive: true });
    main.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      main.removeEventListener("wheel", onWheel);
      main.removeEventListener("touchstart", onTouchStart);
      main.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [ready, caseStudy]);

  if (caseStudy) {
    return <FlashmedCaseStudy onBack={closeCaseStudy} />;
  }

  return (
    <div className={`page${ready ? " is-ready" : ""}`}>
      <Sidebar active={active} onNav={onNav} visible={ready} />
      <MobileTopBar active={active} onNav={onNav} />
      <CornerControls />
      <div className="page-main" ref={mainRef}>
        <Hero ready={ready} setReady={setReady} />
        <SelectedWork />
        <Experience />
        <Technologies />
        <Contact />
      </div>
    </div>
  );
}
