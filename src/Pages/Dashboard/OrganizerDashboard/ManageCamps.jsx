import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { motion } from "framer-motion";

const ManageCamps = () => {
  const { user } = useContext(AuthContext);
  const [camps, setCamps] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user?.email) {
      fetch(`https://medical-camp-server-liart.vercel.app/my-camps?email=${user.email}`)
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
      confirmButtonColor: "#3085d6",
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
      (camp.healthcareProfessional && camp.healthcareProfessional.toLowerCase().includes(term))
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
    <div className="max-w-7xl mx-auto p-6">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-6 text-indigo-700"
      >
        Manage My Camps
      </motion.h2>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by camp name, date, location, or doctor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-md"
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
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentCamps.map((camp) => (
              <motion.div
                key={camp._id}
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300 flex flex-col h-[420px]"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={camp.image}
                  alt={camp.campName}
                  className="h-40 w-full object-cover rounded-md mb-3"
                />
                <h3 className="text-lg font-semibold text-purple-700 mb-1 truncate">
                  {camp.campName}
                </h3>
                <p className="text-gray-600 text-sm"><strong>Date:</strong> {camp.dateTime}</p>
                <p className="text-gray-600 text-sm"><strong>Location:</strong> {camp.location}</p>
                <p className="text-gray-600 text-sm"><strong>Participants:</strong> {camp.participantCount}</p>
                <p className="text-gray-600 text-sm mb-3"><strong>Fees:</strong> {camp.campFees} BDT</p>

                <div className="mt-auto flex gap-2">
                  <Link to={`/update-camp/${camp._id}`} className="w-full">
                    <button className="w-full py-1.5 px-3 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(camp._id)}
                    className="w-full py-1.5 px-3 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination Buttons */}
          <div className="flex justify-center mt-8 space-x-2">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`px-4 py-2 rounded-md border ${
                  number === currentPage
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-indigo-600 hover:bg-indigo-200"
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageCamps;
