"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import {
  ReactNode,
  useRef,
  useLayoutEffect,
  useState,
  type MouseEvent,
} from "react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import { Swiper } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import type { Swiper as SwiperType } from "swiper";
import type { SwiperModule } from "swiper/types";
import ShevronIcon from "@/components/shared/icons/ShevronIcon";
import { twMerge } from "tailwind-merge";

interface SwiperWrapperProps {
  children: ReactNode;
  breakpoints: SwiperOptions["breakpoints"];
  swiperClassName: string;
  loop?: boolean;
  uniqueKey?: string;
  buttonsPosition?: "right" | "center" | "onSlides";
  component?: ReactNode;
  additionalModules?: SwiperModule[];
  additionalOptions?: Partial<SwiperOptions>;
  showNavigation?: boolean;
  buttonsClassName?: string;
  showCoverflowEffect?: boolean;
  centeredSlides?: boolean;
  onSwiper?: (swiper: SwiperType) => void;
  onSlideChange?: (swiper: SwiperType) => void;
}

const buttonsPositionClass = {
  right: "sm:justify-end sm:ml-auto",
  center: "justify-center",
  onSlides: "absolute bottom-20 left-0 z-30 w-full justify-between",
};

export default function SwiperWrapper({
  children,
  breakpoints,
  swiperClassName,
  loop = false,
  buttonsPosition = "center",
  uniqueKey,
  component,
  additionalModules = [],
  additionalOptions = {},
  showNavigation = true,
  buttonsClassName,
  showCoverflowEffect = false,
  centeredSlides = false,
  onSwiper,
  onSlideChange,
}: SwiperWrapperProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperInstanceRef = useRef<SwiperType | null>(null);
  const navigationSetupRef = useRef(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Функція для налаштування навігації
  const setupNavigation = (swiperInstance: SwiperType) => {
    if (
      prevRef.current &&
      nextRef.current &&
      swiperInstance.params.navigation &&
      typeof swiperInstance.params.navigation === "object" &&
      !navigationSetupRef.current
    ) {
      navigationSetupRef.current = true;
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      try {
        swiperInstance.navigation?.destroy();
      } catch {
        /* navigation ще не ініціалізований */
      }
      swiperInstance.navigation?.init();
      swiperInstance.navigation?.update();

      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);
    }
  };

  const handlePrevClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const s = swiperInstanceRef.current;
    if (!s || (s.isBeginning && !s.params.loop)) return;
    s.slidePrev();
  };

  const handleNextClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const s = swiperInstanceRef.current;
    if (!s || (s.isEnd && !s.params.loop)) return;
    s.slideNext();
  };

  // Прив'язуємо кнопки навігації після рендеру
  useLayoutEffect(() => {
    if (!showNavigation) return;
    const swiperInstance = swiperInstanceRef.current;
    if (swiperInstance && prevRef.current && nextRef.current) {
      setupNavigation(swiperInstance);
    }
  });

  return (
    <>
      <Swiper
        key={`${uniqueKey}-swiper`}
        onSwiper={(swiper) => {
          swiperInstanceRef.current = swiper;
          navigationSetupRef.current = false;
          onSwiper?.(swiper);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
          onSlideChange?.(swiper);
        }}
        centeredSlides={centeredSlides}
        breakpoints={breakpoints}
        navigation={
          showNavigation
            ? {
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
                // Swiper за замовчуванням додає клас `.swiper-button-lock` (у navigation.css — `display: none`).
                // Він застосовується до будь-якого елемента; при короткому `isLocked` на старті кнопки зникають.
                lockClass: "bh-swiper-nav-lock",
              }
            : false
        }
        loop={loop}
        speed={1000}
        coverflowEffect={
          showCoverflowEffect
            ? {
                rotate: 0,
                depth: 100,
                stretch: 0,
                modifier: 1,
                slideShadows: false,
              }
            : {}
        }
        effect={showCoverflowEffect ? "coverflow" : ""}
        modules={[
          ...(showNavigation ? [Navigation] : []),
          ...(showCoverflowEffect ? [EffectCoverflow] : []),
          ...additionalModules,
        ]}
        className={swiperClassName}
        {...additionalOptions}
      >
        {children}
      </Swiper>
      {showNavigation && (
        <div
          key={`${uniqueKey}-buttons`}
          className={twMerge(
            `flex flex-col-reverse gap-10 mb-0.5`,
            buttonsClassName,
          )}
        >
          {component}
          <div
            className={`flex gap-3 items-center pointer-events-none ${buttonsPositionClass[buttonsPosition]}`}
          >
            <button
              type="button"
              ref={prevRef}
              disabled={isBeginning && !loop}
              aria-label="Forrige slide"
              className={twMerge(
                `custom-prev relative z-[30] group size-[54px] rounded-full flex items-center justify-center pointer-events-auto border border-black
             bg-white disabled:bg-white enabled:bg-black disabled:cursor-default enabled:cursor-pointer transition duration-300 xl:enabled:hover:opacity-80`,
                buttonsPosition === "onSlides"
                  ? "scale-60 border-transparent enabled:bg-white/10 enabled:shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px]"
                  : "",
              )}
              onClick={handlePrevClick}
            >
              {buttonsPosition === "onSlides" ? (
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(270.67deg, #F2F2F2 -9.58%, #C7C7C7 103.45%)",
                    padding: "1px",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
              ) : null}
              <ShevronIcon className="relative z-[30] -rotate-90 group-enabled:text-white group-disabled:text-black mr-1 pointer-events-auto" />
            </button>
            <button
              type="button"
              ref={nextRef}
              disabled={isEnd && !loop}
              aria-label="Næste slide"
              className={twMerge(
                `custom-next relative z-[30] group size-[54px] rounded-full flex items-center justify-center pointer-events-auto border border-black
             bg-white disabled:bg-white enabled:bg-black disabled:cursor-default enabled:cursor-pointer transition duration-300 xl:enabled:hover:opacity-80`,
                buttonsPosition === "onSlides"
                  ? "scale-60 border-transparent enabled:bg-white/10 enabled:shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px]"
                  : "",
              )}
              onClick={handleNextClick}
            >
              {buttonsPosition === "onSlides" ? (
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(270.67deg, #F2F2F2 -9.58%, #C7C7C7 103.45%)",
                    padding: "1px",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
              ) : null}
              <ShevronIcon className="rotate-90 group-enabled:text-white group-disabled:text-black ml-1 pointer-events-auto" />
            </button>
          </div>
        </div>
      )}
      {!showNavigation && component && (
        <div key={`${uniqueKey}-component`}>{component}</div>
      )}
    </>
  );
}
