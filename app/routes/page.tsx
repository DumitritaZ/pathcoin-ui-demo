"use client";

import { AppBg } from "@/components/AppBg";
import TabBar from "@/components/TabBar";
import RouteCard, { RouteItem } from "@/components/RouteCard";
import { useState } from "react";

const ALL_ROUTES: RouteItem[] = [
  {
    id: "featured-otl",
    title: "Old Town Loop",
    distanceKm: 2.5,
    ascentM: 40,
    difficulty: "Easy",
    featured: true,
    spark: [10, 22, 20, 28, 18, 30, 32], 
  },
  { id: "city-ridge", title: "City Ridge", distanceKm: 3.8, ascentM: 110, difficulty: "Moderate" },
  { id: "riverside", title: "Riverside Sprint", distanceKm: 1.9, ascentM: 15, difficulty: "Easy" },
  { id: "neon-night", title: "Neon Night Path", distanceKm: 4.6, ascentM: 160, difficulty: "Hard", featured: true },
];

const TAGS = ["All", "Nearby", "Favorites", "Short"] as const;
type Tag = typeof TAGS[number];

export default function RoutesPage() {
  const [tag, setTag] = useState<Tag>("All");

  const filtered = ALL_ROUTES.filter(r => {
    if (tag === "All") return true;
    if (tag === "Short") return r.distanceKm <= 3;
    if (tag === "Favorites") return ["Old Town Loop", "Neon Night Path"].includes(r.title);
    if (tag === "Nearby") return true; 
    return true;
  });

  return (
    <AppBg>
      <main className="mobile px-6 py-6 space-y-5">
        {/* Header + Search */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight">Routes</h1>
          <button className="px-4 py-2 rounded-xl glass border border-white/10 text-white/80 text-sm">
            Search ▾
          </button>
        </div>

        {/* Featured Card with sparkline */}
        <RouteCard route={ALL_ROUTES[0]} big />

        {/* Tabs (All / Nearby / Favorites / Short) */}
        <div className="flex gap-3">
          {TAGS.map(t => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`px-4 py-2 rounded-xl border text-sm transition
                ${t === tag
                  ? "glass border-white/15 text-white"
                  : "bg-white/5 border-white/10 text-white/70 hover:text-white"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Routes list */}
        <div className="space-y-4">
          {filtered.slice(1).map(r => (
            <RouteCard key={r.id} route={r} />
          ))}
        </div>

        {/* Tip bar */}
        <div className="glass px-4 py-3 rounded-2xl border border-white/10 text-white/85">
          Tip: Select a route and press <span className="text-white font-semibold">Start Run</span> to begin earning PATH.
        </div>

        <div className="h-16" />
      </main>
      <TabBar />
    </AppBg>
  );
}
