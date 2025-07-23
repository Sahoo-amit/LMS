import React, { useEffect, useState } from "react";
import { AuthStore } from "../store/AuthStore";
import toast from "react-hot-toast";
import { ThemeStore } from "../store/ThemeStore";

const Profile = () => {
  const token = AuthStore((state) => state.token);
  const userId = AuthStore((state) => state.userId);
  const theme = ThemeStore((state) => state.theme);
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
        `https://lms-31ko.vercel.app/api/auth/getProfile/${userId}`,
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
        `https://lms-31ko.vercel.app/api/auth/update_profile/${userId}`,
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
    <div
      className={`h-screen w-full py-20 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Profile</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex justify-center md:justify-start">
            <img
              src={userData.photoUrl || "/default-profile.png"}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover border-2 border-gray-300 shadow-md"
            />
          </div>
          <div className="flex flex-col justify-center items-center md:items-start">
            <p className="text-lg mb-2">
              Name: <span className="font-semibold">{userData.username}</span>
            </p>
            <p className="text-lg mb-2">
              Email: <span className="font-semibold">{userData.email}</span>
            </p>
            <p className="text-lg mb-6">
              Role: <span className="font-semibold">{userData.role}</span>
            </p>
            <button
              onClick={() => setIsEdit(!isEdit)}
              className="bg-green-600 px-4 py-2 rounded-md text-white mt-6 hover:bg-green-700 duration-200"
            >
              {isEdit ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {isEdit && (
          <form onSubmit={updateData} className="mt-6 w-full md:w-1/2 mx-auto px-4">
            <div className="mb-4">
              <label htmlFor="username" className="block text-lg font-semibold">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter new name"
                name="username"
                id="username"
                value={newData.username}
                onChange={handleChange}
                className="border p-3 rounded w-full mt-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="photoUrl" className="block text-lg font-semibold">
                Profile Picture
              </label>
              <input
                type="file"
                name="photoUrl"
                id="photoUrl"
                onChange={handleFileChange}
                accept="image/*"
                className="border p-3 rounded w-full mt-2"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`mt-4 bg-blue-500 px-6 py-3 text-white rounded w-full ${
                isLoading && "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
