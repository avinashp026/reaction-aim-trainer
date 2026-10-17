
export default function StatCard({ label, value, note }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-100 tabular-nums">
        {value}
      </p>

      {note && (
        <p className="mt-1 text-xs text-zinc-500">{note}</p>
      )}
    </div>
  );
}
