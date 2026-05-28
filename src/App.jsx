import { useMemo, useState } from "react";
import { CONFIG } from "./config.js";
import { useGitHub } from "./lib/useGitHub.js";
import { Reveal } from "./components/Reveal.jsx";
import { Hero } from "./components/Hero.jsx";
import { Label } from "./components/Label.jsx";
import { RepoRow } from "./components/RepoRow.jsx";
import { SkeletonRow } from "./components/Skeleton.jsx";
import { ErrorState } from "./components/ErrorState.jsx";
import { Writing } from "./components/Writing.jsx";
import { Footer } from "./components/Footer.jsx";

// ─── App ─────────────────────────────────────────────────────────────────
export default function App() {
  const { user, repos, loading, error, retry } = useGitHub(
    CONFIG.githubUsername
  );

  const INITIAL_VISIBLE = 10;
  const [expanded, setExpanded] = useState(false);

  // Default ordering: described repos first, then most-recent activity within
  // each group. The filters/search/sort UI was removed by request — this is
  // the canonical view.
  const sorted = useMemo(() => {
    const hasDesc = (r) => (r.description && r.description.trim() ? 1 : 0);
    return [...repos].sort(
      (a, b) =>
        hasDesc(b) - hasDesc(a) ||
        new Date(b.pushed_at || b.updated_at) -
          new Date(a.pushed_at || a.updated_at)
    );
  }, [repos]);

  const visible = expanded ? sorted : sorted.slice(0, INITIAL_VISIBLE);
  const overflow = Math.max(0, sorted.length - INITIAL_VISIBLE);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
      <Hero user={user} loading={loading} />

      <Writing index={1} />

      {/* Projects */}
      <Reveal index={2} as="section" style={{ paddingTop: 120 }}>
        <Label count={loading ? null : sorted.length}>Projects</Label>

        {error && <ErrorState kind={error} onRetry={retry} />}

        {!error && (
          <div>
            <div className="proj-head" aria-hidden="true">
              <span className="proj-head-cell">Project</span>
              <span className="proj-head-cell">Detail</span>
            </div>

            {loading &&
              Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}

            {!loading && visible.map((r) => <RepoRow key={r.id} repo={r} />)}

            {!loading && sorted.length > 0 && <div className="proj-table-foot" />}

            {!loading && overflow > 0 && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="proj-toggle"
                aria-expanded={expanded}
              >
                {expanded ? "Show less" : `Show ${overflow} more`}
                <span className="proj-toggle-caret" aria-hidden="true">
                  {expanded ? "↑" : "↓"}
                </span>
              </button>
            )}
          </div>
        )}
      </Reveal>

      <Footer />
    </div>
  );
}
