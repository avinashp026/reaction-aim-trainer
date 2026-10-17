
import { useState } from "react";
import StatCard from "../../components/StatCard";
import AimPlayfield from "./AimPlayfield";
import { useAimTrainer } from "./useAimTrainer";

export default function AimTrainer({ onRoundComplete }) {
  const [duration, setDuration] = useState(30);
  const [difficulty, setDifficulty] = useState("Medium");

  const game = useAimTrainer({
    duration,
    difficulty,
    onRoundComplete,
  });

  const total = game.hits + game.misses;
  const accuracy = total ? (game.hits / total) * 100 : 0;

  const averageHit = game.hitTimes.length
    ? game.hitTimes.reduce((sum, time) => sum + time, 0) /
      game.hitTimes.length
    : null;

  function updateDuration(value) {
    setDuration(value);
    game.reset();
  }

  function updateDifficulty(value) {
    setDifficulty(value);
    game.reset();
  }

  return (
    <section>
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-200">
          Aim practice
        </p>
        <h2 className="mt-2 text-xl font-semibold">Click the targets as they appear.</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Choose a round length and difficulty. Clicks on the empty field count as misses.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-3">
        <div className="flex gap-1">
          {[15, 30, 60].map((seconds) => (
            <button
              key={seconds}
              onClick={() => updateDuration(seconds)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                duration === seconds
                  ? "bg-white text-zinc-950"
                  : "text-zinc-400 hover:bg-white/5"
              }`}
            >
              {seconds}s
            </button>
          ))}
        </div>

        <div className="flex gap-1">
          {["Easy", "Medium", "Hard"].map((level) => (
            <button
              key={level}
              onClick={() => updateDifficulty(level)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                difficulty === level
                  ? "bg-lime-300 text-zinc-950"
                  : "text-zinc-400 hover:bg-white/5"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <AimPlayfield
        phase={game.phase}
        countdown={game.countdown}
        remaining={game.remaining}
        target={game.target}
        targetSize={game.targetSize}
        hits={game.hits}
        onHit={game.hit}
        onMiss={game.miss}
        onStart={game.start}
      />

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Hits" value={game.hits} />
        <StatCard label="Misses" value={game.misses} />
        <StatCard label="Accuracy" value={`${accuracy.toFixed(1)}%`} />
        <StatCard
          label="Hits per second"
          value={(game.hits / duration).toFixed(2)}
        />
      </div>

      <div className="mt-3">
        <StatCard
          label="Avg. time between hits"
          value={
            averageHit === null
              ? "—"
              : `${(averageHit / 1000).toFixed(2)} s`
          }
        />
      </div>
    </section>
  );
}
