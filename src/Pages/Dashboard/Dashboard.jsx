import { NavLink, Outlet, useLocation } from "react-router";
import useRole from "../../Hooks/useRole";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const Dashboard = () => {
  const [role, loading] = useRole();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  const navLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md transition-all duration-200 ${
      isActive
        ? "bg-blue-100 text-blue-700 font-semibold"
        : "hover:bg-blue-50 text-gray-700"
    }`;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 font-sans relative">
      {/* Sidebar Toggle Button (for small screens) */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white border p-2 rounded-full shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <IoClose size={22} /> : <FiMenu size={22} />}
      </button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: isSidebarOpen || window.innerWidth >= 1024 ? 0 : -200, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70 }}
        className={`bg-white border-r shadow-md p-6 w-64 h-screen fixed lg:static z-40 top-0 left-0 transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Dashboard</h2>
        <ul className="space-y-2">
          {role === "organizer" && (
            <>
              <li>
                <NavLink to="/dashboard/organizer-profile" className={navLinkClass}>
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-camp" className={navLinkClass}>
                  Add Camp
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-camps" className={navLinkClass}>
                  Manage Camps
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/organizer" className={navLinkClass}>
                  Organizer Home
                </NavLink>
              </li>
            </>
          )}

          {role === "participant" && (
            <>
              <li>
                <NavLink to="/dashboard/analytics" className={navLinkClass}>
                  Analytics
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-ragister-camps" className={navLinkClass}>
                  Registered Camps
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/participant-profile" className={navLinkClass}>
                  Participant Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/payment-history" className={navLinkClass}>
                  Payment History
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </motion.div>

      {/* Main Content */}
      <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.2 }}
  className={`flex-1 p-6 transition-all duration-300 ${
    isSidebarOpen ? "ml-44" : "ml-0 lg:ml-54"
  }`}
>

        {location.pathname === "/dashboard" ? (
          <div className="text-center mt-24">
            <h1 className="text-4xl font-bold text-blue-700 mb-3">
              Welcome to Your Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Use the sidebar to navigate your dashboard options.
            </p>
          </div>
        ) : (
          <Outlet />
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
