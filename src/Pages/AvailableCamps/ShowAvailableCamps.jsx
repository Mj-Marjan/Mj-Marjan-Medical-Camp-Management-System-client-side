import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { CalendarIcon, MapPinIcon, UserIcon, DollarSignIcon, InfoIcon } from 'lucide-react';

const ShowAvailableCamps = ({ camp }) => {
  return (
    <motion.div
      key={camp._id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200"
    >
      <img
        src={camp?.image}
        alt={camp?.campName}
        className="w-full h-52 object-cover rounded-t-2xl"
      />
      <div className="p-5 space-y-2">
        <h3 className="text-2xl font-bold text-indigo-700 mb-2">
          {camp.campName}
        </h3>

        <p className="flex items-center gap-2 text-gray-700">
          <CalendarIcon className="w-4 h-4 text-purple-500" />
          <span><strong>Date & Time:</strong> {camp.dateTime}</span>
        </p>

        <p className="flex items-center gap-2 text-gray-700">
          <MapPinIcon className="w-4 h-4 text-red-500" />
          <span><strong>Location:</strong> {camp.location}</span>
        </p>

        <p className="flex items-center gap-2 text-gray-700">
          <UserIcon className="w-4 h-4 text-blue-500" />
          <span><strong>Doctor:</strong> {camp.healthcareProfessional}</span>
        </p>

        <p className="flex items-center gap-2 text-gray-700">
          <DollarSignIcon className="w-4 h-4 text-green-500" />
          <span><strong>Fees:</strong> {camp.fees} BDT</span>
        </p>

        <p className="flex items-center gap-2 text-gray-700">
          <UserIcon className="w-4 h-4 text-orange-500" />
          <span><strong>Participants:</strong> {camp.participantCount}</span>
        </p>

        <p className="text-sm text-gray-600">
          <InfoIcon className="inline w-4 h-4 mr-1 text-indigo-400" /> {camp.description}
        </p>

        <Link to={`/camps/${camp._id}`}>
          <button className="mt-4 w-full btn btn-md bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg">
            View Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ShowAvailableCamps;
