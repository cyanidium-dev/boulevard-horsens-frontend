import Container from "@/components/shared/container/Container";
import Image from "next/image";

export default function Reviews() {
  return (
    <section className="pb-[54px] lg:pb-15">
      <Container className="relative py-9">
        <Image
          src="/images/homePage/reviews/image-mob.webp"
          alt="Reviews"
          fill
          className="md:hidden -z-10 object-cover rounded-[28px]"
        />
        <Image
          src="/images/homePage/reviews/image.webp"
          alt="Reviews"
          fill
          className="hidden md:block -z-10 object-cover rounded-[28px]"
        />
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          {" "}
          <h2 className="font-evolenta text-[36px] lg:text-[64px] leading-[120%] font-normal uppercase text-black">
            Anmeldelser
          </h2>
          <div className="flex items-center gap-6 max-w-[173px]">
            <div className="size-4.5 rounded-full bg-black shrink-0" />
            <p className="text-[14px] leading-[120%] font-light text-black">
              Hvad vores kunder siger om os
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
