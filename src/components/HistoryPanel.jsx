
import { X, Zap, Crosshair, Trash2 } from "lucide-react";
import { formatDate, formatMs } from "../utils/formatters";

export default function HistoryPanel({ open, onClose, history, onClear }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
      <button
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        aria-label="Close history"
      />

      <aside className="relative flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#101219]">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <h2 className="text-xl font-semibold">Your history</h2>
            <p className="mt-1 text-xs text-zinc-500">
              {history.length} saved sessions
            </p>
          </div>

          <button onClick={onClose} aria-label="Close history">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto p-4">
          {history.length === 0 ? (
            <p className="py-16 text-center text-sm text-zinc-500">
              No sessions yet. Finish a round to see it here.
            </p>
          ) : (
            history.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white/[0.06] p-3 text-lime-200">
                    {item.type === "reaction" ? (
                      <Zap size={18} />
                    ) : (
                      <Crosshair size={18} />
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">
                      {item.type === "reaction"
                        ? "Reaction round"
                        : `Aim · ${item.difficulty}`}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500">
                      {formatDate(item.date)}
                    </p>
                  </div>
                </div>

                {item.type === "reaction" ? (
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-black/20 p-3">
                      <p className="text-xs text-zinc-500">Best</p>
                      <p className="mt-1 font-semibold">{formatMs(item.best)}</p>
                    </div>
                    <div className="rounded-xl bg-black/20 p-3">
                      <p className="text-xs text-zinc-500">Average</p>
                      <p className="mt-1 font-semibold">{formatMs(item.average)}</p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-black/20 p-3">
                      <p className="text-xs text-zinc-500">Hits</p>
                      <p className="mt-1 font-semibold">{item.hits}</p>
                    </div>
                    <div className="rounded-xl bg-black/20 p-3">
                      <p className="text-xs text-zinc-500">Accuracy</p>
                      <p className="mt-1 font-semibold">
                        {item.accuracy.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                )}
              </article>
            ))
          )}
        </div>

        <div className="border-t border-white/10 p-4">
          <button
            onClick={onClear}
            disabled={!history.length}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-300/20 px-4 py-3 text-sm text-rose-200 hover:bg-rose-300/5 disabled:opacity-30"
          >
            <Trash2 size={15} />
            Clear history
          </button>
        </div>
      </aside>
    </div>
  );
}
