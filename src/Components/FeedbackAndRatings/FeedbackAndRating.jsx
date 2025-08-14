import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const FeedbackAndRatings = () => {
  const { campId } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);
  const [showAll, setShowAll] = useState(false); // 🔥 new

  useEffect(() => {
    fetch('https://medical-camp-server-liart.vercel.app/feedbacks')
      .then((res) => res.json())
      .then((data) => setFeedbacks(data));
  }, [campId]);

  const displayedFeedbacks = showAll ? feedbacks : feedbacks.slice(0, 3);

  return (
    <div className="m-10 max-w-6xl mx-auto px-4">
      <motion.h2
        className="text-3xl font-bold text-center mb-6 text-indigo-700"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        💬 Feedback and Ratings
      </motion.h2>

      {feedbacks.length === 0 ? (
        <motion.p
          className="text-gray-500 text-center font-bold p-10 mt-10 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          No feedbacks yet.
        </motion.p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedFeedbacks.map((fb, idx) => (
              <motion.div
                key={idx}
                className="bg-white border border-gray-200 shadow-md p-4 rounded-xl hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-lg font-semibold text-purple-700">
                  {fb.participantName}
                </h4>
                <p className="text-gray-600 mt-1">{fb.text}</p>
                <div className="flex items-center gap-2 mt-3 text-yellow-500">
                  <FaStar />
                  <span className="font-medium text-sm">{fb.rating} / 5</span>
                </div>
              </motion.div>
            ))}
          </div>

          {!showAll && feedbacks.length > 3 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(true)}
                className="btn btn-outline btn-primary"
              >
                See More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FeedbackAndRatings;
