import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthStore } from "../../store/AuthStore";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const token = AuthStore((state) => state.token);
  const getCourseData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/purchase/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data.purchasedCourses);
      setCourses(data.purchasedCourses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 text-left text-sm uppercase">
            <tr>
              <th className="px-6 py-3 border-b">Course Title</th>
              <th className="px-6 py-3 border-b">Mentor</th>
              <th className="px-6 py-3 border-b">Email I'd</th>
              <th className="px-6 py-3 border-b">Price</th>
              <th className="px-6 py-3 border-b">Enrolled Students</th>
              <th className="px-6 py-3 border-b">Income</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {courses?.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{item.title}</td>
                <td className="px-6 py-4 border-b">{item.teacher.username}</td>
                <td className="px-6 py-4 border-b">
                  <a href={`mailto:${item.teacher.email}`} className="text-blue-600 hover:underline">
                    {item.teacher.email}
                  </a>
                </td>
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

export default AdminDashboard;
