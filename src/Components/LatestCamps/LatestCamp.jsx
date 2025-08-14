import React, { useEffect, useState } from "react";
import ShowLatestCamp from "./ShowLatestCamp";
import { Link } from "react-router"; // 🔄 use 'react-router-dom' not 'react-router'

const LatestCamp = () => {
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    fetch("https://medical-camp-server-liart.vercel.app/camps")
      .then((res) => res.json())
      .then((data) => {
        const sortedCamps = data.sort((a, b) => b.participantCount - a.participantCount);
        setCamps(sortedCamps.slice(0, 6));
      })
      .catch((err) => console.error("Error fetching popular camps:", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-10 text-center text-indigo-700">
        🌟 Popular Medical Camps
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {camps.map((camp) => (
          <ShowLatestCamp key={camp._id} camp={camp} />
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/camps">
          <button className="btn bg-indigo-600 text-white px-6 py-2 text-lg hover:bg-indigo-700 transition-all duration-300 rounded-lg shadow-md">
            See All Camps
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LatestCamp;
