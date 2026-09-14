export const THEME_STORAGE_KEY = "portfolio-theme";

export const themes = [
  {
    id: "blue",
    label: "Blue",
    accent: "#3b82f6",
    accentSoft: "#93c5fd",
    glow: "rgb(59 130 246 / 0.35)",
  },
  {
    id: "teal",
    label: "Teal",
    accent: "#14b8a6",
    accentSoft: "#5eead4",
    glow: "rgb(20 184 166 / 0.35)",
  },
  {
    id: "emerald",
    label: "Emerald",
    accent: "#10b981",
    accentSoft: "#6ee7b7",
    glow: "rgb(16 185 129 / 0.35)",
  },
  {
    id: "amber",
    label: "Amber",
    accent: "#f59e0b",
    accentSoft: "#fcd34d",
    glow: "rgb(245 158 11 / 0.35)",
  },
  {
    id: "rose",
    label: "Rose",
    accent: "#f43f5e",
    accentSoft: "#fda4af",
    glow: "rgb(244 63 94 / 0.35)",
  },
  {
    id: "violet",
    label: "Violet",
    accent: "#8b5cf6",
    accentSoft: "#c4b5fd",
    glow: "rgb(139 92 246 / 0.35)",
  },
  {
    id: "slate",
    label: "Slate",
    accent: "#94a3b8",
    accentSoft: "#cbd5e1",
    glow: "rgb(148 163 184 / 0.35)",
  },
];

export function getStoredThemeId() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (themes.some((theme) => theme.id === saved)) return saved;
  } catch {
    /* ignore */
  }
  return "blue";
}

export function applyTheme(themeId) {
  const theme = themes.find((entry) => entry.id === themeId) || themes[0];
  const root = document.documentElement;
  root.setAttribute("data-theme", theme.id);
  root.style.setProperty("--color-accent", theme.accent);
  root.style.setProperty("--color-accent-soft", theme.accentSoft);
  root.style.setProperty("--color-accent-glow", theme.glow);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme.id);
  } catch {
    /* ignore */
  }
  return theme.id;
}
