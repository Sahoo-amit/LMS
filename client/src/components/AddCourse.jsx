import React, { useState } from "react";
import toast from "react-hot-toast";
import { AuthStore } from "../store/AuthStore";

const AddCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    category: "",
    video: "",
    videoPreview: "",
  });

  const { token } = AuthStore();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "lms project");
    data.append("cloud_name", "dwljkxuys");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dwljkxuys/image/upload`,
        { method: "POST", body: data }
      );
      const val = await res.json();
      setCourse({ ...course, image: val.url });
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Image upload failed", error);
      toast.error("Image upload failed");
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "lms project");
    data.append("cloud_name", "dwljkxuys");
    data.append("resource_type", "video");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dwljkxuys/video/upload`,
        { method: "POST", body: data }
      );
      const val = await res.json();
      setCourse({ ...course, video: val.url, videoPreview: val.url });
      toast.success("Video uploaded successfully");
    } catch (error) {
      console.error("Video upload failed", error);
      toast.error("Video upload failed");
    }
  };

  const checkEmpty = () => {
    if (
      !course.title ||
      !course.description ||
      !course.image ||
      !course.category ||
      !course.price ||
      !course.video
    ) {
      toast.error("Please fill all fields and upload video");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkEmpty()) return;

    try {
      const res = await fetch("http://localhost:3000/api/courses/add_course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(course),
      });

      if (res.ok) {
        toast.success("Course added successfully.");
        setCourse({
          title: "",
          price: "",
          image: "",
          description: "",
          category: "",
          video: "",
          videoPreview: "",
        });
      } else {
        toast.error("Failed to add course.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
    }
  };

  const categories = [
    "Web Development",
    "Data Science",
    "Machine Learning",
    "Cybersecurity",
    "Cloud Computing",
    "Mobile App Development",
    "Game Development",
    "Blockchain",
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Course</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold">Title</label>
            <input
              value={course.title}
              onChange={(e) => setCourse({ ...course, title: e.target.value })}
              type="text"
              placeholder="Course title"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Description</label>
            <textarea
              value={course.description}
              onChange={(e) =>
                setCourse({ ...course, description: e.target.value })
              }
              placeholder="Write course description"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Upload Thumbnail</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {course.image && (
              <img
                src={course.image}
                alt="Course Thumbnail"
                className="mt-2 rounded-md w-full h-40 object-cover"
              />
            )}
          </div>

          <div>
            <label className="block font-semibold">Upload Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {course.videoPreview && (
              <video
                src={course.videoPreview}
                controls
                className="mt-2 rounded-md w-full"
              />
            )}
          </div>

          <div>
            <label className="block font-semibold">Category</label>
            <select
              value={course.category}
              onChange={(e) =>
                setCourse({ ...course, category: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold">Price ($)</label>
            <input
              type="number"
              value={course.price}
              onChange={(e) => setCourse({ ...course, price: e.target.value })}
              placeholder="Enter price"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
