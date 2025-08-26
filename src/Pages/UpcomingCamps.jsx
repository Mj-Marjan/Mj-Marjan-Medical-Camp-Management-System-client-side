import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const UpcomingCamps = () => {
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    fetch("https://medical-camp-server-liart.vercel.app/camps")
      .then((res) => res.json())
      .then((data) => {
        const upcoming = data
          .filter(c => new Date(c.dateTime) >= new Date())
          .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
        setCamps(upcoming.slice(0, 6)); // top 6 upcoming camps
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="py-16 px-6  text-white">
      <h2 className="text-4xl font-extrabold text-center mb-12 drop-shadow-lg">
        📅 Upcoming Medical Camps
      </h2>

      {camps.length === 0 ? (
        <p className="text-center text-gray-300">No upcoming camps.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {camps.map((camp, idx) => (
            <motion.div
              key={camp._id}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <h3 className="text-xl font-bold text-indigo-300">{camp.campName}</h3>
              <p className="text-gray-200 mt-2 text-sm">📍 {camp.location}</p>
              <p className="text-gray-200 text-sm">📅 {new Date(camp.dateTime).toLocaleDateString()}</p>
              <p className="text-green-300 font-semibold mt-2">💰 {camp.campFees} BDT</p>
              <Link to={`/camps/${camp._id}`} className="mt-4 inline-block w-full">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-xl transition-all duration-300"
                >
                  View Details
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingCamps;
