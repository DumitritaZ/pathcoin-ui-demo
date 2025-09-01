export default function OnboardingSlide({
  title,
  subtitle,
  graphic,
}: {
  title: string;
  subtitle: string;
  graphic?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-4 px-6">
      <div className="w-full max-w-[320px] h-[220px] rounded-3xl glass border border-white/10 grid place-items-center overflow-hidden">
        {graphic ?? <div className="text-white/40">Graphic</div>}
      </div>
      <h2 className="text-3xl font-extrabold tracking-tight">{title}</h2>
      <p className="text-white/70">{subtitle}</p>
    </div>
  );
}
