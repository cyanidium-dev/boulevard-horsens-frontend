import Container from "@/components/shared/container/Container";
import Image from "next/image";
import Button from "@/components/shared/buttons/Button";
import MarqueeLine from "@/components/shared/marquee/MarqueeLine";

export default function About() {
  return (
    <section id="about" className="pb-20 lg:pb-30">
      <Container className="lg:flex lg:flex-row-reverse lg:gap-6">
        <div className="relative overflow-visible lg:w-[calc(35%-12px)] xl:w-[calc(50%-12px)] lg:h-auto">
          <div className="relative p-6 rounded-[20px] overflow-hidden lg:h-full">
            <div
              className="absolute inset-0 -z-10"
              style={{
                background: `
                 linear-gradient(162.81deg, rgba(0, 0, 0, 0.4) 13.41%, rgba(102, 102, 102, 0) 85.41%)`,
              }}
            />
            <Image
              src="/images/homePage/about/image.webp"
              alt="About"
              fill
              className="-z-20 object-cover"
            />
            <h2 className="mb-11 lg:mb-[53px] font-evolenta text-[32px] leading-[120%] font-normal uppercase text-beige">
              Om Boulevard Beauty Salon i Horsens
            </h2>
            <Button
              variant="beige"
              className="w-full sm:w-[238px] h-[68px] mb-[213px] lg:mb-[365px]"
            >
              Book din tid
            </Button>
          </div>
          <MarqueeLine
            variant="black"
            className="w-dvw absolute bottom-[70px] lg:bottom-[96px]"
          />
        </div>

        <div className="flex flex-col xs:flex-row xs:flex-wrap gap-5 xs:gap-6 lg:w-[calc(65%-12px)] xl:w-[calc(50%-12px)]">
          <div className="flex flex-col justify-between xs:w-[calc(50%-12px)] p-5 rounded-[20px] bg-brown">
            <p className="mb-12 font-montserrat text-[14px] leading-[120%] font-light text-beige">
              Boulevard Beauty Salon i Horsens er et moderne skønhedssalon, hvor
              du kan få flere kosmetiske behandlinger samlet ét sted. Vi
              tilbyder professionelle ansigtsbehandlinger, chemical peelings,
              anti-aging peelings, hydrofacial, microneedling og mesoterapi til
              hudforbedring og naturlig glød.
            </p>
            <p className="font-evolenta text-[24px] leading-[120%] font-normal uppercase text-beige text-right">
              01
            </p>
          </div>

          <div className="relative flex flex-col justify-between xs:w-[calc(50%-12px)] p-5 rounded-[20px] bg-white/10 shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px]">
            <div
              className="absolute inset-0 rounded-[28px] pointer-events-none"
              style={{
                background:
                  "linear-gradient(270.67deg, #F2F2F2 -9.58%, #C7C7C7 103.45%)",
                padding: "1px",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            <p className="mb-5 font-montserrat text-[14px] leading-[120%] font-light">
              Vi arbejder også med kropsbehandlinger som body slimming og
              pressotherapy, samt full body waxing for glat og langvarigt
              resultat.
            </p>
            <p className="mb-[58px] font-montserrat text-[14px] leading-[120%] font-light">
              I vores salon kan du få manicure og pedicure, lash lamination,
              bryn shaping og laminering samt makeup og hårstyling til events og
              brude.
            </p>
            <p className="font-evolenta text-[24px] leading-[120%] font-normal uppercase text-right">
              02
            </p>
          </div>

          <div className="relative flex flex-col justify-between xs:w-[calc(50%-12px)] p-5 rounded-[20px] bg-white/10 shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px]">
            <div
              className="absolute inset-0 rounded-[28px] pointer-events-none"
              style={{
                background:
                  "linear-gradient(270.67deg, #F2F2F2 -9.58%, #C7C7C7 103.45%)",
                padding: "1px",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            <p className="mb-[146px] font-montserrat text-[14px] leading-[120%] font-light">
              Vi lægger vægt på tryghed, ærlighed og personlig kontakt. Vores
              mål er, at du kan slappe af, føle dig velkommen og få resultater,
              der både kan ses og mærkes.
            </p>

            <p className="font-evolenta text-[24px] leading-[120%] font-normal uppercase text-right">
              03
            </p>
          </div>

          <a
            href="https://maps.app.goo.gl/pJZxv9hHeH65WZ8L9"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group relative xs:w-[calc(50%-12px)] aspect-square xs:aspect-auto xs:h-auto rounded-[20px] overflow-hidden"
          >
            <Image
              src="/images/homePage/about/map.webp"
              alt="map"
              fill
              className="object-cover xl:group-hover:scale-105 transition duration-1200 ease-in-out"
            />
          </a>
        </div>
      </Container>
    </section>
  );
}
