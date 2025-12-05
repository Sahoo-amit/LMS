import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeStore } from "../store/ThemeStore";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);

  const { theme } = ThemeStore();
  const isDark = theme === "dark";

  const getCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://lms-9f91.vercel.app/api/courses/published_course",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      setCourses(data);
      setFilteredCourses(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSortChange = () => {
    const sortedCourses = [...filteredCourses].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setFilteredCourses(sortedCourses);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div
      className={`min-h-screen px-4 py-16 mt-10 transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search courses by title..."
            value={search}
            onChange={handleSearchChange}
            className={`w-full sm:w-1/2 px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500 outline-none transition ${
              isDark
                ? "bg-gray-800 text-white border-gray-700 placeholder-gray-400"
                : "bg-gray-100 text-gray-900 border-gray-300 placeholder-gray-500"
            }`}
          />
          <button
            onClick={handleSortChange}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {sortOrder === "asc" ? "Sort A-Z" : "Sort Z-A"}
          </button>
        </div>
        {loading ? (
          <p className="text-center text-lg font-medium">Loading courses...</p>
        ) : filteredCourses.length === 0 ? (
          <p className="text-center text-lg text-gray-900 dark:text-gray-400">
            No matching courses found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCourses.map(
              (
                {
                  _id,
                  title,
                  image,
                  price,
                  category,
                  description,
                  averageRating,
                },
                index
              ) => (
                <div
                  key={index}
                  className={`rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 ${
                    isDark ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <Link to={`/courses/${_id}`}>
                      <h2 className="text-lg font-semibold hover:underline mb-1">
                        {title}
                      </h2>
                    </Link>
                    <p
                      className={`text-sm mt-2 line-clamp-3 ${
                        isDark ? "text-gray-300" : "text-gray-800"
                      }`}
                    >
                      Category: <span className="font-medium">{category}</span>
                    </p>
                    <p className="text-base font-semibold text-green-600 dark:text-green-400">
                      Rs.{price}
                    </p>
                    <p
                      className={`text-sm mt-2 line-clamp-3 ${
                        isDark ? "text-gray-300" : "text-gray-800"
                      }`}
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                    <p>Rating: {averageRating}</p>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
