import FaqItem from "@/components/shared/faq/FaqItem";
import * as motion from "motion/react-client";
import type { FaqItem as FaqItemType } from "@/types/faq";

interface FaqListProps {
  items: FaqItemType[];
}

export default function FaqList({ items }: FaqListProps) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.1 }}
      className="flex flex-col gap-6"
    >
      {items.map((faqItem, idx) => (
        <FaqItem key={faqItem._key ?? idx} faqItem={faqItem} idx={idx} />
      ))}
    </motion.ul>
  );
}
