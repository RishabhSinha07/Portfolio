// ─── Helpers ─────────────────────────────────────────────────────────────
export function timeAgo(iso) {
  if (!iso) return "";
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return Math.floor(diff / 60) + " min ago";
  if (diff < 86400) return Math.floor(diff / 3600) + " hr ago";
  if (diff < 86400 * 2) return "yesterday";
  if (diff < 86400 * 30) return Math.floor(diff / 86400) + " days ago";
  if (diff < 86400 * 60) return "1 month ago";
  if (diff < 86400 * 365)
    return Math.floor(diff / (86400 * 30)) + " months ago";
  if (diff < 86400 * 730) return "1 year ago";
  return Math.floor(diff / (86400 * 365)) + " years ago";
}

export function formatNum(n) {
  if (n == null) return "0";
  if (n >= 10000) return (n / 1000).toFixed(0) + "k";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return new Intl.NumberFormat("en-US").format(n);
}

export function dedupeById(arr) {
  const seen = new Set();
  return arr.filter((r) => (seen.has(r.id) ? false : (seen.add(r.id), true)));
}
