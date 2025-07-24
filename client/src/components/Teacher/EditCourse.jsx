import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { AuthStore } from "../../store/AuthStore";
import { ThemeStore } from "../../store/ThemeStore";

const EditCourse = () => {
  const token = AuthStore((state) => state.token);
  const theme = ThemeStore((state)=>state.theme)
  const { id } = useParams();
  const location = useLocation();
  const { title, category } = location.state || {}
  const [isLoading, setIsLoading] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [isLecturAdded, setIsLectureAdded] = useState(false)
  
  const [form, setForm] = useState({
    title: title || "",
    subtitle: "",
    description: "",
    category: category || "",
    courseLevel: "",
    price: "",
    image: null,
  });

  const getCourseById = async()=>{
    try {
      const res = await fetch(
        `https://lms-9f91.vercel.app/api/courses/get_course/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json()
      console.log(data)
      setIsLectureAdded(data.course.lectures.length)
      setIsPublished(data.course.isPublished)
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleEditorChange = (content) => {
    setForm((prev) => ({
      ...prev,
      description: content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("subtitle", form.subtitle);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("courseLevel", form.courseLevel);
      formData.append("price", form.price);
      if (form.image) {
        formData.append("image", form.image);
      }

      const res = await fetch(
        `https://lms-9f91.vercel.app/api/courses/update_course/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("Course updated successfully!");
      } else {
        alert(data.message || "Failed to update course.");
      }
      setIsLoading(false)
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while updating the course.");
    }
  };

  const publishCourse = async () => {
    if (!isLecturAdded) {
      alert("Add at least one lecture before publishing.");
      return;
    }
    if (isPublished) {
      alert("Course is already published.");
      return;
    }

    try {
      const response = await fetch(
        `https://lms-9f91.vercel.app/api/courses/${id}?publish=true`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Course published!");
        setIsPublished(true);
      } else {
        alert(data.message || "Failed to publish course.");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong while publishing.");
    }
  };


  useEffect(()=>{
    getCourseById()
  },[])

  return (
    <div className="py-20 min-h-screen w-full">
      <div className="px-5">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Add additional information</h1>
          <Link to="addLecture">
            <button className="cursor-pointer hover:underline">
              Go to lectures page
            </button>
          </Link>
        </div>

        <div
          className={`rounded-md mt-5 ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          <div className="flex justify-between items-center p-5 border-b">
            <p className="font-medium">Basic Information</p>
            <button
              className={`${
                !isLecturAdded || isPublished
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              } text-white px-4 py-1 rounded-md`}
              disabled={!isLecturAdded || isPublished}
              onClick={publishCourse}
            >
              {isPublished ? "Published" : "Publish"}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 grid gap-5">
            <div>
              <label htmlFor="title" className="block font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={form.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="subtitle" className="block font-medium mb-1">
                Sub Title
              </label>
              <input
                type="text"
                name="subtitle"
                required
                value={form.subtitle}
                onChange={handleInputChange}
                placeholder="add sub title for your course"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-medium mb-1">
                Description
              </label>
              <Editor
                apiKey="4tkaugqjgghhpygsvhnk9cfxwycq8i89zeeurarxwjv5kz4q"
                value={form.description}
                required
                onEditorChange={handleEditorChange}
                init={{
                  height: 300,
                  menubar: true, // Enable the menubar for additional options
                  plugins: [
                    "link",
                    "lists",
                    "code",
                    "image", // For image uploads
                    "table", // For adding tables
                    "autoresize", // For auto resizing the editor
                    "wordcount", // For word count
                    "media", // For embedding media
                    "charmap", // For inserting special characters
                    "preview", // Preview the content
                    "searchreplace", // Find and replace text
                    "emoticons", // Add emoticons
                  ],
                  toolbar:
                    "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image media | table charmap emoticons | code | preview",
                  image_advtab: true, // Enable advanced image options
                  file_picker_callback: function (callback, value, meta) {
                    // Handle image uploads
                    var input = document.createElement("input");
                    input.setAttribute("type", "file");
                    input.setAttribute("accept", "image/*");
                    input.onchange = function () {
                      var file = input.files[0];
                      var reader = new FileReader();
                      reader.onload = function () {
                        callback(reader.result, { alt: file.name });
                      };
                      reader.readAsDataURL(file);
                    };
                    input.click();
                  },
                  content_style:
                    "body { font-family: Arial, sans-serif; font-size: 14px; }", // Custom styling for content
                  setup: (editor) => {
                    editor.on("change", function () {
                      editor.save();
                    });
                  },
                }}
              />
            </div>

            <div className="flex items-center gap-10">
              <div className="flex flex-col space-y-2">
                <label htmlFor="category" className="font-medium">
                  Category
                </label>
                <select
                  name="category"
                  required
                  id="category"
                  value={form.category}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md"
                >
                  <option value="">Select a category</option>
                  <option value="Frontend Development">
                    Frontend Development
                  </option>
                  <option value="Backend Development">
                    Backend Development
                  </option>
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

              <div className="flex flex-col space-y-2">
                <label htmlFor="courseLevel" className="font-medium">
                  Course Level
                </label>
                <select
                  name="courseLevel"
                  id="courseLevel"
                  required
                  value={form.courseLevel}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md"
                >
                  <option value="">Select level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Medium">Intermediate</option>
                  <option value="Advance">Advance</option>
                </select>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="price" className="font-medium">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  value={form.price}
                  onChange={handleInputChange}
                  placeholder="Add price in $"
                  className="p-2 border rounded-md"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              {form.image && (
                <img
                  src={
                    typeof form.image === "string"
                      ? form.image
                      : URL.createObjectURL(form.image)
                  }
                  alt="thumbnail preview"
                  className="h-60 w-60 object-fit"
                />
              )}

              <div>
                <label htmlFor="image" className="block font-medium mb-1">
                  Course Thumbnail
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  required
                  onChange={handleInputChange}
                  className="border p-2"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-700 ${
                isLoading ? "cursor-not-allowed bg-gray-400" : ""
              }`}
            >
              {isLoading ? "Wait..." : "Save changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;