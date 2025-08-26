import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import ShowAvailableCamps from './ShowAvailableCamps';

const AvailableCamps = () => {
  const originalCamps = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('');
  const [columns, setColumns] = useState(4);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12;

  if (!Array.isArray(originalCamps)) {
    return <p className="text-center text-red-600">No camps available.</p>;
  }

  let camps = [...originalCamps];

  // Search filter
  if (searchTerm) {
    const lower = searchTerm.toLowerCase();
    camps = camps.filter(camp =>
      camp.campName?.toLowerCase().includes(lower) ||
      camp.location?.toLowerCase().includes(lower)
    );
  }

  // Pagination logic
  const indexOfLastCamp = currentPage * rowsPerPage;
  const indexOfFirstCamp = indexOfLastCamp - rowsPerPage;
  const currentCamps = camps.slice(indexOfFirstCamp, indexOfLastCamp);

  const totalPages = Math.ceil(camps.length / rowsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <h2 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">Available Medical Camps</h2>

      {/* Search Panel */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search camps..."
          className="input input-bordered w-full md:w-1/3 bg-white/10 text-white placeholder-white border-white/30 focus:ring-2 focus:ring-indigo-400"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />

        <button
          onClick={() => setColumns(columns === 4 ? 3 : 4)}
          className="btn btn-outline border-white text-white hover:bg-white/20"
        >
          {columns === 4 ? '3 Column Layout' : '4 Column Layout'}
        </button>
      </div>

      {/* Grid */}
      <div className={`grid gap-6 ${
        columns === 4 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
      }`}>
        {currentCamps.map(camp => (
          <ShowAvailableCamps key={camp._id} camp={camp} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`px-4 py-2 rounded-md border ${
              number === currentPage
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AvailableCamps;
