import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthStore } from "../store/AuthStore";
import { ThemeStore } from "../store/ThemeStore";
import { motion } from "framer-motion";

const fadeInOut = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
};

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [courses, setCourses] = useState([]);
  const { isAuthenticated } = AuthStore();
  const { theme } = ThemeStore();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const viewCourses = courses?.slice(0, 6);

  const getCourses = async () => {
    try {
      const res = await fetch(
        "https://lms-backend-z77i.onrender.com/api/courses/published_course",
        {
          method: "GET"
        }
      );
      const data = await res.json();
      setCourses(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getReviews = async () => {
    try {
      const res = await fetch("https://lms-backend-z77i.onrender.com/api/courses/getReviews");
      const data = await res.json();
      setReviews(data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
    getReviews();
  }, []);

  const handleClick = () => {
    navigate(isAuthenticated ? "/courses" : "/signin");
  };

  return (
    <motion.div
      className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
      initial="hidden"
      exit="exit"
      whileInView="visible"
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.1 }}
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-semibold text-center mb-8"
        variants={fadeInOut}
        transition={{ duration: 0.6 }}
      >
        Featured Courses
      </motion.h2> 
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
        variants={fadeInOut}
        transition={{ duration: 0.6 }}
      >
        {viewCourses.map((item, index) => {
          const { image, title, description, averageRating, price } = item;
          return (
            <motion.div
              key={index}
              className={`rounded-lg p-4 border transition duration-300 hover:scale-105 ${
                isDark
                  ? "bg-gray-800 border-gray-700 hover:shadow-xl"
                  : "bg-white border-gray-200 hover:shadow-lg"
              }`}
              variants={fadeInOut}
              transition={{ duration: 0.6 }}
            >
              <img
                src={image}
                alt="course"
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
              <p className="mt-2 font-semibold">Price: Rs.{price}</p>
              <p className="text-yellow-500 font-semibold"></p>
              <p className="my-1 font-semibold text-sm">
                Rating: {averageRating}
              </p>
              <p
                className={`text-sm sm:text-base line-clamp-3 ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </motion.div>
          );
        })}
      </motion.div> 
      <motion.div
        className="flex justify-center mt-6"
        variants={fadeInOut}
        transition={{ duration: 0.6 }}
      >
        <button
          className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          onClick={handleClick}
        >
          Show All
        </button>
      </motion.div> 
      <motion.h2
        className="text-xl sm:text-2xl font-semibold text-center mt-12 mb-6"
        variants={fadeInOut}
        transition={{ duration: 0.6 }}
      >
        What Our Students Say
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={fadeInOut}
        transition={{ duration: 0.6 }}
      >
        {reviews.slice(0, 4).map((review, index) => (
          <motion.div
            key={index}
            className={`p-5 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border ${
              isDark
                ? "bg-gray-800 border-gray-700 text-gray-100"
                : "bg-white border-gray-100 text-gray-900"
            }`}
            variants={fadeInOut}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.user.photoUrl}
                alt={review.user.username}
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <p
                  className={`font-semibold ${
                    isDark ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {review.user.username}
                </p>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {review.courseTitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xl ${
                    i < review.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <p
              className={`text-sm sm:text-base mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {review.comment}
            </p>
            <p className="text-xs text-gray-400">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Testimonials;
