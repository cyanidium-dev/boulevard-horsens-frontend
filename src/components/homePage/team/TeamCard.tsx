import type { TeamMember } from "@/types/team";

interface TeamCardProps {
  teamMember: TeamMember;
}

export default function TeamCard({ teamMember }: TeamCardProps) {
  void teamMember;

  return <div>TeamCard</div>;
}
