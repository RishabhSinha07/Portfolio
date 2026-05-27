import { useState, useEffect } from "react";
import { dedupeById } from "./format.js";

// ─── Data hook ──────────────────────────────────────────────────────────────
// Fetches the user profile + their 30 most recently updated repos, then
// individually fetches any pinned repos that weren't in that window.
export function useGitHub(username, pinnedNames) {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [pinned, setPinned] = useState([]);
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
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`
          ),
        ]);
        const userData = await safeJson(userRes);
        const repoData = await safeJson(repoRes);

        const haveNames = new Set(repoData.map((r) => r.name));
        const missing = pinnedNames.filter((n) => !haveNames.has(n));
        const settled = await Promise.allSettled(
          missing.map((n) =>
            fetch(`https://api.github.com/repos/${username}/${n}`).then((r) =>
              r.ok ? r.json() : null
            )
          )
        );
        const extra = settled
          .filter((p) => p.status === "fulfilled" && p.value)
          .map((p) => p.value);

        const all = dedupeById([...extra, ...repoData]).filter(
          (r) => !r.fork || pinnedNames.includes(r.name)
        );
        const pinnedOrdered = pinnedNames
          .map((n) => all.find((r) => r.name === n))
          .filter(Boolean);
        const rest = all.filter((r) => !pinnedNames.includes(r.name));

        if (cancelled) return;
        setUser(userData);
        setRepos(rest);
        setPinned(pinnedOrdered);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, pinnedNames.join("|"), nonce]);

  return { user, repos, pinned, loading, error, retry };
}
