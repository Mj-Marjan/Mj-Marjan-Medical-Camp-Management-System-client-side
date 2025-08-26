import React from "react";
import { motion } from "framer-motion";

const UiBanner = ({ item }) => {
  const { title, description, image } = item;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 items-center gap-6 md:gap-10 px-4 py-12 md:py-16 rounded-3xl 
      bg-white/10 backdrop-blur-lg shadow-2xl">

        {/* Text Side with animation */}
        <motion.div
          className="space-y-4 md:space-y-6 order-2 md:order-1"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-md leading-snug">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-200 max-w-lg md:max-w-xl leading-relaxed">
            {description}
          </p>
          <button className="mt-3 md:mt-4 px-5 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-white">
            Learn More
          </button>
        </motion.div>

        {/* Image Side with animation */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center order-1 md:order-2"
        >
          <motion.img
            src={image}
            alt={title}
            className="w-full max-w-sm sm:max-w-md md:max-w-lg h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-2xl border border-white/30 shadow-2xl"
            whileHover={{
              scale: 1.05,
              rotate: 1,
              boxShadow: "0px 20px 40px rgba(0,0,0,0.5)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default UiBanner;
