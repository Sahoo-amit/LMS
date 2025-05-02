import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthStore } from "../store/AuthStore";
import { ThemeStore } from "../store/ThemeStore";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { isAuthenticated, role } = AuthStore();
  const { theme, toggleTheme } = ThemeStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDark = theme === "dark";

  const navLinkClass = ({ isActive }) =>
    `${isActive ? "text-orange-600 underline" : ""} hover:${
      isDark ? "text-blue-300" : "text-blue-600"
    } font-semibold`;

  return (
    <nav
      className={`w-full py-3 shadow-md fixed top-0 left-0 z-50 transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          <Link to="/">LearnHub</Link>
        </h1> 
        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated && role === "student" && (
            <NavLink to="/my_enrollment" className={navLinkClass}>
              My Learning
            </NavLink>
          )}
          <button
            onClick={toggleTheme}
            className={`cursor-pointer text-xl rounded-full p-2 duration-200 ${
              isDark ? "hover:bg-gray-700" : "hover:bg-gray-300"
            }`}
          >
            {isDark ? <MdOutlineLightMode /> : <MdDarkMode />}
          </button>

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
                <button className="cursor-pointer text-sm bg-purple-700 py-2 px-4 rounded-md text-white hover:bg-purple-900 transition">
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
                  className={`absolute right-0 mt-2 w-48 shadow-lg rounded-md py-2 z-20 ${
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
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div> 
      {mobileOpen && (
        <div
          className={`md:hidden absolute top-full left-0 w-full z-40 shadow-lg border-t ${
            isDark
              ? "bg-gray-900 text-white border-gray-700"
              : "bg-white text-black border-gray-200"
          } transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col gap-3 px-6 py-5">
            {isAuthenticated && role === "student" && (
              <NavLink
                to="/my_enrollment"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-orange-500 underline" : ""
                  } font-medium py-1 hover:${
                    isDark ? "text-blue-300" : "text-blue-600"
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                My Learning
              </NavLink>
            )}

            <button
              onClick={toggleTheme}
              className={`flex items-center gap-2 text-lg font-medium px-3 py-2 rounded-md transition ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
            >
              {isDark ? <MdOutlineLightMode /> : <MdDarkMode />}{" "}
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/signin"
                  className={`text-lg font-medium py-1 hover:${
                    isDark ? "text-green-400" : "text-green-600"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  Log In
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)}>
                  <button className="w-full text-sm bg-purple-700 py-2 px-4 rounded-md text-white hover:bg-purple-800 transition">
                    Get Started
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className={`block px-3 py-2 rounded-md font-medium ${
                    isDark
                      ? "text-gray-200 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/logout"
                  className={`block px-3 py-2 rounded-md font-medium ${
                    isDark
                      ? "text-red-400 hover:bg-gray-700"
                      : "text-red-600 hover:bg-red-100"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  Log Out
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;