import React from "react";

const Quantity = ({ increment, decrement, count }) => {
  return (
    <div className="flex gap-5 items-center rounded-lg p-2 font-bold">
      <button
        onClick={decrement}
        className="flex text-3xl items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-200"
      >
        -
      </button>
      <span className="text-xl">{count}</span>
      <button
        onClick={increment}
        className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-200"
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
