import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const UpdateCamp = () => {
  const { campName, image, fees, dateTime, location, description, doctor, _id } =
    useLoaderData();

  const handleUpdateCamp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    fetch(`https://medical-camp-server-liart.vercel.app/camps/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Camp updated successfully!",
            showConfirmButton: false,
            timer: 1600,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto mt-12 p-10 rounded-2xl shadow-xl 
                 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100"
    >
      <h2 className="text-4xl font-bold mb-8 text-center text-indigo-700">
        ✨ Update Camp ✨
      </h2>

      <form onSubmit={handleUpdateCamp} className="space-y-6 text-gray-700">
        {/* Camp Name */}
        <div>
          <label className="block font-semibold mb-1">Camp Name</label>
          <input
            type="text"
            name="campName"
            defaultValue={campName}
            className="w-full rounded-lg px-4 py-2 bg-white text-gray-900 shadow-sm border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Enter Camp Name"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-semibold mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            defaultValue={image}
            className="w-full rounded-lg px-4 py-2 bg-white text-gray-900 shadow-sm border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Enter Image URL"
            required
          />
        </div>

        {/* Fees */}
        <div>
          <label className="block font-semibold mb-1">Camp Fees (BDT)</label>
          <input
            type="number"
            name="fees"
            defaultValue={fees}
            className="w-full rounded-lg px-4 py-2 bg-white text-gray-900 shadow-sm border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Enter Camp Fees"
            required
          />
        </div>

        {/* Date & Time */}
        <div>
          <label className="block font-semibold mb-1">Date & Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            defaultValue={dateTime}
            className="w-full rounded-lg px-4 py-2 bg-white text-gray-900 shadow-sm border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            name="location"
            defaultValue={location}
            className="w-full rounded-lg px-4 py-2 bg-white text-gray-900 shadow-sm border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Enter Location"
            required
          />
        </div>

        {/* Doctor */}
        <div>
          <label className="block font-semibold mb-1">Healthcare Professional</label>
          <input
            type="text"
            name="doctor"
            defaultValue={doctor}
            className="w-full rounded-lg px-4 py-2 bg-white text-gray-900 shadow-sm border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Enter Doctor Name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            defaultValue={description}
            className="w-full rounded-lg px-4 py-2 bg-white text-gray-900 shadow-sm border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            rows="4"
            placeholder="Write camp details here..."
            required
          ></textarea>
        </div>

        {/* Submit */}
        <motion.div whileHover={{ scale: 1.03 }} className="pt-4">
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          >
            🚀 Update Camp
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default UpdateCamp;
