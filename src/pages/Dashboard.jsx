import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/UserTable";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 tracking-tight">
            Dashboard
          </h2>

          <button
            onClick={() => navigate("/users/add")}
            className="mb-6 flex items-center gap-2 bg-green-600 hover:bg-green-700 focus:bg-green-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-150 font-semibold focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            + Tambah User Baru
          </button>

          <UserTable />
        </div>
      </div>
    </div>
  );
}
