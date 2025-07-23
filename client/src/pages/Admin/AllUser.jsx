import React, { useEffect, useState } from "react";
import { AuthStore } from "../../store/AuthStore";
import { ThemeStore } from "../../store/ThemeStore";
import toast from "react-hot-toast";

const AllUser = () => {
  const token = AuthStore((state) => state.token);
  const theme = ThemeStore((state) => state.theme);
  const isDark = theme === "dark";

  const [users, setUsers] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [roleSelections, setRoleSelections] = useState({});

  const getUser = async () => {
    try {
      const res = await fetch("https://lms-31ko.vercel.app/api/auth/allUser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUsers(data);
      const roles = {};
      data.forEach((user) => {
        roles[user._id] = user.role;
      });
      setRoleSelections(roles);
    } catch (error) {
      console.log(error);
    }
  };

  const updateRole = async (id) => {
    try {
      await fetch(`https://lms-31ko.vercel.app/api/auth/updateRole/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newRole: roleSelections[id] }),
      });
      toast.success("Role updated successfully.");
      setEditableRow(null);
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure to remove this user?");
    if (!confirmDelete) return;
    try {
      await fetch(`https://lms-31ko.vercel.app/api/auth/deleteUser/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("User deleted successfully.");
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRoleChange = (id, newRole) => {
    setRoleSelections({ ...roleSelections, [id]: newRole });
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
      <h1 className="text-2xl font-bold mb-6">User Details</h1>
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
              <th className="px-6 py-3 border-b">Profile Picture</th>
              <th className="px-6 py-3 border-b">Username</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">Role</th>
              <th className="px-6 py-3 border-b">Update Role</th>
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
                <td className="px-6 py-4 border-b">
                  <img
                    src={item.photoUrl}
                    alt="profile pic"
                    className="h-24 w-24 rounded-full object-cover border-2 border-gray-300 shadow-md"
                  />
                </td>
                <td className="px-6 py-4 border-b">{item.username}</td>
                <td className="px-6 py-4 border-b">
                  <a
                    href={`mailto:${item.email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {item.email}
                  </a>
                </td>
                <td className="px-6 py-4 border-b">
                  <select
                    value={roleSelections[item._id]}
                    onChange={(e) => handleRoleChange(item._id, e.target.value)}
                    disabled={editableRow !== item._id}
                    className={`px-2 py-1 border rounded w-full ${
                      editableRow !== item._id
                        ? "cursor-not-allowed bg-gray-500 text-white"
                        : `${
                            isDark ? "bg-gray-900 text-white" : "bg-white"
                          } cursor-pointer`
                    }`}
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4 border-b">
                  {editableRow === item._id ? (
                    <button
                      onClick={() => updateRole(item._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditableRow(item._id)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 cursor-pointer"
                    >
                      Edit
                    </button>
                  )}
                </td>
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

export default AllUser;
