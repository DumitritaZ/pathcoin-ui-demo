"use client";
import { useConfetti } from "@/lib/useConfetti";
import { AppBg } from "@/components/AppBg";
import TabBar from "@/components/TabBar";
import WalletStatsCard from "@/components/WalletStatsCard";
import TxList, { TxItem } from "@/components/TxList";
import { useState } from "react";

export default function WalletPage() {
  const { fire, rain } = useConfetti();
  const [balance, setBalance] = useState(1248); 
  const [todayGain] = useState(12);
  const [network] = useState<"Sepolia" | "Base" | "Polygon">("Sepolia");
  const [addr] = useState("0x12a4...e5");

  const txs: TxItem[] = [
    { id: "t1", title: "Exchange", subtitle: "to ETH",       time: "12:24", amount: -10, color: "cyan"   },
    { id: "t2", title: "Reward",   subtitle: "Checkpoint 7", time: "11:51", amount: +3,  color: "green"  },
    { id: "t3", title: "Bank",     subtitle: "Safe tile",    time: "11:39", amount: +7,  color: "purple" },
  ];


  const estimateEth = (n: number) => (n * 0.00021).toFixed(4);

  const handleClaim = () => {
    console.log("[WalletPage] handleClaim fired");
    rain({
      durationMs: 3500,
      rate: 900,          
      gravity: 2400,       
      wind: 0,             
      scalar: 1.2,
      respectReducedMotion: false
    });
    fire({
      origin: { x: 0.5, y: 0.30 },
      particles: 160,
      spread: 80,
      startVelocity: 12,
      scalar: 1.2,
      respectReducedMotion: false, 
    });
    setBalance((b) => b + 5);
    alert("Claimed +5 PATH (demo)");
  };

  return (
    <AppBg>
      <main className="mobile px-6 py-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight">Wallet</h1>
          <div className="glass px-3 py-1.5 rounded-xl border border-white/10 text-white/75 text-sm">
            {network} • {addr}
          </div>
        </div>

        {/* Total PATH card */}
        <WalletStatsCard
          balance={balance}
          todayGain={todayGain}
          onConvert={() => alert("Convert → Crypto (demo)")}
          onClaim={handleClaim}
        />

        {/* Action chips */}
        <div className="flex gap-3">
          <button className="chip glass">Add Funds</button>
          <button className="chip glass">Send</button>
          <button className="chip glass">Receive</button>
        </div>

        {/* Recent activity */}
        <TxList items={txs} />

        {/* Conversion estimate */}
        <div className="glass rounded-2xl border border-white/10 p-4 space-y-3">
          <div className="text-white/80 text-lg">Conversion estimate</div>
          <div className="text-2xl md:text-3xl font-semibold text-white">
            10 PATH ≈ {estimateEth(10)} ETH
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-2 rounded-xl glass border border-white/10 text-white/85">
              Simulate
            </button>
          </div>
        </div>

        {/* Note */}
        <div className="glass px-4 py-3 rounded-2xl border border-white/10 text-white/85">
          Note: Demo UI — real conversion will use the on-chain contract 
        </div>

        <div className="h-16" />
      </main>
      <TabBar />
    </AppBg>
  );
}
