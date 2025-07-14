import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import UserForm from "./pages/UserForm";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/add"
          element={
            <ProtectedRoute>
              <UserForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/edit/:id"
          element={
            <ProtectedRoute>
              <UserForm />
            </ProtectedRoute>
          }
        />

        {/* Catch-all (Fallback ke NotFound) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}