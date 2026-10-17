
import { useCallback, useMemo, useState } from "react";
import Header from "./components/Header";
import ModeSwitcher from "./components/ModeSwitcher";
import StatCard from "./components/StatCard";
import SettingsPanel from "./components/SettingsPanel";
import HistoryPanel from "./components/HistoryPanel";
import ReactionTrainer from "./features/reaction/ReactionTrainer";
import AimTrainer from "./features/aim/AimTrainer";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { formatMs } from "./utils/formatters";

export default function App() {
  const [mode, setMode] = useState("reaction");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [soundOn, setSoundOn] = useLocalStorage("flickr-sound", false);
  const [history, setHistory] = useLocalStorage("flickr-history", []);

  const saveRound = useCallback((result) => {
    setHistory((previous) => [
      {
        ...result,
        type: mode === "reaction" ? "reaction" : "aim",
        id: `${Date.now()}-${Math.random()}`,
        date: new Date().toISOString(),
        difficulty: result.difficulty,
      },
      ...previous,
    ].slice(0, 100));
  }, [mode, setHistory]);

  const reactionBest = useMemo(() => {
    const values = history
      .filter((item) => item.type === "reaction")
      .map((item) => item.best);

    return values.length ? Math.min(...values) : null;
  }, [history]);

  const clearHistory = () => {
    if (window.confirm("Delete all saved Flickr history?")) {
      setHistory([]);
    }
  };

  return (
    <div className="app-shell relative min-h-screen overflow-hidden bg-[#0b0d12] text-zinc-100">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-lime-300/[0.05] blur-[120px]" />
        <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-cyan-300/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Header
          onSettings={() => setSettingsOpen(true)}
          onHistory={() => setHistoryOpen(true)}
        />

        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <section className="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-lime-200">
                A small practice for sharper hands
              </p>

              <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                Better timing,
                <br />
                <span className="text-zinc-500">one run at a time.</span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-6 text-zinc-400">
                A quick place to work on reaction time and mouse control. Pick a drill,
                settle in, and see how you do.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:min-w-64">
              <StatCard
                label="Personal best"
                value={reactionBest === null ? "—" : formatMs(reactionBest)}
              />
              <StatCard label="Sessions saved" value={history.length} />
            </div>
          </section>

          <div className="mb-6">
            <ModeSwitcher mode={mode} onChange={setMode} />
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="min-w-0">
              {mode === "reaction" ? (
                <ReactionTrainer
                  onRoundComplete={(result) =>
                    saveRound({ ...result, type: "reaction" })
                  }
                />
              ) : (
                <AimTrainer
                  onRoundComplete={(result) =>
                    saveRound({ ...result, type: "aim" })
                  }
                />
              )}
            </div>

            <aside className="space-y-4">
              <section className="rounded-2xl border border-white/[0.08] bg-[#11141b] p-5">
                <h3 className="text-sm font-semibold">A few things that help</h3>

                <div className="mt-5 space-y-4 text-sm">
                  <div>
                    <p className="font-medium">Let your hand rest.</p>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                      A light grip makes it easier to move quickly and accurately.
                    </p>
                  </div>

                  <div>
                    <p className="font-medium">Wait for the cue.</p>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                      Guessing can make a fast time look better than it is.
                    </p>
                  </div>

                  <div>
                    <p className="font-medium">Use the same setup.</p>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                      Your mouse, screen, and browser all affect the result.
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-lime-200/10 bg-lime-300/[0.035] p-5">
                <h3 className="text-sm font-semibold text-lime-200">
                  Kept on this device
                </h3>
                <p className="mt-2 text-xs leading-5 text-zinc-400">
                  Your sessions stay in this browser. They can be cleared from
                  your history whenever you like.
                </p>
              </section>
            </aside>
          </div>
        </main>

        <footer className="border-t border-white/[0.08] px-5 py-6 text-center text-xs text-zinc-600">
          flickr. <span className="text-zinc-500">A little practice goes a long way.</span>
        </footer>
      </div>

      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        soundOn={soundOn}
        onSoundChange={setSoundOn}
      />

      <HistoryPanel
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={history}
        onClear={clearHistory}
      />
    </div>
  );
}
