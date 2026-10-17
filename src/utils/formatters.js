
export function formatMs(value) {
  if (!Number.isFinite(value)) return "—";
  return `${Math.round(value)} ms`;
}

export function formatSeconds(value) {
  if (!Number.isFinite(value)) return "—";
  return `${(value / 1000).toFixed(3)} s`;
}

export function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}
