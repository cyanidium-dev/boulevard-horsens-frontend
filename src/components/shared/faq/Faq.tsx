import Container from "@/components/shared/container/Container";
import type { FaqSection } from "@/types/faq";
import Image from "next/image";

interface FaqProps {
  faq?: FaqSection;
}

export default function Faq({ faq }: FaqProps) {
  if (!faq || !faq.items || faq.items.length === 0) return null;
  const { description, items } = faq;

  return (
    <section className="pb-30 lg:pb-[150px]">
      <Container className="relative">
        <div className="absolute top-[-19px] lg:top-[-24px] right-[-39px] lg:right-[-28px] w-[189px] lg:w-[270px] h-auto aspect-[270/116]">
          <Image
            src="/images/homePage/faq/decor.webp"
            alt="Decor"
            width={270}
            height={116}
            className="w-[189px] lg:w-[270px] h-auto"
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-16 lg:gap-[70px]">
          <h2 className="font-evolenta text-[36px] lg:text-[64px] leading-[120%] font-normal uppercase text-black">
            FAQ
          </h2>
          {description && (
            <div className="flex items-center gap-6 lg:gap-[55px] max-w-[280px] md:max-w-[340px] lg:max-w-[460px]">
              <div className="size-4.5 rounded-full bg-black shrink-0" />
              <p>{description}</p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
