// NewArrivals.jsx
import React, { useEffect } from "react";
import { ChevronRight } from "lucide-react"; // Assuming you're using lucide-react for icons

import pant from "../../assets/trendskart/products/pant.png";
import shirt from "../../assets/trendskart/products/shirt.png";
import tshirt from "../../assets/trendskart/products/t-shirt.png";
import tshirtorange from "../../assets/trendskart/products/t-shirt-orange.png";

import ProductCard2 from "../Cards/ProductCard2";
import { useDispatch, useSelector } from "react-redux";
import { getUserProducts } from "@/redux/actions/user/userProductActions";
import { useNavigate, useSearchParams } from "react-router-dom";
import JustLoading from "../JustLoading";

const products = [
  {
    id: 1,
    name: "T-shirt with Tape Details",
    image: pant,
    rating: 4.5,
    price: 120,
    discountedPrice: null,
    discount: null,
  },
  {
    id: 2,
    name: "Skinny Fit Jeans",
    image: tshirt,
    rating: 3.5,
    price: 240,
    discountedPrice: 260,
    discount: 20,
  },
  {
    id: 3,
    name: "Checkered Shirt",
    image: tshirtorange,
    rating: 4.5,
    price: 180,
    discountedPrice: null,
    discount: null,
  },
  {
    id: 4,
    name: "Sleeve Striped T-shirt",
    image: shirt,
    rating: 4.5,
    price: 130,
    discountedPrice: 160,
    discount: 30,
  },
];

const OurProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { userProducts, loading, error, totalAvailableProducts } = useSelector(
    (state) => state.userProducts
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getWishlist());
    dispatch(getUserProducts(searchParams));

    // const params = new URLSearchParams(window.location.search);
    // const pageNumber = params.get("page");
    // setPage(parseInt(pageNumber || 1));
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8" data-aos="fade-up">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <div
          onClick={() => {
            navigate(`/collections`);
          }}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          View all
          <ChevronRight className="h-5 w-5 ml-1" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <JustLoading size={10} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {userProducts && userProducts.length > 0 ? (
            userProducts
              .slice(0, 4)
              .map((product, index) => (
                <ProductCard2 product={product} key={index} />
              ))
          ) : (
            <div className="h-96">
              <p>Nothing to show</p>
            </div>
          )}
        </div>
      )}

      {/* {products.map((product) => (
          <div key={product.id} className="bg-gray-100 rounded-lg p-4">
            <div className="aspect-w-1 aspect-h-1 w-full mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="font-semibold mb-2">{product.name}</h3>
            <StarRating rating={product.rating} />
            <div className="mt-2 flex items-center">
              <span className="text-lg font-bold">${product.price}</span>
              {product.discountedPrice && (
                <>
                  <span className="ml-2 text-gray-500 line-through">
                    ${product.discountedPrice}
                  </span>
                  <span className="ml-2 text-red-500">-{product.discount}%</span>
                </>
              )}
            </div>
          </div>
        ))} */}
    </div>
  );
};

export default OurProducts;
