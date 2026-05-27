// ─── Error state ──────────────────────────────────────────────────────
export function ErrorState({ kind, onRetry }) {
  const title =
    kind === "RATE_LIMIT"
      ? "Rate limit reached"
      : kind === "NOT_FOUND"
        ? "User not found"
        : "Couldn't load projects";
  const body =
    kind === "RATE_LIMIT"
      ? "GitHub allows 60 unauthenticated API calls per hour from this IP. Try again shortly."
      : kind === "NOT_FOUND"
        ? "Check the username in CONFIG.githubUsername at the top of src/config.js."
        : "The GitHub API didn't respond. Check your connection and retry.";
  return (
    <div style={err.wrap}>
      <div style={err.title}>{title}</div>
      <p style={err.body}>{body}</p>
      <button
        onClick={onRetry}
        style={err.btn}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
      >
        Retry →
      </button>
    </div>
  );
}

const err = {
  wrap: { padding: "48px 0" },
  title: {
    fontFamily: "var(--f-disp)",
    fontSize: 28,
    fontWeight: 500,
    color: "var(--text)",
    letterSpacing: "-0.015em",
  },
  body: {
    marginTop: 12,
    fontFamily: "var(--f-mono)",
    fontSize: 14,
    color: "var(--text-2)",
    lineHeight: 1.6,
    maxWidth: "52ch",
  },
  btn: {
    marginTop: 24,
    background: "transparent",
    border: "none",
    padding: 0,
    color: "var(--text)",
    fontFamily: "var(--f-mono)",
    fontSize: 13,
    cursor: "pointer",
    transition: "color 150ms ease",
  },
};
