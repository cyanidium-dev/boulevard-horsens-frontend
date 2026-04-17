"use client";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "@/components/shared/swper/SwiperWrapper";
import {
  HeroGalleryImage,
  SMALL_HERO_SLIDER_IMAGES,
} from "@/components/homePage/hero/heroImages";

interface SmallHeroSliderProps {
  images?: HeroGalleryImage[];
}

export default function SmallHeroSlider({
  images = SMALL_HERO_SLIDER_IMAGES,
}: SmallHeroSliderProps) {
  return (
    <SwiperWrapper
      loop={true}
      breakpoints={{
        0: {
          spaceBetween: 20,
          slidesPerView: 1,
        },
      }}
      swiperClassName="h-[222px] w-full xs:w-[222px]"
      showNavigation
      buttonsPosition="onSlides"
    >
      {images.map((image, index) => (
        <SwiperSlide key={image.url ?? index}>
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover rounded-[18px]"
            sizes="100vw"
            priority
            fetchPriority="high"
            placeholder="blur"
            blurDataURL={image.blurDataURL}
          />
        </SwiperSlide>
      ))}
    </SwiperWrapper>
  );
}
