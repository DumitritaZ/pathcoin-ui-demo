import React from "react";

export default function FeaturedRouteCard({
  title = "Old Town Loop",
  distance = "2.5 km",
}: {
  title?: string;
  distance?: string;
}) {
  return (
    <div className="card-neon">
      <div className="flex items-center justify-between">
       
        <div className="relative w-6 h-6 mr-3">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <defs>
              <linearGradient id="boltGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#24ECFF" />   
                <stop offset="50%" stopColor="#A020F0" />  
                <stop offset="100%" stopColor="#39FF14" /> 
              </linearGradient>
              <filter id="boltGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          
            <path
              d="M13 2 L3 14 H11 L9 22 L21 9 H13 Z"
              fill="url(#boltGradient)"
              filter="url(#boltGlow)"
            />
          </svg>
        </div>

        <div className="flex-1">
          <div className="text-white/60 text-xs">Featured Route</div>
          <div className="text-white/90 font-semibold">{title}</div>
        </div>
        <div className="text-white/90">{distance}</div>
      </div>
    </div>
  );
}
