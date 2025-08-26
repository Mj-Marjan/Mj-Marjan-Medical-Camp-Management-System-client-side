import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const FeedbackAndRatings = () => {
  const { campId } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('https://medical-camp-server-liart.vercel.app/feedbacks')
      .then((res) => res.json())
      .then((data) => setFeedbacks(data));
  }, [campId]);

  const displayedFeedbacks = showAll ? feedbacks : feedbacks.slice(0, 3);

  return (
    <div className="py-16 px-6  text-white">
      <motion.h2
        className="text-4xl font-bold text-center mb-12 drop-shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.6 }}
      >
        💬 Feedback & Ratings
      </motion.h2>

      {feedbacks.length === 0 ? (
        <motion.p
          className="text-gray-300 text-center font-medium text-lg mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // transition={{ delay: 0.3, duration: 0.6 }}
        >
          No feedbacks yet.
        </motion.p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedFeedbacks.map((fb, idx) => (
              <motion.div
                key={idx}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                // animate={{
                //   y: [0, -3, 0],
                //   boxShadow: [
                //     "0 10px 15px rgba(255,255,255,0.05)",
                //     "0 15px 25px rgba(255,255,255,0.1)",
                //     "0 10px 15px rgba(255,255,255,0.05)"
                //   ]
                // }}
                // transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <h4 className="text-lg font-semibold text-indigo-300">
                  {fb.participantName}
                </h4>
                <p className="text-gray-200 mt-2 text-sm line-clamp-4">
                  {fb.text}
                </p>

                {/* Animated glowing stars */}
                <div className="flex items-center gap-2 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{
                        color: i < fb.rating ? ["#FACC15", "#FBBF24", "#F59E0B", "#FACC15"] : "#6B7280",
                        scale: i < fb.rating ? [1, 1.3, 1] : 1
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: i * 0.2
                      }}
                    >
                      <FaStar />
                    </motion.span>
                  ))}
                  <span className="font-medium text-white text-sm">{fb.rating} / 5</span>
                </div>
              </motion.div>
            ))}
          </div>

          {feedbacks.length > 3 && (
            <div className="text-center mt-10">
              <motion.button
                onClick={() => setShowAll(!showAll)}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-md transition-all duration-300"
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
