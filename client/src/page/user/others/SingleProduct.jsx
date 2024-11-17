import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import ProductCard2 from "@/components/Cards/ProductCard2";
import ProductSlider from "@/components/Others/ProductSlider";
import { IoMdStar } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import JustLoading from "@/components/JustLoading";
import ImageZoom from "@/components/ImageZoom";
import Quantity from "../components/Quantity";
import DescReview from "../components/DescReview";
import { URL } from "@/Common/api";
import { addToWishlist } from "@/redux/actions/user/wishlistActions";
import { config } from "@/Common/configurations";
import ProductDetailsStarAndRating from "../components/ProductDetailsStarAndRating";
import { addToBuyNowStore } from "@/redux/reducers/user/buyNowSlice";
import { getUserProducts } from "@/redux/actions/user/userProductActions";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    userProducts,
    loadingproducts,
    errorproducts,
    totalAvailableProducts,
  } = useSelector((state) => state.userProducts);
  const [searchParams, setSearchParams] = useSearchParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(1);
  const [cartLoading, setCartLoading] = useState(false);
  const [toggleStates, setToggleStates] = useState({
    div1: false,
    div2: false,
    div3: false,
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const dispatchAddWishlist = () => {
    if (!user) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
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
        console.log("data.product", data.product);
        setLoading(false);
        setCurrentImage(data.product.imageURL);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 100,
      behavior: "smooth",
    });

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

  const { user } = useSelector((state) => state.user);

  // const addToCart = async () => {
  //   if (!user) {
  //     window.scrollTo({
  //       top: 0,
  //       behavior: "smooth",
  //     });
  //     navigate("/login");
  //     return;
  //   }
  //   setCartLoading(true);
  //   await axios
  //     .post(
  //       `${URL}/user/cart`,
  //       { product: id, quantity: count },
  //       { ...config, withCredentials: true }
  //     )
  //     .then((data) => {
  //       toast.success("Added to cart");
  //       setCartLoading(false);
  //     })
  //     .catch((error) => {
  //       const err = error.response.data.error;
  //       toast.error(err);
  //       setCartLoading(false);
  //     });
  // };

  const addToCart = async () => {
    if (!user) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
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
          attributes: selectedAttributes, // Pass selected attributes here
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

  const { wishlist } = useSelector((state) => state.wishlist);
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
        imageIndex: attribute.imageIndex, // Include imageIndex
      });
      return acc;
    }, {});
  };

  const [selectedAttributes, setSelectedAttributes] = useState({});

  const handleSelectAttribute = (attributeName, value) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeName]: value === prev[attributeName] ? null : value, // Toggle selection
    }));

    const selectedAttribute = product.attributes.find(
      (attr) => attr.name === attributeName && attr.value === value
    );

    if (selectedAttribute) {
      const imageIndex = selectedAttribute.imageIndex; // Get imageIndex
      if (imageIndex !== undefined) {
        setSelectedImageIndex(imageIndex); // Set selected image index
      }
    }
  };

  // Combine the base image and more images
  const imageArray = product.moreImageURL
    ? [product.imageURL, ...product.moreImageURL]
    : [product.imageURL];

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <div className="w-full flex my-6">
        <h1 className="flex justify-center items-center font-Inter px-5 lg:px-32">
          <span>
            <HomeIcon color="#2C2C2C" />
          </span>
          <span className="hover:text-[#CC4254] ml-2">
            {product.category && product.category.name + " -"}
          </span>
          {" >"}
          <span className="hover:text-[#CC4254] ml-2">{product.name}</span>
        </h1>
      </div>
      <div className="w-full lg:px-20 justify-center">
        <div className="w-full my-2 flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 lg:h-[650px] h-[400px] flex flex-col">
            <ProductSlider
              images={imageArray}
              selectedImageIndex={selectedImageIndex}
            />
          </div>
          <div className="mt-8 lg:mt-0 lg:w-1/2 px-8">
            <h1 className="text-[16px] lg:text-[30px] xl:text-[40px] font-light font-sans">
              {product.name}
            </h1>
            <div className="flex w-full mt-1 lg:border-t-[1px] border-t-[#9F9F9F] lg:mt-6 pt-3">
              <h1 className="text-[16px] lg:text-[20px] xl:text-[30px] font-semibold font-Inter text-[#2C2C2C] ">
                {product.price} ₹
              </h1>
              {product.offer && (
                <>
                  <h1 className="text-[16px] lg:text-[20px] xl:text-[30px] font-light font-Inter text-[#949494] ml-3 line-through">
                    {parseInt(product.price / (1 - product.offer / 100))}₹
                  </h1>
                  <div className="ml-3 px-2 w-auto h-auto md:ml-4 bg-[#C84253] rounded-[2px] text-white text-[12px] lg:text-[13px] flex justify-center items-center">
                    {product.offer}% Off
                  </div>
                </>
              )}
            </div>
            <div className="mt-1">
              <h1 className="text-[14px] lg:text-[16px] xl:text-[18px] font-light font-Inter text-[#C84253] ">
                Incl. of all taxes
              </h1>
            </div>
            <div className="w-full lg:hidden h-4 mt-2 bg-[#F7F7F7]"></div>
            <div className="w-full px-">
              <div className="w-full pt-3 font-Inter">
                {/* <div className="w-full pt-3 font-Inter">
                  <h1 className="text-[14px] lg:text-[18px] xl:text-[22px] font-light font-Inter">
                    Select Size
                  </h1>
                  <div className="flex space-x-4 pt-1">
                    {["S", "M", "L", "XL"].map((size) => (
                      <div
                        key={size}
                        className={`cursor-pointer flex items-center justify-center w-12 h-12 rounded-full border-[1px] text-[14px] font-light transition duration-200 ${
                          product.selectedSize === size
                            ? "border-[#CC4254] bg-[#FEE4E4] text-[#CC4254]"
                            : "border-[#777777] text-black hover:bg-[#F7F7F7]"
                        }`}
                        onClick={() =>
                          setProduct((prev) => ({
                            ...prev,
                            selectedSize: size,
                          }))
                        }
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </div> */}

                {product.attributes &&
                  Object.entries(groupAttributes(product.attributes)).map(
                    ([name, values], index) => (
                      <div key={index} className="mt-4">
                        <p className="font-semibold text-gray-500 text-sm mb-1">
                          {name.toUpperCase()}{" "}
                        </p>
                        <div className="flex space-x-2">
                          {values.map(({ value, imageIndex }, valueIndex) => (
                            <p
                              key={valueIndex}
                              className={`py-2 my-2 px-4 rounded-full cursor-pointer 
              transition-colors duration-300 
              ${
                selectedAttributes[name] === value
                  ? "bg-blue-600 text-white" // Selected state
                  : "bg-gray-200 text-black hover:bg-blue-100"
              } // Default and hover states
            `}
                              onClick={() => handleSelectAttribute(name, value)}
                            >
                              {value}{" "}
                              {/* {imageIndex !== undefined && `(${imageIndex})`}{" "} */}
                              {/* Display imageIndex next to value */}
                            </p>
                          ))}
                        </div>
                      </div>
                    )
                  )}

                <div className="flex items-center justify-center w-24 lg:w-[150px] lg:h-[50px] mt-5 border-gray-300 rounded-md lg:mt-8">
                  <Quantity
                    count={count}
                    decrement={decrement}
                    increment={increment}
                  />
                </div>
                <div className="w-full flex justify-start pt-8">
                  <div className="flex items-center flex-col text-center">
                    <div className="flex items-center justify-center h-12 w-12 mb-2">
                      <ReplacementPolicy className="h-full w-full" />
                    </div>
                    <h1 className="text-[#2C2C2C] text-[16px] font-semibold w-32">
                      15 Days Easy Return
                    </h1>
                  </div>
                  <div className="flex items-center flex-col text-center">
                    <div className="flex items-center justify-center h-12 w-12 mb-2">
                      <FastDelivery className="h-full w-full" />
                    </div>
                    <h1 className="text-[#2C2C2C] text-[16px] font-semibold w-32">
                      Fast Delivery
                    </h1>
                  </div>
                </div>
                <div className="flex justify-start space-x-2 w-full pt-10">
                  <Button
                    disabled={cartLoading}
                    onClick={addToCart}
                    className="bg-[#CC4254] mt-3 w-1/2 md:w-auto h-12 rounded-[10px] font-Inter text-[16px] text-white px-10"
                  >
                    {cartLoading ? "Loading" : "Add to Bag"}
                  </Button>

                  {isProductInWishlist ? (
                    <Button className="bg-black mt-3 w-1/2 md:w-auto h-12 rounded-[10px] font-Inter text-[16px] text-white px-10 border-[1px] border-[#777777] ">
                      Wishlist ♥
                    </Button>
                  ) : (
                    <Button
                      onClick={dispatchAddWishlist}
                      className="bg-white mt-3 w-1/2 hover:text-white md:w-auto h-12 rounded-[10px] font-Inter text-[16px] text-black px-10 border-[1px] border-[#777777] "
                    >
                      Wishlist
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full h-4 mt-2 lg:hidden bg-[#F7F7F7]"></div>
            <div className="w-full px-">
              <div
                className="flex items-center w-full h-[60px] pl-4 justify-between border-b-[#5F5F5F] border-b-[0.5px] cursor-pointer lg:mt-4"
                onClick={() => handleClick("div1")}
              >
                <h1 className="font-sans text-[16px] lg:text-[22px] font-light">
                  Product Description
                </h1>
                <RiArrowDropDownLine
                  className={`text-4xl font-[100] transition-transform duration-300 ${
                    toggleStates.div1 ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
              {toggleStates.div1 && (
                <div className="p-4">
                  <p className="text-[14px] lg:text-[16px]">
                    {product.description}
                  </p>
                </div>
              )}
              <div
                className="flex items-center w-full h-[60px] pl-4 justify-between border-b-[#5F5F5F] border-b-[0.5px] cursor-pointer lg:mt-4"
                onClick={() => handleClick("div2")}
              >
                <h1 className="font-sans text-[16px] lg:text-[22px] font-light ">
                  Size & Material
                </h1>
                <RiArrowDropDownLine
                  className={`text-4xl font-[100] transition-transform duration-300 ${
                    toggleStates.div2 ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
              {toggleStates.div2 && (
                <div className="p-4">
                  <p className="text-[14px] lg:text-[16px]">
                    Size: {product.size ? product.size : "N/A"}
                  </p>
                  <p className="text-[14px] lg:text-[16px]">
                    Material: {product.material ? product.material : "N/A"}
                  </p>
                </div>
              )}
              <div
                className="flex items-center w-full h-[60px] pl-4 justify-between border-b-[#5F5F5F] border-b-[0.5px] cursor-pointer lg:mt-4"
                onClick={() => handleClick("div3")}
              >
                <h1 className="font-sans text-[16px] font-light lg:text-[22px] ">
                  Shipping & Returns
                </h1>
                <RiArrowDropDownLine
                  className={`text-4xl font-[100] transition-transform duration-300 ${
                    toggleStates.div3 ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
              {toggleStates.div3 && (
                <div className="p-4">
                  <p className="text-[14px] lg:text-[16px]">
                    Shipping:{" "}
                    {product.shippingInfo
                      ? product.shippingInfo
                      : "No shipping information available"}
                  </p>
                  <p className="text-[14px] lg:text-[16px]">
                    Returns:{" "}
                    {product.returnPolicy
                      ? product.returnPolicy
                      : "No return policy available"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full h-4 mt-2 bg-[#F7F7F7] lg:hidden "></div>

        <div></div>
      </div>
      <div className="flex flex-col w-full mt-2 px-5 lg:mt-20 lg:px-20">
        <h1 className="text-[16px] lg:text-[25px] lg:text-center xl:text-[30px] text-[#2C2C2C]">
          You may also like
        </h1>
        {loadingproducts ? (
          <div className="flex justify-center items-center h-96">
            <JustLoading size={10} />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-5">
            {userProducts && userProducts.length > 0 ? (
              userProducts.map((pro, index) => (
                <ProductCard2
                  star={true}
                  className="{w-[15%]}"
                  product={pro}
                  key={index}
                />
              ))
            ) : (
              <div className="h-96">
                <p>Nothing to show</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;

function FastDelivery(props) {
  return (
    <svg
      width="36"
      height="30"
      viewBox="0 0 36 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 29.2V27.8H8.3V22.5H2V21.1H8.3V15.8H4.1V14.4H8.3V8.6L4.9 1.1L6.2 0.5L9.8 8.4H33.6L29.9 0.6L31.2 0L35.1 8.4V29.2H0ZM17.7 16.5H25.7C25.8983 16.5 26.0645 16.4327 26.1985 16.298C26.3328 16.1637 26.4 15.997 26.4 15.798C26.4 15.5993 26.3328 15.4333 26.1985 15.3C26.0645 15.1667 25.8983 15.1 25.7 15.1H17.7C17.5017 15.1 17.3353 15.1673 17.201 15.302C17.067 15.4363 17 15.603 17 15.802C17 16.0007 17.067 16.1667 17.201 16.3C17.3353 16.4333 17.5017 16.5 17.7 16.5Z"
        fill="#CC4254"
      />
    </svg>
  );
}

function ReplacementPolicy(props) {
  return (
    <svg
      width="41"
      height="46"
      viewBox="0 0 41 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.1177 33.7537V22.2255L11.0732 16.3928V26.7544C11.0732 27.1204 11.1643 27.4635 11.3466 27.7837C11.5288 28.104 11.7793 28.3556 12.0982 28.5386L21.1177 33.7537ZM22.0744 33.7537L31.0939 28.5386C31.4128 28.3556 31.6633 28.104 31.8455 27.7837C32.0277 27.4635 32.1189 27.1204 32.1189 26.7544V16.3928L22.0744 22.2255V33.7537ZM26.9599 18.2798L31.5722 15.6379L22.621 10.4571C22.3021 10.2741 21.9605 10.1826 21.596 10.1826C21.2316 10.1826 20.89 10.2741 20.5711 10.4571L17.0863 12.4814L26.9599 18.2798ZM21.596 21.402L26.0033 18.8288L16.0613 13.0647L11.654 15.6036L21.596 21.402Z"
        fill="#CC4254"
      />
      <path
        d="M29.7887 39.0964L30.1132 39.7725L29.7887 39.0964ZM32.4553 38.4046C32.5926 38.0138 32.3871 37.5857 31.9963 37.4484L25.6279 35.211C25.2371 35.0737 24.809 35.2792 24.6717 35.67C24.5344 36.0608 24.7399 36.4889 25.1307 36.6262L30.7915 38.615L28.8028 44.2758C28.6655 44.6666 28.871 45.0947 29.2618 45.232C29.6526 45.3693 30.0807 45.1638 30.218 44.773L32.4553 38.4046ZM39.0761 13.0013L38.3973 13.3203L39.0761 13.0013ZM3.48002 29.733L2.80127 30.0521L3.48002 29.733ZM12.7674 3.6379L13.092 4.31403L12.7674 3.6379ZM30.1132 39.7725L32.0723 38.8321L31.4231 37.4798L29.4641 38.4203L30.1132 39.7725ZM38.3973 13.3203L39.3217 15.287L40.6792 14.6489L39.7548 12.6822L38.3973 13.3203ZM2.80127 30.0521C7.62547 40.3153 19.8896 44.6802 30.1132 39.7725L29.4641 38.4203C19.9916 42.9674 8.62854 38.9232 4.15878 29.414L2.80127 30.0521ZM12.4429 2.96176C2.33636 7.81321 -1.96766 19.9064 2.80127 30.0521L4.15878 29.414C-0.259766 20.0137 3.72803 8.80903 13.092 4.31403L12.4429 2.96176ZM13.092 4.31403C22.5645 -0.233076 33.9275 3.8111 38.3973 13.3203L39.7548 12.6822C34.9306 2.41896 22.6665 -1.94592 12.4429 2.96176L13.092 4.31403Z"
        fill="#C84253"
      />
    </svg>
  );
}
