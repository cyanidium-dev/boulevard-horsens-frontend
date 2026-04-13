import type { SanityImageObject } from "@sanity/image-url";

export type DesktopImageSide = "left" | "right";

/** Розміри оригіналу з Sanity `asset.metadata.dimensions`. */
export interface SanityImageDimensions {
  width?: number;
  height?: number;
  aspectRatio?: number;
}

export type ServiceImage = SanityImageObject & {
  alt?: string | null;
  _type?: "image";
  dimensions?: SanityImageDimensions | null;
  /** Пряме посилання на оригінал файлу в CDN (без ресайзу Sanity Image API). */
  assetUrl?: string | null;
};

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
