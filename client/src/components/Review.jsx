import React, { useState } from "react";
import { AuthStore } from "../store/AuthStore";

const Review = ({ id, userReview }) => {
  const [rating, setRating] = useState(userReview?.rating || 0);
  const [comment, setComment] = useState(userReview?.comment || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const token = AuthStore((state) => state.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setMessage("Please provide a rating before submitting.")
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const method = userReview ? "PUT" : "POST";
      const endpoint = userReview
        ? `https://lms-31ko.vercel.app/api/courses/${id}/review/update`
        : `https://lms-31ko.vercel.app/api/courses/${id}/review`;

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, comment }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");
      setMessage(data.message);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow mt-6">
      <h3 className="text-lg font-medium mb-2">
        {userReview ? "Update Your Review" : "Leave a Review"}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 items-center mb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              onClick={() => setRating(num)}
              className={`cursor-pointer text-2xl ${
                num <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          className="w-full border p-2 rounded mb-4"
          rows="4"
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading
            ? userReview
              ? "Updating..."
              : "Submitting..."
            : userReview
            ? "Update Review"
            : "Submit Review"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-center text-sm ${
            message.toLowerCase().includes("success")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Review;
