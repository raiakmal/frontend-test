import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addUser, getUserById, updateUser } from "../utils/crud";
import Navbar from "../components/Navbar";

export default function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (isEdit) {
      const user = getUserById(Number(id));
      if (user) {
        setForm({
          name: user.name,
          email: user.email,
        });
      }
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      updateUser(Number(id), form);
    } else {
      addUser(form);
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <div className="p-4 sm:p-8 max-w-xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-6 sm:p-8 transition-all duration-300">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 tracking-tight">
            {isEdit ? "Edit Pengguna" : "Tambah Pengguna"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                Nama
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {isEdit ? "Update" : "Tambah"}
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
