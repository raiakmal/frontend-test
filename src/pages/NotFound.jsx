import { Link } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export default function NotFound() {
  const isLoggedIn = isAuthenticated();
  const redirectPath = isLoggedIn ? "/dashboard" : "/login";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400">404</h1>
        <p className="mt-4 text-2xl text-gray-800 dark:text-gray-100 font-semibold">
          Halaman tidak ditemukan
        </p>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Maaf, halaman yang kamu cari tidak tersedia.
        </p>
        <Link
          to={redirectPath}
          className="inline-block mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
        >
          {isLoggedIn ? "Kembali ke Dashboard" : "Kembali ke Login"}
        </Link>
      </div>
    </div>
  );
}