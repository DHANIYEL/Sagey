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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Our Products</h1>
          <div className="h-1 w-20 bg-primary"></div>
        </div>
        <div
          onClick={() => navigate(`/collections`)}
          className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
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
            shuffleArray(userProducts)
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
    </div>
  );
};

export default OurProducts;
