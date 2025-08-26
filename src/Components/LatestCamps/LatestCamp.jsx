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
        setCamps(sortedCamps.slice(0, 8)); // show top 8
      })
      .catch((err) => console.error("Error fetching popular camps:", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-indigo-400 drop-shadow-lg">
        🌊 Popular Medical Camps
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {camps.map((camp) => (
          <ShowLatestCamp key={camp._id} camp={camp} />
        ))}
      </div>

      {/* Button */}
      <div className="text-center mt-12">
        <Link to="/camps">
          <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 
                             text-white text-lg font-bold rounded-xl shadow-md 
                             hover:shadow-2xl transition-all duration-300">
            See All Camps
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LatestCamp;
