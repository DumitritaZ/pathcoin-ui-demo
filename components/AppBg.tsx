export function AppBg({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-[#061024] to-[#0A1626]">
      {/* halouri subtile */}
      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full blur-3xl opacity-15"
           style={{background:"radial-gradient(circle, rgba(0,229,255,.45), transparent 60%)"}} />
      <div className="absolute -top-10 right-[-120px] w-[520px] h-[520px] rounded-full blur-3xl opacity-10"
           style={{background:"radial-gradient(circle, rgba(58,107,255,.45), transparent 60%)"}} />
      <div className="relative flex justify-center py-10">{children}</div>
    </div>
  );
}
