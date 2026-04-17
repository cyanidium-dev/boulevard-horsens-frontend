import MarqueeLine from "../marquee/MarqueeLine";
import Container from "../container/Container";
import { ADDRESS, ADDRESS_URL, CVR_NUMBER, EMAIL } from "@/constants/constants";
import SocialsGroup from "./SocialsGroup";
import Button from "../buttons/Button";

export default function Footer() {
  return (
    <footer>
      <MarqueeLine className="" />
      <Container className="pt-25 lg:pt-[116px] pb-8 lg:pb-[227px]">
        <div className="flex flex-col gap-[54px]">
          <div>
            <h3 className="text-[14px] leading-[120%] font-light font-evolenta mb-3.5">
              Arbejdsplan
            </h3>
            <p className="text-[12px] font-semibold leading-[120%] uppercase">
              man-fre{" "}
            </p>
            <p className="text-[12px] font-semibold leading-[120%] uppercase">
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

          <SocialsGroup />

          <Button href="/blog">Vores blog</Button>
        </div>
      </Container>
    </footer>
  );
}
