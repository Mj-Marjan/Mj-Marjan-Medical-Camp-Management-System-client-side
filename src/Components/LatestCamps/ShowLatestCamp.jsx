import { motion } from "framer-motion";
import { Link } from "react-router";

const ShowLatestCamp = ({ camp }) => {
  const {
    _id,
    campName,
    image,
    campFees,
    dateTime,
    location,
    healthcareProfessional,
    participantCount,
  } = camp || {};

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="overflow-hidden">
        <motion.img
          src={image}
          alt={campName}
          className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-5 space-y-2">
        <h3 className="text-xl font-semibold text-indigo-700">{campName}</h3>
        <p><strong>📅 Date:</strong> {dateTime}</p>
        <p><strong>📍 Location:</strong> {location}</p>
        <p><strong>👨‍⚕️ Doctor:</strong> {healthcareProfessional}</p>
        <p><strong>👥 Participants:</strong> {participantCount}</p>
        <p><strong>💰 Fees:</strong> {campFees} BDT</p>

        <Link to={`/camps/${_id}`}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="mt-3 btn btn-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-all"
          >
            View Details
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ShowLatestCamp;
