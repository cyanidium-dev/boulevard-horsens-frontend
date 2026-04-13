import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import Button from "@/components/shared/buttons/Button";
import Container from "@/components/shared/container/Container";
import { urlForImage } from "@/lib/sanityClient";
import type { Service, ServiceImage } from "@/types/service";
import { twMerge } from "tailwind-merge";
import DecorativeEllipsis from "./DecorativeEllipsis";

const LAYOUT_FALLBACK_W = 2400;
const LAYOUT_FALLBACK_H = 1600;

function serviceImageUrl(source: ServiceImage | undefined) {
  if (!source?.asset) return null;
  const direct = source.assetUrl?.trim();
  if (direct) return direct;
  const w = source.dimensions?.width;
  if (w && w > 0) {
    return urlForImage(source as SanityImageSource)
      .width(w)
      .quality(100)
      .url();
  }
  return urlForImage(source as SanityImageSource)
    .quality(100)
    .url();
}

function imageLayoutBox(source: ServiceImage | undefined) {
  const d = source?.dimensions;
  const width = d?.width && d.width > 0 ? d.width : LAYOUT_FALLBACK_W;
  const height =
    d?.height && d.height > 0
      ? d.height
      : d?.aspectRatio && d.aspectRatio > 0
        ? Math.round(width / d.aspectRatio)
        : LAYOUT_FALLBACK_H;
  return { width, height };
}

export interface ServiceSectionProps {
  service: Service;
}

export default function ServiceSection({ service }: ServiceSectionProps) {
  const side = service.desktopImageSide ?? "left";

  const mobileRef =
    service.servicesPageImageMobile ?? service.servicesPageImageDesktop;
  const desktopRef =
    service.servicesPageImageDesktop ?? service.servicesPageImageMobile;

  const mobileSrc = serviceImageUrl(mobileRef);
  const desktopSrc = serviceImageUrl(desktopRef);
  const mobileLayout = imageLayoutBox(mobileRef);
  const desktopLayout = imageLayoutBox(desktopRef);

  const mobileAlt = mobileRef?.alt ?? service.title;
  const desktopAlt = desktopRef?.alt ?? service.title;

  const btn = service.button;

  return (
    <section
      id={service.slug}
      className="pb-25 scroll-mt-24 lg:pb-[152px] lg:scroll-mt-28"
    >
      <Container>
        <div
          className={twMerge(
            "flex flex-col gap-8 sm:flex-row-reverse sm:items-center sm:gap-9",
            side === "right" && "sm:flex-row",
          )}
        >
          <div className="flex min-w-0 flex-1 flex-col">
            <DecorativeEllipsis
              uniqueKey={`service-${service._id}`}
              className="mb-4 sm:mb-9"
            />
            <h2 className="mb-4 font-evolenta text-[24px] font-normal uppercase leading-[120%] text-black lg:mb-9 lg:text-[48px]">
              {service.title}
            </h2>
            {mobileSrc ? (
              <Image
                src={mobileSrc}
                alt={mobileAlt}
                width={mobileLayout.width}
                height={mobileLayout.height}
                sizes="100vw"
                className="mb-8 w-full rounded-[12px] sm:hidden"
              />
            ) : null}
            {service.description ? (
              <p className="mb-10 whitespace-pre-line lg:mb-9">
                {service.description}
              </p>
            ) : null}
            {btn?.url && btn.label ? (
              <Button href={btn.url} variant="black" className="w-full">
                {btn.label}
              </Button>
            ) : null}
          </div>

          {desktopSrc && mobileSrc ? (
            <>
              {" "}
              <Image
                src={mobileSrc}
                alt={mobileAlt}
                width={mobileLayout.width}
                height={mobileLayout.height}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="hidden sm:block lg:hidden h-auto w-[calc(50%-18px)] object-cover rounded-[12px]"
              />
              <Image
                src={desktopSrc}
                alt={desktopAlt}
                width={desktopLayout.width}
                height={desktopLayout.height}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="hidden lg:block h-auto w-[calc(50%-18px)] object-cover rounded-[12px]"
              />
            </>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
