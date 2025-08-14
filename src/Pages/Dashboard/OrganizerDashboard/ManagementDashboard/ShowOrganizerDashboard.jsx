import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const ShowOrganizerDashboard = ({ registration, onDelete }) => {
  const { _id } = registration;
  const [regData, setRegData] = useState(registration);

  const {
    participantName,
    campName,
    fees,
    paymentStatus,
    confirmation,
  } = regData;

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await axios.get(`https://medical-camp-server-liart.vercel.app/registrations/${_id}`);
        setRegData(res.data);
      } catch (err) {
        console.error("Error fetching latest data:", err);
      }
    };
    fetchLatest();
  }, [_id]);

  const handleConfirm = async () => {
    try {
      const res = await axios.patch(`https://medical-camp-server-liart.vercel.app/registrations/${_id}`, {
        confirmation: 'confirmed',
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Confirmed!", "Registration confirmed.", "success");
        setRegData({ ...regData, confirmation: "confirmed" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This registration will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`https://medical-camp-server-liart.vercel.app/registrations/${_id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Cancelled!", "Registration deleted.", "success");
          onDelete(_id); // ✅ remove from UI
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 rounded-xl shadow-md border border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white text-sm md:text-base">
        <div><span className="font-semibold text-indigo-400">Participant:</span> {participantName}</div>
        <div><span className="font-semibold text-indigo-400">Camp:</span> {campName}</div>
        <div><span className="font-semibold text-indigo-400">Fees:</span> ৳{fees}</div>
        <div><span className="font-semibold text-indigo-400">Payment:</span> {paymentStatus}</div>
        <div>
          <span className="font-semibold text-indigo-400">Status:</span>{" "}
          {confirmation === "pending" ? (
            <button
              className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded disabled:bg-gray-500"
              onClick={handleConfirm}
              disabled={paymentStatus !== "Paid"}
            >
              Pending
            </button>
          ) : (
            <span className="text-green-400 font-bold">Confirmed</span>
          )}
        </div>
        <div>
          <button
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded disabled:bg-gray-500"
            onClick={handleCancel}
            disabled={paymentStatus === "Paid" && confirmation === "confirmed"}
          >
            ❌ Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowOrganizerDashboard;
