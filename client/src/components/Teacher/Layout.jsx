import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ThemeStore } from "../../store/ThemeStore";

const Layout = () => {
  const theme = ThemeStore((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <div
      className={`flex ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div
        className={`hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r sticky top-0 left-0 p-5 h-screen ${
          isDark
            ? "border-r-gray-700 bg-gray-800"
            : "border-r-gray-900 bg-gray-200"
        }`}
      >
        <div className="flex flex-col space-y-4 mt-20">
          <NavLink
            to=""
            className={({ isActive }) =>
              `${
                isActive ? (isDark ? "bg-gray-700" : "bg-gray-500") : ""
              } block py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="myUploads"
            className={({ isActive }) =>
              `${
                isActive ? (isDark ? "bg-gray-700" : "bg-gray-500") : ""
              } block py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors`
            }
          >
            Courses
          </NavLink>
        </div>
      </div>

      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
