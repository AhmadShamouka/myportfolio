const FLY_MS = 900;

function clearFlyers() {
  document.querySelectorAll(".portrait-flyer").forEach((node) => node.remove());
}

/**
 * Animates the intro portrait into the sidebar profile photo slot.
 */
export function flyPortraitToSidebar() {
  clearFlyers();

  if (window.innerWidth <= 900) {
    document.body.classList.add("portrait-landed");
    return () => {};
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.body.classList.add("portrait-landed");
    return () => {};
  }

  const from = document.querySelector(".portrait img");
  const slot = document.querySelector("#side-photo-slot");
  const to = slot?.querySelector("img");
  if (!from || !slot || !to) {
    document.body.classList.add("portrait-landed");
    return () => {};
  }

  document.body.classList.remove("portrait-landed");

  const fromRect = from.getBoundingClientRect();

  // Wait a frame so the sidebar has started opening and we can read the target box
  let cancelled = false;
  let flyer = null;
  let timer = 0;

  const start = () => {
    if (cancelled) return;

    const toRect = to.getBoundingClientRect();
    // If sidebar hasn't measured yet, retry shortly
    if (toRect.width < 8 || toRect.height < 8) {
      timer = window.setTimeout(start, 40);
      return;
    }

    flyer = from.cloneNode(true);
    flyer.className = "portrait-flyer";
    flyer.setAttribute("aria-hidden", "true");
    Object.assign(flyer.style, {
      position: "fixed",
      left: `${fromRect.left}px`,
      top: `${fromRect.top}px`,
      width: `${fromRect.width}px`,
      height: `${fromRect.height}px`,
      margin: "0",
      zIndex: "120",
      pointerEvents: "none",
      objectFit: "cover",
      objectPosition: "center top",
      borderRadius: getComputedStyle(from).borderRadius || "0px",
      filter: "drop-shadow(0 24px 48px rgb(0 0 0 / 0.45))",
      transition: `left ${FLY_MS}ms cubic-bezier(0.22, 1, 0.36, 1), top ${FLY_MS}ms cubic-bezier(0.22, 1, 0.36, 1), width ${FLY_MS}ms cubic-bezier(0.22, 1, 0.36, 1), height ${FLY_MS}ms cubic-bezier(0.22, 1, 0.36, 1), border-radius ${FLY_MS}ms cubic-bezier(0.22, 1, 0.36, 1), filter ${FLY_MS}ms ease`,
    });
    document.body.appendChild(flyer);

    requestAnimationFrame(() => {
      if (cancelled || !flyer) return;
      const target = to.getBoundingClientRect();
      flyer.style.left = `${target.left}px`;
      flyer.style.top = `${target.top}px`;
      flyer.style.width = `${target.width}px`;
      flyer.style.height = `${target.height}px`;
      flyer.style.borderRadius = getComputedStyle(slot).borderRadius || "12px";
      flyer.style.filter = "none";
      flyer.style.objectFit = "cover";
    });

    timer = window.setTimeout(() => {
      if (cancelled) return;
      document.body.classList.add("portrait-landed");
      flyer?.remove();
      flyer = null;
    }, FLY_MS + 40);
  };

  // Let the sidebar card slide most of the way in before measuring the target
  timer = window.setTimeout(start, 280);

  return () => {
    cancelled = true;
    window.clearTimeout(timer);
    flyer?.remove();
    clearFlyers();
  };
}

export function resetPortraitFlight() {
  clearFlyers();
  document.body.classList.remove("portrait-landed");
  document.querySelector(".hero-shell")?.classList.remove("is-collapsed");
}
