
import { RotateCcw } from "lucide-react";
import StatCard from "../../components/StatCard";
import { formatMs } from "../../utils/formatters";
import { useReactionTest } from "./useReactionTest";
import ReactionPlayfield from "./ReactionPlayfield";

export default function ReactionTrainer({ onRoundComplete }) {
  const game = useReactionTest(onRoundComplete);

  const average = game.attempts.length
    ? game.attempts.reduce((sum, time) => sum + time, 0) /
      game.attempts.length
    : null;

  const best = game.attempts.length
    ? Math.min(...game.attempts)
    : null;

  return (
    <section>
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-200">
          Reaction time
        </p>
        <h2 className="mt-2 text-xl font-semibold">How quickly do you react?</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Wait for the field to turn green, then click as soon as you see it.
        </p>
      </div>

      <ReactionPlayfield
        phase={game.phase}
        reactionTime={game.reactionTime}
        attempts={game.attempts}
        onPress={game.press}
      />

      <div className="mt-4 grid grid-cols-3 gap-3">
        <StatCard
            label="Tries"
          value={`${Math.min(game.attempts.length, 5)} / 5`}
        />
        <StatCard
          label="Average"
          value={average === null ? "—" : formatMs(average)}
        />
        <StatCard
          label="Best"
          value={best === null ? "—" : formatMs(best)}
          note="Lower is faster"
        />
      </div>

      {game.attempts.length > 0 && (
        <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Recent attempts
          </p>

          <div className="flex flex-wrap gap-2">
            {game.attempts.map((time, index) => (
              <span
                key={`${index}-${time}`}
                className="rounded-lg bg-white/[0.06] px-3 py-2 text-sm tabular-nums"
              >
                {index + 1}. {time} ms
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={game.reset}
        className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/5"
      >
        <RotateCcw size={15} />
        Reset round
      </button>
    </section>
  );
}
