const THEME_KEY = "theme-preference";

export function getThemePreference() {
  return localStorage.getItem(THEME_KEY) || "system";
}

export function applyTheme(pref) {
  const root = document.documentElement;
  root.classList.remove("dark"); // Reset class dulu

  if (pref === "dark") {
    root.classList.add("dark");
  } else if (pref === "system") {
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (systemDark) root.classList.add("dark");
  }

  localStorage.setItem(THEME_KEY, pref);
}

export function initThemeWatcher() {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", () => {
    const pref = getThemePreference();
    if (pref === "system") applyTheme("system");
  });
}