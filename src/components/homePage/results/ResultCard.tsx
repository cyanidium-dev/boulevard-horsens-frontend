import type { ResultsCard } from "@/types/results";
import BeforeAfterCard from "./BeforeAfterCard";
import SingleImageCard from "./SingleImageCard";

interface ResultCardProps {
  card: ResultsCard;
}

export default function ResultCard({ card }: ResultCardProps) {
  if (card._type === "resultsBeforeAfterCard") {
    return <BeforeAfterCard card={card} />;
  }
  return <SingleImageCard card={card} />;
}
