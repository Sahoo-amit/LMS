import React, { useEffect, useState } from "react";
import { AuthStore } from "../store/AuthStore";
import { ThemeStore } from "../store/ThemeStore";

const DashBoard = () => {
  const token = AuthStore((state) => state.token);
  const theme = ThemeStore((state) => state.theme);
  const isDark = theme === "dark";

  const [courses, setCourses] = useState([]);

  const getAllCourses = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/courses/courseby_teacher",
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
    getAllCourses();
  }, []);

  return (
    <div
      className={`px-6 py-20 min-h-screen ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div
        className={`overflow-x-auto rounded-xl shadow ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <table
          className={`min-w-full border ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <thead
            className={`${
              isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
            } text-left text-sm uppercase`}
          >
            <tr>
              <th className="px-6 py-3 border-b">Course Title</th>
              <th className="px-6 py-3 border-b">Category</th>
              <th className="px-6 py-3 border-b">Course Level</th>
              <th className="px-6 py-3 border-b">Price</th>
              <th className="px-6 py-3 border-b">Enrolled Students</th>
              <th className="px-6 py-3 border-b">Income</th>
            </tr>
          </thead>
          <tbody
            className={`${isDark ? "text-gray-300" : "text-gray-800"} text-sm`}
          >
            {courses?.map((item, index) => (
              <tr
                key={index}
                className={`${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 border-b">{item.title}</td>
                <td className="px-6 py-4 border-b">{item.category}</td>
                <td className="px-6 py-4 border-b">{item.courseLevel}</td>
                <td className="px-6 py-4 border-b">Rs. {item.price}</td>
                <td className="px-6 py-4 border-b">
                  {item.enrolledStudents?.length}
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
  );
};

export default DashBoard;
