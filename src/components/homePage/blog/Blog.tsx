import Container from "@/components/shared/container/Container";
import Image from "next/image";

export default function Blog() {
  return (
    <section className="pb-[55px] lg:pb-15">
      <Container>
        <div className="lg:flex justify-between items-center mb-10 lg:mb-8">
          <h2 className="max-w-[472px] lg:max-w-[562px] xl:max-w-[762px] font-evolenta text-[24px] lg:text-[48px] leading-[120%] font-normal uppercase">
            Læs vores nyeste artikler om hudpleje og behandlinger
          </h2>
          <Image
            src="/images/homePage/blog/decorations.svg"
            alt="decorations"
            width={288}
            height={68}
            className="hidden lg:block w-[288px] h-[68px]"
          />
        </div>
      </Container>
    </section>
  );
}
