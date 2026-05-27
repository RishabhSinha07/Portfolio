import { useMemo, useState } from "react";
import { CONFIG } from "./config.js";
import { useGitHub } from "./lib/useGitHub.js";
import { Reveal } from "./components/Reveal.jsx";
import { Hero } from "./components/Hero.jsx";
import { Label } from "./components/Label.jsx";
import { RepoRow } from "./components/RepoRow.jsx";
import { Filters } from "./components/Filters.jsx";
import { SkeletonRow } from "./components/Skeleton.jsx";
import { ErrorState } from "./components/ErrorState.jsx";
import { Footer } from "./components/Footer.jsx";

// ─── App ─────────────────────────────────────────────────────────────────
export default function App() {
  const { user, repos, pinned, loading, error, retry } = useGitHub(
    CONFIG.githubUsername,
    CONFIG.pinnedRepos
  );
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("updated");
  const [language, setLanguage] = useState(null);

  const languages = useMemo(() => {
    const counts = {};
    repos.forEach((r) => {
      if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
    });
    return Object.keys(counts)
      .sort((a, b) => counts[b] - counts[a])
      .slice(0, 6);
  }, [repos]);

  const filtered = useMemo(() => {
    let list = [...repos];
    if (language) list = list.filter((r) => r.language === language);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.description || "").toLowerCase().includes(q) ||
          (r.topics || []).some((t) => t.includes(q)) ||
          (r.language || "").toLowerCase().includes(q)
      );
    }
    if (sort === "stars")
      list.sort((a, b) => b.stargazers_count - a.stargazers_count);
    else if (sort === "forks")
      list.sort((a, b) => b.forks_count - a.forks_count);
    else
      list.sort(
        (a, b) =>
          new Date(b.pushed_at || b.updated_at) -
          new Date(a.pushed_at || a.updated_at)
      );
    return list;
  }, [repos, language, query, sort]);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
      <Hero user={user} loading={loading} />

      {/* Featured */}
      <Reveal index={1} as="section" style={{ paddingTop: 120 }}>
        <Label count={pinned.length || (loading ? null : 0)}>Featured</Label>
        <div>
          {loading &&
            Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)}
          {!loading &&
            pinned.map((r) => <RepoRow key={r.id} repo={r} featured />)}
          {!loading && !error && pinned.length === 0 && (
            <div
              style={{
                padding: "22px 16px",
                marginLeft: -16,
                marginRight: -16,
                borderTop: "1px solid var(--border)",
                fontFamily: "var(--f-mono)",
                fontSize: 13,
                color: "var(--text-2)",
              }}
            >
              No pinned repositories — edit{" "}
              <span style={{ color: "var(--text)" }}>CONFIG.pinnedRepos</span> to
              feature work here.
            </div>
          )}
          {/* Bottom divider for the section */}
          {(loading || pinned.length > 0) && (
            <div
              style={{
                height: 1,
                background: "var(--border)",
                marginLeft: -16,
                marginRight: -16,
              }}
            />
          )}
        </div>
      </Reveal>

      {/* Projects */}
      <Reveal index={2} as="section" style={{ paddingTop: 120 }}>
        <Label
          count={loading ? null : filtered.length}
          right={
            !loading &&
            !error && (
              <span
                style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: 11,
                  color: "var(--text-2)",
                  letterSpacing: "0.06em",
                }}
              >
                {filtered.length === repos.length
                  ? `${repos.length} total`
                  : `${filtered.length} of ${repos.length}`}
              </span>
            )
          }
        >
          Projects
        </Label>

        {!error && (
          <Filters
            query={query}
            setQuery={setQuery}
            sort={sort}
            setSort={setSort}
            language={language}
            setLanguage={setLanguage}
            languages={languages}
          />
        )}

        {error && <ErrorState kind={error} onRetry={retry} />}

        {!error && (
          <div style={{ marginTop: 24 }}>
            {loading &&
              Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}
            {!loading && filtered.map((r) => <RepoRow key={r.id} repo={r} />)}
            {!loading && filtered.length === 0 && (
              <div
                style={{
                  padding: "48px 16px",
                  marginLeft: -16,
                  marginRight: -16,
                  borderTop: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--f-disp)",
                    fontWeight: 500,
                    fontSize: 22,
                    color: "var(--text)",
                    letterSpacing: "-0.015em",
                  }}
                >
                  No projects match.
                </div>
                <button
                  onClick={() => {
                    setQuery("");
                    setLanguage(null);
                  }}
                  style={{
                    marginTop: 16,
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    color: "var(--text-2)",
                    fontFamily: "var(--f-mono)",
                    fontSize: 13,
                    cursor: "pointer",
                    transition: "color 150ms ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-2)")
                  }
                >
                  Clear filters →
                </button>
              </div>
            )}
            {!loading && filtered.length > 0 && (
              <div
                style={{
                  height: 1,
                  background: "var(--border)",
                  marginLeft: -16,
                  marginRight: -16,
                }}
              />
            )}
          </div>
        )}
      </Reveal>

      <Footer />
    </div>
  );
}
