import FaqItem from "@/components/shared/faq/FaqItem";
import type { FaqItem as FaqItemType } from "@/types/faq";

interface FaqListProps {
  items: FaqItemType[];
}

export default function FaqList({ items }: FaqListProps) {
  return (
    <ul className="flex flex-col gap-6">
      {items.map((faqItem, idx) => (
        <FaqItem key={faqItem._key ?? idx} faqItem={faqItem} idx={idx} />
      ))}
    </ul>
  );
}
