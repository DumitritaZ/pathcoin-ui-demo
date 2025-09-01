"use client";
import { useEffect, useRef, useState } from "react";

type Coin = { id: string; x: number; y: number; value: number };

function placeCoin(existing: Coin[]): { x: number; y: number } {
  for (let tries = 0; tries < 40; tries++) {
    const x = 12 + Math.random() * 76;
    const y = 8 + Math.random() * 68;
    const ok = existing.every(c => {
      const dx = x - c.x, dy = y - c.y;
      return (dx*dx + dy*dy) > 6*6;
    });
    if (ok) return { x, y };
  }
  return { x: 50, y: 50 };
}

export default function CoinField({
  onCollect,
  spawnEveryMs = 1400,
  maxCoins = 6,
}: {
  onCollect: (value: number) => void;
  spawnEveryMs?: number;
  maxCoins?: number;
}) {
  const [coins, setCoins] = useState<Coin[]>([]);
  const hostRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(true);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      timers.current.forEach(t => clearTimeout(t));
      timers.current = [];
      const host = hostRef.current;
      if (host) {
        host.querySelectorAll(".coin-spark, .coin-badge").forEach((el) => {
          if (el.isConnected && el.parentElement) el.parentElement.removeChild(el);
        });
      }
    };
  }, []);

  // spawn loop
  useEffect(() => {
    const iv = window.setInterval(() => {
      setCoins(prev => {
        if (prev.length >= maxCoins) return prev;
        const pos = placeCoin(prev);
        const value = Number((0.2 + Math.random() * 0.5).toFixed(2));
        return [...prev, { id: crypto.randomUUID(), x: pos.x, y: pos.y, value }];
      });
    }, spawnEveryMs);
    return () => clearInterval(iv);
  }, [spawnEveryMs, maxCoins]);

  // auto-expire coin
  useEffect(() => {
    // set timeouts for each coin
    const ids = coins.map(c =>
      window.setTimeout(() => {
        if (!mounted.current) return;
        setCoins(arr => arr.filter(x => x.id !== c.id));
      }, 3600)
    );
    timers.current.push(...ids);
    return () => {
      ids.forEach(id => clearTimeout(id));
      timers.current = timers.current.filter(id => !ids.includes(id));
    };
  }, [coins]);

  function safeRemove(el: Element | null) {
    if (!el) return;
    if (el.parentElement) {
      try { el.parentElement.removeChild(el); } catch {}
    } else if ("remove" in el) {
      try { (el as any).remove(); } catch {}
    }
  }

  function collect(id: string, value: number) {
    onCollect(value);
    setCoins(arr => arr.filter(x => x.id !== id));

    const host = hostRef.current;
    if (!host || !mounted.current) return;
    const coinEl = host.querySelector(`[data-coin="${id}"]`) as HTMLElement | null;
    if (!coinEl) return;

    // badge +x PATH
    const badge = document.createElement("div");
    badge.textContent = `+${value} PATH`;
    badge.className =
      "coin-badge pointer-events-none absolute -translate-x-1/2 -translate-y-full text-xs text-white/90";
    badge.style.left = coinEl.style.left;
    badge.style.top = coinEl.style.top;
    badge.style.animation = "coinFloat 700ms ease-out forwards";
    if (mounted.current && host) host.appendChild(badge);
    const bTimer = window.setTimeout(() => {
      if (!mounted.current) return;
      safeRemove(badge);
    }, 800);
    timers.current.push(bTimer);

    // particles
    for (let i = 0; i < 10; i++) {
      const p = document.createElement("span");
      p.className = "coin-spark";
      p.style.left = coinEl.style.left;
      p.style.top = coinEl.style.top;
      const a = (Math.random() * 360) * (Math.PI/180);
      const d = 20 + Math.random() * 28;
      p.style.setProperty("--tx", `${Math.cos(a)*d}px`);
      p.style.setProperty("--ty", `${Math.sin(a)*d}px`);
      if (mounted.current && host) host.appendChild(p);
      const t = window.setTimeout(() => {
        if (!mounted.current) return;
        safeRemove(p);
      }, 500);
      timers.current.push(t);
    }
  }

  return (
    <div ref={hostRef} className="absolute inset-0">
      {coins.map((c) => (
        <button
          key={c.id}
          data-coin={c.id}
          onClick={() => collect(c.id, c.value)}
          className="coin pretty"
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
          aria-label={`Collect ${c.value} PATH`}
        />
      ))}
    </div>
  );
}
