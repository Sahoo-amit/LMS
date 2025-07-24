import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthStore } from "../../store/AuthStore";
import { ThemeStore } from "../../store/ThemeStore";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const token = AuthStore((state) => state.token);
  const theme = ThemeStore((state) => state.theme)

  const getCourseData = async () => {
    try {
      const res = await fetch(
        "https://lms-9f91.vercel.app/api/courses/admin_details",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseData();
  }, []);

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="px-6 py-20 ">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="overflow-x-auto rounded-xl shadow">
          <table
            className={`min-w-full border ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <thead
              className={`${
                isDark
                  ? "bg-gray-700 text-gray-200"
                  : "bg-gray-100 text-gray-700"
              } text-left text-sm uppercase`}
            >
              <tr>
                <th className="px-6 py-3 border-b w-56">Course Title</th>
                <th className="px-6 py-3 border-b">Mentor</th>
                <th className="px-6 py-3 border-b">Email I'd</th>
                <th className="px-6 py-3 border-b">Price</th>
                <th className="px-6 py-3 border-b">Enrolled Students</th>
                <th className="px-6 py-3 border-b">Income</th>
              </tr>
            </thead>
            <tbody
              className={`${
                isDark ? "text-gray-200" : "text-gray-800"
              } text-sm`}
            >
              {courses?.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 border-b">{item.title}</td>
                  <td className="px-6 py-4 border-b">
                    {item.teacher.username}
                  </td>
                  <td className="px-6 py-4 border-b">
                    <a
                      href={`mailto:${item.teacher.email}`}
                      className="text-blue-500 hover:underline"
                    >
                      {item.teacher.email}
                    </a>
                  </td>
                  <td className="px-6 py-4 border-b">Rs. {item.price}</td>
                  <td className="px-6 py-4 border-b">
                    {item.enrolledStudents?.length || 0}
                  </td>
                  <td className="px-6 py-4 border-b">
                    Rs. {item.price * item.enrolledStudents?.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
