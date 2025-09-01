"use client";
import { useState } from "react";

export default function ConnectWalletButton({
  onConnected,
  className = "",
}: {
  onConnected?: (address: string) => void;
  className?: string;
}) {
  const [addr, setAddr] = useState<string | null>(null);

  function short(a: string) {
    return a.slice(0, 6) + "…" + a.slice(-4);
  }

  const connect = () => {
    const addr = "0x12a4F9cD8b0A3cDe9Bf7e5c2a9E3F1e5"; // mock
    setAddr(addr);
    onConnected?.(addr);
    alert("Connected.");
  };

  const disconnect = () => {
    setAddr(null);
    onConnected?.("");
  };

  return addr ? (
    <button
      className={`glass px-4 py-2 rounded-xl border border-white/10 text-white/85 ${className}`}
      onClick={disconnect}
    >
      {short(addr)} • Disconnect
    </button>
  ) : (
    <button
      className={`neon-btn px-4 py-2 rounded-xl font-semibold text-white ${className}`}
      onClick={connect}
    >
      Connect Wallet
    </button>
  );
}
