export default function ProfileAvatar({
  size = 140,
  src,
}: {
  size?: number;
  src?: string | null;
}) {
  const ring = size + 16;
  return (
    <div className="relative" style={{ width: ring, height: ring }}>
      <div className="absolute inset-0 rounded-full neon-ring" style={{ padding: 8 }}>
        <div className="w-full h-full rounded-full bg-[rgba(0,0,0,.5)] border border-white/10" />
      </div>

      <div
        className="absolute inset-0 m-auto rounded-full overflow-hidden flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {src ? (
         
          <img src={src} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
         
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <circle cx="60" cy="60" r="56" fill="#0f1524" />
            <circle cx="60" cy="50" r="20" fill="#ffc9a8" />
            <rect x="30" y="78" width="60" height="28" rx="14" fill="#1c2438" />
            <circle cx="51" cy="48" r="2.8" fill="#0e0f13" />
            <circle cx="69" cy="48" r="2.8" fill="#0e0f13" />
            <rect x="52" y="58" width="16" height="3" rx="1.5" fill="#0e0f13" />
          </svg>
        )}
      </div>
    </div>
  );
}
