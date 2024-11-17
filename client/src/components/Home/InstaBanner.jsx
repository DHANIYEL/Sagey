import React from 'react';
import instabanner from '../../assets/trendskart/home/instabannerbg.jpg';

const BannerSection = () => {
  return (
    <section
      className="relative h-[300px] bg-cover bg-center"
      style={{ backgroundImage: `url(${instabanner})` }}  // Corrected this line
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">@trend_kart FOLLOW US ON INSTAGRAM</h2>
        <a href="https://www.instagram.com/trend_kart" target="_blank" rel="noopener noreferrer">  {/* Added link to Instagram */}
          <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-all">
            Follow Us
          </button>
        </a>
      </div>
    </section>
  );
};

export default BannerSection;
