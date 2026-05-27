import { row } from "./RepoRow.jsx";

// ─── Skeletons ────────────────────────────────────────────────────────
export function SkeletonRow() {
  return (
    <div style={{ ...row.wrap, borderTopColor: "var(--border)" }}>
      <div style={row.topLine}>
        <div style={skel.line(180, 22)} />
        <div style={skel.line(220, 13)} />
      </div>
      <div style={{ marginTop: 10, ...skel.line("70%", 13) }} />
    </div>
  );
}

const skel = {
  line: (w, h) => ({
    width: w,
    height: h,
    background: "linear-gradient(90deg, var(--surface), #1a1a1a, var(--surface))",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.8s ease-in-out infinite",
  }),
};
