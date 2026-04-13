import Hero from "@/components/homePage/hero/Hero";
import Prices from "@/components/homePage/prices/Prices";
import About from "@/components/homePage/about/About";
import MarqueeLine from "@/components/shared/marquee/MarqueeLine";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeLine variant="black" className="mb-14" />
      <Prices />
      <About />
      <MarqueeLine variant="black" className="mb-9 lg:mb-[116px]" />
    </>
  );
}
