import Hero from "@/components/servicesPage/hero/Hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs/Breadcrumbs";
import { SERVICES_QUERY } from "@/lib/queries";
import { Service } from "@/types/service";
import { fetchSanityData } from "@/utils/fetchSanityData";

async function getServices() {
  return fetchSanityData<Service[]>(SERVICES_QUERY);
}

export default async function ServicesPage() {
  const breadcrumbSteps = [{ label: `Hjem`, href: `/` }, { label: "Services" }];
  await getServices();

  return (
    <>
      <Hero />
      <Breadcrumbs steps={breadcrumbSteps} />
    </>
  );
}
