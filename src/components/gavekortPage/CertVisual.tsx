interface CertVisualProps {
  className?: string;
}

export default function CertVisual({ className = "" }: CertVisualProps) {
  return (
    <div
      className={`relative h-[260px] sm:h-[320px] w-full max-w-[420px] mx-auto ${className}`}
    >
      <div
        className="absolute left-1/2 top-1/2 w-[260px] sm:w-[340px] h-[155px] sm:h-[200px] rounded-2xl border border-[#E2D9CF]"
        style={{
          background: "linear-gradient(135deg, #E8DDD2, #D5C9BC)",
          boxShadow: "0 8px 32px rgba(26,26,24,0.08)",
          transform:
            "translate(calc(-50% - 12px), calc(-50% + 12px)) rotate(-4deg)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 w-[260px] sm:w-[340px] h-[155px] sm:h-[200px] rounded-2xl border border-[#E2D9CF]"
        style={{
          background: "linear-gradient(135deg, #F0E9DF, #E6DDD2)",
          boxShadow: "0 12px 40px rgba(26,26,24,0.10)",
          transform:
            "translate(calc(-50% + 4px), calc(-50% + 6px)) rotate(-1.5deg)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 w-[260px] sm:w-[340px] h-[155px] sm:h-[200px] rounded-2xl bg-white overflow-hidden flex flex-col"
        style={{
          boxShadow: "0 16px 56px rgba(26,26,24,0.14)",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="h-[80px] sm:h-[110px] flex items-center justify-center shrink-0"
          style={{
            background: "linear-gradient(135deg, #C8B8A8, #A8907A, #C4A882)",
          }}
        >
          <span className="font-evolenta text-[20px] sm:text-[28px] uppercase text-white/75 tracking-[0.12em]">
            Boulevard
          </span>
        </div>
        <div className="flex-1 flex items-end justify-between px-4 sm:px-5 pt-3 pb-3 sm:pb-4">
          <div>
            <p className="font-evolenta text-[9px] sm:text-[11px] uppercase tracking-[0.18em] text-[#958E85] mb-0.5">
              Boulevard · Horsens
            </p>
            <p className="font-evolenta text-[14px] sm:text-[18px] uppercase text-black tracking-[0.02em]">
              Gavekort
            </p>
          </div>
          <p className="font-evolenta text-[18px] sm:text-[22px] font-medium text-black">
            1000 kr
          </p>
        </div>
      </div>
    </div>
  );
}
