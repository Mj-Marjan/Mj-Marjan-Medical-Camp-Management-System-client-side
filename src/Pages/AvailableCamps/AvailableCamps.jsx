import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import ShowAvailableCamps from './ShowAvailableCamps';

const AvailableCamps = () => {
  const originalCamps = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [columns, setColumns] = useState(3);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  if (!Array.isArray(originalCamps)) {
    return <p className="text-center text-red-600">No camps available or data is invalid.</p>;
  }

  let camps = [...originalCamps];

  // Search filtering
  if (searchTerm) {
    const lower = searchTerm.toLowerCase();
    camps = camps.filter(camp =>
      camp.campName?.toLowerCase().includes(lower) ||
      camp.location?.toLowerCase().includes(lower) ||
      camp.healthcareProfessional?.toLowerCase().includes(lower)
    );
  }

  // Sorting
  if (sortOption === 'fees') {
    camps.sort((a, b) => a.fees - b.fees);
  } else if (sortOption === 'participants') {
    camps.sort((a, b) => b.participantCount - a.participantCount);
  } else if (sortOption === 'name') {
    camps.sort((a, b) => a.campName.localeCompare(b.campName));
  }

  // Pagination logic
  const indexOfLastCamp = currentPage * rowsPerPage;
  const indexOfFirstCamp = indexOfLastCamp - rowsPerPage;
  const currentCamps = camps.slice(indexOfFirstCamp, indexOfLastCamp);

  const totalPages = Math.ceil(camps.length / rowsPerPage);

  // Page number buttons generate
  const pageNumbers = [];
  for(let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-indigo-100 to-purple-100">
      <h2 className="text-4xl font-bold mb-8 text-center text-indigo-700">Available Medical Camps</h2>

      {/* Search & Filter Panel */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search camps..."
          className="input input-bordered w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset page on search
          }}
        />

        <select
          className="select select-bordered"
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            setCurrentPage(1); // reset page on sort
          }}
        >
          <option value="">Sort by</option>
          <option value="participants">Most Registered</option>
          <option value="fees">Camp Fees</option>
          <option value="name">Alphabetical (Camp Name)</option>
        </select>

        <button
          onClick={() => setColumns(columns === 3 ? 2 : 3)}
          className="btn btn-outline btn-accent"
        >
          {columns === 3 ? '2 Column Layout' : '3 Column Layout'}
        </button>
      </div>

      {/* Grid Layout */}
      <div className={`grid gap-6 ${
        columns === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'
      }`}>
        {currentCamps.map(camp => (
          <ShowAvailableCamps key={camp._id} camp={camp} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 space-x-2">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`px-4 py-2 rounded-md border ${
              number === currentPage
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-indigo-600 hover:bg-indigo-200'
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
