import Script from "next/script";

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://boulevardsalon.dk/#organization",
  name: "Boulevard",
  url: "https://boulevardsalon.dk",
  email: "boulevardsalondk@gmail.com",
  logo: {
    "@type": "ImageObject",
    url: "https://boulevardsalon.dk/images/logo.png",
    width: 600,
    height: 600,
  },
  image: {
    "@type": "ImageObject",
    url: "https://boulevardsalon.dk/opengraph-image.jpg",
    width: 1200,
    height: 630,
  },
  sameAs: [
    "https://www.facebook.com/share/17Fr2f9xsW/?mibextid=wwXIfr",
    "https://www.instagram.com/boulevard.beauty_salon_?igsh=MWE3MDh1YTExaXAwZg==",
  ],
} as const;

export function OrganizationSchema() {
  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(ORGANIZATION_SCHEMA),
      }}
    />
  );
}
