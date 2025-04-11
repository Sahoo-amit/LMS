import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthStore } from "../store/AuthStore";
import { ThemeStore } from "../store/ThemeStore";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

const Navbar = () => {
  const { isAuthenticated, role } = AuthStore();
  const { theme, toggleTheme } = ThemeStore();
  const [profileOpen, setProfileOpen] = useState(false);

  const isDark = theme === "dark";

  return (
    <nav
      className={`w-full py-3 shadow-md fixed top-0 left-0 z-10 transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1>
          <Link
            to="/"
            className={`text-3xl font-semibold hover:${
              isDark ? "text-gray-300" : "text-gray-800"
            }`}
          >
            E-Learning
          </Link>
        </h1>
        <div className="hidden md:flex items-center gap-7">
          <button
            className={`cursor-pointer text-xl rounded-full p-2 duration-200 ${
              isDark ? "hover:bg-gray-700" : "hover:bg-gray-300"
            }`}
            onClick={toggleTheme}
          >
            {isDark ? <MdOutlineLightMode /> : <MdDarkMode />}
          </button>

          {isAuthenticated && role === "student" && (
            <Link
              to="/my_enrollment"
              className={`hover:${isDark ? "text-blue-300" : "text-blue-600"}`}
            >
              My Enrollments
            </Link>
          )}

          {!isAuthenticated ? (
            <>
              <Link
                to="/signin"
                className={`text-lg hover:${
                  isDark ? "text-green-400" : "text-green-600"
                }`}
              >
                Log In
              </Link>
              <Link to="/signup">
                <button className="cursor-pointer text-xl bg-purple-700 py-2 px-3 hover:rounded-4xl duration-300 text-white rounded-sm hover:bg-purple-900">
                  Get Started
                </button>
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                className={`cursor-pointer px-4 py-2 rounded-md ${
                  isDark ? "bg-gray-700 text-white" : "bg-gray-800 text-white"
                }`}
                onClick={() => setProfileOpen(!profileOpen)}
              >
                Profile
              </button>
              {profileOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 shadow-lg rounded-md py-2 ${
                    isDark ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <Link
                    to="/profile"
                    className={`block px-4 py-2 ${
                      isDark
                        ? "text-gray-200 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setProfileOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/logout"
                    className={`block px-4 py-2 ${
                      isDark
                        ? "text-red-400 hover:bg-gray-700"
                        : "text-red-600 hover:bg-gray-200"
                    }`}
                    onClick={() => setProfileOpen(false)}
                  >
                    Log Out
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
