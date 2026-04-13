export const SERVICES_QUERY = `*[_type == "service"] | order(_createdAt asc){
  _id,
  title,
  "slug": slug.current,
  description,
  "homePageImage": homePageImage{
    ...,
    "alt": alt
  },
  "servicesPageImageMobile": servicesPageImageMobile{
    ...,
    "alt": alt,
    "dimensions": asset->metadata.dimensions,
    "assetUrl": asset->url
  },
  "servicesPageImageDesktop": servicesPageImageDesktop{
    ...,
    "alt": alt,
    "dimensions": asset->metadata.dimensions,
    "assetUrl": asset->url
  },
  button{
    label,
    url
  },
  desktopImageSide
}`;
