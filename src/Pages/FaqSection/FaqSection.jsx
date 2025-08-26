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
    <div className="py-16 px-6" >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center text-white mb-6 drop-shadow-lg"
      >
        Frequently Asked Questions
      </motion.h2>
      <p className="text-center text-gray-200 max-w-2xl mx-auto mb-12 text-lg">
        We’ve got answers to your most common questions. Click to expand and learn more.
      </p>

      <div className="space-y-5 max-w-3xl mx-auto">
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={faqVariants}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-indigo-400/30 transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
            >
              <span className="text-lg font-semibold text-white">{faq.question}</span>
              <FaChevronDown
                className={`transition-transform duration-300 text-white ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="px-6 pb-4 text-gray-200 text-sm"
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
