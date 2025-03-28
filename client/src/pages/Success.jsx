import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <svg
          className="w-16 h-16 text-green-500 mx-auto"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        <h1 className="text-2xl font-semibold mt-4">Payment Successful!</h1>
        <p className="text-gray-600 mt-2">
          You have successfully purchased the course.
        </p>
        <button
          onClick={() => navigate("/courses")}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Go to My Courses
        </button>
      </div>
    </div>
  );
};

export default Success;
