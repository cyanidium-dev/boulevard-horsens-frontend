import MarqueeLine from "../marquee/MarqueeLine";
import Container from "../container/Container";
import {
  ADDRESS,
  ADDRESS_URL,
  CVR_NUMBER,
  EMAIL,
  CODE_SITE_URL,
  WEB_BOND_URL,
} from "@/constants/constants";
import SocialsGroup from "./SocialsGroup";
import Button from "../buttons/Button";
import Image from "next/image";
import WebBondIcon from "../icons/WebbondIcon";
import CodeSiteIcon from "../icons/CodeSiteIcon";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <MarqueeLine className="" />
      <Container className="relative">
        <div className="lg:hidden absolute top-[21px] right-0 w-[73px] h-[559px]">
          <Image
            src="/images/footer/logo-mob.webp"
            alt="footer background"
            fill
            className="-z-10 object-cover"
          />
        </div>

        <div className="hidden lg:block absolute bottom-[0px] left-[-11px] w-[1291px] h-[173px]">
          <Image
            src="/images/footer/logo-desk.webp"
            alt="footer background"
            fill
            className="-z-10 object-cover"
          />
        </div>

        <div className="lg:hidden absolute top-[-71px] right-[68px] w-[186px] h-[259px]">
          <Image
            src="/images/footer/spatulas.webp"
            alt="footer background"
            fill
            className="-z-10 object-cover"
          />
        </div>

        <div className="hidden lg:block absolute top-[-71px] right-[-188px] w-[354px] h-[313px]">
          <Image
            src="/images/footer/spatulas-desk.webp"
            alt="footer background"
            fill
            className="-z-10 object-cover"
          />
        </div>

        <div className="lg:hidden absolute bottom-0 right-0 w-[341px] h-[418px]">
          <Image
            src="/images/footer/hand-mob.webp"
            alt="footer background"
            fill
            className="-z-10 object-cover"
          />
        </div>

        <div className="hidden lg:block absolute bottom-0 left-[0px] w-[666px] h-[522px]">
          <Image
            src="/images/footer/hand.webp"
            alt="footer background"
            fill
            className="-z-20 object-cover"
          />
        </div>

        <div className="flex flex-col lg:flex-row-reverse lg:justify-end gap-[54px] pt-25 lg:pt-[116px] pb-[127px] lg:pb-[227px]">
          <div className="flex flex-col gap-[54px] lg:flex-row ">
            <div className="lg:w-[118px]">
              <h3 className="text-[14px] leading-[120%] font-light font-evolenta mb-3.5">
                Arbejdsplan
              </h3>
              <p className="text-[12px] font-semibold leading-[120%] uppercase">
                man-fre{" "}
              </p>
              <p className="mb-3 text-[12px] font-semibold leading-[120%] uppercase">
                10.00-19.00
              </p>
              <p className="text-[12px] font-semibold leading-[120%] uppercase">
                lør-søn
              </p>
              <p className="text-[12px] font-semibold leading-[120%] uppercase">
                12.00-18.00
              </p>
            </div>
            <div>
              <h3 className="text-[14px] leading-[120%] font-light font-evolenta mb-3.5">
                Vores adresse
              </h3>
              <a
                rel="noopener noreferrer nofollow"
                href={ADDRESS_URL}
                target="_blank"
                className="block max-w-[148px] text-[12px] font-semibold leading-[120%] uppercase"
              >
                {ADDRESS}
              </a>
            </div>

            <div className="flex flex-col gap-[54px] lg:gap-[27px]">
              <div>
                <h3 className="text-[14px] leading-[120%] font-light font-evolenta mb-3.5">
                  Cvr-nr.:
                </h3>
                <p className="text-[12px] font-semibold leading-[120%] uppercase">
                  {CVR_NUMBER}
                </p>
              </div>
              <div>
                <h3 className="text-[14px] leading-[120%] font-light font-evolenta mb-3.5">
                  Eller skriv til os:
                </h3>
                <a
                  rel="noopener noreferrer nofollow"
                  href={`mailto:${EMAIL}`}
                  target="_blank"
                  className="block text-[12px] font-semibold leading-[120%] uppercase"
                >
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-[54px] xl:gap-[271px]">
            <SocialsGroup />
            <Button href="/blog" className="sm:w-[182px] h-[52px]">
              Vores blog
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 lg:bottom-18 left-5 lg:left-auto lg:right-7">
          <p className="mb-3 text-[8px] leading-[120%] font-medium uppercase">
            Created by:
          </p>
          <a
            href={WEB_BOND_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-1"
          >
            <WebBondIcon />
          </a>
          <a href={CODE_SITE_URL} target="_blank" rel="noopener noreferrer">
            <CodeSiteIcon />
          </a>
        </div>
      </Container>
    </footer>
  );
}
