import type {
  SanityImageCrop,
  SanityImageHotspot,
  SanityReference,
} from "@sanity/image-url";

export type DesktopImageSide = "left" | "right";

export type SanityImage = {
  _type: "image";
  asset: SanityReference;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
  alt?: string;
};

export interface ServiceButton {
  label: string;
  url: string;
}

export interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  homePageImage: SanityImage;
  servicesPageImageMobile: SanityImage;
  servicesPageImageDesktop: SanityImage;
  button: ServiceButton;
  desktopImageSide: DesktopImageSide;
}
