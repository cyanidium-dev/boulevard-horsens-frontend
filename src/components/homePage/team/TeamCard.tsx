import type { TeamMember } from "@/types/team";
import Image from "next/image";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";

interface TeamCardProps {
  teamMember: TeamMember;
}

export default function TeamCard({ teamMember }: TeamCardProps) {
  void teamMember;

  return (
    <div className="relative flex flex-col justify-end w-[289px] h-[398px] p-4 rounded-[12px] overflow-hidden">
      <Image
        src={urlForSanityImage(teamMember.photo).url()}
        alt={teamMember.name}
        fill
        className="-z-10 object-cover"
      />
      <div className="w-fit mb-1.5 rounded-full bg-white/10 shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[3px]">
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
        <p className="w-fit font-evolenta text-[14px] leading-[120%] font-light uppercase text-beige rounded-full px-6 py-4">
          {teamMember.position}
        </p>
      </div>
      <p className="w-fit font-evolenta text-[14px] leading-[120%] font-light uppercase text-black bg-beige rounded-full px-6 py-4">
        {teamMember.name}
      </p>
    </div>
  );
}
