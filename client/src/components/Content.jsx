import React from "react";
import Carousel from "./Carousel";
import { ThemeStore } from "../store/ThemeStore";

const Content = () => {
  const { theme } = ThemeStore();
  const isDark = theme === "dark";

  return (
    <div
      className={`mt-16 sm:mt-20 px-4 sm:px-6 md:px-8 transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <Carousel />

        <div className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg leading-relaxed text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
            Welcome to LearnHub
          </h2>

          <p className="px-2 sm:px-6">
            LearnHub is a modern online learning platform designed to empower
            students and professionals with high-quality, accessible education.
            From programming and design to business and marketing, we offer a
            wide range of courses tailored to meet your learning goals.
          </p>

          <span className="block mt-4 font-semibold text-sm sm:text-base">
            Learn from top industry experts and enhance your skills.
          </span>

          <p className="mt-4 px-2 sm:px-6">
            Whether you're looking to upskill, change careers, or explore a new
            passion, LearnHub provides you with the tools, resources, and
            community support to succeed. Start learning at your own pace,
            anytime, from anywhere.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Content;
