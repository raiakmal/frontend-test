const THEME_KEY = "theme-preference";

export function getThemePreference() {
  if (typeof window === "undefined") return "system";
  return localStorage.getItem(THEME_KEY) || "system";
}

export function setThemePreference(pref) {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_KEY, pref);
  applyTheme(pref);
}

export function applyTheme(pref) {
  if (typeof window === "undefined") return;

  const root = document.documentElement;
  if (pref === "dark") {
    root.classList.add("dark");
  } else if (pref === "light") {
    root.classList.remove("dark");
  } else {
    // system
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", isDark);
  }
}