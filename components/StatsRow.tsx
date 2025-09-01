export default function StatsRow({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="glass rounded-3xl border border-white/10 px-4 py-3 grid grid-cols-3 gap-2">
      {items.map((it, i) => (
        <div key={i} className="text-center">
          <div className="text-white/70 text-sm">{it.label}</div>
          <div className="text-white text-2xl font-bold">{it.value}</div>
        </div>
      ))}
    </div>
  );
}
