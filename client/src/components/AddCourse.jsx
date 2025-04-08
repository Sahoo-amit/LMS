import React, { useState } from "react";
import { AuthStore } from "../store/AuthStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const [course, setCourse] = useState({ title: "", category: "" });
  const [loading, setLoading] = useState(false);
  const token = AuthStore((state) => state.token);
  const navigate = useNavigate()
  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!course.title.trim() || !course.category.trim()) {
      return toast.error("Please fill in all fields.");
    }
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/courses/createcourse`,
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
        setCourse({ title: "", category: "" })
        toast.success(data.message)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Course title"
            value={course.title}
            name="title"
            id="title"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={course.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="Next js">Next Js</option>
            <option value="React Js">React Js</option>
            <option value="Node Js">Node Js</option>
            <option value="Python">Python</option>
            <option value="Cyber security">Cyber security</option>
            <option value="Block chain">Block chain</option>
          </select>
        </div>
        <div>
          <button type="button" onClick={()=>navigate(-1)}>Back</button>
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
