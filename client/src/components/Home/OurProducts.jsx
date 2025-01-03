import React, { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProducts } from "@/redux/actions/user/userProductActions";
import { useNavigate, useSearchParams } from "react-router-dom";
import JustLoading from "../JustLoading";
import ProductCard2 from "../Cards/ProductCard2";

const shuffleArray = (array) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

const OurProducts = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { userProducts, loading } = useSelector((state) => state.userProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProducts(searchParams));
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8" data-aos="fade-up">
      <div>
        <h1 className="text-lg sm:text-xl md:text-2xl font-normal sm:font-semibold md:font-bold">
          Our Products
        </h1>
        <div className="h-1 w-20 bg-primary mb-8"></div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <JustLoading size={10} />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {userProducts && userProducts.length > 0 ? (
            shuffleArray(userProducts)
              .slice(0, 16) // Display 16 products
              .map((product, index) => (
                <ProductCard2 product={product} key={index} />
              ))
          ) : (
            <div className="h-96 flex items-center justify-center">
              <p>Nothing to show</p>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate(`/collections`)}
          className="flex bg-primary hover:bg-white hover:border hover:border-bg-primary hover:text-primary text-white px-8 py-2 rounded-sm items-center"
        >
          View all
          <ChevronRight className="h-5 w-5 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default OurProducts;
