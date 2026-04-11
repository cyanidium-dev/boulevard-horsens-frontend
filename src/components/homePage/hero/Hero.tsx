import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[882px] lg:min-h-[779px]"
    >
      <div className="absolute -z-10 inset-0 w-full h-full" />
      <div className="absolute -z-20 inset-0 w-full h-full rounded-b-[36px] overflow-hidden">
        <Image
          src="/images/homePage/hero/imageOne.webp"
          alt="Hero"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
