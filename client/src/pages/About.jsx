import React from "react";
import { motion } from "framer-motion";
import { ThemeStore } from "../store/ThemeStore";

const fadeInOut = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
};

const About = () => {
  const theme = ThemeStore((state) => state.theme);

  return (
    <motion.div
      className={`max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-16 md:py-20 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.6 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center"
        variants={fadeInOut}
        transition={{ duration: 0.6 }}
      >
        About Us
      </motion.h1>

      <motion.section
        className="mb-8 sm:mb-10"
        variants={fadeInOut}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">Our Mission</h2>
        <p
          className={`text-sm sm:text-base ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          At LearnX (your LMS name), our mission is to make high-quality
          education accessible to everyone, regardless of background or
          location. We focus on practical skills, expert mentorship, and
          real-world projects to help you become job-ready.
        </p>
      </motion.section>

      <motion.section
        className="mb-8 sm:mb-10"
        variants={fadeInOut}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">Our Journey</h2>
        <p
          className={`text-sm sm:text-base ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          LearnX started in 2024 with the goal of helping students bridge the
          gap between theoretical knowledge and real-world experience. Over
          time, we've built a platform with expert-led courses, hands-on labs,
          and a supportive community of learners.
        </p>
      </motion.section>

      <motion.section
        className="mb-8 sm:mb-10"
        variants={fadeInOut}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">
          Why Choose Us?
        </h2>
        <ul
          className={`text-sm sm:text-base list-disc pl-4 sm:pl-6 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <li>Industry-focused curriculum</li>
          <li>Interactive projects and assignments</li>
          <li>Mentor support and career guidance</li>
          <li>Access to a growing community of learners</li>
        </ul>
      </motion.section>

      <motion.section
        className="text-center mt-10 sm:mt-12"
        variants={fadeInOut}
        transition={{ duration: 0.5 }}
      >
        <p
          className={`text-base sm:text-lg font-medium ${
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Join thousands of learners and start your career transformation today!
        </p>
      </motion.section>
    </motion.div>
  );
};

export default About;
