"use client";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "@/components/shared/swper/SwiperWrapper";
import {
  HeroGalleryImage,
  SMALL_HERO_SLIDER_IMAGES,
} from "@/components/homePage/hero/heroImages";
import AppLightbox from "@/components/shared/lightbox/AppLightbox";

interface SmallHeroSliderProps {
  images?: HeroGalleryImage[];
}

export default function SmallHeroSlider({
  images = SMALL_HERO_SLIDER_IMAGES,
}: SmallHeroSliderProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const lightboxSlides = useMemo(
    () =>
      images.map((img) => ({
        src: img.url,
        alt: img.alt,
      })),
    [images],
  );

  const handleSlideImageClick = (clickedIndex: number) => {
    setLightboxIndex(clickedIndex);
    setLightboxOpen(true);
  };

  return (
    <div
      className={twMerge(
        "absolute bottom-[-360px] left-5 xs:left-auto sm:bottom-[-127px] xs:right-5 lg:right-6 w-[calc(100%-40px)] xs:w-[222px] h-[326px] rounded-[18px] overflow-hidden",
        lightboxOpen && "no-doc-scroll",
      )}
    >
      <div className="max-w-[168px] mb-11 flex items-center gap-6">
        <div className="size-4.5 bg-beige rounded-full shrink-0" />{" "}
        <p className="text-beige text-[12px] leading-[120%] font-light">
          Professionelle behandlinger med fokus på kvalitet, naturlige
          resultater og individuel tilgang
        </p>
      </div>
      <div className="rounded-[18px] overflow-hidden">
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
              <div
                role="button"
                tabIndex={0}
                className="relative h-full w-full cursor-pointer rounded-[18px] overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-beige focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                onClick={() => handleSlideImageClick(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSlideImageClick(index);
                  }
                }}
              >
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
              </div>
            </SwiperSlide>
          ))}
        </SwiperWrapper>
      </div>

      <AppLightbox
        open={lightboxOpen && lightboxSlides.length > 0}
        index={lightboxIndex}
        slides={lightboxSlides}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />
    </div>
  );
}
