import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUsers, deleteUser } from "../utils/crud";

const PER_PAGE = 3;

export default function UserTable() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState([]);

  const keyword = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    const data = getUsers().filter((u) =>
      u.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setUsers(data);
  }, [keyword]);

  const handleDelete = (id) => {
    deleteUser(id);
    setUsers(users.filter((u) => u.id !== id));
  };

  const paginated = users.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(users.length / PER_PAGE);

  const goToPage = (p) => {
    setSearchParams({ q: keyword, page: p });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between mb-3">
        <input
          type="text"
          placeholder="Cari nama..."
          value={keyword}
          onChange={(e) => setSearchParams({ q: e.target.value, page: 1 })}
          className="border p-2 rounded w-full max-w-sm"
        />
      </div>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">Nama</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2 text-center">
                <button
                  onClick={() => navigate(`/users/edit/${user.id}`)}
                  className="text-blue-600 underline mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 underline"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
          {paginated.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center text-gray-500 py-4">
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              i + 1 === page ? "bg-blue-600 text-white" : "bg-gray-200"
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
