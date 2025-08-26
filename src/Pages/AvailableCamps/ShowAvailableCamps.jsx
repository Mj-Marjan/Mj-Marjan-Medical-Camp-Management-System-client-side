import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { CalendarIcon, MapPinIcon } from 'lucide-react';

const ShowAvailableCamps = ({ camp }) => {
  return (
    <motion.div
      key={camp._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden cursor-pointer relative hover:shadow-2xl hover:scale-105 transition-all duration-300"
    >
      <div className="relative group">
        <img
          src={camp?.image}
          alt={camp?.campName}
          className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-3">
          <h3 className="text-white font-bold text-lg truncate">{camp.campName}</h3>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <p className="flex items-center gap-2 text-white/80">
          <CalendarIcon className="w-4 h-4 text-purple-400" /> {camp.dateTime}
        </p>
        <p className="flex items-center gap-2 text-white/80">
          <MapPinIcon className="w-4 h-4 text-red-400" /> {camp.location}
        </p>

        <Link to={`/camps/${camp._id}`}>
          <button className="mt-3 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 font-medium">
            View Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ShowAvailableCamps;
