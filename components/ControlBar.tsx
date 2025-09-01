import { NeonButton } from "./NeonButton";

export default function ControlBar({
  running,
  paused,
  onStart,
  onPause,
  onResume,
  onStop,
}: {
  running: boolean;
  paused: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => Promise<void> | void;
}) {
  if (!running) {
    return (
      <div className="flex gap-3">
        <NeonButton> {/* start */}
          <span onClick={onStart}>Start Run</span>
        </NeonButton>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      {/* Pause / Resume */}
      {paused ? (
        <button
          className="glass rounded-xl2 px-4 py-4 flex-1 text-center border border-white/20"
          onClick={onResume}
        >
          Resume
        </button>
      ) : (
        <button
          className="glass rounded-xl2 px-4 py-4 flex-1 text-center border border-white/20"
          onClick={onPause}
        >
          Pause
        </button>
      )}

      {/* Stop & Claim */}
      <button
        onClick={onStop}
        className="rounded-xl2 px-4 py-4 flex-1 text-center font-semibold text-white
                 bg-gradient-to-r from-pink-500 to-red-500 border border-white/10
                 shadow-[0_12px_30px_rgba(255,0,90,.25)]"
      >
        Stop & Claim
      </button>
    </div>
  );
}
