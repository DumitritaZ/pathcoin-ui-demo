"use client";
import { useRef } from "react";

export default function MapOverlay({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width/2)) / r.width;
    const dy = (e.clientY - (r.top  + r.height/2)) / r.height;
    el.style.setProperty("--rx", `${(-dy*4).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(dx*4).toFixed(2)}deg`);
  }


  const COLS = 12;         
  const ROWS = 11;          
  const CELL_W = 32;         
  const CELL_H = 30;        

  return (
    <div ref={ref} onMouseMove={onMove} className={`parallax relative select-none ${className}`}>
      <div className="layer absolute inset-0 pointer-events-none">
        <svg viewBox="0 0 390 340" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wall" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"  stopColor="rgba(0,195,255,.42)" />
              <stop offset="100%" stopColor="rgba(0,170,255,.14)" />
            </linearGradient>
            <linearGradient id="route" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"  stopColor="#24ECFF" />
              <stop offset="100%" stopColor="#2D7CFF" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          
          {Array.from({ length: ROWS }).map((_, row) =>
            Array.from({ length: COLS }).map((_, col) => {
              const x = col * CELL_W;
              const y = row * CELL_H;
              const wall = (row + col) % 3 === 0;
              return (
                <rect
                  key={`${row}-${col}`}
                  x={x} y={y}
                  width={CELL_W - 2} height={CELL_H - 2}
                  fill="none"
                  stroke="url(#wall)"
                  strokeWidth={wall ? 3 : 2}
                  opacity={wall ? 0.45 : 0.2}
                  rx="4" ry="4"
                />
              );
            })
          )}

          
          <path id="routePath"
            d={`M8 300 L 120 300 L 120 240 L 220 240 L 220 180 L 300 180 L 300 130`}
            fill="none"
          />
          <use href="#routePath"
            stroke="url(#route)" strokeWidth="6" filter="url(#glow)"
            className="flow" style={{ strokeDasharray: "50 360" }}
          />
          <use href="#routePath"
            stroke="rgba(255,255,255,.35)" strokeWidth="1.5" opacity=".25"
            className="flow" style={{ strokeDasharray: "40 380" }}
          />

          
          <g filter="url(#glow)">
            <circle r="8" fill="#00E5FF">
              <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
                <mpath xlinkHref="#routePath" />
              </animateMotion>
            </circle>
            <circle r="9" fill="#00E5FF" className="pulse">
              <animateMotion dur="6s" repeatCount="indefinite">
                <mpath xlinkHref="#routePath" />
              </animateMotion>
            </circle>
          </g>
        </svg>
      </div>
    </div>
  );
}
