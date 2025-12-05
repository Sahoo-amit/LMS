import React, { useState } from "react";
import { AuthStore } from "../../store/AuthStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const [course, setCourse] = useState({ title: "", category: "" });
  const [loading, setLoading] = useState(false);
  const token = AuthStore((state) => state.token);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!course.title.trim() || !course.category.trim()) {
      return toast.error("Please fill in all fields.");
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://lms-backend-z77i.onrender.com/api/courses/createcourse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(course),
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setCourse({ title: "", category: "" });
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Course</h2>
      <p className="text-gray-600 mb-2">
        Add a new course to your platform with the appropriate category and
        title.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            placeholder="Course title"
            value={course.title}
            name="title"
            id="title"
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            name="category"
            id="category"
            value={course.category}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Select a category</option>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="Full Stack Development">
              Full Stack Development
            </option>
            <option value="Data Science">Data Science</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="AI & Deep Learning">AI & Deep Learning</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="DevOps">DevOps</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Blockchain">Blockchain</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 cursor-pointer bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
