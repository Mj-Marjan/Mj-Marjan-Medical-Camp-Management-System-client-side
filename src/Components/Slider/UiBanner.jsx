import React from "react";
import { motion } from "framer-motion";

const UiBanner = ({ item }) => {
  const { title, description, image } = item;

  return (
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 items-center gap-8 px-6 py-20 my-10 rounded-2xl bg-gradient-to-r from-[#f9fbe7] via-[#e0f7fa] to-[#fce4ec] shadow-2xl">
        {/* Text Side with animation */}
        <motion.div
          className="space-y-6 md:pl-6"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 drop-shadow-sm leading-snug">
            {title}
          </h2>
          <p className="text-lg text-gray-700 max-w-xl leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Image Side with animation */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <img
            src={image}
            alt={title}
            className="w-full h-[300px] md:h-[350px] object-cover rounded-xl mx-auto shadow-xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default UiBanner;
