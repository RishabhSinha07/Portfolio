import { useState, useEffect } from "react";

// ─── Data hook ──────────────────────────────────────────────────────────────
// Fetches the user profile + up to 100 most-recently-updated public repos
// (GitHub's per-page cap), then drops forks. Surfaces rate-limit, not-found,
// and generic fetch failures so the UI can render a clean error state with
// retry. If you ever pass 100 repos, swap this for paginated calls.
export function useGitHub(username) {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Re-run on retry by bumping this nonce.
  const [nonce, setNonce] = useState(0);
  const retry = () => setNonce((n) => n + 1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    async function safeJson(res) {
      if (res.status === 403) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.message?.startsWith("API rate limit")
            ? "RATE_LIMIT"
            : "FORBIDDEN"
        );
      }
      if (res.status === 404) throw new Error("NOT_FOUND");
      if (!res.ok) throw new Error("FETCH_FAILED");
      return res.json();
    }

    async function load() {
      try {
        const [userRes, repoRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
          ),
        ]);
        const userData = await safeJson(userRes);
        const repoData = await safeJson(repoRes);
        if (cancelled) return;
        setUser(userData);
        setRepos(repoData.filter((r) => !r.fork));
        setLoading(false);
      } catch (e) {
        if (cancelled) return;
        setError(e.message || "FETCH_FAILED");
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [username, nonce]);

  return { user, repos, loading, error, retry };
}
