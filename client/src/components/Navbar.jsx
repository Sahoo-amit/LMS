import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthStore } from "../store/AuthStore";
import { ThemeStore } from "../store/ThemeStore";
import { FiMenu, FiX } from "react-icons/fi";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const { isAuthenticated, role } = AuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = ThemeStore();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false); // State for profile dropdown

  return (
    <nav className="w-full py-3 shadow-md fixed top-0 left-0 z-10 bg-white">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6">
        <h1>
          <Link
            to="/"
            className="text-3xl font-semibold  hover:text-gray-800 dark:hover:text-gray-300"
          >
            E-Learning
          </Link>
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7">
          {/* Theme Toggle */}
          <button
            className="cursor-pointer text-xl rounded-full p-2 duration-200 hover:bg-gray-300"
            onClick={() => toggleTheme()}
          >
            {theme === "dark" ? <MdOutlineLightMode /> : <MdDarkMode />}
          </button>

          {isAuthenticated && role === "student" && (
            <Link
              to="/my_enrollment"
              className="hover:text-blue-600 dark:text-gray-300"
            >
              My Enrollments
            </Link>
          )}

          {!isAuthenticated ? (
            <>
              <Link
                to="/signin"
                className="hover:text-green-600 text-lg dark:text-gray-300"
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
            <Link to="/logout">
              <button className="cursor-pointer bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-800">
                Log Out
              </button>
            </Link>
          )}
        </div>

        {/* Profile Icon for Mobile & Desktop */}
        <div className="relative md:hidden">
          <button
            className="text-2xl cursor-pointer focus:outline-none"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <CgProfile />
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={() => setProfileOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-red-600 hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={() => setProfileOpen(false)}
                  >
                    Log Out
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={() => setProfileOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-blue-600 hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={() => setProfileOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
