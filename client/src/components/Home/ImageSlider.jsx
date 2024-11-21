import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

import HomeImg from "../../assets/home.png";
import Image2 from "../../assets/home.png";
import Image3 from "../../assets/home.png";

const images = [HomeImg, Image2, Image3];

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col items-center py-20">
      <main>
        <section className="relative  h-[400px] w-[1000px] overflow-hidden">
          <div className="relative h-full w-full flex items-center justify-center">
            <Button
              className="absolute left-9 top-1/2 -translate-y-1/2 rounded-full bg-gray-200 shadow-lg hover:bg-gray-100 transition-transform scale-110 opacity-70 z-10"
              size="icon"
              variant="ghost"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-8 w-8 text-black" />
            </Button>
            <Button
              className="absolute right-9 top-1/2 -translate-y-1/2 rounded-full bg-gray-200 shadow-lg hover:bg-gray-100 transition-transform scale-110 opacity-70 z-10"
              size="icon"
              variant="ghost"
              onClick={handleNext}
            >
              <ChevronRight className="h-8 w-8 text-black" />
            </Button>

            {/* Slider Container */}
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`, // Slide to the current image
              }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="h-full w-full flex items-center justify-center flex-shrink-0"
                  style={{ flex: "0 0 100%" }} // Each image takes 100% of the container width
                >
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="h-auto max-h-full w-auto rounded-lg"
                  />
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 w-full flex justify-center gap-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`h-3 w-3 rounded-full ${
                    index === currentIndex
                      ? "bg-white"
                      : "bg-white opacity-50"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ImageSlider;
