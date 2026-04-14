import HeroGallerySlider from "./HeroGallerySlider";
import { HERO_GALLERY_IMAGES } from "./heroImages";

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
    </section>
  );
}
