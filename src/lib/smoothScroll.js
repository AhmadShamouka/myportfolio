const SECTION_IDS = [
  "selected-work",
  "experience",
  "skills",
  "contact",
];

const NAV_BY_SECTION = {
  "selected-work": "project",
  experience: "certification",
  skills: "technology",
  contact: "contact",
};

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

export function animateScroll(container, to, duration = 950) {
  return new Promise((resolve) => {
    const from = container.scrollTop;
    const change = to - from;
    if (Math.abs(change) < 2) {
      container.scrollTop = to;
      resolve();
      return;
    }

    const start = performance.now();

    const frame = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      container.scrollTop = from + change * easeInOutCubic(progress);
      if (progress < 1) requestAnimationFrame(frame);
      else resolve();
    };

    requestAnimationFrame(frame);
  });
}

export function getSectionElements(container) {
  return SECTION_IDS.map((id) => container.querySelector(`#${id}`)).filter(Boolean);
}

export function getNearestSectionIndex(container, sections) {
  const top = container.scrollTop;
  let best = 0;
  let bestDist = Infinity;
  sections.forEach((section, index) => {
    const dist = Math.abs(section.offsetTop - top);
    if (dist < bestDist) {
      bestDist = dist;
      best = index;
    }
  });
  return best;
}

export { SECTION_IDS, NAV_BY_SECTION };
