import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import cards from "../utils/students.json";
import { ThemeStore } from "../store/ThemeStore";

const Achievement = () => {
  const containerRef = useRef(null);
  const theme = ThemeStore((state) => state.theme);

  return (
    <div
      ref={containerRef}
      className={`relative py-16 sm:py-20 min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
        Achievements
      </h1>

      {cards.map((item, index) => {
        const cardRef = useRef(null);
        const { scrollYProgress: cardScrollY } = useScroll({
          target: cardRef,
          offset: ["start center", "center start"],
        });

        const scale = useTransform(cardScrollY, [0, 1], [1.2, 1]);
        const y = useTransform(cardScrollY, [0, 1], [-10, 0]);

        return (
          <motion.div
            key={index}
            ref={cardRef}
            className="h-screen flex justify-center items-center sticky"
            style={{ top: `calc(5vh + ${index * 10}px)` }}
          >
            <motion.div
              style={{ scale, y }}
              className={`w-[80%] max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl ${item.color} rounded-xl shadow-2xl p-6 sm:p-8 text-white flex flex-col justify-center items-center text-center space-y-1`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 sm:w-24 h-20 sm:h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
              <h1 className="text-xl sm:text-2xl font-bold">{item.name}</h1>
              <p className="text-sm sm:text-base">{item.company}</p>
              <p className="text-sm sm:text-base">{item.position}</p>
              <p className="text-xs sm:text-sm italic">"{item.testimonial}"</p>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Achievement;
