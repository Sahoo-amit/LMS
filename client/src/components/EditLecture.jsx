import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { AuthStore } from "../store/AuthStore";
import toast from "react-hot-toast";
import ClipLoader from 'react-spinners/ClipLoader'

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
  
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
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
          "http://localhost:3000/api/media/upload_video",
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
        `http://localhost:3000/api/courses/${courseId}/lecture/${lectureId}`,
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
    <div className="p-5">
      <div className="flex items-center gap-10">
        <button
          onClick={() => navigate(-1)}
          className="text-3xl cursor-pointer"
        >
          <IoArrowBackCircleSharp />
        </button>
        <h1 className="font-medium text-2xl">Edit your lecture</h1>
      </div>

      <div className="mt-7">
        <p className="font-serif">Edit changes and click save when done.</p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-2 mt-7 bg-gray-300 p-2 rounded-lg"
        >
          <div className="flex flex-col space-y-2">
            <label htmlFor="title" className="font-medium">
              Title
            </label>
            <input
              type="text"
              className="border rounded-lg p-2"
              value={lecture.lectureTitle}
              onChange={(e) =>
                setLecture({ ...lecture, lectureTitle: e.target.value })
              }
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="video" className="font-medium">
                Video<span className="text-red-600">*</span>
              </label>
              <input
                type="file"
                accept="video/*"
                required
                className="border rounded-lg p-2 w-fit font-medium"
                onChange={videoUpload}
              />
            </div>
            <ClipLoader
              color={"red"}
              loading={isLoading}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
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
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
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
