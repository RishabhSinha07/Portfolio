import { useState } from "react";
import { CONFIG } from "../config.js";
import { Reveal } from "./Reveal.jsx";
import { Label } from "./Label.jsx";
import { row } from "./RepoRow.jsx";
import { LinkedInIcon, ArrowIcon } from "./icons.jsx";

// ─── Writing — hand-curated LinkedIn posts ──────────────────────────────
// LinkedIn has no public API for personal posts, so this list is sourced
// from CONFIG.linkedinPosts. The whole section hides when that's empty.
export function Writing({ index = 3 }) {
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
      style={{ ...row.wrap, background: hover ? "var(--hover)" : "transparent" }}
    >
      <div style={row.topLine}>
        <div style={row.nameWrap}>
          <span
            style={{
              ...row.name,
              color: hover ? "var(--accent)" : "var(--text)",
            }}
          >
            {post.title}
          </span>
          <span
            style={{
              ...row.arrow,
              color: hover ? "var(--accent)" : "var(--text-2)",
              opacity: hover ? 1 : 0,
              transform: hover ? "translate(0, 0)" : "translate(-4px, 4px)",
            }}
          >
            <ArrowIcon />
          </span>
        </div>

        <div style={row.meta}>
          <span style={row.metaItem}>
            <span style={{ display: "inline-flex", color: "var(--text-2)" }}>
              <LinkedInIcon />
            </span>
            LinkedIn
          </span>
          {post.date && <span style={row.metaItem}>{formatDate(post.date)}</span>}
        </div>
      </div>

      {post.snippet && <p style={row.desc}>{post.snippet}</p>}
    </a>
  );
}

function formatDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
