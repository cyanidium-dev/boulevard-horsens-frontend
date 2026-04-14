import Hero from "@/components/homePage/hero/Hero";
import Prices from "@/components/homePage/prices/Prices";
import About from "@/components/homePage/about/About";
import MarqueeLine from "@/components/shared/marquee/MarqueeLine";
import Services from "@/components/homePage/services/Services";
import { SERVICES_QUERY } from "@/lib/queries";
import { Service } from "@/types/service";
import { fetchSanityData } from "@/utils/fetchSanityData";

export default async function HomePage() {
  const services = await fetchSanityData<Service[]>(SERVICES_QUERY);

  return (
    <>
      <Hero />
      <Services services={services} />
      <MarqueeLine variant="black" className="mb-14" />
      <Prices />
      <About />
      <MarqueeLine variant="black" className="mb-9 lg:mb-[116px]" />
    </>
  );
}
