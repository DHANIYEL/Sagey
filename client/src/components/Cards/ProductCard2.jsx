import { URL } from "@/Common/api";
import React from "react";
import { useNavigate } from "react-router-dom";

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`h-4 w-4 ${
            index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-sm text-gray-600">{rating}/5</span>
    </div>
  );
};

const ProductCard2 = ({ product }) => {
  const navigate = useNavigate();
  const originalPrice = product.offer
    ? Math.round(product.price / (1 - product.offer / 100))
    : product.price;

  return (
    <div
      className="rounded-lg bg-gray-100 overflow-hidden p-4 cursor-pointer"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={`${URL}/img/${product?.imageURL}`}
          alt={product.name}
          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="pt-4">
        <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
        <StarRating rating={5} />
        <div className="mt-2 flex items-center">
          <span className="text-lg font-bold text-gray-800">
            ₹{product.price}
          </span>
          {product.offer && (
            <>
              <span className="ml-2 text-gray-500 line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
              <span className="ml-2 text-red-500">-{product.offer}%</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;