import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const images = [
  "https://img.freepik.com/free-vector/hand-drawn-online-college-template-design_23-2150574159.jpg?t=st=1742629009~exp=1742632609~hmac=264d98b2807b78673e7a43a9ceaf56c4127219c48b7cb92cdc57beaf62f6daca&w=1380",
  "https://img.freepik.com/free-psd/e-learning-banner-template_23-2148877987.jpg?t=st=1742629067~exp=1742632667~hmac=43383a1d77ae4ba8e618324cf020436e17c787f7c2babbfa8ef906775e1dd1a0&w=1380",
  "https://img.freepik.com/free-psd/learn-home-banner-template_23-2149109790.jpg?t=st=1742629092~exp=1742632692~hmac=303c917736e855790b1cd91fab409a8f5b1925449327451a8461072c90efd73b&w=1380",
  "https://img.freepik.com/free-psd/e-learning-banner-design-template_23-2149113591.jpg?t=st=1742629108~exp=1742632708~hmac=ad4e09bb1b8192809d348792c578d980f128112b0214cbd5e16f5a216593e85f&w=1380",
  "https://img.freepik.com/free-vector/hand-drawn-online-college-template-design_23-2150574179.jpg?t=st=1742629123~exp=1742632723~hmac=d4d5c963c8c15c5e3e07f17d11e2db6856dc11dc2cfd92b98070abce33023f8f&w=1380",
];

const Carousel = () => {
  const [carousel, setCarousel] = useState(0);

  const nextSlide = () => {
    setCarousel((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCarousel((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full max-w-5xl mx-auto h-[200px] sm:h-[250px] md:h-[400px] overflow-hidden rounded-xl shadow-md sm:shadow-lg">
  
      <button
        className="absolute left-2 p-1 sm:p-2 md:p-3 bg-black bg-opacity-30 hover:bg-opacity-60 text-white rounded-full transition"
        onClick={prevSlide}
      >
        <FiChevronLeft className="text-lg sm:text-xl md:text-2xl" />
      </button> 
      <img
        src={images[carousel]}
        alt={`Slide ${carousel}`}
        className="w-full h-full object-cover transition-all duration-500 ease-in-out"
      /> 
      <button
        className="absolute right-2 p-1 sm:p-2 md:p-3 bg-black bg-opacity-30 hover:bg-opacity-60 text-white rounded-full transition"
        onClick={nextSlide}
      >
        <FiChevronRight className="text-lg sm:text-xl md:text-2xl" />
      </button> 
      <div className="absolute bottom-3 flex justify-center items-center space-x-1 sm:space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              index === carousel ? "bg-white" : "bg-gray-300 opacity-60"
            } transition-all duration-300`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;