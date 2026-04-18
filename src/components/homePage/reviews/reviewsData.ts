export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  /** Кругле фото з макета — покласти в public або змінити шлях */
  avatarSrc: string;
};

const REVIEW_TEMPLATE: Omit<Review, "id"> = {
  name: "Kate Ride",
  rating: 5,
  text: "I visited Cristina for the second time and once again had an amazing experience. I tried microneedling and a peeling treatment, and the results are fantastic — my skin feels fresher, nourished, and glowing. The atmosphere is very professional and relaxing, and I always feel well taken care of Cristina. Looking forward to my next appointment in January. Highly recommended!",
  avatarSrc: "/images/homePage/reviews/review-1.webp",
};

export const reviewsData: Review[] = Array.from({ length: 10 }, (_, index) => ({
  id: `review-${index + 1}`,
  ...REVIEW_TEMPLATE,
}));
