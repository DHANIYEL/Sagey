import React from "react";

const Quantity = ({ increment, decrement, count }) => {
  return (
    <div className="flex flex-col items-center justify-center p-0 border border-gray-200 rounded-sm w-fit bg-white">
      <div className="flex gap-5 items-center rounded-lg p-2 font-bold">
        <button
          onClick={decrement}
          className="flex text-3xl items-center justify-center w-10 h-10 text-gray-500 rounded-none transition duration-200"
        >
          -
        </button>
        <span className="text-xl">{count}</span>
        <button
          onClick={increment}
          className="flex items-center justify-center w-10 h-10 text-gray-500 rounded-none  transition duration-200"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Quantity;
