import React from "react";
import Content from "../components/Content";
import Testimonials from "../components/Testimonials";
import { ThemeStore } from "../store/ThemeStore";
import About from "./About";
import Contact from "./Contact";
import Achievement from "../components/Achievement";
import Footer from "./Footer";

const Home = () => {
  const { theme } = ThemeStore();
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-16">
        <Content />
        <Testimonials />
      </main>
      <div>
        <About />
        <Achievement />
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
