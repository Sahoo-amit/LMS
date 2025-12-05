import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthStore } from "../../store/AuthStore";
import toast from "react-hot-toast";
import { ThemeStore } from "../../store/ThemeStore";

const Lectures = () => {
  const { id } = useParams();
  const token = AuthStore((state) => state.token);
  const theme = ThemeStore((state) => state.theme);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lectures, setLectures] = useState([]);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = (abc) => {
    navigate(`/editCourse/${id}/addLecture/${abc._id}`, {
      state: {
        lectureTitle: abc.lectureTitle,
      },
    });
  };

  const getLecture = async () => {
    try {
      const res = await fetch(
        `https://lms-9f91.vercel.app/api/courses/lectures/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setLectures(data.lectures);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeLecture = async (lectureId) => {
    try {
      const res = await fetch(
        `https://lms-9f91.vercel.app/api/courses/lecture/${lectureId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      getLecture();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://lms-9f91.vercel.app/api/courses/${id}/lecture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ lectureTitle: title }),
        }
      );
      console.log(res);
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
        setTitle("");
        getLecture();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLecture();
  }, []);

  return (
    <div
      className={`px-5 py-20 min-h-screen w-full ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="font-medium text-2xl">Add Lectures</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, iure.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2 mt-4">
          <label htmlFor="title" className="font-medium">
            Lecture title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Your lecture title name"
            className="p-2 rounded-md border"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-3 mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 bg-gray-400 rounded-lg cursor-pointer hover:bg-gray-500 transition duration-200"
          >
            Back to course
          </button>
          <button
            type="submit"
            className={`px-4 py-2 rounded-lg cursor-pointer text-white transition duration-200 
      ${
        isLoading
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-gray-700 hover:bg-gray-900"
      }`}
          >
            {isLoading ? "Please wait..." : "Create lecture"}
          </button>
        </div>
      </form>
      <div className="mt-4">
        {lectures.length > 0 ? (
          <div className="flex flex-col space-y-2">
            {lectures.map((item, index) => (
              <div
                key={index}
                className={`flex rounded-2xl items-center justify-between px-10 py-2 ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                }`}
              >
                <span className="font-medium">
                  Lecture -{index + 1}: {item.lectureTitle}
                </span>
                <div className="flex items-center gap-10">
                  <button
                    className="bg-red-500 px-3 py-1 rounded-lg cursor-pointer"
                    onClick={() => removeLecture(item._id)}
                  >
                    Remove
                  </button>
                  <button
                    className="bg-gray-500 px-3 py-1 rounded-lg cursor-pointer"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-medium">No lecture found.</p>
        )}
      </div>
    </div>
  );
};

export default Lectures;
