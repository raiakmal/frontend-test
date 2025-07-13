import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/UserTable";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

        <button
          onClick={() => navigate("/users/add")}
          className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Tambah User Baru
        </button>

        <UserTable />
      </div>
    </div>
  );
}