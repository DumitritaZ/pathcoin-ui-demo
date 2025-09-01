"use client";
import React, { useEffect, useRef, useState } from "react";

/** Cell types in the grid */
type CellType = "empty" | "coin" | "energy" | "exit" | "wall" | "start";
type Cell = { r: number; c: number; t: CellType };

const R = 6; // rows
const C = 8; // columns

function fixedLayout(): CellType[][] {
  // Semi-fixed layout as in mock (you can easily adjust pieces below)
  const g: CellType[][] = Array.from({ length: R }, () =>
    Array.from({ length: C }, () => "empty" as CellType)
  );

  // some “walls”/obstacles
  [[2,5],[4,3]].forEach(([r,c]) => (g[r][c] = "wall"));
  // start & exit
  g[1][0] = "start";
  g[1][C-1] = "exit";
  // coins
  [[1,5],[2,2],[3,3],[4,1],[4,6]].forEach(([r,c]) => (g[r][c] = "coin"));
  // energy
  [[1,2],[2,4]].forEach(([r,c]) => (g[r][c] = "energy"));

  return g;
}

function inBounds(r:number,c:number){ return r>=0 && c>=0 && r<R && c<C; }

export default function GridGame({
  onFinish,
}:{
  onFinish?: (summary:{ tokens:number; moves:number; timeMs:number; reachedExit:boolean })=>void
}) {
  const [grid,setGrid] = useState<CellType[][]>(()=>fixedLayout());
  const [player,setPlayer] = useState<{r:number;c:number}>(()=>({r:1,c:0}));
  const [energy,setEnergy] = useState(10);
  const [moves,setMoves] = useState(12);
  const [tokens,setTokens] = useState(0);
  const [paused,setPaused] = useState(false);
  const [startedAt] = useState(()=>Date.now());
  const [msg,setMsg] = useState<string | null>(null);

  /** restart */
  function restart(){
    setGrid(fixedLayout());
    setPlayer({r:1,c:0});
    setEnergy(10); setMoves(12); setTokens(0);
    setPaused(false); setMsg(null);
  }

  /** apply a move if legal */
  function tryMove(dr:number, dc:number){
    if(paused) return;
    if(energy<=0 || moves<=0) { setMsg("No energy/moves."); return; }

    const nr = player.r + dr, nc = player.c + dc;
    if(!inBounds(nr,nc)) return;

    const t = grid[nr][nc];
    if(t === "wall") { setMsg("Blocked"); return; }

    // consume
    setPlayer({r:nr,c:nc});
    setEnergy(e => e-1);
    setMoves(m => m-1);
    setMsg(null);

    // cell effect
    if(t === "coin"){ setTokens(v => v+1); mutate(nr,nc,"empty"); }
    if(t === "energy"){ setEnergy(e => e+2); mutate(nr,nc,"empty"); }
    if(t === "exit"){ setMsg("Exit! Bank now to keep PATH."); }
  }

  /** mutate a cell in the grid */
  function mutate(r:number,c:number,t:CellType){
    setGrid(g => {
      const copy = g.map(row=>row.slice());
      copy[r][c] = t;
      return copy;
    });
  }

  /** keyboard */
  useEffect(()=>{
    const onKey = (e:KeyboardEvent)=>{
      const k = e.key.toLowerCase();
      if(["arrowup","w"].includes(k)) tryMove(-1,0);
      if(["arrowdown","s"].includes(k)) tryMove(1,0);
      if(["arrowleft","a"].includes(k)) tryMove(0,-1);
      if(["arrowright","d"].includes(k)) tryMove(0,1);
    };
    window.addEventListener("keydown", onKey);
    return ()=> window.removeEventListener("keydown", onKey);
  },[paused,energy,moves,player,grid]);

  /** swipe (touch) */
  const touch = useRef<{x:number;y:number}|null>(null);
  function onTouchStart(e:React.TouchEvent){ const t=e.touches[0]; touch.current={x:t.clientX,y:t.clientY}; }
  function onTouchEnd(e:React.TouchEvent){
    if(!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    if(Math.abs(dx) > Math.abs(dy)){
      tryMove(0, dx>0?1:-1);
    } else {
      tryMove(dy>0?1:-1, 0);
    }
    touch.current=null;
  }

  /** finish */
  function finish(){
    onFinish?.({
      tokens,
      moves: 12-moves,
      timeMs: Date.now()-startedAt,
      reachedExit: grid[player.r][player.c] === "exit",
    });
  }

  // HUD pills
  const HudPill = ({label,value}:{label:string;value:string|number}) => (
    <div className="hud-pill">{label}<span>{value}</span></div>
  );

  return (
    <div className="w-full">
      {/* HUD TOP */}
      <div className="flex items-center gap-3 mb-3">
        <HudPill label="Energy" value={energy} />
        <HudPill label="In-Run PATH" value={tokens} />
        <HudPill label="Moves" value={moves} />
      </div>

      {/* tip above the board (as in mock) */}
      <div className="glass subpill mb-3">Swipe / arrow keys to move • Bank tokens before Exit</div>

      {/* BOARD */}
      <div
        className="board glass"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {grid.map((row,r)=> row.map((t,c)=>{
          const me = (r===player.r && c===player.c);
          return (
            <div key={`${r}-${c}`} className={`tile ${t} ${me?'me':''}`}>
              {t==="start" && <span className="badge">S</span>}
              {t==="exit"  && <span className="badge">EXIT</span>}
              {t==="coin"  && <span className="ico">$</span>}
              {t==="energy"&& <span className="ico">⚡</span>}
              {t==="wall"  && <span className="ico">✕</span>}
            </div>
          );
        }))}
      </div>

      {/* control buttons */}
      <div className="controls mt-4">
        <button className="btn cta" onClick={()=>setPaused(p => !p)}>
          {paused ? "Resume" : "Pause"}
        </button>
        <button className="btn glass-ghost" onClick={restart}>Restart</button>
        <button className="btn finish" onClick={finish}>Finish Run</button>
      </div>

      {/* tip/footer */}
      <div className="tip glass mt-3">
        Tip: Bank as much as you can before EXIT to save PATH.
      </div>

      {msg && <div className="text-center text-white/70 text-sm mt-2">{msg}</div>}
    </div>
  );
}
