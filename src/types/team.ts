import type { SanityImage } from "@/types/service";

export interface TeamMember {
  _id: string;
  name: string;
  position: string;
  photo: SanityImage;
}
