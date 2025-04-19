import React from "react";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-gray-700">
          At LearnX (your LMS name), our mission is to make high-quality
          education accessible to everyone, regardless of background or
          location. We focus on practical skills, expert mentorship, and
          real-world projects to help you become job-ready.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Our Journey</h2>
        <p className="text-gray-700">
          LearnX started in 2024 with the goal of helping students bridge the
          gap between theoretical knowledge and real-world experience. Over
          time, we've built a platform with expert-led courses, hands-on labs,
          and a supportive community of learners.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Why Choose Us?</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Industry-focused curriculum</li>
          <li>Interactive projects and assignments</li>
          <li>Mentor support and career guidance</li>
          <li>Access to a growing community of learners</li>
        </ul>
      </section>

      <section className="text-center mt-12">
        <p className="text-lg font-medium text-gray-800">
          Join thousands of learners and start your career transformation today!
        </p>
      </section>
    </div>
  );
};

export default About;
