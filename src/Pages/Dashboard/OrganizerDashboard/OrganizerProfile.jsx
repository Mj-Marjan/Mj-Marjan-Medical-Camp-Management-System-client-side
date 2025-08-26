import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { AuthContext } from "../../../Contexts/AuthContext";
import toast from "react-hot-toast";

const OrganizerProfile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
  });

  useEffect(() => {
    axios
      .get(`https://medical-camp-server-liart.vercel.app/users/${user.email}`)
      .then((res) => {
        setProfile(res.data);
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          photo: res.data.photo || "",
        });
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, [user.email]);

  const handleEditToggle = () => setEditMode(!editMode);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.patch(
        `https://medical-camp-server-liart.vercel.app/users/${user.email}`,
        {
          name: formData.name,
          photo: formData.photo,
        }
      );
      toast.success("✅ Profile updated successfully!");
      setEditMode(false);
      setProfile({ ...profile, ...formData });
    } catch (err) {
      toast.error("❌ Failed to update profile.");
      console.error("Update error:", err);
    }
  };

  return (
    <motion.div
      className="max-w-xl mx-auto mt-12 p-8 rounded-2xl 
      bg-gradient-to-r from-[#1a1a2e]/90 via-[#16213e]/80 to-[#0f3460]/90 
      backdrop-blur-lg shadow-2xl border border-white/10 text-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-md">
        Organizer Profile
      </h2>

      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <motion.div
          whileHover={{ scale: 1.08, rotate: 2 }}
          className="avatar w-32 h-32 rounded-full ring ring-purple-400 ring-offset-base-100 ring-offset-2 overflow-hidden shadow-xl"
        >
          <img
            src={
              formData.photo?.trim()
                ? formData.photo
                : "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
            }
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Profile Fields */}
      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="label font-semibold">Name</label>
          {editMode ? (
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full text-black"
            />
          ) : (
            <p className="text-lg font-medium">{profile.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="label font-semibold">Email</label>
          <p className="text-gray-300">{profile.email}</p>
        </div>

        {/* Photo URL */}
        <div>
          <label className="label font-semibold">Photo URL</label>
          {editMode ? (
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              className="input input-bordered w-full text-black"
            />
          ) : (
            <p className="text-blue-400 break-all">{profile.photo}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          {editMode ? (
            <>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 hover:opacity-90 transition"
                onClick={handleSave}
              >
                Save
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-500 to-gray-600 hover:opacity-90 transition"
                onClick={handleEditToggle}
              >
                Cancel
              </motion.button>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleEditToggle}
              className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 transition shadow-lg"
            >
              Edit Profile
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default OrganizerProfile;
