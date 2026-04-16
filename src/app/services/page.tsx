import Hero from "@/components/servicesPage/hero/Hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs/Breadcrumbs";
import { SERVICES_QUERY } from "@/lib/queries";
import { Service } from "@/types/service";
import { fetchSanityData } from "@/utils/fetchSanityData";
import MarqueeLine from "@/components/shared/marquee/MarqueeLine";
import Services from "@/components/servicesPage/services/Services";
import { Suspense } from "react";
import Loader from "@/components/shared/loader/Loader";

export default async function ServicesPage() {
  const breadcrumbSteps = [{ label: `Hjem`, href: `/` }, { label: "Services" }];

  const services = await fetchSanityData<Service[]>(SERVICES_QUERY);

  return (
    <>
      <Hero />
      <Breadcrumbs steps={breadcrumbSteps} />
      <Suspense fallback={<Loader />}>
        <Services services={services} />
      </Suspense>
      <MarqueeLine variant="black" className="mb-14" />
    </>
  );
}
