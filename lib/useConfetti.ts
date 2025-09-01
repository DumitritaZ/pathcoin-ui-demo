"use client";

type BaseOpts = {
  colors?: string[];
  scalar?: number;
  respectReducedMotion?: boolean;
  zIndex?: number | string; // ← tip clar
};

type BurstOpts = BaseOpts & {
  particles?: number;
  spread?: number;
  startVelocity?: number;
  origin?: { x: number; y: number };
  durationMs?: number;
};

type RainOpts = BaseOpts & {
  durationMs?: number;
  rate?: number;
  gravity?: number;
  wind?: number;
  startVelocity?: number;
};

const COLORS = ["#00E5FF", "#3A6BFF", "#6C63FF", "#00FFC2", "#FFC24C"];

export function useConfetti() {
  const dpr =
    typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

  // ✅ TIPARE & CAST corecte
  function makeCanvas(z: number | string = 99999) {
    const cvs = document.createElement("canvas");
    cvs.style.position = "fixed";
    cvs.style.inset = "0";
    cvs.style.pointerEvents = "none";
    cvs.style.zIndex = String(z); // ← cast la string
    document.body.appendChild(cvs);
    const ctx = cvs.getContext("2d")!;
    const resize = () => {
      cvs.width = window.innerWidth * dpr;
      cvs.height = window.innerHeight * dpr;
    };
    resize();
    const onRz = () => resize();
    window.addEventListener("resize", onRz);
    const destroy = () => {
      window.removeEventListener("resize", onRz);
      cvs.parentElement?.removeChild(cvs);
    };
    return { cvs, ctx, destroy };
  }

  function shouldRespect(rm?: boolean) {
    if (rm === false) return false;
    if (typeof window === "undefined") return true;
    return !!(
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  // ---- fire (burst) identic cu ce ți-am dat, dar apelul la makeCanvas rămâne la fel:
  function fire({
    particles = 140,
    spread = 70,
    startVelocity = 9,
    origin = { x: 0.5, y: 0.35 },
    durationMs = 1200,
    colors = COLORS,
    scalar = 1,
    respectReducedMotion = true,
    zIndex = 99999,
  }: BurstOpts = {}) {
    if (shouldRespect(respectReducedMotion)) return;
    const { cvs, ctx, destroy } = makeCanvas(zIndex);

    const parts: { x: number; y: number; vx: number; vy: number; r: number; color: string; angle: number; spin: number }[] = [];
    const angle0 = -Math.PI / 2;
    const spreadRad = (spread * Math.PI) / 180;

    for (let i = 0; i < particles; i++) {
      const angle = angle0 + (Math.random() - 0.5) * spreadRad;
      const speed = (startVelocity + Math.random() * 6) * dpr * 60; // px/s
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const size = (3 + Math.random() * 4) * scalar * dpr;
      const spin = (Math.random() - 0.5) * 0.2;
      parts.push({
        x: origin.x * cvs.width,
        y: origin.y * cvs.height,
        vx,
        vy,
        r: size,
        color: colors[i % colors.length],
        angle: Math.random() * Math.PI * 2,
        spin,
      });
    }

    let last = performance.now();
    const endAt = last + durationMs;
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.max(0.001, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, cvs.width, cvs.height);

      parts.forEach((p) => {
        p.vy += 1800 * dpr * dt; // gravitație mai mare (px/s^2)
        p.vx *= 0.996;
        p.vy *= 0.996;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.angle += p.spin;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
        ctx.restore();
      });

      const alive = parts.some((p) => p.y < cvs.height + 40 * dpr);
      if (now < endAt && alive) {
        raf = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(raf);
        destroy();
      }
    };

    raf = requestAnimationFrame(tick);
  }

  /** R A I N  —  ploaie full-screen */
  function rain({
    durationMs = 3000,
    rate = 600,            // particule/secundă
    gravity = 2200,        // px/s^2
    wind = 120,            // px/s^2 (spre dreapta)
    startVelocity = 250,   // px/s
    colors = COLORS,
    scalar = 1.2,
    respectReducedMotion = true,
    zIndex = 99999,
  }: RainOpts = {}) {
    if (shouldRespect(respectReducedMotion)) return;
    const { cvs, ctx, destroy } = makeCanvas(zIndex);

    type P = { x:number;y:number;vx:number;vy:number;r:number;color:string;angle:number;spin:number;life:number };
    const parts: P[] = [];
    let last = performance.now();
    const endAt = last + durationMs;
    let pool = 0; 
    const spawn = (n: number) => {
      for (let i = 0; i < n; i++) {
        const x = Math.random() * cvs.width; 
        const y = -20 * dpr;                 
        const angle = (Math.random() * 20 - 10) * (Math.PI / 180); 
        const speed = (startVelocity + Math.random() * 120) * dpr;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed + 80 * dpr; 
        const size = (4 + Math.random() * 6) * scalar * dpr;
        const spin = (Math.random() - 0.5) * 0.6;
        parts.push({
          x, y, vx, vy, r: size,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle: Math.random() * Math.PI * 2,
          spin,
          life: 0
        });
      }
    };

    let raf = 0;
    const tick = (now: number) => {
      const dt = Math.max(0.001, (now - last) / 1000);
      last = now;

     
      if (now < endAt) {
        pool += rate * dt;             
        const n = Math.floor(pool);
        if (n > 0) {
          spawn(n);
          pool -= n;
        }
      }

      ctx.clearRect(0, 0, cvs.width, cvs.height);

      
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.vx += wind * dpr * dt;           
        p.vy += gravity * dpr * dt;        
        p.vx *= 0.998;
        p.vy *= 0.998;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.angle += p.spin * (1 + 0.5 * dt);
        p.life += dt;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
        ctx.restore();

       
        if (p.y > cvs.height + 60 * dpr || p.x < -80 * dpr || p.x > cvs.width + 80 * dpr) {
          parts.splice(i, 1);
        }
      }

      if (now < endAt || parts.length > 0) {
        raf = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(raf);
        destroy();
      }
    };

    raf = requestAnimationFrame(tick);
  }

  return { fire, rain };
}
