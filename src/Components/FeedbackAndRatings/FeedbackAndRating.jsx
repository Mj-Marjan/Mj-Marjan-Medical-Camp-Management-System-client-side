import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const FeedbackAndRatings = () => {
  const { campId } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("https://medical-camp-server-liart.vercel.app/feedbacks")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data));
  }, [campId]);

  const displayedFeedbacks = showAll ? feedbacks : feedbacks.slice(0, 3);

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 text-white max-w-7xl mx-auto">
      <motion.h2
        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 drop-shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        💬 Feedback & Ratings
      </motion.h2>

      {feedbacks.length === 0 ? (
        <motion.p
          className="text-gray-300 text-center font-medium text-base sm:text-lg mt-6 sm:mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No feedbacks yet.
        </motion.p>
      ) : (
        <>
          {/* Grid Layout Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {displayedFeedbacks.map((fb, idx) => (
              <motion.div
                key={idx}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                {/* Name */}
                <h4 className="text-base sm:text-lg font-semibold text-indigo-300">
                  {fb.participantName}
                </h4>

                {/* Feedback text */}
                <p className="text-gray-200 mt-2 text-sm sm:text-base line-clamp-4">
                  {fb.text}
                </p>

                {/* Animated glowing stars */}
                <div className="flex items-center gap-1.5 sm:gap-2 mt-4 flex-wrap">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{
                        color:
                          i < fb.rating
                            ? ["#FACC15", "#FBBF24", "#F59E0B", "#FACC15"]
                            : "#6B7280",
                        scale: i < fb.rating ? [1, 1.3, 1] : 1,
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: i * 0.2,
                      }}
                      className="text-sm sm:text-base"
                    >
                      <FaStar />
                    </motion.span>
                  ))}
                  <span className="font-medium text-white text-xs sm:text-sm">
                    {fb.rating} / 5
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Show more button */}
          {feedbacks.length > 3 && (
            <div className="text-center mt-8 sm:mt-10">
              <motion.button
                onClick={() => setShowAll(!showAll)}
                whileHover={{ scale: 1.05 }}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm sm:text-base font-semibold shadow-md transition-all duration-300"
              >
                {showAll ? "Show Less" : "See More"}
              </motion.button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FeedbackAndRatings;
