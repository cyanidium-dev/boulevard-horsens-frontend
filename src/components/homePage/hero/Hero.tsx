import Button from "@/components/shared/buttons/Button";
import HeroGallerySlider from "./HeroGallerySlider";
import { HERO_GALLERY_IMAGES } from "./heroImages";
import Container from "@/components/shared/container/Container";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[882px] lg:min-h-[779px]"
    >
      <div
        className="absolute -z-10 inset-0 w-full h-full"
        style={{
          background: `linear-gradient(136.34deg, rgba(0, 0, 0, 0.4) 18.74%, rgba(0, 0, 0, 0) 59.19%),
                 linear-gradient(200.07deg, rgba(0, 0, 0, 0.4) 36.67%, rgba(0, 0, 0, 0) 65.78%)`,
        }}
      />
      <div className="absolute -z-20 inset-0 w-full h-full rounded-b-[36px] overflow-hidden">
        <HeroGallerySlider images={HERO_GALLERY_IMAGES} />
      </div>

      <Container className="pt-[134px] lg:pt-[151px]">
        <h1 className="max-w-[517px] mb-9 font-evolenta text-[40px] lg:text-[72px] leading-[120%] font-normal uppercase text-beige">
          Beauty Salon Boulevard i Horsens
        </h1>
        <p className="mb-20 lg:mb-[54px] max-w-[270px] text-beige">
          Ansigtsbehandlinger, lash lift, brow lamination, manicure, pedicure og
          voks
        </p>
        {/* <p>
          Professionelle behandlinger med fokus på kvalitet, naturlige
          resultater og individuel tilgang
        </p> */}
        <Button
          href="/#services"
          variant="beige"
          className="w-full sm:w-[270px] h-15 lg:h-[68px]"
        >
          Vælg behandling
        </Button>
      </Container>
    </section>
  );
}
