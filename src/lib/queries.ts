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
    "alt": alt
  },
  "servicesPageImageDesktop": servicesPageImageDesktop{
    ...,
    "alt": alt
  },
  button{
    label,
    url
  },
  desktopImageSide
}`;

export const WORKING_HOURS_QUERY = `*[_type == "workingHours"][0]{
  _id,
  title,
  from,
  to
}`;
