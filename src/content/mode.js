export const MODE_STORAGE_KEY = "portfolio-mode";

export const modes = [
  { id: "dark", label: "Dark" },
  { id: "light", label: "Light" },
];

export function getStoredModeId() {
  try {
    const saved = localStorage.getItem(MODE_STORAGE_KEY);
    if (modes.some((mode) => mode.id === saved)) return saved;
  } catch {
    /* ignore */
  }
  return "dark";
}

export function applyMode(modeId) {
  const mode = modes.find((entry) => entry.id === modeId) || modes[0];
  const root = document.documentElement;
  root.setAttribute("data-mode", mode.id);
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.setAttribute(
      "content",
      mode.id === "light" ? "#ececef" : "#000000",
    );
  }
  try {
    localStorage.setItem(MODE_STORAGE_KEY, mode.id);
  } catch {
    /* ignore */
  }
  return mode.id;
}
