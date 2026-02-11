import { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "activities"), (snapshot) => {
      const activities = snapshot.docs.map((doc) => doc.data());
      const userActivities = activities.filter(
        (a) => a.user === auth.currentUser?.email
      );

      // ✅ نفس البيانات اللي دخلت من Dashboard
      const grouped = userActivities.reduce((acc, a) => {
        acc[a.category] = (acc[a.category] || 0) + parseInt(a.duration);
        return acc;
      }, {});

      setData(Object.entries(grouped).map(([category, duration]) => ({ category, duration })));
    });
    return () => unsubscribe();
  }, []);

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
  const totalDuration = data.reduce((sum, d) => sum + d.duration, 0);
  const goal = 300;
  const achievement = Math.min(100, Math.round((totalDuration / goal) * 100));

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Analytics Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Activity Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <h2 className="text-lg font-bold text-gray-700 mb-4">Activity</h2>
            <p className="text-2xl font-semibold text-blue-600">
              {data.length > 0 ? "Active Today" : "No Activity"}
            </p>
          </motion.div>

          {/* Productivity Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <h2 className="text-lg font-bold text-gray-700 mb-4">Productivity</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="duration" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Workload Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <h2 className="text-lg font-bold text-gray-700 mb-4">Workload</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="duration"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Goal Achievement Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <h2 className="text-lg font-bold text-gray-700 mb-4">Goal Achievement</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Achieved", value: achievement },
                    { name: "Remaining", value: 100 - achievement },
                  ]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#ef4444" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <p className="text-center mt-4 text-lg font-semibold text-green-600">
              {achievement}% of goal achieved
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
