import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthStore } from "../store/AuthStore";
import { GrFormViewHide } from "react-icons/gr";
import { BiShow } from "react-icons/bi";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { storeToken } = AuthStore();
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const checkInput = () => {
    const { email, password } = user;
    if (!email || !password) {
      toast.error("All fields are required.");
      return false;
    }
    if (password.length < 4) {
      toast.error("Password must be at least 4 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkInput()) return;
    setIsLoading(true)
    try {
      const res = await fetch(
        `http://localhost:3000/api/auth/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );
      if (res.ok) {
        const data = await res.json();
        setIsLoading(false);
        storeToken(data.token, data.userExist.role, data.userExist._id);
        toast.success(data.message);
        navigate("/");
      } else {
        setIsLoading(false)
        toast.error("Authentication failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Log In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="********"
              value={user.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <BiShow size={20} />
              ) : (
                <GrFormViewHide size={20} />
              )}
            </span>
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
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">Don't have an account?</p>
          <Link to="/signup" className="text-blue-500 hover:underline mt-1">
            Sign Up Here
          </Link>
        </div>
        <Link to={`/forgot_password?email=${user.email}`} className="text-blue-500 hover:underline mt-1">
          Forgot Password ?
        </Link>
      </div>
    </div>
  );
};

export default Login;
