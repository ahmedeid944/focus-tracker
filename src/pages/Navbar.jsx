import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/"); 
    } catch (err) {
      alert("Error logging out: " + err.message);
    }
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold text-blue-600">Focus Tracker</h1>

        {/* Links */}
        <div className="flex gap-6">
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/history"
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            History
          </Link>
          <Link
            to="/analytics"
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            Analytics
          </Link>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
