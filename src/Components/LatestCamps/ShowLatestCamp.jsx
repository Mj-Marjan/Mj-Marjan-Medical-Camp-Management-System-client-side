import { motion } from "framer-motion";
import { Link } from "react-router";

const floatAnimation = {
  y: [0, -8, 0, 8, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const ShowLatestCamp = ({ camp }) => {
  const { _id, campName, image, campFees, dateTime, location } = camp || {};

  return (
    <motion.div
      className="relative bg-gradient-to-br from-[#1a1a2e]/90 via-[#16213e]/90 
                 to-[#0f3460]/90 backdrop-blur-md border border-white/10 
                 rounded-2xl shadow-lg overflow-hidden text-white 
                 p-4 sm:p-5 flex flex-col justify-between"
      animate={floatAnimation}
      whileHover={{ scale: 1.05, rotate: 0.5 }}
    >
      {/* Image */}
      <div className="overflow-hidden rounded-xl">
        <motion.img
          src={image}
          alt={campName}
          className="w-full h-32 sm:h-40 md:h-44 lg:h-48 object-cover rounded-xl shadow-md"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Content */}
      <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-2 flex-1">
        <h3 className="text-lg sm:text-xl font-bold text-indigo-300">{campName}</h3>
        <p className="text-xs sm:text-sm text-gray-300">📅 {dateTime}</p>
        <p className="text-xs sm:text-sm text-gray-300">📍 {location}</p>
        <p className="text-sm sm:text-base font-semibold text-green-300">
          💰 {campFees} BDT
        </p>
      </div>

      {/* Button */}
      <Link to={`/camps/${_id}`} className="mt-3 sm:mt-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="w-full py-2 sm:py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 
                     text-white rounded-lg font-semibold text-xs sm:text-sm md:text-base 
                     shadow-md hover:shadow-xl transition-all duration-300"
        >
          View Details
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default ShowLatestCamp;
