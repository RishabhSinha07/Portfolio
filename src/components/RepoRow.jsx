import { useState } from "react";
import { LANG } from "../config.js";
import { timeAgo, formatNum } from "../lib/format.js";
import { ArrowIcon } from "./icons.jsx";

// ─── Repo row ───────────────────────────────────────────────────────────
export function RepoRow({ repo, featured }) {
  const [hover, setHover] = useState(false);
  const langColor = LANG[repo.language] || "#888";

  return (
    <a
      href={repo.html_url}
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
              ...(featured ? row.nameFeatured : {}),
              color: hover ? "var(--accent)" : "var(--text)",
            }}
          >
            {repo.name}
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
          {repo.language && (
            <span style={row.metaItem}>
              <span style={{ ...row.dot, background: langColor }} />
              {repo.language}
            </span>
          )}
          {repo.stargazers_count > 0 && (
            <span style={row.metaItem}>{formatNum(repo.stargazers_count)} stars</span>
          )}
          <span style={row.metaItem}>{timeAgo(repo.pushed_at || repo.updated_at)}</span>
        </div>
      </div>

      {repo.description && <p style={row.desc}>{repo.description}</p>}
    </a>
  );
}

export const row = {
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
  name: {
    fontFamily: "var(--f-disp)",
    fontWeight: 500,
    fontSize: 22,
    letterSpacing: "-0.015em",
    transition: "color 150ms ease",
  },
  nameFeatured: { fontSize: 26, fontWeight: 600 },
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
  metaItem: { display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" },
  dot: { width: 8, height: 8, borderRadius: "50%", display: "inline-block" },
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
