import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import model1 from '../../assets/Sagey/model1.png'
import model2 from '../../assets/Sagey/model2.png'
import model3 from '../../assets/Sagey/product1.png'
import model4 from '../../assets/Sagey/model1.png'

const looks = [
  {
    id: 1,
    title: 'Casual Stripes',
    images: [
        model1,
        model2
    ]
  },
  {
    id: 2,
    title: 'Modern Minimal',
    images: [
        model2,
        model3
    ]
  },
  {
    id: 3,
    title: 'Elegant Earth',
    images: [
        model3,
        model4
    ]
  },
  {
    id: 4,
    title: 'Casual Stripes',
    images: [
        model1,
        model2
    ]
  },
  {
    id: 5,
    title: 'Modern Minimal',
    images: [
        model2,
        model3
    ]
  },
  {
    id: 6,
    title: 'Elegant Earth',
    images: [
        model3,
        model4
    ]
  },
  {
    id: 7,
    title: 'Casual Stripes',
    images: [
        model1,
        model2
    ]
  },
  {
    id: 8,
    title: 'Modern Minimal',
    images: [
        model2,
        model3
    ]
  },
  {
    id: 9,
    title: 'Elegant Earth',
    images: [
        model3,
        model4
    ]
  }
]

const LookBook = () => {
  // State to control showing more images
  const [isShowMore, setIsShowMore] = useState(false);

  // Function to handle "See More" button click
  const handleShowMore = () => {
    setIsShowMore(true);
  };

  // Limit the looks displayed based on the isShowMore state
  const displayedLooks = isShowMore ? looks : looks.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
        <div className='mb-5'>
            <h1 className='font-bold text-2xl'>Sagey look-book</h1>
            <div className='h-1 mt-1 w-20 bg-primary'></div>
        </div>
      {/* Grid layout with 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {displayedLooks.map((look) => (
          <div key={look.id} className="">
            {look.images.map((image, index) => (
              <div 
                key={index} 
                className="relative w-full h-[500px] overflow-hidden " // Fixed height for all images
              >
                <img
                  src={image}
                  alt={`${look.title} - Look ${index + 1}`}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Show "See More" button if not all images are shown */}
      <div className="flex justify-center mt-8">
        {!isShowMore && (
          <Button 
            className="bg-primary hover:bg-teal-800 text-white px-8 py-2 rounded-md"
            onClick={handleShowMore}
          >
            See More
          </Button>
        )}
      </div>
    </div>
  )
}

export default LookBook
