import Link from "next/link";
import type { GiftCard, GiftCardGradient } from "@/types/giftCard";

const GRADIENTS: Record<GiftCardGradient, string> = {
  light: "linear-gradient(150deg, #D4C5B5 0%, #BEA898 60%, #A89080 100%)",
  caramel: "linear-gradient(150deg, #C8A882 0%, #A8845A 50%, #8C6840 100%)",
  dark: "linear-gradient(150deg, #3A3530 0%, #28221E 50%, #1A1412 100%)",
};

interface GiftCardItemProps {
  card: GiftCard;
}

export default function GiftCardItem({ card }: GiftCardItemProps) {
  const gradient = GRADIENTS[card.gradient] ?? GRADIENTS.light;
  const checkoutHref = card.stripeCheckoutUrl || "#";
  const isExternal = Boolean(card.stripeCheckoutUrl);

  return (
    <article className="flex flex-col rounded-2xl border border-[#E2D9CF] bg-white overflow-hidden will-change-transform transition-all duration-700 ease-in-out lg:hover:-translate-y-1 lg:hover:shadow-[0_20px_56px_rgba(26,26,24,0.10)]">
      <div
        className="h-[180px] sm:h-[200px] flex items-end px-6 py-5 shrink-0"
        style={{ background: gradient }}
      >
        <span className="font-evolenta italic text-[12px] sm:text-[13px] tracking-[0.1em] text-white/65">
          Gavekort
        </span>
      </div>
      <div className="flex flex-col flex-1 gap-2 px-7 pt-7 pb-8">
        {card.popular ? (
          <p className="flex items-center gap-2 mb-1 text-[10px] tracking-[0.14em] uppercase text-brown">
            <span className="inline-block w-[18px] h-px bg-brown" />
            Mest populære
          </p>
        ) : null}
        <p className="font-evolenta text-[40px] lg:text-[48px] leading-none tracking-[-0.02em] text-black">
          {card.amount} kr
        </p>
        <p className="flex-1 mb-5 text-[13px] lg:text-[14px] leading-[150%] font-light text-black/70">
          {card.description}
        </p>
        {isExternal ? (
          <a
            href={checkoutHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex w-full h-12 lg:h-[57px] items-center justify-center rounded-full border border-black uppercase text-[12px] lg:text-[14px] font-normal leading-[120%] tracking-[0.06em] transition-colors duration-500 ease-in-out ${
              card.primary
                ? "bg-black text-beige xl:hover:bg-transparent xl:hover:text-black"
                : "bg-transparent text-black xl:hover:bg-black xl:hover:text-beige"
            }`}
          >
            Køb
          </a>
        ) : (
          <Link
            href={checkoutHref}
            className={`flex w-full h-12 lg:h-[57px] items-center justify-center rounded-full border border-black uppercase text-[12px] lg:text-[14px] font-normal leading-[120%] tracking-[0.06em] transition-colors duration-500 ease-in-out ${
              card.primary
                ? "bg-black text-beige xl:hover:bg-transparent xl:hover:text-black"
                : "bg-transparent text-black xl:hover:bg-black xl:hover:text-beige"
            }`}
          >
            Køb
          </Link>
        )}
      </div>
    </article>
  );
}
