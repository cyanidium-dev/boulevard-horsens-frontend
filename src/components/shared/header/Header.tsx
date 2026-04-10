"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import Container from "../container/Container";
import NavMenu from "./NavMenu";
import StarIcon from "../icons/StarIcon";
import Button from "../buttons/Button";
import BurgerMenu from "./burgerMenu/BurgerMenu";

export default function Header() {
  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollPosition(latest);
  });

  return (
    <header className="fixed z-50 left-0 right-0 top-0 z-50 py-6 lg:py-8">
      <Container className="relative z-10 flex items-center justify-between rounded-full">
        {scrollPosition > 20 && (
          <>
            <div
              className="md:hidden absolute w-[calc(100%-8px)] h-[calc(100%+8px)] -top-1 left-1 px-4 -z-10 rounded-full bg-white/10 shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px]"
              aria-hidden
            />
            <div
              className="md:hidden absolute w-[calc(100%-8px)] h-[calc(100%+8px)] -top-1 left-1 -z-10 rounded-full pointer-events-none"
              style={{
                background:
                  "linear-gradient(270.67deg, #F2F2F2 -9.58%, #C7C7C7 103.45%)",
                padding: "1px",
                opacity: 0.5,
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
              aria-hidden
            />
          </>
        )}
        <div className={`relative z-50 py-2 lg:ml-7`}>
          <p
            className={`relative z-50 ${isOpenBurgerMenu ? "text-black" : "text-beige"} transition duration-300 ease-in-out font-evolenta text-[18px] lg:text-[24px] leading-[120%] font-normal uppercase`}
          >
            Boulevard
          </p>
          {scrollPosition > 20 && (
            <>
              <div
                className="hidden md:block absolute w-[calc(100%+16px)] h-[calc(100%+8px)] top-2 -left-2 p-4 -z-10 rounded-full bg-[linear-gradient(90.95deg,rgba(231,231,231,0.8)_52.25%,rgba(255,255,255,0.8)_99.18%)] shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px]"
                aria-hidden
              />
              <div
                className="hidden md:block absolute w-[calc(100%+16px)] h-[calc(100%+8px)] top-2 -left-2 -z-10 rounded-full pointer-events-none"
                style={{
                  background:
                    "linear-gradient(270.67deg, #F2F2F2 -9.58%, #C7C7C7 103.45%)",
                  padding: "1px",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
                aria-hidden
              />
            </>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <div className="reltive z-50 flex items-center gap-5 lg:gap-8 xl:gap-[78px]">
            <NavMenu />
            <StarIcon
              className={`${isOpenBurgerMenu ? "text-black" : "text-beige"} transition duration-300 ease-in-out size-[21px] lg:size-[37px] `}
            />
            <Button className="w-[119px] h-12 lg:w-[200px] lg:h-[57px] shrink-0">
              Book tid
            </Button>
          </div>
          <BurgerMenu
            isOpenBurgerMenu={isOpenBurgerMenu}
            setIsOpenBurgerMenu={setIsOpenBurgerMenu}
          />
        </div>
      </Container>
    </header>
  );
}
