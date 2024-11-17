import React, { useEffect, useState, useRef } from "react";
import Nike from "../../assets/trendskart/home/nike.png";
import Adidas from "../../assets/trendskart/home/adidas.png";

function LogoSlider() {
  const logos = [
    { id: 1, src: Nike, alt: "Nike" },
    { id: 2, src: Adidas, alt: "Adidas" },
    // { id: 1, src: Nike, alt: "Nike" },
    // { id: 2, src: Adidas, alt: "Adidas" },
    // { id: 1, src: Nike, alt: "Nike" },
    // { id: 2, src: Adidas, alt: "Adidas" },
    // { id: 1, src: Nike, alt: "Nike" },
    // { id: 2, src: Adidas, alt: "Adidas" },
    // Add more logos as needed
  ];

  const [scrollPosition, setScrollPosition] = useState(0);
  const sliderRef = useRef(null); // To refer to the container of the logos

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const moveLogos = () => {
    if (sliderRef.current) {
      const scrollSpeed = scrollPosition * 0.1; // Adjust speed here
      sliderRef.current.scrollLeft = scrollSpeed;
    }
  };

  useEffect(() => {
    moveLogos(); // Adjust logos position whenever the scroll changes
  }, [scrollPosition]);

  return (
    <div className="w-full bg-black p-4">
      <div className="container mx-auto">
        <div className="overflow-hidden">
          {/* Horizontal scrollable container */}
          <div
            ref={sliderRef}
            className="logo-slider flex space-x-4 overflow-x-auto scroll-smooth"
            style={{
              display: "flex",
              whiteSpace: "nowrap", // Prevent logos from wrapping to the next line
            }}
          >
            {/* Original Logos */}
            {logos.map((logo) => (
              <div
                key={logo.id}
                className="flex items-center justify-center w-40 h-24 mx-6 sm:w-52 md:w-64 lg:w-72 xl:w-80" // Increased size for mobile screens
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
            {/* Duplicate Logos for Infinite Loop */}
            {logos.map((logo) => (
              <div
                key={`duplicate-${logo.id}`}
                className="flex items-center justify-center w-40 h-24 mx-6 sm:w-52 md:w-64 lg:w-72 xl:w-80" // Increased size for mobile screens
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoSlider;
