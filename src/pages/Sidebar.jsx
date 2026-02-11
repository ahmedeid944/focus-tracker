import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Menu</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        </li>
        <li>
          <Link to="/history" className="hover:text-blue-400">History</Link>
        </li>
        <li>
          <Link to="/analytics" className="hover:text-blue-400">Analytics</Link>
        </li>
      </ul>
    </aside>
  );
}
