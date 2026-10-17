
import { X } from "lucide-react";

export default function SettingsPanel({
  open,
  onClose,
  soundOn,
  onSoundChange,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
      <button
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        aria-label="Close settings"
      />

      <aside className="relative h-full w-full max-w-sm border-l border-white/10 bg-[#101219] p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Settings</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
            aria-label="Close settings"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Sound cues</p>
              <p className="mt-1 text-xs text-zinc-500">
                Optional tones during gameplay.
              </p>
            </div>

            <button
              role="switch"
              aria-checked={soundOn}
              onClick={() => onSoundChange(!soundOn)}
              className={`h-6 w-11 rounded-full p-1 transition ${
                soundOn ? "bg-lime-300" : "bg-zinc-700"
              }`}
            >
              <span
                className={`block h-4 w-4 rounded-full bg-zinc-950 transition-transform ${
                  soundOn ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>
        </div>

        <p className="mt-5 text-xs leading-6 text-zinc-500">
          Your scores and preferences are saved in this browser.
          They aren't sent to a server.
        </p>
      </aside>
    </div>
  );
}
