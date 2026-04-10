"use client";

import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  burgerMenuVariants,
  burgerListVariants,
} from "@/utils/animationVariants";
import MobileNavMenu from "./MobileNavMenu";
import Container from "../../container/Container";

interface BurgerMenuContentProps {
  isOpen: boolean;
  setIsOpenBurgerMenu: Dispatch<SetStateAction<boolean>>;
}

export default function BurgerMenuContent({
  isOpen,
  setIsOpenBurgerMenu,
}: BurgerMenuContentProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lg:hidden fixed right-0 top-0 z-40 pt-[71px] w-full h-dvh max-h-dvh bg-beige overflow-hidden no-doc-scroll"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={burgerMenuVariants}
        >
          <Container
            className="flex flex-col justify-between h-full pt-24 pb-[93px] overflow-y-auto scrollbar scrollbar-w-[3px] scrollbar-thumb-rounded-full 
          scrollbar-track-rounded-full scrollbar-thumb-black/50 scrollbar-track-transparent"
          >
            {/* Меню */}
            <motion.div
              variants={burgerListVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <MobileNavMenu setIsOpenBurgerMenu={setIsOpenBurgerMenu} />
            </motion.div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
