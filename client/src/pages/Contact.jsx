import React, { useState } from "react";
import { ThemeStore } from "../store/ThemeStore";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const fadeInOut = {
  initial: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
};

const Contact = () => {
  const theme = ThemeStore((state) => state.theme);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://lms-backend-z77i.onrender.com/api/contact/send_message`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );
      const data = await res.json();
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      id="contact"
      className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
      initial="initial"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 text-center"
        variants={fadeInOut}
        transition={{ duration: 0.6 }}
      >
        Contact Us
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        variants={fadeInOut}
        transition={{ duration: 0.6 }}
      >
        <motion.div variants={fadeInOut} transition={{ duration: 0.6 }}>
          <label
            htmlFor="name"
            className="block font-semibold mb-1 text-sm sm:text-base"
          >
            Name
          </label>
          <input
            id="name"
            name="username"
            type="text"
            value={userData.username}
            required
            onChange={handleChange}
            className={`w-full p-3 rounded border text-sm sm:text-base ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-white"
                : "border-gray-300"
            }`}
            placeholder="Your Name"
          />
        </motion.div>
        <motion.div variants={fadeInOut} transition={{ duration: 0.6 }}>
          <label
            htmlFor="email"
            className="block font-semibold mb-1 text-sm sm:text-base"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            required
            className={`w-full p-3 rounded border text-sm sm:text-base ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-white"
                : "border-gray-300"
            }`}
            placeholder="your@email.com"
          />
        </motion.div>
        <motion.div variants={fadeInOut} transition={{ duration: 0.6 }}>
          <label
            htmlFor="message"
            className="block font-semibold mb-1 text-sm sm:text-base"
          >
            Message
          </label>
          <textarea
            id="message"
            rows="5"
            name="message"
            onChange={handleChange}
            value={userData.message}
            required
            className={`w-full p-3 rounded border text-sm sm:text-base ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-white"
                : "border-gray-300"
            }`}
            placeholder="Your message here..."
          />
        </motion.div>
        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded transition"
        >
          Send Message
        </button>
      </motion.form>
    </motion.div>
  );
};

export default Contact;
