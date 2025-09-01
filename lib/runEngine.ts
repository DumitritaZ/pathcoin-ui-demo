"use client";

import { useCallback, useEffect, useRef, useState } from "react";



type Snapshot = {
  elapsedMs: number;
  distanceM: number;
  avgSpeed: number;
  tokens: number;
  suspicious: boolean;
};

export function useRunEngine() {
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);

  const [elapsedMs, setElapsed] = useState(0);
  const [distanceM, setDistance] = useState(0);
  const [tokens, setTokens] = useState(0);
  const [suspicious, setSuspicious] = useState(false);
  const [status, setStatus] = useState("Ready");

  // internals
  const lastTs = useRef<number | null>(null);
  const simSpeed = useRef<number>(1.8); // m/s ~ 6.5 km/h (jog)
  const raf = useRef<number | null>(null);

  // pace (min per km)
  const paceMinPerKm = (distanceM > 0 ? (elapsedMs / 1000) / (distanceM / 1000) : Infinity) / 60 * 60;

  // token logic: 10 PATH / km + bonus dacă pace între 4:30-7:00 min/km
  const computeTokens = useCallback((distM: number, avgSpeed: number) => {
    const base = (distM / 1000) * 10; // 10 PATH / km
    const paceSecPerKm = (distM > 0) ? (elapsedMs / 1000) / (distM / 1000) : Infinity; // s/km
    let bonusMul = 1;
    if (paceSecPerKm >= 270 && paceSecPerKm <= 420) bonusMul = 1.15; // sweet spot
    // anti-cheat: dacă medie > 5.5 m/s (~20 km/h) reduce reward
    const antiCheatMul = avgSpeed > 5.5 ? 0.5 : 1;
    return base * bonusMul * antiCheatMul;
  }, [elapsedMs]);

  // engine loop
  useEffect(() => {
    if (!running || paused) {
      if (raf.current) cancelAnimationFrame(raf.current);
      lastTs.current = null;
      return;
    }

    function loop(ts: number) {
      if (lastTs.current == null) lastTs.current = ts;
      const dt = Math.min(0.1, (ts - lastTs.current) / 1000); // cap la 100ms
      lastTs.current = ts;

      // variază ușor viteza ca la alergare reală
      const t = performance.now() / 1000;
      const target = 1.6 + 0.6 * (0.5 + 0.5 * Math.sin(t * 0.6)); // 1.6..2.2 m/s
      simSpeed.current += (target - simSpeed.current) * 0.05;

      const dAdd = simSpeed.current * dt;
      setDistance((d) => d + dAdd);
      setElapsed((e) => e + dt * 1000);

      const avgSpeed = (distanceM + dAdd) / ((elapsedMs + dt * 1000) / 1000 + 1e-6);
      setSuspicious(avgSpeed > 5.5); // ~> 20 km/h
      setTokens(computeTokens(distanceM + dAdd, avgSpeed));

      raf.current = requestAnimationFrame(loop);
    }
    raf.current = requestAnimationFrame(loop);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [running, paused, elapsedMs, distanceM, computeTokens]);

  const start = useCallback(() => {
    setDistance(0);
    setElapsed(0);
    setTokens(0);
    setSuspicious(false);
    setStatus("Running…");
    setPaused(false);
    setRunning(true);
  }, []);

  const pause = useCallback(() => {
    setPaused(true);
    setStatus("Paused");
  }, []);
  const resume = useCallback(() => {
    setPaused(false);
    setStatus("Running…");
  }, []);

  const stopAndClaim = useCallback(async () => {
    const avgSpeed = distanceM / ((elapsedMs / 1000) || 1);
    const snap: Snapshot = {
      elapsedMs,
      distanceM,
      avgSpeed,
      tokens,
      suspicious,
    };

    setRunning(false);
    setPaused(false);
    setStatus("Finishing…");

    try {
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          run: {
            elapsedMs: snap.elapsedMs,
            distanceM: Math.round(snap.distanceM),
            avgSpeed: Number(snap.avgSpeed.toFixed(2)),
            tokens: Number(snap.tokens.toFixed(2)),
            suspicious: snap.suspicious,
          },
        }),
      });
      const data = await res.json();
      if (data?.ok) {
        setStatus(`Claimed ${tokens.toFixed(2)} $PATH`);
      } else {
        setStatus("Claim failed — try again");
      }
    } catch {
      setStatus("Network error — try again");
    }
  }, [elapsedMs, distanceM, tokens, suspicious]);
  
    const addTokens = useCallback((amount: number) => {
    setTokens((t) => Math.max(0, t + amount));
  }, []);

  return {
    running,
    paused,
    elapsedMs,
    distanceM,
    paceMinPerKm,
    tokens,
    suspicious,
    start,
    pause,
    resume,
    stopAndClaim,
    status,
    addTokens,
  };
}
