import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqData = [
  {
    question: "How do I register for a medical camp?",
    answer:
      "You can register for a medical camp by logging into your account and visiting the 'Available Camps' section, then clicking on the 'Register' button.",
  },
  {
    question: "Is payment required for every camp?",
    answer:
      "Not all camps require payment. Check the fee section for each camp before registering.",
  },
  {
    question: "Can I cancel my registration?",
    answer:
      "Yes, you can cancel your registration before the camp date from the 'My Registered Camps' section.",
  },
  {
    question: "Will I receive a confirmation after registration?",
    answer:
      "Yes, after successful registration and payment (if applicable), a confirmation email will be sent to you.",
  },
  {
    question: "Are these camps conducted by certified professionals?",
    answer:
      "Absolutely! All medical camps are supervised and conducted by verified healthcare professionals and organizers.",
  },
];

const faqVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, type: "spring", stiffness: 80 },
  }),
};

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-indigo-700 mb-6"
      >
        Frequently Asked Questions
      </motion.h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        We’ve got answers to your most common questions. Click to expand and learn more.
      </p>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={faqVariants}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
            >
              <span className="text-lg font-medium text-gray-800">{faq.question}</span>
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180 text-indigo-600" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4 text-gray-600"
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
