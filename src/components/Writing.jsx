import { useState } from "react";
import { CONFIG } from "../config.js";
import { Reveal } from "./Reveal.jsx";
import { Label } from "./Label.jsx";
import { LinkedInIcon, ArrowIcon } from "./icons.jsx";

// ─── Writing — hand-curated LinkedIn posts ──────────────────────────────
// LinkedIn has no public API for personal posts, so this list is sourced
// from CONFIG.linkedinPosts. The whole section hides when that's empty.
export function Writing({ index = 1 }) {
  const posts = CONFIG.linkedinPosts || [];
  if (posts.length === 0) return null;

  return (
    <Reveal index={index} as="section" style={{ paddingTop: 120 }}>
      <Label count={posts.length}>Writing</Label>
      <div>
        {posts.map((p, i) => (
          <PostRow key={p.url || i} post={p} />
        ))}
        <div
          style={{
            height: 1,
            background: "var(--border)",
            marginLeft: -16,
            marginRight: -16,
          }}
        />
      </div>
    </Reveal>
  );
}

function PostRow({ post }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...st.wrap, background: hover ? "var(--hover)" : "transparent" }}
    >
      <div style={st.topLine}>
        <div style={st.nameWrap}>
          <span style={{ ...st.title, color: hover ? "var(--accent)" : "var(--text)" }}>
            {post.title}
          </span>
          <span
            style={{
              ...st.arrow,
              color: hover ? "var(--accent)" : "var(--text-2)",
              opacity: hover ? 1 : 0,
              transform: hover ? "translate(0, 0)" : "translate(-4px, 4px)",
            }}
          >
            <ArrowIcon />
          </span>
        </div>

        <div style={st.meta}>
          <span style={st.metaItem}>
            <span style={{ display: "inline-flex", color: "var(--text-2)" }}>
              <LinkedInIcon />
            </span>
            LinkedIn
          </span>
          {post.date && <span style={st.metaItem}>{formatDate(post.date)}</span>}
        </div>
      </div>

      {post.snippet && <p style={st.desc}>{post.snippet}</p>}
    </a>
  );
}

function formatDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// Self-contained styles, matching the page vocabulary but not coupled to the
// Projects table layout.
const st = {
  wrap: {
    display: "block",
    padding: "22px 16px",
    borderTop: "1px solid var(--border)",
    transition: "background 150ms ease",
    marginLeft: -16,
    marginRight: -16,
  },
  topLine: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 24,
    flexWrap: "wrap",
  },
  nameWrap: { display: "inline-flex", alignItems: "baseline", gap: 8 },
  title: {
    fontFamily: "var(--f-disp)",
    fontWeight: 500,
    fontSize: 22,
    letterSpacing: "-0.015em",
    transition: "color 150ms ease",
  },
  arrow: {
    display: "inline-flex",
    alignSelf: "center",
    transition: "color 150ms ease, opacity 150ms ease, transform 150ms ease",
  },
  meta: {
    display: "inline-flex",
    alignItems: "center",
    gap: 16,
    fontFamily: "var(--f-mono)",
    fontSize: 12.5,
    color: "var(--text-2)",
    flexWrap: "wrap",
  },
  metaItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    whiteSpace: "nowrap",
  },
  desc: {
    marginTop: 8,
    fontFamily: "var(--f-mono)",
    fontSize: 13.5,
    lineHeight: 1.6,
    color: "var(--text-2)",
    textWrap: "pretty",
    maxWidth: "70ch",
    fontWeight: 400,
  },
};
