import { ArrowIcon } from "./icons.jsx";

// ─── Project row — one repo in the Projects table ───────────────────────
export function RepoRow({ repo }) {
  const detail = (repo.description || "").trim();
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="proj-row"
      aria-label={`${repo.name} on GitHub`}
    >
      <div className="proj-name-wrap">
        <span className="proj-name">{repo.name}</span>
        <span className="proj-arrow">
          <ArrowIcon />
        </span>
      </div>

      <p className={detail ? "proj-detail" : "proj-detail proj-detail--empty"}>
        {detail || "—"}
      </p>
    </a>
  );
}
