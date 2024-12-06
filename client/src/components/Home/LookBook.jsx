import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import model1 from '../../../../server/public/products/1732472929425-Snapinsta.app_465312902_531366709670045_9154428972843883234_n_1080.jpg'
import model2 from '../../../../server/public/products/1732473308785-Snapinsta.app_466090053_554177770557956_8071193005145551139_n_1080.jpg'
import model3 from '../../../../server/public/products/1732472929424-Snapinsta.app_465128493_2269016723453875_5739826853210052398_n_1080.jpg'
import model4 from '../../../../server/public/products/1732472816932-Snapinsta.app_465141660_1053882959850697_7929979004672098805_n_1080.jpg'
import model5 from '../../../../server/public/products/1732304554345-product1.png'
import model6 from '../../../../server/public/products/1732472663536-Snapinsta.app_466005848_1231451371306596_4627743878004052069_n_1080.jpg'
import model7 from '../../../../server/public/products/1732473308780-Snapinsta.app_467114292_1276019447160269_9192971139706565781_n_1080.jpg'
import model8 from '../../../../server/public/products/1732472578173-Snapinsta.app_466005131_867798948759603_334934234018594737_n_1080.jpg'
import model9 from '../../../../server/public/products/1732472663526-Snapinsta.app_466092793_1242296907095569_8367549208719060317_n_1080.jpg'
import model10 from '../../../../server/public/products/1732473308783-Snapinsta.app_467189993_8198649636901862_4509868729107994218_n_1080.jpg'

const looks = [
  {
    id: 1,
    title: 'Casual Stripes',
    images: [
        model1,
        model10
    ]
  },
  {
    id: 2,
    title: 'Modern Minimal',
    images: [
        model2,
        model9
    ]
  },
  {
    id: 3,
    title: 'Elegant Earth',
    images: [
        model3,
        model8
    ]
  },
  {
    id: 4,
    title: 'Casual Stripes',
    images: [
        model4,
        model7
    ]
  },
  {
    id: 5,
    title: 'Modern Minimal',
    images: [
        model5,
        model6
    ]
  },
  {
    id: 6,
    title: 'Elegant Earth',
    images: [
        model2,
        model9
    ]
  },
  {
    id: 7,
    title: 'Casual Stripes',
    images: [
        model10,
        model6
    ]
  },
  {
    id: 8,
    title: 'Modern Minimal',
    images: [
        model7,
        model2
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
        <h1 className="text-lg sm:text-xl md:text-2xl font-normal sm:font-semibold md:font-bold">Sagey look-book</h1>
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
            className="bg-primary hover:bg-teal-800 text-white px-8 py-2 rounded-sm"
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
