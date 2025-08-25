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
    <motion.div
      className="navbar fixed top-0 left-0 right-0 z-50 backdrop-blur-lg shadow-md transition-all duration-500"
      style={{
        background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
    >
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden text-gray-200">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-[#1a1a40]/90 rounded-box w-52"
          >
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-3 py-1 rounded-lg font-medium transition-all text-gray-200 hover:text-white hover:bg-white/10`
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

        <Link
          to="/"
          className="btn btn-ghost normal-case text-2xl font-bold text-white flex items-center gap-2"
        >
          <img src="/logo.png.jpeg" alt="MCMS Logo" className="w-8 h-8" />
          MCMS
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          {navLinks.map((link) => (
            <li key={link.path} className="relative">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative px-3 py-1 rounded-lg font-medium transition-all text-gray-200 hover:text-white`
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
          <div className="dropdown dropdown-end tooltip tooltip-left" data-tip={user?.displayName || user?.email}>
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-10 rounded-full ring ring-white/50 ring-offset-base-100 ring-offset-2 transition-all duration-300"
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
              className="mt-3 z-[999] w-56 space-y-1 bg-[#1a1a40]/90 shadow-xl backdrop-blur-xl border border-gray-600 p-4 rounded-xl menu menu-sm dropdown-content"
            >
              <li className="text-center text-sm font-semibold text-white mb-2 border-b pb-1 border-gray-600">
                {user?.displayName || user?.email}
              </li>

              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `block text-center rounded-lg py-2 px-4 font-medium transition-colors duration-200 ${
                      isActive ? "bg-white/20 text-white" : "hover:bg-white/10 text-gray-200"
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
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg py-2 mt-1 hover:shadow-lg transition-all duration-300"
                >
                  Log Out
                </motion.button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
          >
            Join Us
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;
