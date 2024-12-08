import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function ImageSlider({ images, hideArrows = false, hideThreeDot = false, slideInterval = 5000}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, slideInterval);
    return () => clearInterval(interval);
  }, [currentIndex, slideInterval]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col items-center py-10">
      <section className="relative w-full h-screen overflow-hidden">
        <div className="relative h-1/2 w-full">
          {/* Navigation Arrows - Vertically Centered on Edges */}
          {!hideArrows && (
            <>
              <Button
                className="absolute left-0 top-1/2 -translate-y-1/2 ml-4 rounded-full bg-gray-200/70 shadow-lg hover:bg-gray-100 transition-transform scale-110 z-10"
                size="icon"
                variant="ghost"
                onClick={handlePrev}
              >
                <ChevronLeft className="h-8 w-8 text-black" />
              </Button>
              <Button
                className="absolute right-0 top-1/2 -translate-y-1/2 mr-4 rounded-full bg-gray-200/70 shadow-lg hover:bg-gray-100 transition-transform scale-110 z-10"
                size="icon"
                variant="ghost"
                onClick={handleNext}
              >
                <ChevronRight className="h-8 w-8 text-black" />
              </Button>
            </>
          )}

          {/* Slider Container */}
          <div
            className="flex h-full w-full transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="h-full w-full flex-shrink-0 flex items-center justify-center"
                style={{ flex: "0 0 100%" }}
              >
                <div className="w-full h-full">
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover md:rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          {!hideThreeDot && (
            <div className="absolute bottom-4 w-full flex justify-center gap-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`h-3 w-3 rounded-full ${
                    index === currentIndex 
                      ? "bg-white" 
                      : "bg-white opacity-50"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ImageSlider;