import React, { useEffect, useState } from "react";
import { AuthStore } from "../../store/AuthStore";
import { ThemeStore } from "../../store/ThemeStore";
import { CardSkeleton } from "../Skeleton";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyCourse = () => {
  const token = AuthStore((state) => state.token);
  const theme = ThemeStore((state) => state.theme);
  const isDark = theme === "dark";

  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/addCourse");
  };

  const handleEdit = (course) => {
    navigate(`/editCourse/${course._id}`, {
      state: {
        title: course.title,
        category: course.category,
      },
    });
  };

  const getCourse = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/courses/courseby_teacher`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmDelete) return;

    try {
      await fetch(
        `http://localhost:3000/api/courses/delete_course/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Course deleted successfully");
      getCourse();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <div
      className={`min-h-screen py-20 w-full ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">My Courses</h1>
          <button
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
            onClick={handleClick}
          >
            + Add New Course
          </button>
        </div>

        <div className="my-7">
          {isLoading ? (
            <CardSkeleton />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {courses.length > 0 ? (
                courses.map((course, index) => (
                  <div
                    key={index}
                    className={`shadow rounded-lg py-5 px-10 hover:shadow-lg transition ${
                      isDark
                        ? "bg-gray-800 text-gray-200"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <h2 className="text-lg font-semibold mb-1">
                      {course.title}
                    </h2>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Category:</span>{" "}
                      {course.category}
                    </p>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Status:</span>{" "}
                      {course.isPublished ? "Published" : "Not published"}
                    </p>
                    <p className="text-sm mb-3">
                      <span className="font-medium">Created:</span>{" "}
                      {new Date(course.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => handleEdit(course)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCourse(course._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full mt-10 text-gray-500">
                  You haven’t added any courses yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourse;
