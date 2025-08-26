import { motion } from "framer-motion";
import { Link } from "react-router";

const floatAnimation = {
  y: [0, -8, 0, 8, 0], // উপরে-নিচে যাবে
  transition: {
    duration: 6, // কত সময় নেবে একবার
    repeat: Infinity, // অনন্ত লুপ
    ease: "easeInOut",
  },
};

const ShowLatestCamp = ({ camp }) => {
  const { _id, campName, image, campFees, dateTime, location } = camp || {};

  return (
    <motion.div
      className="relative bg-gradient-to-br from-[#1a1a2e]/90 via-[#16213e]/90 to-[#0f3460]/90 
                 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl 
                 overflow-hidden text-white p-5 flex flex-col justify-between"
      animate={floatAnimation}
      whileHover={{ scale: 1.05, rotate: 0.5 }}
    >
      {/* Image */}
      <div className="overflow-hidden rounded-2xl">
        <motion.img
          src={image}
          alt={campName}
          className="w-full h-40 object-cover rounded-2xl shadow-md"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2 flex-1">
        <h3 className="text-xl font-bold text-indigo-300">{campName}</h3>
        <p className="text-sm text-gray-300">📅 {dateTime}</p>
        <p className="text-sm text-gray-300">📍 {location}</p>
        <p className="text-sm font-semibold text-green-300">💰 {campFees} BDT</p>
      </div>

      {/* Button */}
      <Link to={`/camps/${_id}`} className="mt-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 
                     text-white rounded-lg font-semibold text-sm shadow-md 
                     hover:shadow-xl transition-all duration-300"
        >
          View Details
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default ShowLatestCamp;
