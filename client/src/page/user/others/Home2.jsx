import CategoriesGroup from "@/components/Home/CategoriesGroup";
import ImageSlider from "@/components/Home/ImageSlider";
import LogoSlider from "@/components/Home/LogoSlider";
import NewArrivals from "@/components/Home/NewArrivals";
import OurProducts from "@/components/Home/OurProducts";
import ReviewSlider from "@/components/Home/ReviewSlider";
import BestSellers from "@/components/Others/BestSellers";
import BannerSection from "../../../components/Home/InstaBanner"

import HomeImg from "../../../assets/home.png";
import Image2 from "../../../assets/home2.jpg";
import Image3 from "../../../assets/home.png";

import offImg1 from "../../../assets/trendskart/home/offer-img.png"
import offImg2 from "../../../assets/trendskart/home/offer-img-2.jpg"
import MakeUrStyle from "@/components/Home/MakeUrStyle";


const images = [HomeImg, Image2, Image3];
const offImages = [offImg1, offImg2];


export default function Home2() {
  return (
    <>
    <div className="py-10 px-20 max-md:px-10">
    <ImageSlider images={images} hideArrows={false}  />
    <div className="ml-10">
    <h1 className="font-semibold text-lg">THRILLER DEALS</h1>
    <div className="h-1 w-12 hover:w-20 bg-primary"></div>
    </div>
    <ImageSlider images={offImages} hideArrows={true} hideThreeDot={true} slideInterval={3000} />

      <NewArrivals />
      <MakeUrStyle />
      <LogoSlider />
      <OurProducts />
      {/* <BestSellers /> */}
      <CategoriesGroup />
      <BannerSection/>
      <ReviewSlider />
    </div>
    </>
  );
}
