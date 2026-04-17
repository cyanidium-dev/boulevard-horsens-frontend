import Hero from "@/components/servicesPage/hero/Hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs/Breadcrumbs";
import { SERVICES_FAQ_QUERY, SERVICES_QUERY } from "@/lib/queries";
import { Service } from "@/types/service";
import type { ServicesFaq } from "@/types/faq";
import { fetchSanityData } from "@/utils/fetchSanityData";
import Services from "@/components/servicesPage/services/Services";
import { Suspense } from "react";
import Loader from "@/components/shared/loader/Loader";
import Faq from "@/components/shared/faq/Faq";

export default async function ServicesPage() {
  const breadcrumbSteps = [{ label: `Hjem`, href: `/` }, { label: "Services" }];

  const services = await fetchSanityData<Service[]>(SERVICES_QUERY);
  const servicesFaq = await fetchSanityData<ServicesFaq>(SERVICES_FAQ_QUERY);

  return (
    <>
      <Hero />
      <Breadcrumbs steps={breadcrumbSteps} />
      <Suspense fallback={<Loader />}>
        <Services services={services} />
      </Suspense>
      <Suspense fallback={<Loader className="h-[425px]" />}>
        <Faq faq={servicesFaq?.faq} />
      </Suspense>
    </>
  );
}
