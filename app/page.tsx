"use client";
import { useEffect } from "react";
import { isOnboarded } from "@/lib/onboarding";
import { useRouter } from "next/navigation";
import { AppBg } from "@/components/AppBg";
import MapOverlay from "@/components/MapOverlay";
import FeaturedRouteCard from "@/components/FeaturedRouteCard";
import { NeonButton } from "@/components/NeonButton";
import TabBar from "@/components/TabBar";
import { orbitron } from "@/lib/fonts";

export default function Home() {
  const router = useRouter(); 
  useEffect(() => {
    if (!isOnboarded()) router.replace("/onboarding");
  }, [router]); 
  return (
    <AppBg>
      <main className="mobile space-y-5 px-6">
        {/* Centered LOGO, only with Orbitron font */}
        <div className="w-full flex justify-center mt-2">
          <div className="brand-wrap">
            <span className={`brand-neon ${orbitron.className}`}>
              PathCoin
            </span>
          </div>
        </div>
        <div className="text-center mt-4">
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight">
            Let’s start<br />collecting tokens
          </h1>
          <p className="text-[rgba(255,255,255,.64)] -mt-1">
          
          </p>
        </div>
        {/* Taller map (extends under the button) */}
        <MapOverlay className="h-[300px] -mb-12 mask-fade" />

        {/* Button over the map */}
        <div className="relative h-[0px] -mt-1">
          <MapOverlay className="absolute inset-0" />
          <div className="absolute left-0 right-0 top-[-120px] z-10">
            <NeonButton onClick={() => router.push("/run")}>
              Start Run
            </NeonButton>
          </div>
        </div>
        <FeaturedRouteCard title="Old Town Loop" distance="2.5 km" />

        <div className="h-16" />
      </main>
      <TabBar />
    </AppBg>
  );
}
