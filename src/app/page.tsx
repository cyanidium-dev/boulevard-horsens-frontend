import Hero from "@/components/homePage/hero/Hero";
import Prices from "@/components/homePage/prices/Prices";
import About from "@/components/homePage/about/About";
import MarqueeLine from "@/components/shared/marquee/MarqueeLine";
import Services from "@/components/homePage/services/Services";
import {
  HOME_FAQ_QUERY,
  SERVICES_QUERY,
  TEAM_MEMBERS_QUERY,
  WORKING_HOURS_QUERY,
} from "@/lib/queries";
import { Service } from "@/types/service";
import type { TeamMember } from "@/types/team";
import type { HomeFaq } from "@/types/faq";
import type { WorkingHours } from "@/types/workingHours";
import { fetchSanityData } from "@/utils/fetchSanityData";
import Course from "@/components/homePage/course/Course";
import Results from "@/components/homePage/results/Results";
import Team from "@/components/homePage/team/Team";
import Loader from "@/components/shared/loader/Loader";
import Reviews from "@/components/homePage/reviews/Reviews";
import { Suspense } from "react";
import Faq from "@/components/shared/faq/Faq";
import Blog from "@/components/homePage/blog/Blog";

export default async function HomePage() {
  const services = await fetchSanityData<Service[]>(SERVICES_QUERY);
  const workingHours = await fetchSanityData<WorkingHours>(WORKING_HOURS_QUERY);
  const teamMembers = await fetchSanityData<TeamMember[]>(TEAM_MEMBERS_QUERY);
  const homeFaq = await fetchSanityData<HomeFaq>(HOME_FAQ_QUERY);

  return (
    <>
      <Hero />
      <Suspense fallback={<Loader className="h-[680px]" />}>
        <Services services={services} />
      </Suspense>
      <Results />
      <MarqueeLine variant="black" className="mb-14" />
      <Course />
      <Suspense fallback={<Loader className="h-[780px] lg:h-[425px]" />}>
        <Prices from={workingHours?.from} to={workingHours?.to} />
      </Suspense>
      <About />
      <Suspense fallback={<Loader className="h-[425px]" />}>
        <Team teamMembers={teamMembers} />
      </Suspense>
      <Reviews />
      <MarqueeLine variant="black" className="mb-9 lg:mb-[116px]" />
      <Suspense fallback={<Loader className="h-[425px]" />}>
        <Faq faq={homeFaq?.faq} />
      </Suspense>
      <Blog />
    </>
  );
}
