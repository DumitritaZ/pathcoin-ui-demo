type Variant = "trophy" | "wallet" | "moon";

export default function AchievementCard({
  title,
  variant,
  gradient = "from-cyan-400 to-indigo-500",
}: {
  title: string;
  variant: Variant;
  gradient?: string;
}) {
  return (
    <div className="rounded-2xl p-4 text-center glass border border-white/10">
      <div
        className={`mx-auto mb-3 w-14 h-14 rounded-2xl grid place-items-center
                    bg-gradient-to-br ${gradient} shadow-[0_12px_30px_rgba(0,214,255,.25)]`}
      >
        {variant === "trophy" && (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M7 4h10v2a5 5 0 1 1-10 0V4Zm-2 2h2v1a7 7 0 0 0 5 6.708V16H8v2h8v-2h-4v-2.292A7 7 0 0 0 17 7V6h2a2 2 0 0 1-2 2h-1.05A6.98 6.98 0 0 1 12 12a6.98 6.98 0 0 1-3.95-4H7a2 2 0 0 1-2-2Z"/>
          </svg>
        )}
        {variant === "wallet" && (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M3 7a3 3 0 0 1 3-3h10v2H6a1 1 0 1 0 0 2h15v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7Zm14 5a1 1 0 1 0 0 2h4v-2h-4Z"/>
          </svg>
        )}
        {variant === "moon" && (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z"/>
          </svg>
        )}
      </div>
      <div className="text-white font-semibold">{title}</div>
    </div>
  );
}
