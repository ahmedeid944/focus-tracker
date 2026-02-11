import { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

export default function History() {
  const [activities, setActivities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); 

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "activities"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const userActs = data.filter((a) => a.user === auth.currentUser?.email);

      
      userActs.sort((a, b) => new Date(a.date) - new Date(b.date));
      setActivities(userActs);
    });
    return () => unsubscribe();
  }, []);

  const deleteActivity = async (id) => {
    try {
      await deleteDoc(doc(db, "activities", id));
    } catch (err) {
      alert("Error deleting activity: " + err.message);
    }
  };

  
  const filteredActivities = selectedDate
    ? activities.filter((a) => a.date === selectedDate)
    : activities;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">History</h1>

        {/* Date Filter */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">Filter by Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Activities List */}
        <div className="space-y-6">
          {filteredActivities.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-gray-700">
                  {a.activity} ({a.duration} mins) - {a.category}
                </p>
                <p className="text-sm text-gray-500">📅 {a.date}</p>
              </div>
              <button
                onClick={() => deleteActivity(a.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
