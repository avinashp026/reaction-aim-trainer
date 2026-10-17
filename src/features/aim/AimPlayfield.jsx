
import { Crosshair, Timer, Trophy } from "lucide-react";

export default function AimPlayfield({
  phase,
  countdown,
  remaining,
  target,
  targetSize,
  hits,
  onHit,
  onMiss,
  onStart,
}) {
  function handlePointerDown(event) {
    if (phase === "playing" && event.target === event.currentTarget) {
      onMiss();
    } else if (phase === "idle" || phase === "result") {
      onStart();
    }
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      className="playfield relative min-h-[370px] overflow-hidden rounded-[28px] border border-white/10 bg-[#11141b] sm:min-h-[430px]"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-xl border border-white/10 bg-[#0b0d12]/90 px-3 py-2">
        <Timer size={14} className="text-lime-300" />
        <span className="font-mono text-sm tabular-nums">
          {Math.max(0, remaining).toFixed(1)}s
        </span>
      </div>

      <div className="absolute right-4 top-4 z-10 rounded-xl border border-white/10 bg-[#0b0d12]/90 px-3 py-2 font-mono text-sm">
        {hits} {hits === 1 ? "hit" : "hits"}
      </div>

      {phase === "playing" && target && (
        <button
          aria-label="Hit target"
          onPointerDown={(event) => {
            event.stopPropagation();
            onHit();
          }}
          className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-lime-200 bg-lime-300 text-zinc-950 shadow-[0_0_0_7px_rgba(190,242,100,.12)] transition-transform active:scale-90"
          style={{
            width: targetSize,
            height: targetSize,
            left: `${target.x}%`,
            top: `${target.y}%`,
          }}
        >
          <Crosshair size={targetSize * 0.43} strokeWidth={2.5} />
        </button>
      )}

      {(phase === "idle" || phase === "countdown" || phase === "result") && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0b0d12]/80 px-5 text-center backdrop-blur-sm">
          {phase === "countdown" ? (
            <>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-200">
                Get ready
              </p>
              <p className="mt-3 text-7xl font-semibold tabular-nums">
                {countdown}
              </p>
            </>
          ) : phase === "result" ? (
            <>
              <Trophy size={30} className="text-lime-300" />
              <h2 className="mt-4 text-2xl font-semibold">Time’s up.</h2>
              <p className="mt-2 text-sm text-zinc-400">
                {hits} hits · Nice work
              </p>
              <button
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  onStart();
                }}
                className="mt-5 rounded-xl bg-lime-300 px-4 py-3 text-sm font-bold text-zinc-950 hover:bg-lime-200"
              >
                Play again
              </button>
            </>
          ) : (
            <>
              <Crosshair size={30} className="text-lime-300" />
              <h2 className="mt-4 text-2xl font-semibold">
                Ready when you are.
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-400">
                Click each target as it appears. Empty clicks count as misses.
              </p>
              <button
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  onStart();
                }}
                className="mt-5 rounded-xl bg-lime-300 px-4 py-3 text-sm font-bold text-zinc-950 hover:bg-lime-200"
              >
                Start round
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
