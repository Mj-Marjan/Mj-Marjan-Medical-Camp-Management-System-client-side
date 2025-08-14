import React, { useState, useContext } from "react";

import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../Contexts/AuthContext";

const SelectRole = () => {
  const [role, setRole] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log('ddd',role);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) {
      alert("Please select a role");
      return;
    }

    try {
      await axios.patch(`https://medical-camp-server-liart.vercel.app/users/${user.email}`, { role });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update role. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Select Your Role</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4 mb-6">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="role"
              value="organizer"
              onChange={(e) => setRole(e.target.value)}
              className="radio"
            />
            <span>Organizer</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="role"
              value="participant"
              onChange={(e) => setRole(e.target.value)}
              className="radio"
            />
            <span>Participant</span>
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          Confirm Role
        </button>
      </form>
    </div>
  );
};

export default SelectRole;
