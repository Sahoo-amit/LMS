import React, { useEffect, useState } from "react";
import { AuthStore } from "../store/AuthStore";
import toast from "react-hot-toast";

const MyCourse = () => {
  const { token, userId } = AuthStore();
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null);
  const [newImage, setNewImage] = useState(null);

  const getCourse = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/courses/courseby_teacher/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCourse = async (id) => {
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
      if (res.ok) {
        toast.success("Course deleted successfully.");
        getCourse();
      } else {
        toast.error("Failed to delete course.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "lms project");
    data.append("cloud_name", "dwljkxuys");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dwljkxuys/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const val = await res.json();
    return val.url;
  };

  const updateCourse = async () => {
    if (!editCourse) return;

    try {
      let imageUrl = editCourse.image;
      if (newImage) {
        imageUrl = await uploadImage(newImage);
      }

      const updatedData = { ...editCourse, image: imageUrl };

      const res = await fetch(
        `http://localhost:3000/api/courses/update_course/${editCourse._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (res.ok) {
        toast.success("Course updated successfully.");
        setEditCourse(null);
        setNewImage(null);
        getCourse();
      } else {
        toast.error("Failed to update course.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating.");
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Courses</h1>
      {courses.length > 0 ? (
        courses.map((item) => {
          const { image, title, price, category, description, _id } = item;
          return (
            <div key={_id} className="bg-white p-4 shadow-md rounded-lg mb-4">
              <img
                src={image}
                alt={title}
                className="h-40 w-full object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-2">{title}</h2>
              <p className="text-gray-600">{description}</p>
              <p className="text-blue-600 font-bold">${price}</p>
              <p className="text-gray-500">{category}</p>
              <div className="flex gap-4 mt-2">
                <button
                  className="text-blue-600 cursor-pointer"
                  onClick={() => setEditCourse(item)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 cursor-pointer"
                  onClick={() => deleteCourse(_id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>No courses found.</p>
      )}
      {editCourse && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Course</h2>
            <input
              type="text"
              value={editCourse.title}
              onChange={(e) =>
                setEditCourse({ ...editCourse, title: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              placeholder="Title"
            />
            <textarea
              value={editCourse.description}
              onChange={(e) =>
                setEditCourse({ ...editCourse, description: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              placeholder="Description"
            />
            <input
              type="number"
              value={editCourse.price}
              onChange={(e) =>
                setEditCourse({ ...editCourse, price: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              placeholder="Price"
            />
            <input
              type="text"
              value={editCourse.category}
              onChange={(e) =>
                setEditCourse({ ...editCourse, category: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              placeholder="Category"
            />
            <div className="mb-4">
              <label className="block font-semibold mb-1">
                Course Thumbnail
              </label>
              <div className="flex gap-4 items-center">
                <img
                  src={
                    newImage ? URL.createObjectURL(newImage) : editCourse.image
                  }
                  alt="Course Thumbnail"
                  className="h-20 w-32 object-cover rounded-md border"
                />
                <input
                  type="file"
                  onChange={(e) => setNewImage(e.target.files[0])}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-400 px-4 py-2 rounded-md"
                onClick={() => setEditCourse(null)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={updateCourse}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourse;
