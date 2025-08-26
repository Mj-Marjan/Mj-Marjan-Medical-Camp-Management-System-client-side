import React, { useEffect, useState } from "react";
import ShowLatestCamp from "./ShowLatestCamp";
import { Link } from "react-router";

const LatestCamp = () => {
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    fetch("https://medical-camp-server-liart.vercel.app/camps")
      .then((res) => res.json())
      .then((data) => {
        const sortedCamps = data.sort((a, b) => b.participantCount - a.participantCount);
        setCamps(sortedCamps.slice(0, 8));
      })
      .catch((err) => console.error("Error fetching popular camps:", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 sm:mb-12 
                     text-center text-white drop-shadow-lg">
        🌊 Popular Medical Camps
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                      xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
        {camps.map((camp) => (
          <ShowLatestCamp key={camp._id} camp={camp} />
        ))}
      </div>

      {/* Button */}
      <div className="text-center mt-10 sm:mt-12">
        <Link to="/camps">
          <button className="px-6 sm:px-8 py-2.5 sm:py-3 
                             bg-gradient-to-r from-indigo-600 to-purple-700 
                             text-white text-sm sm:text-lg font-bold rounded-lg sm:rounded-xl 
                             shadow-md hover:shadow-2xl transition-all duration-300">
            See All Camps
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LatestCamp;
