import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getUser, updateCurrentUser } from "../utils/auth";

export default function EditProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const user = getUser();
    if (user) {
      setName(user.name);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCurrentUser({ name });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <div className="p-4 sm:p-8 max-w-xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-6 sm:p-8 transition-all duration-300">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 tracking-tight">
            Edit Profil Saya
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                Nama Lengkap
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Simpan
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-5 py-2.5 rounded-lg shadow-md font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
