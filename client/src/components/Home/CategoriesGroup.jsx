import React from "react";


import allcat from "../../assets/trendskart/categories/allcat.png";
import perfumes from "../../assets/trendskart/categories/perfumes.png";
import headsets from "../../assets/trendskart/categories/headsets.png";
import footwears from "../../assets/trendskart/categories/footwears.png";



function CategoriesGroup() {
  return (
    <div className="flex items-center m-12 rounded-lg p-6 sm:p-24 justify-center bg-black">
          <img src={allcat} alt="Wearables" className="w-full mb-4" />       
    </div>
  );
}

export default CategoriesGroup;
