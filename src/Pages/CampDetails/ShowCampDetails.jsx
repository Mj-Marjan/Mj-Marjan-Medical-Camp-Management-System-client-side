import React, { useState, useContext } from 'react';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthContext';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  MapPin,
  UserPlus,
  Stethoscope,
  DollarSign
} from 'lucide-react';

const ShowCampDetails = ({ camp }) => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    phone: '',
    gender: '',
    emergency: '',
  });

  const {
    _id,
    campName,
    image,
    fees,
    dateTime,
    location,
    doctor,
    participantCount,
    description,
  } = camp || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const registration = {
      campId: _id,
      campName,
      fees,
      location,
      participantName: user.displayName,
      participantEmail: user.email,
      ...formData,
      paymentStatus: 'unpaid',
      confirmation: 'pending'
    };

    fetch('https://medical-camp-server-liart.vercel.app/registrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registration)
    })
      .then(res => res.json())
      .then(() => {
        toast.success("Successfully registered!");
        setIsOpen(false);
      })
      .catch(() => toast.error("Something went wrong"));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto mt-10 p-6 rounded-lg shadow-xl bg-gradient-to-br from-indigo-100 via-purple-50 to-white dark:from-slate-700 dark:via-slate-800 dark:to-slate-900"
    >
      <motion.img
        src={image}
        alt={campName}
        className="w-full h-64 object-cover rounded-md mb-6"
        whileHover={{ scale: 1.02 }}
      />

      <h2 className="text-4xl font-extrabold mb-4 text-purple-700 tracking-tight">
        {campName}
      </h2>

      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
        {description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 text-gray-800 dark:text-gray-100">
        <p className="flex items-center gap-2"><CalendarDays size={20} /> {dateTime}</p>
        <p className="flex items-center gap-2"><MapPin size={20} /> {location}</p>
        <p className="flex items-center gap-2"><Stethoscope size={20} /> {doctor}</p>
        <p className="flex items-center gap-2"><UserPlus size={20} /> {participantCount ?? 0}</p>
        <p className="flex items-center gap-2"><DollarSign size={20} /> ${fees}</p>
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-primary mt-4 px-6 py-2 rounded-full text-white font-semibold shadow-lg hover:shadow-xl"
      >
        Join Camp
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-2xl w-full max-w-md">
            <Dialog.Title className="text-2xl font-bold mb-4 text-center">Register for {campName}</Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" value={campName} readOnly className="input input-bordered w-full" />
              <input type="text" value={location} readOnly className="input input-bordered w-full" />
              <input type="text" value={`$${fees}`} readOnly className="input input-bordered w-full" />
              <input type="text" value={description} readOnly className="input input-bordered w-full" />
              <input type="text" value={user?.displayName} readOnly className="input input-bordered w-full" />
              <input type="email" value={user?.email} readOnly className="input input-bordered w-full" />

              <input
                type="number"
                name="age"
                placeholder="Age"
                className="input input-bordered w-full"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="input input-bordered w-full"
                required
                onChange={handleChange}
              />
              <select
                name="gender"
                className="select select-bordered w-full"
                required
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
              <input
                type="text"
                name="emergency"
                placeholder="Emergency Contact"
                className="input input-bordered w-full"
                required
                onChange={handleChange}
              />

              <button type="submit" className="btn btn-success w-full">Submit</button>
              <button type="button" onClick={() => setIsOpen(false)} className="btn btn-ghost w-full">
                Cancel
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </motion.div>
  );
};

export default ShowCampDetails;
