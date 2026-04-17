import Hero from "@/components/blogPage/hero/Hero";
import { Breadcrumbs } from "@/components/shared/breadcrumbs/Breadcrumbs";
import { Suspense } from "react";
import Loader from "@/components/shared/loader/Loader";
import BlogList from "@/components/blogPage/blogList/BlogList";
import { ALL_BLOG_POSTS_QUERY } from "@/lib/queries";
import { fetchSanityData } from "@/utils/fetchSanityData";
import { BlogPost } from "@/types/blogPost";

export default async function BlogPage() {
  const breadcrumbSteps = [{ label: `Hjem`, href: `/` }, { label: "Blog" }];

  const blogPosts = await fetchSanityData<BlogPost[]>(ALL_BLOG_POSTS_QUERY);

  return (
    <>
      <Hero />
      <Breadcrumbs steps={breadcrumbSteps} />
      <Suspense fallback={<Loader />}>
        <BlogList blogPosts={blogPosts} />
      </Suspense>
    </>
  );
}
