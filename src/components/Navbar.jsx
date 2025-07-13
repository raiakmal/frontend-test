import { useState, useEffect, useRef } from "react";
import { getUser, logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import {
  getThemePreference,
  setThemePreference,
  applyTheme,
  initThemeWatcher,
} from "../utils/theme";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(getThemePreference());
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const themeDropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleThemeDropdown = () => {
    setThemeDropdownOpen((prev) => !prev);
  };

  const handleThemeChange = (themeValue) => {
    setTheme(themeValue);
    setThemePreference(themeValue);
    applyTheme(themeValue);
  };

  // Apply theme setiap theme berubah
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Inisialisasi watcher hanya sekali
  useEffect(() => {
    initThemeWatcher();
    // Sync theme jika preferensi berubah dari luar
    const syncTheme = () => setTheme(getThemePreference());
    window.addEventListener("storage", syncTheme);
    return () => window.removeEventListener("storage", syncTheme);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        themeDropdownRef.current &&
        !themeDropdownRef.current.contains(event.target)
      ) {
        setThemeDropdownOpen(false);
      }
    }
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

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 dark:from-gray-900 dark:via-blue-900 dark:to-gray-800 text-white dark:text-gray-100 px-4 py-3 shadow-lg transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold drop-shadow-lg">
            Aksamedia App
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Theme Dropdown */}
          <div className="relative" ref={themeDropdownRef}>
            <button
              onClick={toggleThemeDropdown}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-700 dark:bg-gray-800 hover:bg-blue-800 dark:hover:bg-gray-700 transition-colors focus:outline-none shadow-lg"
              aria-label="Theme"
            >
              {theme === "dark" ? "🌙" : theme === "light" ? "☀️" : "🌓"}
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
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 text-black dark:text-gray-100 rounded-xl shadow-xl z-50 animate-fade-in">
                <ul>
                  <li>
                    <button
                      onClick={() => {
                        handleThemeChange("light");
                        setThemeDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 rounded transition"
                    >
                      ☀️ Light
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleThemeChange("dark");
                        setThemeDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 rounded transition"
                    >
                      🌙 Dark
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleThemeChange("system");
                        setThemeDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 rounded transition"
                    >
                      🌓 System
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-700 dark:bg-gray-800 hover:bg-blue-800 dark:hover:bg-gray-700 transition-colors focus:outline-none shadow-lg"
              aria-label="User menu"
            >
              <span className="font-semibold">{user?.name || "User"}</span>
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
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl z-50 animate-fade-in">
                <ul className="text-black dark:text-gray-100">
                  <li>
                    <button
                      onClick={() => {
                        navigate("/edit-profile");
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 rounded transition"
                    >
                      ✏️ Edit Data Saya
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400 rounded transition"
                    >
                      🚪 Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Animasi fade-in */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.2s ease;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </nav>
  );
}