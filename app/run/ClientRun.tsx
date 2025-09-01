"use client";

import { useSearchParams } from "next/navigation";
import { AppBg } from "@/components/AppBg";
import TabBar from "@/components/TabBar";
import GridGame from "@/components/GridGame";
// import CoachBubble from "@/components/CoachBubble"; // dacă îl folosești

const ROUTE_NAMES: Record<string, string> = {
  "featured-otl": "Old Town Loop",
  "city-ridge": "City Ridge",
  "riverside": "Riverside Sprint",
  "neon-night": "Neon Night Path",
};

export default function ClientRun() {
  const params = useSearchParams();
  const routeId = params.get("route") ?? "";
  const routeName = ROUTE_NAMES[routeId] ?? "Free Run";

  return (
    <AppBg>
      <main className="mobile px-6 py-6 space-y-5">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Run • {routeName}
          </h1>
          <p className="text-white/60 text-sm">
            Move on the grid • collect & bank PATH
          </p>
        </div>

        <GridGame
          onFinish={async ({ tokens, reachedExit, timeMs, moves }) => {
            await fetch("/api/claim", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                run: { routeId, tokens, reachedExit, timeMs, moves },
              }),
            }).catch(() => {});
            alert(`Run finished!\nRoute: ${routeName}\nTokens: ${tokens} PATH`);
          }}
        />

        <div className="h-16" />
      </main>
      <TabBar />
    </AppBg>
  );
}
