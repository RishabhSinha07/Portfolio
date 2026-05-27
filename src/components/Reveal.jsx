// ─── Reveal — fade + translateY(8px) entrance, staggered by index ──────────
// The brief asked for a subtle staggered entrance on load. Driven by a pure
// CSS keyframe (see styles.css `.reveal`) with a per-index delay, so it never
// gates visibility on JS and respects prefers-reduced-motion.
export function Reveal({ index = 0, children, as = "div", style }) {
  const Tag = as;
  return (
    <Tag
      className="reveal"
      style={{ ...style, animationDelay: `${index * 100}ms` }}
    >
      {children}
    </Tag>
  );
}
