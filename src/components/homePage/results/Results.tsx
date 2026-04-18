import Container from "@/components/shared/container/Container";
import Image from "next/image";

export default function Results() {
  return (
    <section className="mb-[54px]">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Image
            src="/images/homePage/results/decor.webp"
            alt="Results"
            width={270}
            height={116}
          />
          <h2 className="md:max-w-[380px] lg:max-w-[600px] xl:max-w-[825px] font-evolenta text-[26px] lg:text-[48px] leading-[120%] font-light text-right uppercase text-black">
            Se resultater fra vores kunder før og efter behandlinger
          </h2>
        </div>
      </Container>
    </section>
  );
}
