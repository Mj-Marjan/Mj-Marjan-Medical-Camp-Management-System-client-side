import { NavLink, Outlet, useLocation } from "react-router";
import useRole from "../../Hooks/useRole";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

// lucide-react icons
import { User, PlusCircle, LayoutDashboard, CalendarDays, BarChart3, CreditCard } from "lucide-react";

const Dashboard = () => {
  const [role, loading] = useRole();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
        <span className="loading loading-spinner loading-lg text-indigo-400"></span>
      </div>
    );
  }

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
      isActive
        ? "bg-gradient-to-r from-[#4f46e5] to-[#6b5bff] text-white shadow-lg scale-105"
        : "text-gray-300 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] font-sans relative text-white">
      
      {/* Sidebar Toggle Button (for small screens) */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white/20 border border-white/30 p-2 rounded-full shadow-md backdrop-blur-md text-white"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <IoClose size={22} /> : <FiMenu size={22} />}
      </button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -250, opacity: 0 }}
        animate={{ x: isSidebarOpen || window.innerWidth >= 1024 ? 0 : -250, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70, damping: 15 }}
        className={`bg-gradient-to-b from-[#1c1b33]/90 to-[#302b63]/90 backdrop-blur-md border-r border-white/20 shadow-xl p-6 w-64 h-screen fixed lg:static z-40 top-0 left-0 rounded-r-2xl ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-purple-400 tracking-wide">
          ⚡ Dashboard
        </h2>
        <ul className="space-y-2">
          {role === "organizer" && (
            <>
              <li>
                <NavLink to="/dashboard/organizer-profile" className={navLinkClass}>
                  <User size={18} /> Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-camp" className={navLinkClass}>
                  <PlusCircle size={18} /> Add Camp
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-camps" className={navLinkClass}>
                  <CalendarDays size={18} /> Manage Camps
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/organizer" className={navLinkClass}>
                  <LayoutDashboard size={18} /> Organizer Home
                </NavLink>
              </li>
            </>
          )}

          {role === "participant" && (
            <>
              <li>
                <NavLink to="/dashboard/analytics" className={navLinkClass}>
                  <BarChart3 size={18} /> Analytics
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-ragister-camps" className={navLinkClass}>
                  <CalendarDays size={18} /> Registered Camps
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/participant-profile" className={navLinkClass}>
                  <User size={18} /> Participant Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/payment-history" className={navLinkClass}>
                  <CreditCard size={18} /> Payment History
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className={`flex-1 p-8 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0 lg:ml-64"
        }`}
      >
        {location.pathname === "/dashboard" ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-24"
          >
            <h1 className="text-4xl font-extrabold text-purple-400 mb-3">
              Welcome to Your Dashboard 🎉
            </h1>
            <p className="text-gray-300 max-w-xl mx-auto">
              Use the sidebar to navigate your dashboard options. Manage camps, track analytics,
              and stay organized effortlessly.
            </p>
          </motion.div>
        ) : (
          <Outlet />
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
