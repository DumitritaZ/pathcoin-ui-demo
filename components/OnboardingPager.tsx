"use client";
import { useEffect, useRef, useState } from "react";

export default function OnboardingPager({
  children,
  onDone,
}: {
  children: React.ReactNode[];
  onDone: () => void;
}) {
  const [i, setI] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const go = (idx: number) => {
    if (!trackRef.current) return;
    setI(idx);
    const w = trackRef.current.clientWidth;
    trackRef.current.scrollTo({ left: idx * w, behavior: "smooth" });
  };

 
  useEffect(() => {
    const onRz = () => {
      if (!trackRef.current) return;
      trackRef.current.scrollTo({ left: i * trackRef.current.clientWidth });
    };
    window.addEventListener("resize", onRz);
    return () => window.removeEventListener("resize", onRz);
  }, [i]);

  return (
    <div className="w-full">
      <div ref={trackRef} className="w-full overflow-x-hidden">
        <div className="flex" style={{ width: `${children.length * 100}%` }}>
          {children.map((c, idx) => (
            <div key={idx} className="w-full shrink-0" style={{ width: `${100 / children.length}%` }}>
              <div className="px-2">{c}</div>
            </div>
          ))}
        </div>
      </div>

      {/* dots */}
      <div className="flex justify-center gap-2 mt-5">
        {children.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-2.5 h-2.5 rounded-full ${i === idx ? "bg-white" : "bg-white/30"}`}
            onClick={() => go(idx)}
          />
        ))}
      </div>


      <div className="mt-6 flex justify-between px-2">
        <button
          type="button"
          className="px-4 py-2 rounded-xl glass border border-white/10 text-white/85 disabled:opacity-40"
          onClick={() => go(Math.max(0, i - 1))}
          disabled={i === 0}
        >
          Back
        </button>
        {i < children.length - 1 ? (
          <button
            type="button"
            className="neon-btn px-5 py-2 rounded-xl font-semibold text-white"
            onClick={() => go(i + 1)}
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            className="neon-btn px-5 py-2 rounded-xl font-semibold text-white"
            onClick={onDone}
          >
            Get Started
          </button>
        )}
      </div>
    </div>
  );
}
