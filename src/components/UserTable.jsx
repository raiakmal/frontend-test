import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUsers, deleteUser } from "../utils/crud";

const PER_PAGE = 3;

export default function UserTable() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const keyword = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    const data = getUsers().filter((u) =>
      u.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setUsers(data);
  }, [keyword]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    deleteUser(deleteId);
    setUsers(users.filter((u) => u.id !== deleteId));
    setShowConfirm(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
  };

  const paginated = users.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(users.length / PER_PAGE);

  const goToPage = (p) => {
    setSearchParams({ q: keyword, page: p });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg transition-all duration-300">
      {/* Modal Konfirmasi */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-sm mx-auto transition-all">
            <h3 className="text-lg font-bold mb-3 text-gray-800 dark:text-gray-100">Konfirmasi Hapus</h3>
            <p className="mb-6 text-gray-600 dark:text-gray-300">Apakah Anda yakin ingin menghapus user ini?</p>
            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Hapus
              </button>
              <button
                onClick={cancelDelete}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-lg shadow font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ...existing code... */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <div className="relative w-full max-w-sm">
          <span className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Cari nama..."
            value={keyword}
            onChange={(e) => setSearchParams({ q: e.target.value, page: 1 })}
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg w-full bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-100">Nama</th>
              <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-100">Email</th>
              <th className="p-3 text-center font-semibold text-gray-700 dark:text-gray-100">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((user, idx) => (
              <tr
                key={user.id}
                className={`border-t border-gray-200 dark:border-gray-700 ${
                  idx % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"
                } hover:bg-blue-50 dark:hover:bg-blue-900 transition`}
              >
                <td className="p-3 text-gray-700 dark:text-gray-100">{user.name}</td>
                <td className="p-3 text-gray-700 dark:text-gray-100">{user.email}</td>
                <td className="p-3 text-center flex justify-center gap-2">
                  <button
                    onClick={() => navigate(`/users/edit/${user.id}`)}
                    className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium shadow transition"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 dark:text-gray-400 py-6">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-lg font-semibold transition shadow ${
              i + 1 === page
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-blue-900"
            }`}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}