import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState("");
  const navigate = useNavigate();

  const getCourseDetails = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/courses/get_course/${id}`
      );
      const data = await res.json();
      setCourse(data.course);
    } catch (error) {
      console.log(error);
    }
  };

  const stripePromise = loadStripe(
    "pk_test_51R7AfOQLP0VGAWlPObShRQ35FzY7te6UnXMMwRtmbDTkm5DosMCCF6ZWoHOYtgZ8RES9wlti9JPUDZxlYzABOvJR00RH7obhOO"
  );

  const makePayment = async (course) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/payment/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: course._id,
            courseName: course.title,
            price: course.price,
          }),
        }
      );
      const session = await res.json();
      if (!session.id) {
        throw new Error("Failed to get Stripe session ID");
      }

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.error("Stripe Checkout Error:", error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseDetails();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-10">
      {/* Video Section */}
      <div className="w-full flex justify-center mb-6">
        <video
          src={course.video}
          controls
          muted
          className="w-full h-96 rounded-lg shadow-md"
        />
      </div>

      {/* Course Info Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {course.title}
        </h1>
        <p className="text-lg text-gray-600">Category: {course.category}</p>
        <p className="text-xl font-semibold text-green-600">
          Price: ${course.price}
        </p>
        <p className="text-yellow-500 text-lg">⭐ {course.rating} / 5</p>
        <p className="text-gray-700 mt-4">{course.description}</p>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-800 transition font-bold"
            onClick={() => makePayment(course)}
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Course Image Section */}
      <div className="w-full flex justify-center mt-6">
        <img
          src={course.image}
          alt={course.title}
          className="w-full max-h-60 rounded-lg shadow-md object-cover"
        />
      </div>
    </div>
  );
};

export default CourseDetails;
