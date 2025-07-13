import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addUser,
  getUserById,
  updateUser
} from "../utils/crud";
import Navbar from "../components/Navbar";

export default function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    if (isEdit) {
      const user = getUserById(Number(id));
      if (user) {
        setForm({
          name: user.name,
          email: user.email
        });
      }
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      updateUser(Number(id), form);
    } else {
      addUser(form);
    }

    navigate("/users");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto p-6 bg-white shadow mt-8 rounded">
        <h2 className="text-2xl font-semibold mb-4">
          {isEdit ? "Edit Pengguna" : "Tambah Pengguna"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Nama</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {isEdit ? "Update" : "Tambah"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/users")}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
