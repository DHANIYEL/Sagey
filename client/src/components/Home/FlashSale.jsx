'use client'

import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import pant from '../../assets/Sagey/Product1.png';
import Shirt from '../../assets/Sagey/model1.png';
import OrangeTShirt from '../../assets/Sagey/product1.png';
import tShirt from '../../assets/Sagey/model1.png';


const categories = [
  {
    title: "MAXI GOWN",
    image: pant,
    bgColor: "bg-amber-100",
  },
  {
    title: "PARTY WEAR",
    image: Shirt,
    bgColor: "bg-orange-200",
  },
  {
    title: "CROP TOPS",
    image: OrangeTShirt,
    bgColor: "bg-gray-100",
  },
  {
    title: "BOTTOMS",
    image: tShirt,
    bgColor: "bg-stone-200",
  },
]

const FlashSale = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative max-w-[90rem] mx-auto overflow-hidden py-10">
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
  <div className="flex">
    {categories.map((category, index) => (
      <div
        key={index}
        className="relative flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_25%]"
      >
        <div className={`relative aspect-[3/4] ${category.bgColor}`}>
          <img
            src={category.image}
            alt={category.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-6 left-6">
            <h3 className="text-white text-2xl font-bold tracking-wider">
              {category.title}
            </h3>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


      {/* Navigation Buttons */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90"
        onClick={scrollNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}

export default FlashSale
