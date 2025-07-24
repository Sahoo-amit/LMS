import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AuthStore } from "../../store/AuthStore";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { ThemeStore } from "../../store/ThemeStore";

const EditLecture = () => {
  const location = useLocation();
  const { lectureTitle } = location.state || {};
  const [lecture, setLecture] = useState({
    lectureTitle: lectureTitle || "",
    videoInfo: null,
    isPreviewFree: false,
  });
  const [videoInfo, setVideoInfo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const token = AuthStore((state) => state.token);
  const theme = ThemeStore((state) => state.theme);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: theme === "dark" ? "white" : "red", // Dynamic color based on theme
  };

  const videoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("video", file);
      setIsUploading(true);
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://lms-9f91.vercel.app/api/media/upload_video",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        console.log(data);

        const uploadedVideo = {
          videoUrl: data.result.url,
          publicId: data.result.public_id,
        };

        setVideoInfo(uploadedVideo);
        setLecture((prev) => ({
          ...prev,
          videoInfo: uploadedVideo,
        }));
        toast.success("Video uploaded successfully!");
      } catch (error) {
        console.error("Video upload failed:", error);
        toast.error("Failed to upload video.");
      } finally {
        setIsUploading(false);
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lecture.lectureTitle || !lecture.videoInfo) {
      return toast.error("Please provide a title and upload a video.");
    }

    try {
      const res = await fetch(
        `https://lms-9f91.vercel.app/api/courses/${courseId}/lecture/${lectureId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(lecture),
        }
      );
      const data = await res.json();
      console.log(data);
      toast.success("Lecture updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Failed to update lecture:", error);
      toast.error("Error updating lecture.");
    }
  };

  return (
    <div
      className={`px-5 min-h-screen py-20 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex items-center gap-10">
        <button
          onClick={() => navigate(-1)}
          className={`text-3xl cursor-pointer ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          <IoArrowBackCircleSharp />
        </button>
        <h1 className="font-medium text-2xl">Edit your lecture</h1>
      </div>

      <div className="mt-7">
        <p className="font-serif">Edit changes and click save when done.</p>

        <form
          onSubmit={handleSubmit}
          className={`flex flex-col space-y-2 mt-7 p-2 rounded-lg ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-300"
          }`}
        >
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="title"
              className={`font-medium ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Title
            </label>
            <input
              type="text"
              className={`border rounded-lg p-2 ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-black"
              }`}
              value={lecture.lectureTitle}
              onChange={(e) =>
                setLecture({ ...lecture, lectureTitle: e.target.value })
              }
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="video"
                className={`font-medium ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                Video<span className="text-red-600">*</span>
              </label>
              <input
                type="file"
                accept="video/*"
                required
                className={`border rounded-lg p-2 w-fit font-medium ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
                onChange={videoUpload}
              />
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={lecture.isPreviewFree}
                onChange={(e) =>
                  setLecture({ ...lecture, isPreviewFree: e.target.checked })
                }
              />
              <span>Is this video free?</span>
            </label>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isUploading || isLoading}
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${
                theme === "dark" ? "hover:bg-blue-400" : "hover:bg-blue-600"
              } ${isUploading ? "cursor-not-allowed":""}`}
            >
              {isUploading || isLoading ? "Please wait..." : "Upload lecture"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLecture;
