import React, { useState, useMemo } from 'react';
import { useLoaderData } from 'react-router';
import ShowOrganizerDashboard from './ShowOrganizerDashboard';
import { motion } from 'framer-motion';

const OrganizerDashboard = () => {
  const data = useLoaderData();
  const [registrations, setRegistrations] = useState(data || []);
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Filter registrations based on search term safely
  const filteredRegistrations = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return registrations.filter((r) => 
      (r.campName && r.campName.toLowerCase().includes(term)) ||
      (r.participantName && r.participantName.toLowerCase().includes(term)) ||
      (r.healthcareProfessional && r.healthcareProfessional.toLowerCase().includes(term)) ||
      (r.dateTime && r.dateTime.toLowerCase().includes(term))
    );
  }, [registrations, searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredRegistrations.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRegistrations = filteredRegistrations.slice(indexOfFirst, indexOfLast);

  const handleDeleteFromUI = (id) => {
    setRegistrations((prev) => prev.filter((r) => r._id !== id));
  };

  // Pagination buttons array
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  if (!Array.isArray(registrations) || registrations.length === 0) {
    return (
      <p className="text-center text-red-600 mt-10 text-xl">
        No camps available or data is invalid.
      </p>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">Organizer Dashboard</h2>

      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by camp, participant, doctor, or date..."
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on new search
          }}
        />
      </div>

      {/* Registrations List with Pagination */}
      <div className="space-y-6">
        {currentRegistrations.map((registration) => (
          <motion.div
            key={registration._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <ShowOrganizerDashboard
              registration={registration}
              onDelete={handleDeleteFromUI}
            />
          </motion.div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-8 space-x-2">
        {pageNumbers.map((number) => (
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

export default OrganizerDashboard;
