import { CONFIG } from "../config.js";

// ─── Footer ───────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer style={ft.wrap}>
      <div style={ft.line}>
        <span>
          © {new Date().getFullYear()} {CONFIG.name}
        </span>
        <a
          href={`https://github.com/${CONFIG.githubUsername}`}
          target="_blank"
          rel="noreferrer"
          style={ft.link}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
        >
          Source on GitHub
        </a>
      </div>
    </footer>
  );
}

const ft = {
  wrap: { paddingTop: 120, paddingBottom: 80 },
  line: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
    fontFamily: "var(--f-mono)",
    fontSize: 12,
    color: "var(--text-2)",
  },
  link: { color: "var(--text-2)", transition: "color 150ms ease" },
};
