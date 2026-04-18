"use client";

import { ReactNode } from "react";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "@/components/shared/swper/SwiperWrapper";
import type { ResultsCard } from "@/types/results";
import ResultCard from "./ResultCard";

interface ResultsSliderProps {
  cards: ResultsCard[];
  uniqueKey?: string;
  component?: ReactNode;
}

export default function ResultsSlider({
  cards,
  uniqueKey,
  component,
}: ResultsSliderProps) {
  if (!cards?.length) return null;

  return (
    <SwiperWrapper
      loop
      breakpoints={{
        0: {
          spaceBetween: 20,
          slidesPerView: "auto",
        },
      }}
      uniqueKey={uniqueKey}
      component={component}
      swiperClassName="results-slider"
      buttonsClassName="pr-5 lg:pr-6 mr-5 sm:mr-[calc(100%-640px+20px)] md:mr-[calc(100%-768px+20px)] 
          lg:mr-[calc(100%-1024px+24px)] xl:mr-[calc(100%-1280px+24px)]"
      buttonsPosition="center"
    >
      {cards.map((card) => (
        <SwiperSlide key={card._key}>
          <div className="flex h-full w-max max-w-full items-stretch">
            <ResultCard card={card} />
          </div>
        </SwiperSlide>
      ))}
    </SwiperWrapper>
  );
}
