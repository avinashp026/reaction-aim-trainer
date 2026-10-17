
import { Settings2, History } from "lucide-react";

export default function Header({ onSettings, onHistory }) {
  return (
    <header className="border-b border-white/[0.08]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          

          <div>
            <h1 className="text-4xl font-black tracking-tight">
              flickr<span className="text-lime-300">.</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              Quick practice, better control
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onHistory}
            className="rounded-xl border border-white/10 p-3 text-zinc-400 transition hover:bg-white/5 hover:text-white"
            aria-label="View history"
          >
            <History size={18} />
          </button>

          <button
            onClick={onSettings}
            className="rounded-xl border border-white/10 p-3 text-zinc-400 transition hover:bg-white/5 hover:text-white"
            aria-label="Settings"
          >
            <Settings2 size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
