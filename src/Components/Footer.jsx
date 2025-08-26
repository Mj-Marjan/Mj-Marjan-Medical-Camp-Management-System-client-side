import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="relative min-h-[50vh]  flex items-center justify-center p-6">
      {/* Glassmorphism Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="w-full max-w-6xl p-10 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl"
      >
        {/* Content inside glass box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-white">
          {/* About */}
          <div>
            <h2 className="text-3xl font-extrabold mb-4">Medical Camp Management System (MCMS)</h2>
            <p className="text-white/80 leading-relaxed text-lg">
              Connecting people who Sick their Problem with those who found camp.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-3xl font-extrabold mb-4">Quick Links</h2>
            <ul className="space-y-3 text-white/90 flex flex-col text-lg">
              <Link
                to="/"
                className="hover:text-white hover:font-semibold transition-all duration-300"
              >
                Home
              </Link>
              <Link
                to="/camps"
                className="hover:text-white hover:font-semibold transition-all duration-300"
              >
                Available Camps
              </Link>
              <Link
                to="/register"
                className="hover:text-white hover:font-semibold transition-all duration-300"
              >
                Register
              </Link>
              <Link
                to="/teamSlider"
                className="hover:text-white hover:font-semibold transition-all duration-300"
              >
                Contact
              </Link>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h2 className="text-3xl font-extrabold mb-4">Social Media</h2>
            <div className="flex space-x-7 text-4xl text-white/90">
              <a
                href="https://www.facebook.com/mdmarjan.mdmarjan.18"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors duration-300"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="text-center text-white/70 mt-12 border-t border-white/20 pt-6 text-sm select-none">
          © {new Date().getFullYear()} WhereIsIt | Developed with ❤️ by You
        </div>
      </motion.div>
    </div>
  );
};

export default Footer;
