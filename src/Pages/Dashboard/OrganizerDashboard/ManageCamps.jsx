import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { motion } from "framer-motion";

const ManageCamps = () => {
  const { user } = useContext(AuthContext);
  const [camps, setCamps] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://medical-camp-server-liart.vercel.app/my-camps?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => setCamps(data))
        .catch((error) => console.error("Error fetching camps:", error));
    }
  }, [user?.email]);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://medical-camp-server-liart.vercel.app/camps/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your camp has been deleted.", "success");
              const remainingCamps = camps.filter((camp) => camp._id !== _id);
              setCamps(remainingCamps);
              const maxPage = Math.ceil(remainingCamps.length / rowsPerPage);
              if (currentPage > maxPage) setCurrentPage(maxPage);
            }
          })
          .catch((error) => {
            console.error("Error deleting camp:", error);
          });
      }
    });
  };

  const filteredCamps = camps.filter((camp) => {
    const term = searchTerm.toLowerCase();
    return (
      (camp.campName && camp.campName.toLowerCase().includes(term)) ||
      (camp.dateTime && camp.dateTime.toLowerCase().includes(term)) ||
      (camp.location && camp.location.toLowerCase().includes(term)) ||
      (camp.healthcareProfessional &&
        camp.healthcareProfessional.toLowerCase().includes(term))
    );
  });

  const indexOfLastCamp = currentPage * rowsPerPage;
  const indexOfFirstCamp = indexOfLastCamp - rowsPerPage;
  const currentCamps = filteredCamps.slice(indexOfFirstCamp, indexOfLastCamp);
  const totalPages = Math.ceil(filteredCamps.length / rowsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="max-w-7xl mx-auto p-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 animate-pulse-slow -z-10 rounded-xl"></div>

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center mb-6 text-indigo-700 drop-shadow-md"
      >
        Manage My Camps
      </motion.h2>

      {/* Search */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="🔍 Search by camp name, date, location, or doctor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-md rounded-full shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {filteredCamps.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-500 text-lg"
        >
          No camps found.
        </motion.p>
      ) : (
        <>
          <div className="space-y-6">
            {currentCamps.map((camp) => (
              <motion.div
                key={camp._id}
                className="backdrop-blur-lg bg-white/70 border border-white/40 rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 flex flex-col md:flex-row overflow-hidden"
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Image (Left) */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="md:w-1/3 w-full"
                >
                  <img
                    src={camp.image}
                    alt={camp.campName}
                    className="h-full w-full object-cover md:rounded-l-2xl rounded-t-2xl shadow"
                  />
                </motion.div>

                {/* Content (Right) */}
                <div className="md:w-2/3 w-full p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-indigo-700 mb-2">
                      {camp.campName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-1">
                      <strong>Date:</strong> {camp.dateTime}
                    </p>
                    <p className="text-gray-600 text-sm mb-1">
                      <strong>Location:</strong> {camp.location}
                    </p>
                    <p className="text-gray-600 text-sm mb-1">
                      <strong>Participants:</strong> {camp.participantCount}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      <strong>Fees:</strong> {camp.campFees} BDT
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-3">
                    <Link to={`/update-camp/${camp._id}`} className="w-full">
                      <button className="w-full py-2 px-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition text-sm shadow">
                        ✏️ Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(camp._id)}
                      className="w-full py-2 px-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition text-sm shadow"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10 space-x-2">
            {pageNumbers.map((number) => (
              <motion.button
                key={number}
                onClick={() => setCurrentPage(number)}
                whileHover={{ scale: 1.15 }}
                className={`px-4 py-2 rounded-full border transition ${
                  number === currentPage
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white/80 text-indigo-600 border-indigo-400 hover:bg-indigo-100"
                }`}
              >
                {number}
              </motion.button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageCamps;
