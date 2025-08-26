import React, { useState } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const tipsData = [
  {
    id: 1,
    title: "Stay Hydrated",
    shortDescription: "Drink at least 8 glasses of water daily.",
    fullContent:
      "Drinking enough water is essential for maintaining good health. It helps regulate body temperature, keeps joints lubricated, prevents infections, delivers nutrients to cells, and keeps organs functioning properly.",
    imageURL:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Balanced Diet",
    shortDescription: "Eat fruits, vegetables, lean proteins, whole grains.",
    fullContent:
      "A balanced diet provides your body with the necessary nutrients it needs to function properly. Include fruits, vegetables, whole grains, and lean protein in your meals.",
    imageURL:
      "https://plus.unsplash.com/premium_photo-1664476002571-ead0cbfc6d74?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    title: "Regular Exercise",
    shortDescription: "30 mins of moderate exercise most days.",
    fullContent:
      "Regular physical activity improves muscle strength, endurance, cardiovascular health, controls weight, reduces chronic disease risk, and improves mental health.",
    imageURL:
      "https://plus.unsplash.com/premium_photo-1726403423485-dfa5d440cca3?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    title: "Get Enough Sleep",
    shortDescription: "Aim for 7-9 hours of quality sleep.",
    fullContent:
      "Adequate sleep is crucial for physical and mental health. It improves concentration, mood, and overall quality of life.",
    imageURL:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Manage Stress",
    shortDescription: "Practice meditation or deep breathing.",
    fullContent:
      "Chronic stress negatively impacts health. Managing stress helps lower blood pressure and improve mood.",
    imageURL:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, type: "spring", stiffness: 50 },
  }),
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

const MedicalTips = () => {
  const [selectedTip, setSelectedTip] = useState(null);

  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000, // autoplay every 3 sec
    cssEase: "ease-in-out",
    centerMode: true,
    centerPadding: "40px",
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 2,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <div className="py-16 px-6">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-white">
        Medical Tips & Health Awareness
      </h1>
      <p className="text-center text-gray-300 max-w-xl mx-auto mb-12 px-4 text-lg leading-relaxed">
        Learn essential health tips to stay healthy. Click any card for details.
      </p>

      <Slider {...settings}>
        {tipsData.map((tip, i) => (
          <motion.div
            key={tip.id}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="rounded-2xl cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-transform backdrop-blur-md bg-white/10 border border-white/20 flex flex-col"
            style={{
              minWidth: "260px",
              maxWidth: "280px",
              height: "360px",
              padding: "1.5rem",
              margin: "0 12px",
              boxSizing: "border-box",
            }}
            onClick={() => setSelectedTip(tip)}
          >
            <img
              src={tip.imageURL}
              alt={tip.title}
              className="w-full h-40 object-cover rounded-t-xl flex-shrink-0"
            />
            <div className="flex flex-col flex-grow justify-between">
              <h2 className="text-lg font-semibold text-center text-white mb-2">
                {tip.title}
              </h2>
              <p className="text-gray-200 text-sm pb-4 text-center line-clamp-3 flex-grow">
                {tip.shortDescription}
              </p>
            </div>
          </motion.div>
        ))}
      </Slider>

      <AnimatePresence>
        {selectedTip && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-5 z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedTip(null)}
          >
            <motion.div
              className="bg-white rounded-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-7 relative"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-5 right-5 text-gray-600 hover:text-indigo-700 text-3xl font-bold"
                onClick={() => setSelectedTip(null)}
                aria-label="Close modal"
              >
                &times;
              </button>
              <h2 className="text-3xl font-bold mb-4 text-indigo-900">
                {selectedTip.title}
              </h2>
              <img
                src={selectedTip.imageURL}
                alt={selectedTip.title}
                className="w-full h-56 object-cover rounded-md mb-5"
              />
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {selectedTip.fullContent}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MedicalTips;
