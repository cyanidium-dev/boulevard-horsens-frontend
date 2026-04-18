import Image from "next/image";
import type { ResultsBeforeAfterCard } from "@/types/results";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";

interface BeforeAfterCardProps {
  card: ResultsBeforeAfterCard;
}

export default function BeforeAfterCard({ card }: BeforeAfterCardProps) {
  const beforeUrl = urlForSanityImage(card.beforeImage).width(600).url();
  const afterUrl = urlForSanityImage(card.afterImage).width(600).url();

  return (
    <div className="flex flex-col gap-1 w-[373px] h-full">
      <div className="relative w-full h-[calc(50%-2px)] overflow-hidden rounded-[8px]">
        <Image
          src={beforeUrl}
          alt={card.beforeImage.alt ?? "Før"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 45vw, 20vw"
        />
        <p className="absolute left-2 bottom-2 px-3.5 py-3 font-evolenta text-[16px] leading-[120%] font-normal uppercase text-beige rounded-[8px] bg-white/6 shadow-[inset_0px_4px_12.6px_rgba(255,255,255,0.12)] backdrop-blur-[38px]">
          før
        </p>
      </div>
      <div className="relative w-full h-[calc(50%-2px)] overflow-hidden rounded-[8px]">
        <Image
          src={afterUrl}
          alt={card.afterImage.alt ?? "Efter"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 45vw, 20vw"
        />
        <p className="absolute left-2 bottom-2 px-3.5 py-3 font-evolenta text-[16px] leading-[120%] font-normal uppercase text-beige rounded-[8px] bg-white/6 shadow-[inset_0px_4px_12.6px_rgba(255,255,255,0.12)] backdrop-blur-[38px]">
          efter
        </p>
      </div>
    </div>
  );
}
