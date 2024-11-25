import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import ProductCard2 from "@/components/Cards/ProductCard2";
import ProductSlider from "@/components/Others/ProductSlider";
import { RiArrowDropDownLine } from "react-icons/ri";
import JustLoading from "@/components/JustLoading";
import Quantity from "../components/Quantity";
import { URL } from "@/Common/api";
import { addToWishlist } from "@/redux/actions/user/wishlistActions";
import { config } from "@/Common/configurations";
import { addToBuyNowStore } from "@/redux/reducers/user/buyNowSlice";
import { getUserProducts } from "@/redux/actions/user/userProductActions";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    userProducts,
    loadingproducts,
  } = useSelector((state) => state.userProducts);
  const { user } = useSelector((state) => state.user);
  const { wishlist } = useSelector((state) => state.wishlist);

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [cartLoading, setCartLoading] = useState(false);
  const [toggleStates, setToggleStates] = useState({
    div1: false,
    div2: false,
    div3: false,
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState({});

  const handleHome = () => {
    navigate("/");
  };

  const filteredProducts = userProducts?.filter(
    (product) => product._id !== id
  );

  const dispatchAddWishlist = () => {
    if (!user) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate("/login");
      return;
    }
    dispatch(addToWishlist({ product: id }));
  };

  const loadProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${URL}/user/product/${id}`, {
        withCredentials: true,
      });
      if (data) {
        setProduct(data.product);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 100, behavior: "smooth" });
    dispatch(getUserProducts(searchParams));
    loadProduct();
  }, [id]);

  const increment = async () => {
    const { data } = await axios.get(
      `${URL}/user/product-quantity/${id}`,
      config
    );
    if (data.stockQuantity > count) {
      setCount((c) => c + 1);
    } else {
      toast.error("Quantity Insufficient");
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount((c) => c - 1);
    }
  };

  const addToCart = async () => {
    if (!user) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate("/login");
      return;
    }
    setCartLoading(true);
    try {
      await axios.post(
        `${URL}/user/cart`,
        {
          product: id,
          quantity: count,
          attributes: selectedAttributes,
        },
        { ...config, withCredentials: true }
      );
      toast.success("Added to cart");
    } catch (error) {
      const err = error.response.data.error;
      toast.error(err);
    }
    setCartLoading(false);
  };

  const isProductInWishlist = wishlist.some((item) => item.product._id === id);

  const handleClick = (div) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [div]: !prevState[div],
    }));
  };

  const groupAttributes = (attributes) => {
    return attributes.reduce((acc, attribute) => {
      acc[attribute.name] = acc[attribute.name] || [];
      acc[attribute.name].push({
        value: attribute.value,
        imageIndex: attribute.imageIndex,
      });
      return acc;
    }, {});
  };

  const handleSelectAttribute = (attributeName, value) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeName]: value,
    }));
  };

  const imageArray = product.moreImageURL
    ? [product.imageURL, ...product.moreImageURL]
    : [product.imageURL];

  return (
    <div className="w-full flex flex-col justify-start items-center">
      {/* Breadcrumb */}
      <div className="w-full flex my-4 px-4 lg:px-20 items-center">
        <h1 className="flex items-center font-Inter text-sm lg:text-base">
          <HomeIcon 
            className="mr-2 cursor-pointer" 
            color="#2C2C2C" 
            onClick={handleHome} 
            size={20} 
          />
          <span className="hover:text-[#CC4254]">
            {product.category && product.category.name + " -"}
          </span>
          <span className="ml-2 hover:text-[#CC4254]">{product.name}</span>
        </h1>
      </div>

      {/* Product Main Section */}
      <div className="w-full px-4 lg:px-20">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
            <ProductSlider
              images={imageArray}
              selectedImageIndex={selectedImageIndex}
              className="w-full h-[400px] lg:h-[650px]"
            />
            
            {/* Action Buttons */}
            <div className="flex space-x-2 mt-4">
              <Button
                disabled={cartLoading}
                onClick={addToCart}
                className="w-1/2 bg-[#166272] h-12 text-white text-sm lg:text-base"
              >
                {cartLoading ? "Loading" : "Add to Bag"}
              </Button>
              
              <Button
                onClick={dispatchAddWishlist}
                className={`w-1/2 h-12 text-sm lg:text-base ${
                  isProductInWishlist 
                    ? "bg-black text-[#166272] border border-[#166272]" 
                    : "bg-white text-[#166272] border-2 border-[#166272]"
                }`}
              >
                Wishlist {isProductInWishlist ? "♥" : ""}
              </Button>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="w-full lg:w-1/2 lg:pl-8 mt-4 lg:mt-0">
            <h1 className="text-xl lg:text-3xl font-light">{product.name}</h1>
            
            {/* Price Section */}
            <div className="flex items-center mt-2 lg:mt-4">
              <h2 className="text-lg lg:text-2xl font-semibold mr-2">
                ₹ {product.price}
              </h2>
              {product.offer && (
                <>
                  <h3 className="text-sm lg:text-lg text-gray-500 line-through mr-2">
                    ₹{parseInt(product.price / (1 - product.offer / 100))}
                  </h3>
                  <div className="text-xs lg:text-sm text-[#C84253] bg-red-100 px-2 py-1 rounded">
                    {product.offer}% Off
                  </div>
                </>
              )}
            </div>

            {/* Attributes Selection */}
            {product.attributes && 
              Object.entries(groupAttributes(product.attributes)).map(
                ([name, values], index) => (
                  <div key={index} className="mt-4">
                    <p className="text-sm font-semibold text-gray-600 mb-2">
                      {name.toUpperCase()}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {values.map(({ value }, valueIndex) => (
                        <button
                          key={valueIndex}
                          className={`px-3 py-1 text-sm rounded ${
                            selectedAttributes[name] === value
                              ? "bg-[#166272] text-white"
                              : "bg-gray-200 text-black hover:bg-gray-300"
                          }`}
                          onClick={() => handleSelectAttribute(name, value)}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              )
            }

            {/* Quantity Selector */}
            <div className="mt-4 flex items-center">
              <Quantity
                count={count}
                decrement={decrement}
                increment={increment}
                className="w-full max-w-[200px]"
              />
            </div>

            {/* Expandable Sections */}
            {["Product Description", "Size & Material", "About the Brand"].map((section, index) => {
              const divKey = `div${index + 1}`;
              return (
                <div 
                  key={section}
                  className="border-b border-gray-300"
                >
                  <div 
                    className="flex justify-between items-center py-4 cursor-pointer"
                    onClick={() => handleClick(divKey)}
                  >
                    <h3 className="text-base lg:text-lg">{section}</h3>
                    <RiArrowDropDownLine 
                      className={`text-2xl transition-transform ${
                        toggleStates[divKey] ? "rotate-180" : "rotate-0"
                      }`} 
                    />
                  </div>
                  {toggleStates[divKey] && (
                    <div className="pb-4 text-sm">
                      {section === "Product Description" && (
                        <p>{product.description}</p>
                      )}
                      {section === "Size & Material" && (
                        <>
                          <p>Size: {product.size || "N/A"}</p>
                          <p>Material: {product.material || "N/A"}</p>
                        </>
                      )}
                      {section === "About the Brand" && (
                        <>
                          <p>Shipping: {product.shippingInfo || "No info"}</p>
                          <p>Returns: {product.returnPolicy || "No policy"}</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="w-full px-4 lg:px-20 mt-8">
        <h2 className="text-xl lg:text-2xl text-center mb-4">
          You may also like
        </h2>
        {loadingproducts ? (
          <div className="flex justify-center items-center h-96">
            <JustLoading size={10} />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((pro, index) => (
                <ProductCard2
                  star={true}
                  product={pro}
                  key={pro._id || index}
                />
              ))
            ) : (
              <div className="col-span-full text-center">
                Nothing to show
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;