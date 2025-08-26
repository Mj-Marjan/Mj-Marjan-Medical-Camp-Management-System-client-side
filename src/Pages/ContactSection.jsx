import React, { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_3fzimcb",
        "template_yoxjlhm",
        formData,
        "GtrmG4jm7Xb-B3RMp"
      )
      .then(
        () => {
          toast.success("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
          setLoading(false);
        },
        (error) => {
          toast.error("Failed to send message!");
          console.error(error);
          setLoading(false);
        }
      );
  };

  return (
    <section className="relative py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-white/5 via-purple-800/20 to-indigo-900/20 backdrop-blur-xl rounded-3xl overflow-hidden">
      <Toaster position="top-right" />
      {/* Glowy background shapes */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-10 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center mb-12 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text text-white mb-4 drop-shadow-lg"
        >
          Get in Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto"
        >
          Have a question or suggestion? Fill out the form below and we will
          respond as soon as possible!
        </motion.p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/10 dark:bg-gray-900/30 backdrop-blur-lg shadow-xl rounded-3xl p-8 md:p-12 max-w-3xl mx-auto grid gap-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            whileFocus={{ scale: 1.02, borderColor: "#a78bfa" }}
            className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/60 dark:bg-gray-800 dark:text-white transition-all duration-300 shadow-sm hover:shadow-md"
          />
          <motion.input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            whileFocus={{ scale: 1.02, borderColor: "#a78bfa" }}
            className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/60 dark:bg-gray-800 dark:text-white transition-all duration-300 shadow-sm hover:shadow-md"
          />
        </div>

        <motion.textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
          rows="5"
          whileFocus={{ scale: 1.02, borderColor: "#a78bfa" }}
          className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/60 dark:bg-gray-800 dark:text-white resize-none transition-all duration-300 shadow-sm hover:shadow-md"
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168,85,247,0.6)" }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-indigo-600 shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send Message"}
        </motion.button>
      </motion.form>
    </section>
  );
};

export default ContactSection;
