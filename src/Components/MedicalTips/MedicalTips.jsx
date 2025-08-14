import React, { useState } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const tipsData = [
  {
    id: 1,
    title: "Stay Hydrated",
    shortDescription:
      "Drink at least 8 glasses of water daily to keep your body hydrated and healthy.",
    fullContent:
      "Drinking enough water is essential for maintaining good health. It helps in regulating body temperature, keeping joints lubricated, preventing infections, delivering nutrients to cells, and keeping organs functioning properly.",
    imageURL:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Maintain a Balanced Diet",
    shortDescription:
      "Eat a variety of foods including fruits, vegetables, lean proteins, and whole grains.",
    fullContent:
      "A balanced diet provides your body with the necessary nutrients it needs to function properly. Include fruits, vegetables, whole grains, and lean protein in your meals to support your immune system and overall health.",
    imageURL:
      "https://plus.unsplash.com/premium_photo-1664476002571-ead0cbfc6d74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFsYW5jZWQlMjBkaWV0fGVufDB8fDB8fHww",
  },
  {
    id: 3,
    title: "Regular Exercise",
    shortDescription:
      "Engage in at least 30 minutes of moderate exercise most days of the week.",
    fullContent:
      "Regular physical activity helps improve your muscle strength, boosts endurance, and enhances cardiovascular health. It also helps control weight, reduces the risk of chronic diseases, and improves mental health.",
    imageURL:
      "https://plus.unsplash.com/premium_photo-1726403423485-dfa5d440cca3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8UmVndWxhciUyMEV4ZXJjaXNlfGVufDB8fDB8fHww",
  },
  {
    id: 4,
    title: "Get Enough Sleep",
    shortDescription:
      "Aim for 7-9 hours of sleep to help your body repair and recharge.And to improve your mood and cognitive function.",
    fullContent:
      "Adequate sleep is crucial for physical and mental health. It improves concentration, mood, and overall quality of life.",
    imageURL:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Manage Stress",
    shortDescription:
      "Practice relaxation techniques like meditation or deep breathing. To reduce stress and improve mental health.",
    fullContent:
      "Chronic stress can negatively impact your health. Managing stress helps lower blood pressure and improve mood.",
    imageURL:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Regular Health Checkups",
    shortDescription:
      "Visit your healthcare provider regularly to catch potential issues early.",
    fullContent:
      "Routine screenings and checkups can help prevent diseases or catch them early when they're easier to treat.",
    imageURL:
      "https://plus.unsplash.com/premium_photo-1666299886656-008450f6f17b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8UmVndWxhciUyMGhlYWx0aCUyMGNoZWNrdXB8ZW58MHx8MHx8fDA%3D",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, type: "spring", stiffness: 50 },
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
    speed: 2000,           // দ্রুত গতিতে স্লাইড হবে
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: true,        // স্লাইড অটোমেটিক চালু থাকবে
    autoplaySpeed: 0,      // একদম লেগে থাকবে, কোনো বিরতি নেই
    cssEase: "linear",     // লিনিয়ার ইজে চলবে যেন কনটিনিউয়াস লুপ হয়
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div
      className="max-w-7xl mx-auto p-6 rounded-xl"
      style={{
        background: "linear-gradient(135deg, #e0f2fe 0%, #fef3c7 100%)",
      }}
    >
      <h1 className="text-5xl font-extrabold text-center mb-12 text-indigo-700 leading-tight">
        Medical Tips & Health Awareness
      </h1>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-12 px-4 text-lg leading-relaxed">
        Learn essential health tips to maintain your well-being. Click on any card to get detailed information.
      </p>

<Slider {...settings}>
  {tipsData.map((tip, i) => (
    <motion.div
      key={tip.id}
      custom={i}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="mx-5 p-3 bg-gradient-to-br from-indigo-100 via-indigo-50 to-white rounded-xl shadow-lg cursor-pointer overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform"
      onClick={() => setSelectedTip(tip)}
      style={{ minWidth: "280px", maxWidth: "320px", height: "400px", padding: "1.25rem", display: "flex", flexDirection: "column" }}
    >
      <img
        src={tip.imageURL}
        alt={tip.title}
        className="w-100 h-40 object-cover rounded-t-xl flex-shrink-0"
      />
      <div className="mt-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-indigo-900 mb-2">
          {tip.title}
        </h2>
        <p className="text-gray-600 line-clamp-3 text-sm flex-grow">
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
