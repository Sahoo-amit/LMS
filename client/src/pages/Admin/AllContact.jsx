import React, { useEffect, useState } from "react";
import { AuthStore } from "../../store/AuthStore";
import { ThemeStore } from "../../store/ThemeStore";
import toast from "react-hot-toast";

const AllContact = () => {
  const token = AuthStore((state) => state.token);
  const theme = ThemeStore((state) => state.theme);
  const isDark = theme === "dark";

  const [users, setUsers] = useState([]);

  const getUser = async () => {
    try {
      const res = await fetch(
        "https://lms-backend-z77i.onrender.com/api/contact/get_contact",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure to remove this user?");
    if (!confirmDelete) return;
    try {
      await fetch(
        `https://lms-backend-z77i.onrender.com/api/auth/contact/delete_message`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User deleted successfully.");
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div
      className={`px-6 py-20 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6">All Contacts</h1>
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
              <th className="px-6 py-3 border-b">Username</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">Message</th>
              <th className="px-6 py-3 border-b">Delete User</th>
            </tr>
          </thead>
          <tbody
            className={`${isDark ? "text-gray-300" : "text-gray-800"} text-sm`}
          >
            {users?.map((item) => (
              <tr
                key={item._id}
                className={`${
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 border-b">{item.username}</td>
                <td className="px-6 py-4 border-b">
                  <a
                    href={`mailto:${item.email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {item.email}
                  </a>
                </td>
                <td className="px-6 py-4 border-b">{item.message}</td>
                <td className="px-6 py-4 border-b">
                  <button
                    onClick={() => deleteUser(item._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllContact;
