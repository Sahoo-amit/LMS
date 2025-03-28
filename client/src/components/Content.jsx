import React, { useState } from "react";
import Carousel from "./Carousel";

const Content = () => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    setSearch("");
  };

  return (
    <div className="mt-20 px-4 md:px-8">
      <div>
        <Carousel />
        <div className="mt-6 text-gray-700 text-sm md:text-base leading-relaxed">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero
            nemo ratione aliquam soluta iure quos, aut, voluptatum atque cum
            laboriosam voluptate quas ab nisi quo, ad omnis vero itaque fugiat.
          </p>
          <span className="block mt-2 font-semibold">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </span>
          <p className="mt-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero illo
            facilis maiores id est saepe excepturi eligendi eveniet?
          </p>
        </div>
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col sm:flex-row items-center gap-3"
          >
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Content;
