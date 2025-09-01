import { useRouter } from "next/navigation";
import SparkLine from "./SparkLine";

export type RouteItem = {
  id: string;
  title: string;
  distanceKm: number;
  ascentM: number;
  difficulty: "Easy" | "Moderate" | "Hard" | string;
  featured?: boolean;
  spark?: number[];
};

export default function RouteCard({
  route,
  onStart,
  big = false,
}: {
  route: RouteItem;
  onStart?: () => void;
  big?: boolean;
}) {
  const router = useRouter();

  const handleStart = () => {
    if (onStart) return onStart();
    router.push(`/run?route=${encodeURIComponent(route.id)}`);
  };

  return (
    <div className={`relative glass rounded-2xl p-4 border border-white/10 ${big ? "pt-5" : ""}`}>
     
      {route.featured && !big && (
        <div className="absolute -top-2 left-3 text-xs px-2 py-1 rounded-md bg-white/10 border border-white/15 text-white/85">
          Featured
        </div>
      )}

      {/* Title + meta + Start */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className={`truncate ${big ? "text-2xl" : "text-xl"} font-semibold text-white`}>
            {route.title}
          </div>
          <div className="text-white/70 truncate">
            {route.distanceKm.toFixed(1)} km • {route.ascentM} m • {route.difficulty}
          </div>
        </div>

       <button
        onClick={handleStart}
        className="neon-btn pointer-events-auto relative z-10 shrink-0 px-6 py-2
                    rounded-2xl text-white font-semibold overflow-hidden"
        >
        {big ? "Start Run" : "Start"}
        </button>
      </div>

      {/* Sparkline on big card */}
      {big && (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-2">
          <SparkLine points={route.spark ?? [8, 14, 12, 18, 13, 20, 22]} />
        </div>
      )}
    </div>
  );
}
