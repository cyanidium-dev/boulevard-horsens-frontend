export type DesktopImageSide = "left" | "right";

export interface ServiceImage {
  alt?: string | null;
  [key: string]: unknown;
}

export interface ServiceButton {
  label?: string;
  url?: string;
}

export interface Service {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  homePageImage?: ServiceImage;
  servicesPageImageMobile?: ServiceImage;
  servicesPageImageDesktop?: ServiceImage;
  button?: ServiceButton;
  desktopImageSide: DesktopImageSide;
}
