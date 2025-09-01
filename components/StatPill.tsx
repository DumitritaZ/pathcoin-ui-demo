export default function StatPill({
  label, value, glow = false,
}: { label: string; value: string; glow?: boolean }) {
  return (
    <div className={`glass rounded-[18px] px-3 py-2 text-center border border-white/10
                     ${glow ? "shadow-[0_0_22px_rgba(0,229,255,.25)]" : ""}`}>
      <div className="text-white/55 text-[10px] tracking-wide">{label.toUpperCase()}</div>
      <div className="text-white/95 font-semibold text-[15px]">{value}</div>
    </div>
  );
}
