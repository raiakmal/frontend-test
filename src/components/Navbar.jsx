import { useState, useEffect, useRef } from "react";
import { getUser, logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import {
  getThemePreference,
  setThemePreference,
  applyTheme,
} from "../utils/theme";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [theme, setTheme] = useState("system");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const themeDropdownRef = useRef(null);

  useEffect(() => {
    try {
      const savedTheme = getThemePreference();
      setTheme(savedTheme);
      applyTheme(savedTheme);
      setUser(getUser());
    } catch (err) {
      console.error("Navbar init error:", err);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      if (theme === "system") applyTheme("system");
    };
    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setDropdownOpen(false);
      if (!themeDropdownRef.current?.contains(e.target))
        setThemeDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleUserUpdate = () => {
      setUser(getUser());
    };
    window.addEventListener("user-updated", handleUserUpdate);
    return () => window.removeEventListener("user-updated", handleUserUpdate);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setThemePreference(newTheme);
  };

  const themeIcon = {
    light: "☀️",
    dark: "🌙",
    system: "💻",
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 dark:from-gray-900 dark:via-blue-900 dark:to-gray-800 text-white dark:text-gray-100 px-4 py-3 shadow-lg transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-extrabold drop-shadow-lg tracking-tight mb-2 sm:mb-0">
          Aksamedia Test
        </h1>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Theme Dropdown */}
          <div className="relative" ref={themeDropdownRef}>
            <button
              onClick={() => setThemeDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-700 dark:bg-gray-800 hover:bg-blue-800 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-900 shadow-lg transition-all duration-150"
              aria-label="Theme"
              aria-haspopup="true"
              aria-expanded={themeDropdownOpen}
            >
              <span className="text-lg">{themeIcon[theme]}</span>
              <svg
                className={`w-4 h-4 ml-1 transition-transform ${
                  themeDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {themeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-black dark:text-gray-100 rounded-xl shadow-2xl z-50 animate-fade-in">
                <ul>
                  {["light", "dark", "system"].map((mode) => (
                    <li key={mode}>
                      <button
                        onClick={() => {
                          handleThemeChange(mode);
                          setThemeDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition ${
                          theme === mode
                            ? "font-semibold bg-blue-50 dark:bg-gray-800"
                            : ""
                        }`}
                      >
                        <span className="mr-2">{themeIcon[mode]}</span>
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Conditional user / login */}
          {user?.isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-700 dark:bg-gray-800 hover:bg-blue-800 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-900 shadow-lg transition-all duration-150"
                aria-label="User menu"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <span className="font-semibold truncate max-w-[100px]">
                  {user.name}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 animate-fade-in">
                  <ul className="text-black dark:text-gray-100">
                    <li>
                      <button
                        onClick={() => {
                          navigate("/edit-profile");
                          setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition"
                      >
                        ✏️ Edit Data Saya
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400 transition"
                      >
                        🚪 Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 dark:bg-gray-800 dark:hover:bg-gray-700 text-white font-semibold shadow transition focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          )}
        </div>
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.25s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}
