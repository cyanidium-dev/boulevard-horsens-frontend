import Hero from "@/components/servicesPage/hero/Hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs/Breadcrumbs";
import {
  SERVICES_FAQ_QUERY,
  SERVICES_PAGE_SEO_QUERY,
  SERVICES_QUERY,
} from "@/lib/queries";
import { Service } from "@/types/service";
import type { ServicesFaq } from "@/types/faq";
import { fetchSanityData } from "@/utils/fetchSanityData";
import Services from "@/components/servicesPage/services/Services";
import { Suspense } from "react";
import Loader from "@/components/shared/loader/Loader";
import Faq from "@/components/shared/faq/Faq";
import type { Metadata } from "next";
import { getMetadataFromSanity } from "@/utils/getMetadataFromSanity";
import { getDefaultMetadata } from "@/utils/getDefaultMetadata";
import type { PageSeo } from "@/types/page";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const pageData = await fetchSanityData<{ seo: PageSeo | null }>(
      SERVICES_PAGE_SEO_QUERY,
    );

    if (pageData?.seo) {
      return getMetadataFromSanity({
        seo: pageData.seo,
        path: "/services",
        defaultTitle:
          "Services | Boulevard Beauty Salon i Horsens",
        defaultDescription:
          "Se alle behandlinger hos Boulevard Beauty Salon i Horsens: ansigtsbehandlinger, lash lamination, bryn, manicure, pedicure og voks.",
      });
    }
  } catch (error) {
    console.error("Failed to fetch services page metadata:", error);
  }

  return getDefaultMetadata("/services");
}

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
