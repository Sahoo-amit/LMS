import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthStore } from "../store/AuthStore";
import { ThemeStore } from "../store/ThemeStore";
import Payment from "../components/Payment";
import { CiLock } from "react-icons/ci";
import ReactPlayer from "react-player";
import { IoPlayCircleOutline } from "react-icons/io5";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = AuthStore((state) => state.token);
  const isDark = ThemeStore((state) => state.isDark);

  const [course, setCourse] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [loading, setLoading] = useState(true);

  const getCourseDetails = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/courses/get_course/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setCourse(data.course);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getPurchasedCourse = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/purchase/course/${id}/get_course`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setIsPurchased(data.purchasedCourse);
    } catch (err) {
      console.log(err);
    }
  };

  const handleProgress = () => {
    if (isPurchased) {
      // navigate(`/course_progress/${id}`);
      navigate("/my_enrollment");
    }
  };

  useEffect(() => {
    getCourseDetails();
    getPurchasedCourse();
  }, [id]);

  if (loading || !course) {
    return (
      <div
        className={`mt-32 text-center text-lg ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Loading course details...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen mt-20 px-4 py-8 transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Course Metadata */}
        <div
          className={`rounded-md p-6 ${
            isDark ? "bg-gray-800" : "bg-white shadow"
          }`}
        >
          <h1 className="text-3xl font-semibold">{course.title}</h1>
          <p className="text-lg italic mt-1">{course.subtitle}</p>
          <p className="text-sm mt-2">
            Created by{" "}
            <span className="underline">{course.teacher?.username}</span>
          </p>
          <p className="text-sm">
            Email:{" "}
            <a
              href={`mailto:${course.teacher?.email}`}
              className="text-blue-500 underline"
            >
              {course.teacher?.email}
            </a>
          </p>
          <p className="text-sm">
            Last updated: {course.updatedAt?.split("T")[0]}
          </p>
          <p className="text-sm">
            Students enrolled: {course.enrolledStudents?.length}
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <div
              className={`prose max-w-full text-sm ${
                isDark ? "prose-invert" : ""
              }`}
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
            <div
              className={`mt-6 p-5 rounded-lg border ${
                isDark ? "border-gray-700" : "border-gray-300"
              }`}
            >
              <h2 className="text-xl font-semibold mb-1">Course Content</h2>
              <p className="text-sm mb-2">
                Number of lectures: {course.lectures?.length || 0}
              </p>
              {course.lectures?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 mt-2 text-sm"
                >
                  <span>
                    {item.isPreviewFree ? <IoPlayCircleOutline /> : <CiLock />}
                  </span>
                  <span>{item.lectureTitle}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div
            className={`w-full lg:w-1/3 rounded-md p-5 ${
              isDark
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-300 shadow"
            }`}
          >
            <div className="h-60 mb-2">
              <ReactPlayer
                url={course?.lectures?.[0]?.videoUrl || ""}
                width="100%"
                height="100%"
                controls
              />
            </div>
            <p className="text-sm mb-2">
              {course?.lectures?.[0]?.lectureTitle || "No preview available"}
            </p>
            <hr />
            <p className="text-lg mt-2">
              Price:{" "}
              <span className="text-green-600 dark:text-green-400 font-semibold">
                ₹{course.price}
              </span>
            </p>
            <div className="mt-4">
              {isPurchased ? (
                <button
                  onClick={handleProgress}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                >
                  Continue Course
                </button>
              ) : (
                <Payment id={id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
