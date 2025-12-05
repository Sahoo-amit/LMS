import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthStore } from "../store/AuthStore";

const PlacementGuide = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = AuthStore();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-6 text-center">Placement Guide</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Career Roadmaps</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>
            <a
              href="http://roadmap.sh/frontend"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              Frontend Developer Roadmap
            </a>
          </li>
          <li>
            <a
              href="http://roadmap.sh/backend"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              Backend Developer Roadmap
            </a>
          </li>
          <li>
            <a
              href="http://roadmap.sh/full-stack"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              Fullstack Developer Roadmap
            </a>
          </li>
          <li>
            <a
              href="http://github.com/Avik-Jain/100-Days-Of-ML-Code"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              Data Science Roadmap
            </a>
          </li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Resume Building Tips</h2>
        <p className="text-gray-700 mb-2">
          - Keep it 1 page unless you're very experienced. - Highlight real
          projects and measurable achievements. - Use action verbs and clean
          formatting.
        </p>
        <a
          href="http://www.overleaf.com/latex/templates/software-engineer-resume/gwqzpzcrptnv"
          target="_blank"
          className="text-blue-600 underline"
        >
          Download Resume Template (LaTeX)
        </a>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">
          Mock Interview Resources
        </h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>
            <a
              href="http://interviewing.io/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              interviewing.io
            </a>
          </li>
          <li>
            <a
              href="http://pramp.com/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              Pramp
            </a>
          </li>
          <li>
            <a
              href="http://www.youtube.com/results?search_query=mock+interviews"
              target="_blank"
              className="text-blue-600 underline"
            >
              YouTube Mock Interviews
            </a>
          </li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Success Stories</h2>
        <p className="text-gray-700">
          Hear from our students who landed roles at companies like Google,
          Amazon, and startups.
          <br />
          Coming soon...
        </p>
      </section>
    </div>
  );
};

export default PlacementGuide;
