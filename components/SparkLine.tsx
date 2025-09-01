export default function SparkLine({ points }: { points: number[] }) {
  // normalize la 0..100
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const span = Math.max(max - min, 1);
  const norm = points.map(p => ((p - min) / span) * 100);

  const step = 100 / (points.length - 1);
  const d = norm
    .map((y, i) => `${i === 0 ? "M" : "L"} ${i * step},${100 - y}`)
    .join(" ");

  return (
    <svg viewBox="0 0 100 40" className="w-full h-20">
      <defs>
        <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#24ECFF" />
          <stop offset="100%" stopColor="#2D7CFF" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

     
      <rect x="0" y="0" width="100" height="40" rx="6" fill="rgba(255,255,255,.03)" />
      
      <path d={d} fill="none" stroke="url(#routeGrad)" strokeWidth="2.8" filter="url(#glow)" />
     
      <circle cx="100" cy={40 - norm[norm.length - 1]} r="2.8" fill="#24ECFF" filter="url(#glow)" />
    </svg>
  );
}
