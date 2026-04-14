import Hero from "@/components/servicesPage/hero/Hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs/Breadcrumbs";
import { SERVICES_QUERY } from "@/lib/queries";
import { Service } from "@/types/service";
import { fetchSanityData } from "@/utils/fetchSanityData";
import ServiceSection from "@/components/shared/serviceSection/ServiceSection";

export default async function ServicesPage() {
  const breadcrumbSteps = [{ label: `Hjem`, href: `/` }, { label: "Services" }];

  const services = await fetchSanityData<Service[]>(SERVICES_QUERY);

  return (
    <>
      <Hero />
      <Breadcrumbs steps={breadcrumbSteps} />
      {!services || !services.length
        ? null
        : services.map((service) => (
            <ServiceSection key={service._id} service={service} />
          ))}
    </>
  );
}
