import ImageSlider from "@/components/Home/ImageSlider";
import NewArrivals from "@/components/Home/NewArrivals";
import OurProducts from "@/components/Home/OurProducts";
import ReviewSlider from "@/components/Home/ReviewSlider";


import HomeImg from "../../../assets/home.png";
import Image2 from "../../../assets/home2.jpg";
import Image3 from "../../../assets/home.png";

import offImg1 from "../../../assets/trendskart/home/offer-img.png"
import offImg2 from "../../../assets/trendskart/home/offer-img-2.jpg"
import MakeUrStyle from "@/components/Home/MakeUrStyle";
import FlashSale from "@/components/Home/FlashSale";
import LookBook from "@/components/Home/LookBook";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import ShopCategories from "@/components/Others/ShopCatogories";
// import ShopCategories from "@/components/Others/ShopCatogories";


const images = [HomeImg, Image2, Image3];
const offImages = [offImg1, offImg2];

const handleClickFunctionWhats = ()=> {
  const phoneNumber = '9400740061'; // Replace with the WhatsApp number
  const message = encodeURIComponent('Hi, I’m excited to create my own custom-designed dress! Can you help me bring my vision to life?');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  window.open(whatsappUrl, '_blank');
  
}
const handleClickFunctionInsta = ()=> {
  window.open('https://www.instagram.com/sagey.in/', '_blank');
}
export default function Home2() {
  return (
    <>
    {/* <ShopCategories/> */}
    {/* <CarouselTextSlider/> */}
    <ShopCategories />
    <WhatsAppFloatingButton/>
    <div className="py-10  max-md:py-0 ">
    <ImageSlider images={images} hideArrows={false}  className="py-0 sm:py-10 h-screen" />
    <div className="ml-4 px-0 sm:px-20 py-10 ">
    <h1 className="font-bold text-xl ">THRILLER DEALS</h1>
    <div className="h-1 w-20 bg-primary"></div>
    </div>
    <ImageSlider images={offImages} hideArrows={true} hideThreeDot={true} slideInterval={3000} />

      <NewArrivals />
      <MakeUrStyle
      heading="MAKE YOUR OWN DESIGN"
      description="Express your style with custom designs made just for you. Enjoy seamless personalization, premium quality, and endless possibilities to create your unique look or the perfect gift"
      btnName="Make Now"
      handleClick={handleClickFunctionWhats}
    />
      <FlashSale />
      <OurProducts />
      <ReviewSlider />

      {/* <BestSellers /> */}
      <MakeUrStyle
      heading="@sagey.in follow us on instagram"
      description="#Wear The Change"
      btnName="Follow Us"
      handleClick={handleClickFunctionInsta}
    />
    <LookBook />
    </div>
    </>
  );
}
