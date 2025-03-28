import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showOTPfield, setShowOTPfield] = useState(false);
  const [verified, setVerified] = useState(false);
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/forgot_password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setShowOTPfield(true);
      } else {
        setError(data);
      }
    } catch (error) {
      setLoading(false);
      setError("Something went wrong. Try again.");
      console.error(error);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/api/auth/verify_otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setToken(data.token);
        setVerified(true);
      } else {
        setError(data);
      }
    } catch (error) {
      setLoading(false);
      setError("Invalid OTP.");
      console.error(error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if(newPassword !== confirmPassword){
      return toast.error("Password must be same.")
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/api/auth/reset_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        alert("Password reset successfully.");
        navigate("/signin");
      } else {
        setError(data);
      }
    } catch (error) {
      setLoading(false);
      setError("Error resetting password.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Forgot Password</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!showOTPfield ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : !verified ? (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <input
              type="email"
              value={email}
              disabled
              className="w-full p-2 border rounded-lg bg-gray-200"
            />
            <input
              type="text"
              placeholder="Enter OTP"
              required
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <input
              type="email"
              value={email}
              disabled
              className="w-full p-2 border rounded-lg bg-gray-200"
            />
            <input
              type="password"
              placeholder="Enter new password"
              required
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm password"
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 disabled:bg-gray-400"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;