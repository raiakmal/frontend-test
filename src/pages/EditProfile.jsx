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
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-xl mx-auto p-6 mt-6 bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Edit Profil Saya</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-1">Nama Lengkap</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}