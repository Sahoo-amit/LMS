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
            Welcome to E-Learning
          </h2>

          <p className="px-2 sm:px-6">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero
            nemo ratione aliquam soluta iure quos, aut, voluptatum atque cum
            laboriosam voluptate quas ab nisi quo, ad omnis vero itaque fugiat.
          </p>

          <span className="block mt-4 font-semibold text-sm sm:text-base">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </span>

          <p className="mt-4 px-2 sm:px-6">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero illo
            facilis maiores id est saepe excepturi eligendi eveniet?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Content;
