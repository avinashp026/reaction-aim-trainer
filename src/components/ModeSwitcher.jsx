
import { Crosshair, Zap } from "lucide-react";

export default function ModeSwitcher({ mode, onChange }) {
  const base =
    "flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition duration-200";

  return (
    <div className="inline-flex gap-1 rounded-2xl border border-white/10 bg-[#11141b] p-1">
      <button
        onClick={() => onChange("reaction")}
        className={`${base} ${
          mode === "reaction"
            ? "bg-lime-200 text-zinc-950 shadow-sm"
            : "text-zinc-400 hover:text-white"
        }`}
      >
        <Zap size={16} />
        Reaction
      </button>

      <button
        onClick={() => onChange("aim")}
        className={`${base} ${
          mode === "aim"
            ? "bg-lime-200 text-zinc-950 shadow-sm"
            : "text-zinc-400 hover:text-white"
        }`}
      >
        <Crosshair size={16} />
        Aim trainer
      </button>
    </div>
  );
}
