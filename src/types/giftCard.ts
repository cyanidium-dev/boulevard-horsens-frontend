export type GiftCardGradient = "light" | "caramel" | "dark";

export interface GiftCard {
  _id: string;
  amount: number;
  description: string;
  gradient: GiftCardGradient;
  popular?: boolean;
  primary?: boolean;
  stripeCheckoutUrl?: string;
  stripePriceId?: string;
  order: number;
}
