import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => toast.success("Logged out successfully"))
      .catch((err) => {
        toast.error("Logout failed!");
        console.error(err.message);
      });
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Available Camps", path: "/camps" },
    { name: "Contact", path: "/contactSection" },
  ];

  return (
    <motion.nav
      className="navbar fixed top-0 left-0 right-0 z-50 
                 backdrop-blur-lg shadow-md transition-all duration-500
                 px-3 sm:px-6 lg:px-12"
      style={{
        background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
    >
      {/* Navbar Start */}
      <div className="navbar-start flex items-center gap-2">
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost text-gray-200 p-1">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 
                       shadow-lg bg-[#1a1a40]/95 backdrop-blur-lg 
                       rounded-xl w-52 space-y-1"
          >
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `relative block px-3 py-2 rounded-lg font-medium 
                     text-gray-200 hover:text-white hover:bg-white/10 
                     ${isActive ? "bg-white/20 text-white" : ""}`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white font-bold 
                     text-xl sm:text-2xl"
        >
          <img src="/logo.png.jpeg" alt="MCMS Logo" className="w-7 h-7 sm:w-8 sm:h-8" />
          MCMS
        </Link>
      </div>

      {/* Navbar Center (Desktop Only) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6">
          {navLinks.map((link) => (
            <li key={link.path} className="relative">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative px-3 py-1 rounded-lg font-medium 
                   text-gray-200 hover:text-white transition-colors
                   ${isActive ? "text-white" : ""}`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="underline"
                        className="absolute left-0 bottom-0 h-[2px] w-full bg-white rounded"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.3, type: "spring" }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {user ? (
          <div
            className="dropdown dropdown-end tooltip tooltip-left"
            data-tip={user?.displayName || user?.email}
          >
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-9 sm:w-10 rounded-full ring ring-white/50 
                           ring-offset-base-100 ring-offset-2 transition-all"
              >
                <img
                  src={
                    user?.photoURL?.trim()
                      ? user.photoURL
                      : "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                  }
                  alt="Profile"
                />
              </motion.div>
            </div>

            <ul
              tabIndex={0}
              className="mt-3 z-[999] w-48 sm:w-56 space-y-1 
                         bg-[#1a1a40]/95 shadow-xl backdrop-blur-lg 
                         border border-gray-600 p-3 rounded-xl 
                         menu menu-sm dropdown-content"
            >
              <li className="text-center text-xs sm:text-sm font-semibold text-white mb-2 border-b pb-1 border-gray-600">
                {user?.displayName || user?.email}
              </li>

              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `block text-center rounded-lg py-2 px-4 font-medium transition-colors duration-200 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "hover:bg-white/10 text-gray-200"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </li>

              <li>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={handleSignOut}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 
                             text-white font-medium rounded-lg py-2 mt-1 
                             hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                >
                  Log Out
                </motion.button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn bg-gradient-to-r from-purple-600 to-indigo-600 
                       text-white text-sm sm:text-base font-semibold 
                       px-4 sm:px-6 py-2 rounded-lg 
                       hover:from-purple-700 hover:to-indigo-700"
          >
            Join Us
          </Link>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
