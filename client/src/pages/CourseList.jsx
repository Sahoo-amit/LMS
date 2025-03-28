import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); 
  const navigate = useNavigate();

  const getCourses = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/courses/get_course", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setCourses(data);
      setFilteredCourses(data);
    } catch (error) {
      console.log(error);
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
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-5 mt-20">
      <div className="flex justify-between mb-6">
        <div className="flex items-center space-x-4 justify-between w-full">
          <input
            type="text"
            placeholder="Search courses by category..."
            value={search}
            onChange={handleSearchChange}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={handleSortChange}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {sortOrder === "asc" ? "Sort A-Z" : "Sort Z-A"}
          </button>
        </div>
      </div>
      <div>
        {filteredCourses.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No matching courses found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCourses.map((item, index) => {
              const {
                _id,
                title,
                image,
                price,
                rating,
                category,
                description,
              } = item;
              return (
                <div
                  key={index}
                  className="bg-white shadow-lg inset-shadow-black rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={image}
                    alt="Course Image"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-2">
                      Category: {category}
                    </p>
                    <p className="text-gray-700 font-medium">
                      Price: <span className="text-green-600">${price}</span>
                    </p>
                    <p className="text-yellow-500 text-sm">⭐ {rating}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      {description.substring(0, 80)}...
                    </p>
                    <button
                      className="text-red-500 cursor-pointer underline"
                      onClick={() => navigate(`/courses/${_id}`)}
                    >
                      View details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
