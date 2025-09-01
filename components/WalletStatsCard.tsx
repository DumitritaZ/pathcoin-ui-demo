export default function WalletStatsCard({
  balance,
  todayGain,
  onConvert,
  onClaim,
}: {
  balance: number;
  todayGain: number;
  onConvert?: () => void;
  onClaim?: () => void;
}) {
  return (
    <div className="relative glass rounded-2xl p-4 border border-white/10 overflow-hidden">
      {/* badge +today */}
      <div className="absolute top-3 right-3 text-xs px-2 py-1 rounded-md bg-white/10 border border-white/15 text-emerald-200">
        +{todayGain} today
      </div>

      <div className="text-white/70">Total PATH</div>
      <div className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mt-1">
        {new Intl.NumberFormat("en-US").format(balance)}
      </div>

      <div className="mt-3 flex gap-3">
        <button
          type="button"
          className="neon-btn px-4 py-2 rounded-xl font-semibold text-white pointer-events-auto relative z-10"
          onClick={() => {
            console.log("[WalletStatsCard] Convert clicked");
            onConvert?.();
          }}
        >
          Convert → Crypto
        </button>

        <button
          type="button"
          className="px-4 py-2 rounded-xl glass border border-white/10 text-white/85 pointer-events-auto relative z-10"
          onClick={() => {
            console.log("[WalletStatsCard] Claim clicked");
            onClaim?.();
          }}
        >
          Claim Rewards
        </button>
      </div>
    </div>
  );
}
