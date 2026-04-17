import Hero from "@/components/blogPage/hero/Hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs/Breadcrumbs";

export default function BlogPage() {
  const breadcrumbSteps = [{ label: `Hjem`, href: `/` }, { label: "Blog" }];

  return (
    <>
      <Hero />
      <Breadcrumbs steps={breadcrumbSteps} />
    </>
  );
}
