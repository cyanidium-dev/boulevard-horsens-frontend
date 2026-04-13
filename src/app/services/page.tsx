import Hero from "@/components/servicesPage/hero/Hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs/Breadcrumbs";

export default function ServicesPage() {
  const breadcrumbSteps = [{ label: `Hjem`, href: `/` }, { label: "Services" }];

  return (
    <>
      <Hero />
      <Breadcrumbs steps={breadcrumbSteps} />
    </>
  );
}
