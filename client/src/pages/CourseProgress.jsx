import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthStore } from "../store/AuthStore";
import Review from "../components/Review";

const CourseProgress = () => {
  const [course, setCourse] = useState(null);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [userReview, setUserReview] = useState(null);
  const { id } = useParams();
  const token = AuthStore((state) => state.token);

  const getProgress = async () => {
    try {
      const res = await fetch(
        `https://lms-zeta-seven.vercel.app/api/progress/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setCourse(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const markLectureAsViewed = async (lectureId) => {
    try {
      await fetch(
        `https://lms-zeta-seven.vercel.app/api/progress/${id}/lecture/${lectureId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getProgress();
    } catch (error) {
      console.log("Failed to mark lecture as viewed:", error);
    }
  };

  const markCourseComplete = async () => {
    try {
      const res = await fetch(
        `https://lms-zeta-seven.vercel.app/api/progress/${id}/complete`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      alert(data.message || "Marked as complete");
      getProgress();
    } catch (error) {
      console.log("Error marking course complete:", error);
    }
  };

  const markCourseIncomplete = async () => {
    try {
      const res = await fetch(
        `https://lms-zeta-seven.vercel.app/api/progress/${id}/incomplete`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      alert(data.message || "Marked as incomplete");
      getProgress();
    } catch (error) {
      console.log("Error marking course incomplete:", error);
    }
  };

  const fetchUserReview = async () => {
    try {
      const res = await fetch(
        `https://lms-zeta-seven.vercel.app/api/courses/get_course/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      const userId = data?.currentUserId;
      const review = data?.course?.reviews?.find(
        (r) => r.user === userId || r.user?._id === userId
      );
      setUserReview(review);
    } catch (error) {
      console.error("Error fetching user review:", error);
    }
  };

  useEffect(() => {
    getProgress();
    fetchUserReview();
  }, []);

  if (!course) return <p className="text-center mt-20">Loading...</p>;

  const { courseDetails, progress, completed } = course;
  const initialLecture = currentLecture || courseDetails.lectures[0];

  const isLectureCompleted = (lectureId) => {
    return progress?.some((p) => p.lectureId === lectureId && p.viewed);
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    markLectureAsViewed(lecture._id);
  };

  return (
    <div className="mt-20 max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">{courseDetails.title}</h1>
        {/* <button
          onClick={completed ? markCourseIncomplete : markCourseComplete}
          className={`px-4 py-2 rounded-sm text-white ${
            completed
              ? "bg-gray-600 hover:bg-gray-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {completed ? "Mark as Incomplete" : "Mark as Complete"}
        </button> */}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3 w-full">
          <video
            key={currentLecture?._id || initialLecture._id}
            controls
            className="w-full rounded-lg"
            onPlay={() =>
              markLectureAsViewed(currentLecture?._id || initialLecture._id)
            }
          >
            <source src={currentLecture?.videoUrl || initialLecture.videoUrl} />
          </video>
          <h3 className="mt-4 font-medium text-lg">
            {`Lecture ${
              courseDetails.lectures.findIndex(
                (lec) => lec._id === (currentLecture?._id || initialLecture._id)
              ) + 1
            }: ${currentLecture?.lectureTitle || initialLecture.lectureTitle}`}
          </h3>
        </div>

        <div className="md:w-1/3 w-full border-t md:border-t-0 md:border-l border-gray-300 md:pl-6">
          <h2 className="text-xl font-medium text-gray-700 mb-4">Lectures</h2>
          <div className="flex flex-col gap-3">
            {courseDetails.lectures.map((lecture, index) => (
              <div
                key={lecture._id}
                className={`p-3 rounded-lg cursor-pointer flex justify-between items-center shadow-md border ${
                  lecture._id === (currentLecture?._id || initialLecture._id)
                    ? "bg-gray-100"
                    : "bg-white"
                }`}
                onClick={() => handleSelectLecture(lecture)}
              >
                <p className="font-medium">{lecture.lectureTitle}</p>
                {isLectureCompleted(lecture._id) && (
                  <span className="text-xs bg-green-200 text-green-700 px-2 py-0.5 rounded">
                    Completed
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Review id={id} userReview={userReview} />
      </div>
    </div>
  );
};

export default CourseProgress;
