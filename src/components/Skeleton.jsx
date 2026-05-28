// ─── Skeletons — match the projects-table row shape ─────────────────────
export function SkeletonRow() {
  return (
    <div className="proj-row" aria-hidden="true">
      <div style={skel.line(160, 22)} />
      <div style={skel.line("80%", 14)} />
    </div>
  );
}

const skel = {
  line: (w, h) => ({
    width: w,
    height: h,
    background:
      "linear-gradient(90deg, var(--surface), #1a1a1a, var(--surface))",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.8s ease-in-out infinite",
  }),
};
