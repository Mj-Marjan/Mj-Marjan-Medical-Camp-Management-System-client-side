import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Contexts/AuthContext";
import { motion } from "framer-motion";

const AddCamp = () => {
  const { user } = useContext(AuthContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    data.organizerEmail = user?.email;
    data.participantCount = 0;

    fetch("https://medical-camp-server-liart.vercel.app/camps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Camp Added Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    form.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-3xl bg-white/10 backdrop-blur-lg border border-white/20 
                   rounded-2xl shadow-2xl p-8"
      >
        <h2 className="text-4xl font-extrabold mb-8 text-center text-indigo-300 drop-shadow-lg">
          ➕ Add A Medical Camp
        </h2>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          {/* Camp Name */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="text-gray-200 font-semibold">Camp Name</label>
            <input
              type="text"
              name="campName"
              className="mt-1 input input-bordered w-full bg-white/10 text-white placeholder-gray-400 rounded-lg"
              placeholder="Enter Camp Name"
              required
            />
          </motion.div>

          {/* Image URL */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="text-gray-200 font-semibold">Image URL</label>
            <input
              type="text"
              name="image"
              className="mt-1 input input-bordered w-full bg-white/10 text-white placeholder-gray-400 rounded-lg"
              placeholder="Enter image URL"
              required
            />
          </motion.div>

          {/* Camp Fees */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="text-gray-200 font-semibold">Camp Fees</label>
            <input
              type="number"
              name="campFees"
              className="mt-1 input input-bordered w-full bg-white/10 text-white placeholder-gray-400 rounded-lg"
              placeholder="Enter Camp Fees"
              required
            />
          </motion.div>

          {/* Date and Time */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="text-gray-200 font-semibold">Date & Time</label>
            <input
              type="datetime-local"
              name="dateTime"
              className="mt-1 input input-bordered w-full bg-white/10 text-white rounded-lg"
              required
            />
          </motion.div>

          {/* Location */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="text-gray-200 font-semibold">Location</label>
            <input
              type="text"
              name="location"
              className="mt-1 input input-bordered w-full bg-white/10 text-white placeholder-gray-400 rounded-lg"
              placeholder="Enter Location"
              required
            />
          </motion.div>

          {/* Healthcare Professional */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="text-gray-200 font-semibold">Healthcare Professional</label>
            <input
              type="text"
              name="healthcareProfessional"
              className="mt-1 input input-bordered w-full bg-white/10 text-white placeholder-gray-400 rounded-lg"
              placeholder="Enter Doctor's Name"
              required
            />
          </motion.div>

          {/* Description */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="text-gray-200 font-semibold">Description</label>
            <textarea
              name="description"
              className="mt-1 textarea textarea-bordered w-full bg-white/10 text-white placeholder-gray-400 rounded-lg"
              rows="4"
              placeholder="Write camp details here..."
              required
            ></textarea>
          </motion.div>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.05 }} className="text-center pt-4">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 
                         text-white font-bold rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              Add Camp
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddCamp;
