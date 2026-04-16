import Container from "@/components/shared/container/Container";
import Image from "next/image";
import Button from "@/components/shared/buttons/Button";

export default function Prices() {
  return (
    <section id="prices" className="pb-20 lg:pb-[116px]">
      <Container className="relative pt-15 pb-5 lg:pb-[65px] rounded-[36px] overflow-hidden">
        <Image
          src="/images/homePage/price/image.webp"
          alt="Price"
          fill
          className="scale-x-[-1] -z-10 object-cover object-[center_60%]"
        />
        <div className="flex flex-col gap-20">
          <div>
            <h2 className="mb-7 lg:mb-[54px] font-evolenta text-[36px] lg:text-[64px] leading-[120%] font-normal uppercase text-beige">
              Priser på behandlinger
            </h2>
            <Button
              href="/services"
              variant="black"
              className="w-full sm:h-[238px] h-[68px]"
            >
              Se priser
            </Button>
          </div>

          <div className="relative pt-9 pb-6 px-6 rounded-[28px] bg-white/10 backdrop-blur-[10px]">
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
            <h3 className="mb-9 lg:mb-12 font-evolenta text-[24px] leading-[120%] font-normal uppercase text-beige">
              Priser på behandlinger
            </h3>
            <div className="py-9 lg:py-3.5 px-7 lg:px-[45px] rounded-[16px] bg-beige"></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
