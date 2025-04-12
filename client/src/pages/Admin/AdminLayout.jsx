import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ThemeStore } from "../../store/ThemeStore";

const AdminLayout = () => {
  const theme = ThemeStore((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <div
      className={`flex min-h-screen ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div
        className={`hidden lg:block w-[250px] sm:w-[300px] space-y-8 sticky top-0 left-0 p-5 h-screen border-r ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-gray-200 border-gray-900"
        }`}
      >
        <div className="flex flex-col space-y-4 mt-20">
          <NavLink
            to=""
            className={({ isActive }) =>
              `${
                isActive ? (isDark ? "bg-gray-600" : "bg-gray-500") : ""
              } block py-2 px-4 rounded-lg transition-colors ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-300"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="getuser"
            className={({ isActive }) =>
              `${
                isActive ? (isDark ? "bg-gray-600" : "bg-gray-500") : ""
              } block py-2 px-4 rounded-lg transition-colors ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-300"
              }`
            }
          >
            Users
          </NavLink>
        </div>
      </div>
      <div className="flex-grow p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
