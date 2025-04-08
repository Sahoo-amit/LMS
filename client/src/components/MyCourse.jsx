import React, { useEffect, useState } from "react";
import { AuthStore } from "../store/AuthStore";
import { CardSkeleton } from "./Skeleton";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyCourse = () => {
  const token = AuthStore((state) => state.token);
  const userId = AuthStore((state) => state.userId);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/addCourse");
  };

  const handleEdit = (abc)=>{
    navigate(`/editCourse/${abc._id}`,{
      state: {
        title: abc.title,
        category: abc.category
      }
    })
  }

  const getCourse = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/courses/courseby_teacher/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setCourses(data);
      console.log(data)
      console.log(data.isPublish === undefined ? false : true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCourse = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this course?")
    if(!confirmDelete) return
    try {
      const res = await fetch(
        `http://localhost:3000/api/courses/delete_course/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      getCourse();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <div className="p-5">
      <h1 className="font-bold text-2xl">My Courses</h1>
      <button
        className="text-lg px-3 py-2 bg-gray-900 text-white rounded-sm mt-6 cursor-pointer hover:bg-gray-800"
        onClick={handleClick}
      >
        Add a new course
      </button>
      <div className="my-7">
        {isLoading && <CardSkeleton />}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {courses.length > 0 ? (
              courses.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-200 py-6 px-4 rounded-lg flex flex-col space-y-2"
                >
                  <h1 className="font-medium">
                    Title: <span className="text-gray-500">{item.title}</span>
                  </h1>
                  <h2>Category: {item.category}</h2>
                  <p>
                    Status:{" "}
                    {item.isPublished === false ? "Not published" : "Published"}
                  </p>
                  <p>
                    Created: {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex justify-between items-center gap-4 mt-5">
                    <button
                      className="bg-green-400 px-3 py-2 text-white hover:bg-green-500 cursor-pointer rounded-lg"
                      onClick={() => handleEdit(item)}
                    >
                      Edit Course
                    </button>
                    <button
                      onClick={() => deleteCourse(item._id)}
                      className="bg-red-400 px-3 py-2 text-white hover:bg-red-500 cursor-pointer rounded-lg"
                    >
                      Delete Course
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>You haven't added any course yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourse;
