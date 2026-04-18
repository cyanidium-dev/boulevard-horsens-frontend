/** Forenklet Dannebrog til telefonfelt (dekorativt). */
export default function DenmarkFlagIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 37 28"
      width="37"
      height="28"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="37" height="28" fill="#C8102E" />
      <rect x="0" y="11" width="37" height="6" fill="#FFFFFF" />
      <rect x="12" y="0" width="5" height="28" fill="#FFFFFF" />
    </svg>
  );
}
