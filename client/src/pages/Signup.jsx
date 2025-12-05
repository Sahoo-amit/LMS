import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthStore } from "../store/AuthStore";
import { GrFormViewHide } from "react-icons/gr";
import { BiShow } from "react-icons/bi";
import { ThemeStore } from "../store/ThemeStore";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { storeToken } = AuthStore();
  const { theme } = ThemeStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isDark = theme === "dark";

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const checkInput = () => {
    const { username, email, password, confirmPassword } = user;
    if (!username || !email || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password didn't match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkInput()) return;
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://lms-zeta-seven.vercel.app/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );
      if (res.ok) {
        const data = await res.json();
        storeToken(data.token, data.user.role, data.user._id);
        toast.success("Registration successful.");
        navigate("/");
      } else {
        toast.error("Authentication failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`shadow-lg rounded-lg p-8 w-96 transition-colors duration-300 ${
          isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="John Doe"
              value={user.username}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                  : "bg-white text-black border-gray-300"
              }`}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="abc@example.com"
              value={user.email}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                  : "bg-white text-black border-gray-300"
              }`}
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="********"
              value={user.password}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                  : "bg-white text-black border-gray-300"
              }`}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-11 transform -translate-y-1/2 cursor-pointer ${
                isDark
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {showPassword ? (
                <BiShow size={20} />
              ) : (
                <GrFormViewHide size={20} />
              )}
            </span>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="********"
              value={user.confirmPassword}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                  : "bg-white text-black border-gray-300"
              }`}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full cursor-pointer py-2 rounded-md transition duration-300 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Already have an account?
          </p>
          <Link
            to="/signin"
            className="text-blue-500 hover:underline mt-1 block"
          >
            Log In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
