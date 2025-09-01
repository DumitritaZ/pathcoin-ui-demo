export type TxItem = {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  amount: number; // + sau -
  color: "cyan" | "green" | "purple";
};

export default function TxList({ items }: { items: TxItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((t) => (
        <div
          key={t.id}
          className="glass rounded-2xl border border-white/10 p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className={`dot ${t.color}`} />
            <div className="min-w-0">
              <div className="text-white font-semibold text-lg truncate">{t.title}</div>
              <div className="text-white/70 truncate">{t.subtitle} • {t.time}</div>
            </div>
          </div>
          <div className={`text-lg font-semibold ${t.amount >= 0 ? "text-emerald-300" : "text-white/90"}`}>
            {t.amount > 0 ? `+${t.amount}` : t.amount} PATH
          </div>
        </div>
      ))}
    </div>
  );
}
