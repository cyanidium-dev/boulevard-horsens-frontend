import Hero from "@/components/homePage/hero/Hero";
import Prices from "@/components/homePage/prices/Prices";
import About from "@/components/homePage/about/About";
import MarqueeLine from "@/components/shared/marquee/MarqueeLine";
import Services from "@/components/homePage/services/Services";
import { SERVICES_QUERY, WORKING_HOURS_QUERY } from "@/lib/queries";
import { Service } from "@/types/service";
import { fetchSanityData } from "@/utils/fetchSanityData";
import Course from "@/components/homePage/course/Course";
import Results from "@/components/homePage/results/Results";

interface WorkingHours {
  from?: string;
  to?: string;
}

export default async function HomePage() {
  const services = await fetchSanityData<Service[]>(SERVICES_QUERY);
  const workingHours = await fetchSanityData<WorkingHours>(WORKING_HOURS_QUERY);

  return (
    <>
      <Hero />
      <Services services={services} />
      <Results />
      <MarqueeLine variant="black" className="mb-14" />
      <Course />
      <Prices from={workingHours?.from} to={workingHours?.to} />
      <About />
      <MarqueeLine variant="black" className="mb-9 lg:mb-[116px]" />
    </>
  );
}
