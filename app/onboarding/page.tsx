"use client";


import { AppBg } from "../../components/AppBg";
import OnboardingPager from "../../components/OnboardingPager";
import OnboardingSlide from "../../components/OnboardingSlide";
import { setOnboarded } from "../../lib/onboarding";
import { useRouter } from "next/navigation";
import { orbitron } from "../../lib/fonts";

function GlowCoin() {
  return (
    <svg viewBox="0 0 200 200" className="w-40 h-40">
      <defs>
        <radialGradient id="g" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="1" />
          <stop offset="60%" stopColor="#3A6BFF" stopOpacity=".7" />
          <stop offset="100%" stopColor="#0B1020" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#g)" />
      <text x="50%" y="54%" textAnchor="middle" fill="#fff" fontSize="42" fontWeight="800">PC</text>
    </svg>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  return (
    <AppBg>
      <main className="mobile px-6 py-8 space-y-6">
        <div className="w-full text-center">
          <div className={`text-4xl font-extrabold tracking-tight ${orbitron.className}`}>PathCoin</div>
          <div className="text-white/60">Follow the path. Collect tokens.</div>
        </div>

        <OnboardingPager onDone={() => { setOnboarded(); router.replace("/"); }}>
          {[
            <OnboardingSlide
              key="s1"
              title="Run the Path"
              subtitle="Swipe on the neon grid and reach the EXIT."
              graphic={<GlowCoin />}
            />,
            <OnboardingSlide
              key="s2"
              title="Collect PATH"
              subtitle="Gather tokens and secure them at checkpoints."
              graphic={<div className="text-2xl font-bold text-white">+3 PATH</div>}
            />,
            <OnboardingSlide
              key="s3"
              title="Claim to Crypto"
              subtitle="Connect a wallet to convert PATH into crypto."
              graphic={<div className="text-xl text-white">Wallet ➜ Crypto</div>}
            />,
          ]}
        </OnboardingPager>
      </main>
    </AppBg>
  );
}
