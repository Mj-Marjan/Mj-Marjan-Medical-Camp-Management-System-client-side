import React, { useEffect, useState, useContext, useMemo } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import { motion } from "framer-motion";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    if (user?.email) {
      fetch(`https://medical-camp-server-liart.vercel.app/registrations?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          const paidOnly = data.filter(item => item.paymentStatus === "paid");
          setPayments(paidOnly);
          setCurrentPage(1); // Reset page on new data load
        });
    }
  }, [user?.email]);

  // Filter payments by searchTerm (case-insensitive, check multiple fields)
  const filteredPayments = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return payments.filter(item =>
      item.campName?.toLowerCase().includes(term) ||
      item.paymentStatus?.toLowerCase().includes(term) ||
      (item.confirmed ? "confirmed" : "pending").includes(term) ||
      String(item.fees).includes(term)
    );
  }, [payments, searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredPayments.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirst, indexOfLast);

  // Pagination buttons array
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        Payment History
      </h2>

      {/* Search input */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by Camp Name, Payment Status, Confirmation, Fees"
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset to first page on search
          }}
        />
      </div>

      {payments.length === 0 ? (
        <motion.p
          className="text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          No payment records found.
        </motion.p>
      ) : currentPayments.length === 0 ? (
        <p className="text-center text-gray-500">No records match your search.</p>
      ) : (
        <>
          <motion.div
            className="overflow-x-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.table
              className="min-w-full bg-white border border-gray-200 rounded-xl shadow-lg"
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <thead className="bg-indigo-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">#</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Camp Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Fees</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Payment Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Confirmation</th>
                </tr>
              </thead>
              <tbody>
                {currentPayments.map((item, index) => (
                  <motion.tr
                    key={item._id}
                    className="border-t hover:bg-gray-50 transition-all"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="px-6 py-4 text-sm">{indexOfFirst + index + 1}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{item.campName}</td>
                    <td className="px-6 py-4 text-sm">{item.fees} BDT</td>
                    <td className="px-6 py-4 text-sm text-green-600 font-semibold">{item.paymentStatus}</td>
                    <td className="px-6 py-4 text-sm">{item.confirmed ? "Confirmed" : "Pending"}</td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          </motion.div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2">
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
    </motion.div>
  );
};

export default PaymentHistory;
