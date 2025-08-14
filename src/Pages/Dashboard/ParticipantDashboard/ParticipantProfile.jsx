import React, { useEffect, useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";
import { use } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import toast from "react-hot-toast";

const ParticipantProfile = () => {
  const { user } = use(AuthContext);
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
      await axios.patch(`https://medical-camp-server-liart.vercel.app/users/${user.email}`, {
        name: formData.name,
        photo: formData.photo,
      });
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
      className="max-w-xl mx-auto mt-12 p-8 rounded-2xl bg-white shadow-2xl dark:bg-slate-800"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-700 dark:text-white">
        Organizer Profile
      </h2>

      <div className="flex justify-center mb-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="avatar w-32 h-32 rounded-full ring ring-purple-400 ring-offset-base-100 ring-offset-2 overflow-hidden"
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

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="label font-medium">Name</label>
          {editMode ? (
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          ) : (
            <p className="text-lg">{profile.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="label font-medium">Email</label>
          <p className="text-gray-500 dark:text-gray-300">{profile.email}</p>
        </div>

        {/* Photo URL */}
        <div>
          <label className="label font-medium">Photo URL</label>
          {editMode ? (
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          ) : (
            <p className="text-blue-500 break-all">{profile.photo}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          {editMode ? (
            <>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="btn btn-success"
                onClick={handleSave}
              >
                Save
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline"
                onClick={handleEditToggle}
              >
                Cancel
              </motion.button>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleEditToggle}
              className="btn btn-primary w-full"
            >
              Edit Profile
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ParticipantProfile;
