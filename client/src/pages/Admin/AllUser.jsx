import React, { useEffect, useState } from "react";
import { AuthStore } from "../../store/AuthStore";
import toast from "react-hot-toast";

const AllUser = () => {
  const token = AuthStore((state) => state.token);
  const [users, setUsers] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [roleSelections, setRoleSelections] = useState({});

  const getUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/allUser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data)
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
      const res = await fetch(
        `http://localhost:3000/api/auth/updateRole/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newRole: roleSelections[id] }),
        }
      );
      toast.success("Role updated successfully.")
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
      const res = await fetch(
        `http://localhost:3000/api/auth/deleteUser/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Course deleted successfully.")
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Details</h1>
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 text-left text-sm uppercase">
            <tr>
              <th className="px-6 py-3 border-b">Profile Picture</th>
              <th className="px-6 py-3 border-b">Username</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">Role</th>
              <th className="px-6 py-3 border-b">Update Role</th>
              <th className="px-6 py-3 border-b">Delete User</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {users?.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
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
                    className="text-blue-600 hover:underline"
                  >
                    {item.email}
                  </a>
                </td>
                <td className="px-6 py-4 border-b">
                  <select
                    value={roleSelections[item._id]}
                    onChange={(e) => handleRoleChange(item._id, e.target.value)}
                    disabled={editableRow !== item._id}
                    className={`px-2 py-1 border rounded ${editableRow !== item._id ? "cursor-not-allowed bg-gray-400":"cursor-pointer"}`}
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
