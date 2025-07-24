import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthStore } from "../store/AuthStore";
import { CardSkeleton } from "../components/Skeleton";
import { ThemeStore } from "../store/ThemeStore";
import toast from "react-hot-toast";

const MyEnrollments = () => {
  const [myCourses, setMyCourses] = useState([]);
  const token = AuthStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIp, setCurrentIp] = useState(null);
  const { theme } = ThemeStore();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const getIp = async () => {
    const res = await fetch("https://lms-9f91.vercel.app/api/purchase/my-ip");
    const data = await res.json();
    setCurrentIp(data.ip);
  };

  const getCourse = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://lms-9f91.vercel.app/api/purchase/purchasedCourse",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setMyCourses(data.purchasedCourse);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleClick = (item) => {
    if (item.purchaseIP === currentIp) {
      navigate(`/course_progress/${item.courseId._id}`);
    } else {
      toast.error("Access denied. Invalid IP address.");
    }
  };

  useEffect(() => {
    getCourse();
    getIp();
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-7xl w-full mx-auto py-20 px-6 md:px-0">
        <h1 className="text-3xl font-bold">My Enrollments</h1>
        <div className="my-10">
          {isLoading ? (
            <CardSkeleton />
          ) : myCourses.length === 0 ? (
            <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
              You haven't purchased any course.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {myCourses.map((item, index) => (
                <div
                  key={index}
                  className={`border hover:scale-105 rounded-2xl overflow-hidden shadow hover:shadow-md transition duration-300 ${
                    isDark ? "bg-gray-800 border-gray-700" : "bg-white"
                  }`}
                >
                  <img
                    src={item.courseId.image}
                    alt="course"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <div className="flex flex-row-reverse justify-between items-center">
                      <span className="text-[10px] bg-blue-600 font-medium text-white p-1 rounded">
                        {item.courseId.courseLevel}
                      </span>
                      <h1
                        onClick={() => handleClick(item)}
                        className="text-lg font-semibold hover:underline cursor-pointer"
                      >
                        {item.courseId.title}
                      </h1>
                    </div>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      By {item.courseId.teacher?.username || "Unknown Teacher"}
                    </p>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {item.courseId.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyEnrollments;
