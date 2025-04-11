import React from "react";
import { reviews } from "../utils/reviews";
import { courses } from "../utils/courses";
import { useNavigate } from "react-router-dom";
import { AuthStore } from "../store/AuthStore";
import { ThemeStore } from "../store/ThemeStore";

const Testimonials = () => {
  const { isAuthenticated } = AuthStore();
  const { theme } = ThemeStore();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(isAuthenticated ? "/courses" : "/signin");
  };

  return (
    <div
      className={`max-w-7xl mx-auto px-4 md:px-8 py-10 transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-semibold text-center mb-8">
        Featured Courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((item, index) => {
          const { image, title, description, rating, price } = item;
          return (
            <div
              key={index}
              className={`rounded-lg p-4 border transition duration-300 hover:scale-105 ${
                isDark
                  ? "bg-gray-800 border-gray-700 hover:shadow-xl"
                  : "bg-white border-gray-200 hover:shadow-lg"
              }`}
            >
              <img
                src={image}
                alt="course"
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold">{title}</h3>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {description}
              </p>
              <p className="mt-2 font-semibold">Price: ${price}</p>
              <p className="text-yellow-500 font-semibold">
                Rating: {rating} ⭐
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          onClick={handleClick}
        >
          Show All
        </button>
      </div>

      {/* Reviews Section */}
      <h2 className="text-2xl font-semibold text-center mt-12 mb-6">
        What Our Students Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((item, index) => {
          const { image, review, rating } = item;
          return (
            <div
              key={index}
              className={`rounded-lg p-4 border transition duration-300 ${
                isDark
                  ? "bg-gray-800 border-gray-700 hover:shadow-xl"
                  : "bg-white border-gray-200 hover:shadow-lg"
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={image}
                  alt="review"
                  className="w-16 h-16 rounded-full border border-gray-300"
                />
                <div>
                  <p className="text-yellow-500 font-semibold">{rating} ⭐</p>
                </div>
              </div>
              <p
                className={`mt-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                {review}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Testimonials;
