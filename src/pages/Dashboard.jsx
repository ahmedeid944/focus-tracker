import { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebase";
import { collection, addDoc, onSnapshot, Timestamp, deleteDoc, doc } from "firebase/firestore";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("Work");
  const [date, setDate] = useState(""); // ✅ حقل التاريخ
  const [activities, setActivities] = useState([]);

  const addActivity = async () => {
    if (!activity || !duration || !date) return alert("Please fill in all fields");
    try {
      await addDoc(collection(db, "activities"), {
        activity,
        duration: parseInt(duration),
        category,
        date, // ✅ نخزن التاريخ اللي المستخدم اختاره
        createdAt: Timestamp.now(),
        user: auth.currentUser?.email,
      });
      setActivity("");
      setDuration("");
      setCategory("Work");
      setDate("");
    } catch (err) {
      alert("Error adding activity: " + err.message);
    }
  };

  const deleteActivity = async (id) => {
    try {
      await deleteDoc(doc(db, "activities", id));
    } catch (err) {
      alert("Error deleting activity: " + err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "activities"), (snapshot) => {
      const acts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setActivities(acts.filter((a) => a.user === auth.currentUser?.email));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Dashboard</h1>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-lg rounded-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              placeholder="Activity"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Duration (mins)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option>Work</option>
              <option>Study</option>
              <option>Exercise</option>
              <option>Break</option>
            </select>
            {/* ✅ Date Picker */}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={addActivity}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Activity
          </button>
        </motion.div>

        {/* Activities List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col hover:scale-105 transition"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">
                  {a.activity} ({a.duration} mins) - {a.category}
                </span>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  onClick={() => deleteActivity(a.id)}
                >
                  Delete
                </button>
              </div>
              <p className="text-sm text-gray-500">📅 {a.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
