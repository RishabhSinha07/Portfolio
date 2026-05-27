import { useState } from "react";

// ─── Underline tab ─────────────────────────────────────────────────────
function Tab({ active, onClick, children }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...tabSt.btn,
        color: active ? "var(--text)" : hover ? "var(--text)" : "var(--text-2)",
        borderBottomColor: active ? "var(--accent)" : "transparent",
      }}
    >
      {children}
    </button>
  );
}

const tabSt = {
  btn: {
    background: "transparent",
    border: "none",
    padding: "8px 0",
    borderBottom: "1px solid transparent",
    fontFamily: "var(--f-mono)",
    fontSize: 12.5,
    fontWeight: 400,
    cursor: "pointer",
    transition: "color 150ms ease, border-bottom-color 150ms ease",
  },
};

// ─── Filters / search ───────────────────────────────────────────────────
export function Filters({
  query,
  setQuery,
  sort,
  setSort,
  language,
  setLanguage,
  languages,
}) {
  return (
    <div style={flt.wrap}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search projects…"
        style={flt.input}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--text)")}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--border)")}
      />

      <div style={flt.tabRow}>
        <div style={flt.tabGroup}>
          <Tab active={language === null} onClick={() => setLanguage(null)}>
            All
          </Tab>
          {languages.map((l) => (
            <Tab key={l} active={language === l} onClick={() => setLanguage(l)}>
              {l}
            </Tab>
          ))}
        </div>
        <div style={flt.tabGroup}>
          <Tab active={sort === "updated"} onClick={() => setSort("updated")}>
            Recent
          </Tab>
          <Tab active={sort === "stars"} onClick={() => setSort("stars")}>
            Stars
          </Tab>
          <Tab active={sort === "forks"} onClick={() => setSort("forks")}>
            Forks
          </Tab>
        </div>
      </div>
    </div>
  );
}

const flt = {
  wrap: { display: "flex", flexDirection: "column", gap: 28, marginBottom: 16 },
  input: {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--border)",
    padding: "10px 2px",
    color: "var(--text)",
    fontFamily: "var(--f-mono)",
    fontSize: 14,
    outline: "none",
    transition: "border-bottom-color 150ms ease",
  },
  tabRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
    flexWrap: "wrap",
  },
  tabGroup: { display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" },
};
