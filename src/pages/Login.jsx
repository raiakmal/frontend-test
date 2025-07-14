import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, isAuthenticated } from "../utils/auth";
import Navbar from "../components/Navbar";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(form);
    if (res.success) {
      navigate("/dashboard");
    } else {
      setError(res.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100 tracking-tight">
            Login
          </h2>
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={form.username}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
