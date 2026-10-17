
import { Target, Timer, Trophy, RotateCcw, Zap } from "lucide-react";
import { formatSeconds } from "../../utils/formatters";

const phaseStyles = {
  idle: "border-white/10 bg-[#13161e] hover:border-white/20",
  waiting: "border-rose-300/20 bg-[#8e2935]",
  go: "border-emerald-200/40 bg-[#16784a]",
  result: "border-lime-200/20 bg-[#151d18]",
  "too-early": "border-rose-300/20 bg-[#301a22]",
};

const phaseContent = {
  idle: ["Reaction time", "Ready to try?", "Click to start. Wait for green, then click again."],
  waiting: ["Hold on", "Wait for green", "Clicking early will end the try."],
  go: ["Green", "Click", "As soon as you see it."],
  result: ["Your time", "That’s one.", "Click anywhere to continue."],
  "too-early": ["Too soon", "False start", "Wait for green before you click."],
};

export default function ReactionPlayfield({
  phase,
  reactionTime,
  attempts,
  onPress,
}) {
  const [eyebrow, title, description] = phaseContent[phase];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Reaction test playfield"
      onPointerDown={onPress}
      onKeyDown={(event) => {
        if (event.code === "Space" || event.code === "Enter") {
          event.preventDefault();
          onPress();
        }
      }}
      className={`playfield relative flex min-h-[350px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[28px] border px-5 py-10 text-center transition-colors duration-300 sm:min-h-[400px] ${phaseStyles[phase]}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,.06),transparent_65%)]" />

      <div className="relative">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-black/10">
          {phase === "waiting" ? <Timer size={28} /> :
            phase === "go" ? <Zap size={30} fill="currentColor" /> :
            phase === "result" ? <Trophy size={28} /> :
            phase === "too-early" ? <RotateCcw size={28} /> :
            <Target size={28} />}
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[0.24em] opacity-60">
          {eyebrow}
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>

        <p className="mt-3 text-sm opacity-70">{description}</p>

        {phase === "result" && reactionTime !== null && (
          <div className="mt-7 inline-block rounded-2xl border border-white/10 bg-black/15 px-6 py-4">
            <p className="text-4xl font-semibold tabular-nums">
              {reactionTime}
              <span className="ml-1 text-sm opacity-60">ms</span>
            </p>
            <p className="mt-2 text-sm text-lime-200">
              {formatSeconds(reactionTime)}
            </p>
          </div>
        )}

        {(phase === "idle" || phase === "too-early") && (
          <p className="mt-7 text-xs text-zinc-300/70">
            Click or press Space to begin
          </p>
        )}

        {phase === "result" && (
          <p className="mt-5 text-xs opacity-60">
            Attempt {Math.min(attempts.length, 5)} of 5
            {" · "}
            {attempts.length >= 5 ? "Round complete — play again" : "Click for the next attempt"}
          </p>
        )}
      </div>

      <div className="absolute bottom-4 left-5 text-[10px] font-semibold uppercase tracking-widest opacity-40">
        flickr / REACTION
      </div>
    </div>
  );
}
