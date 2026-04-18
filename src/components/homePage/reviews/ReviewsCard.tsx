import Image from "next/image";
import type { Review } from "./reviewsData";

interface ReviewsCardProps {
  review: Review;
}

export default function ReviewsCard({ review }: ReviewsCardProps) {
  return (
    <div className="relative h-full w-full rounded-[8px] p-px">
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-[8px]"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-black), var(--color-brown))",
          padding: "1px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="flex h-full w-full flex-col rounded-[8px] p-5">
        <div className="mb-8 flex gap-[15px]">
          <Image
            src={review.avatarSrc}
            alt={review.name}
            width={52}
            height={52}
            className="size-[52px] shrink-0 rounded-full object-cover"
          />
          <div>
            <p className="mb-2 text-[16px] leading-[125%] md:text-[18px] md:leading-[111%]">
              {review.name}
            </p>
            <div className="flex items-center">
              {Array.from({ length: review.rating }).map((_, index) => (
                <div
                  key={index}
                  className="flex size-[26px] items-center justify-center"
                >
                  <Image
                    src="/images/homePage/reviews/reviewStar.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex h-full items-center">
          <p className="text-[12px] font-light leading-[167%] whitespace-pre-line">
            {review.text}
          </p>
        </div>
      </div>
    </div>
  );
}
