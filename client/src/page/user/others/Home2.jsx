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


const images = [HomeImg, Image2, Image3];
const offImages = [offImg1, offImg2];

const handleClickFunctionWhats = ()=> {
  const phoneNumber = '9072374704'; // Replace with the WhatsApp number
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
    <div className="py-10 px-20 max-md:px-10">
    <ImageSlider images={images} hideArrows={false}  />
    <div className="ml-4">
    <h1 className="font-bold text-xl">THRILLER DEALS</h1>
    <div className="h-1 w-20 bg-primary"></div>
    </div>
    <ImageSlider images={offImages} hideArrows={true} hideThreeDot={true} slideInterval={3000} />

      <NewArrivals />
      <MakeUrStyle
      heading="CREATE YOUR OWN STYLE"
      description="Unlock endless possibilities and showcase your unique flair with customizable designs tailored just for you. Whether expressing personal style or creating a one-of-a-kind gift, our platform offers a seamless design experience with a variety of options and high-quality materials. Your style, your rules – the possibilities are endless!"
      btnName="Start Now"
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
