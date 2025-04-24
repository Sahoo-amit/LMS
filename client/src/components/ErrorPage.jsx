import React from "react";
import { Link } from "react-router-dom";
import { ThemeStore } from "../store/ThemeStore";

const NotFoundPage = () => {
  const theme = ThemeStore((state) => state.theme)

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 relative overflow-hidden ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div
        className={`absolute w-[150vmax] h-[150vmax] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 animate-spin z-0 ${
          theme === "dark"
            ? "bg-gradient-to-tr from-purple-500 to-pink-500"
            : "bg-gradient-to-tr from-blue-300 to-yellow-300"}`}/>
      <h1
        className={`text-[clamp(5rem,30vmin,15rem)] font-extrabold text-transparent bg-clip-text animate-pulse z-10 ${
          theme === "dark"
            ? "bg-gradient-to-br from-yellow-300 to-white"
            : "bg-gradient-to-br from-red-500 to-orange-500"}`}>
        404
      </h1>
      <div className="text-center z-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-bounce">
          Uh-oh! Page not found.
        </h2>
        <p
          className={`mb-8 max-w-md ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          The page you're looking for is unauthorized or doesn't exist.
        </p>

        <Link
          to="/"
          className={`inline-block font-bold py-3 px-6 rounded-full transition duration-300 hover:scale-105 ${
            theme === "dark"
              ? "bg-white text-black hover:bg-gray-300"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
