// ─── Tiny section label ─────────────────────────────────────────────────
export function Label({ children, count, right }) {
  return (
    <div style={lbl.row}>
      <div style={lbl.left}>
        <span style={lbl.text}>{children}</span>
        {count != null && (
          <span style={lbl.count}>{String(count).padStart(2, "0")}</span>
        )}
      </div>
      {right}
    </div>
  );
}

const lbl = {
  row: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 24,
    flexWrap: "wrap",
  },
  left: { display: "flex", alignItems: "baseline", gap: 12 },
  text: {
    fontFamily: "var(--f-mono)",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.18em",
    color: "var(--text)",
    textTransform: "uppercase",
  },
  count: {
    fontFamily: "var(--f-mono)",
    fontSize: 11,
    color: "var(--text-2)",
    letterSpacing: "0.06em",
  },
};
