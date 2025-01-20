import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import commonImg from "../../assets/Sagey/model1.png";

// Using the same image for all categories
const commonImage = commonImg;

const ShopCategories = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const scrollContainerRef = useRef(null);
  const dropdownRef = useRef(null); // Ref for dropdown menu

  // Categories with IDs and images
  const categories = [
    { name: "Tops", id: "674e165c0562da4710dbbb6e", image: commonImage },
    {
      name: "Ethnic Wears",
      id: "674e16bc0562da4710dbbb94",
      image: commonImage,
    },
    { name: "Hijabs", id: "674e16bc0562da4710dbbb94", image: commonImage },
    { name: "Cord Sets", id: "674e16bc0562da4710dbbb94", image: commonImage },
  ];

  // Dropdown options for navigation
  const dropdownOptions = {
    Tops: [
      { label: "Knee Length Tops", id: "674e16bc0562da4710dbbb94" },
      { label: "Long Tops (Maxi Gowns)", id: "674e16bc0562da4710dbbb94" },
    ],
    "Ethnic Wears": [
      { label: "Cotton Wears", id: "674e16bc0562da4710dbbb94" },
      { label: "Party Wears", id: "674e16bc0562da4710dbbb94" },
      { label: "Regular Wears", id: "674e16bc0562da4710dbbb94" },
    ],
  };

  const toggleDropdown = (categoryName) => {
    setActiveDropdown((prev) => (prev === categoryName ? null : categoryName));
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setActiveDropdown(null); // Close the dropdown if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-white py-4">
      {/* Scrollable Categories */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 justify-start items-center overflow-x-auto px-4 lg:gap-7 lg:px-8 lg:justify-start"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {categories.map((category) => (
          <div key={category.id} className="relative group">
            {/* Dynamic Route for Main Category */}
            <Link to={`/collections?category=${category.id}`}>
              <div className="flex flex-col items-center text-center justify-center bg-white rounded-lg min-w-[80px] h-28 p-2 hover:shadow-lg transition duration-200">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-12 h-12 object-contain rounded-t-lg" // Ensures image fits properly
                />
                <span
                  className={`text-sm font-medium text-gray-700 mt-1 ${
                    category.name === "Ethnic Wears"
                      ? "whitespace-pre-wrap text-center w-[70px]"
                      : ""
                  }`}
                >
                  {category.name}
                </span>
              </div>
            </Link>

            {/* Dropdown Indicator */}
            {dropdownOptions[category.name] && (
              <div
                className="absolute top-[76px] left-20 transform -translate-x-1/2 text-gray-500 hover:text-gray-800 cursor-pointer"
                onClick={() => toggleDropdown(category.name)}
              >
                <FiChevronDown />
              </div>
            )}

            {/* Dropdown Menu */}
            {activeDropdown === category.name &&
              dropdownOptions[category.name] && (
                <div
                  className="absolute top-[76px] left-20 transform -translate-x-1/2 text-gray-500 hover:text-gray-800 cursor-pointer"
                  onClick={() => toggleDropdown(category.name)}
                >
                  <FiChevronDown />
                </div>
              )}

            {/* Dropdown Menu */}
            {activeDropdown === category.name &&
              dropdownOptions[category.name] && (
                <div
                  ref={dropdownRef} // Attach ref to dropdown menu
                  className="absolute top-[56px] left-0 w-40 bg-white border border-gray-300 shadow-lg rounded-md opacity-100 transition-opacity duration-200 z-50"
                >
                  {dropdownOptions[category.name].map((option, idx) => (
                    <Link
                      key={idx}
                      to={`/collections?category=${option.id}`}
                      className="block px-4 py-[3px] text-[14px] text-gray-700 hover:bg-gray-100"
                    >
                      {option.label}
                    </Link>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCategories;

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { FiChevronDown } from "react-icons/fi";
// import { URL } from "@/Common/api";
// import { config } from "@/Common/configurations";

// const ShopCategories = () => {
//   const [categories, setCategories] = useState([]);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const dropdownRef = useRef(null);

//   const loadCategories = async () => {
//     const { data } = await axios.get(`${URL}/user/categories`, config);
//     setCategories(data.categories);
//   };

//   useEffect(() => {
//     loadCategories();
//   }, []);

//   const toggleDropdown = (categoryName) => {
//     setActiveDropdown((prev) => (prev === categoryName ? null : categoryName));
//   };

//   const handleClickOutside = (e) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//       setActiveDropdown(null);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="relative bg-white py-4">
//       {/* Gradient Overlay */}
//       <div className="absolute top-0 left-0 h-full w-4 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
//       <div className="absolute top-0 right-0 h-full w-4 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>

//       {/* Scrollable Categories */}
//       <div className="flex gap-4 overflow-x-auto px-4" style={{ scrollbarWidth: "none" }}>
//         <style>
//           {`
//           div::-webkit-scrollbar {
//             display: none;
//           }
//           `}
//         </style>

//         {categories.map((category) => (
//           <div key={category._id} className="relative group">
//             <Link to={`/collections?category=${category._id}`}>
//               <div className="flex flex-col items-center text-center justify-center bg-white rounded-lg min-w-[100px] h-28 p-2 hover:shadow-lg transition duration-200">
//                 {category.imgURL ? (
//                   <img
//                     src={`${URL}/img/${category.imgURL}`}
//                     alt={category.name}
//                     className="w-12 h-12 object-contain rounded-t-lg"
//                   />
//                 ) : (
//                   <div className="w-12 h-12 bg-gray-200 rounded-t-lg"></div>
//                 )}
//                 <span className="text-sm font-medium text-gray-700 mt-1">
//                   {category.name}
//                 </span>
//               </div>
//             </Link>

//             {/* Dropdown Indicator */}
//             {category.subcategories && (
//               <div
//                 className="absolute top-[76px] left-1/2 transform -translate-x-1/2 text-gray-500 hover:text-gray-800 cursor-pointer"
//                 onClick={() => toggleDropdown(category.name)}
//               >
//                 <FiChevronDown />
//               </div>
//             )}

//             {/* Dropdown Menu */}
//             {activeDropdown === category.name && category.subcategories && (
//               <div
//                 ref={dropdownRef}
//                 className="absolute top-[56px] left-0 w-40 bg-white border border-gray-300 shadow-lg rounded-md z-50"
//               >
//                 {category.subcategories.map((subcategory, idx) => (
//                   <Link
//                     key={idx}
//                     to={`/collections?subcategory=${subcategory._id}`}
//                     className="block px-4 py-[3px] text-[14px] text-gray-700 hover:bg-gray-100"
//                   >
//                     {subcategory.name}
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ShopCategories;
