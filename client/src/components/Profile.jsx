import React, { useEffect, useState } from "react";
import { AuthStore } from "../store/AuthStore";
import toast from "react-hot-toast";
import { ThemeStore } from "../store/ThemeStore";

const Profile = () => {
  const token = AuthStore((state) => state.token);
  const userId = AuthStore((state) => state.userId);
  const theme = ThemeStore((state) => state.theme); // Get current theme
  const [isLoading, setIsLoading] = useState(false);
  const [newData, setNewData] = useState({ username: "", photoUrl: null });
  const [userData, setUserData] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getData();
  }, [token]);

  const getData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/auth/getProfile/${userId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setUserData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewData({ ...newData, photoUrl: e.target.files[0] });
  };

  const updateData = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const formData = new FormData();
      if (newData.username.trim())
        formData.append("username", newData.username);
      if (newData.photoUrl) formData.append("profileUrl", newData.photoUrl);

      const res = await fetch(
        `http://localhost:3000/api/auth/update_profile/${userId}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (res.ok) {
        toast.success("Profile updated successfully.");
        setNewData({ username: "", photoUrl: null });
        await getData();
        setIsEdit(false);
      } else {
        toast.error("Failed to update profile.");
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`h-screen w-full py-20 transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}>
      <div
        className={`max-w-7xl mx-auto transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h1 className="text-2xl font-bold">Profile</h1>
        <div className="flex gap-10">
          <img
            src={userData.photoUrl || "/default-profile.png"}
            alt="Profile"
            className="h-24 w-24 rounded-full object-cover border-2 border-gray-300 shadow-md"
          />
          <div>
            <p>
              Name: <span>{userData.username}</span>
            </p>
            <p>
              Email: <span>{userData.email}</span>
            </p>
            <p>
              Role: <span>{userData.role}</span>
            </p>
            <button
              onClick={() => setIsEdit(!isEdit)}
              className="bg-green-600 px-3 py-1 hover:bg-green-700 duration-200 cursor-pointer rounded-lg text-white mt-6"
            >
              {isEdit ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {isEdit && (
          <form onSubmit={updateData} className="mt-4">
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Enter new name"
                name="username"
                id="username"
                value={newData.username}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="photoUrl">Profile Picture</label>
              <input
                type="file"
                name="photoUrl"
                id="photoUrl"
                onChange={handleFileChange}
                accept="image/*"
                className="border p-2 rounded w-full"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`mt-4 bg-blue-500 px-4 py-2 text-white rounded ${
                isLoading && "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Updating" : "Update"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
