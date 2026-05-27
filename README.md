# Portfolio

A quiet, restrained personal portfolio that automatically pulls and showcases
public GitHub repositories via the GitHub REST API. Built from the **Portfolio
v3** design — a precise, single-column editorial aesthetic in the spirit of
Linear, Vercel, and rauno.me.

- Dark `#080808` background, hairline borders, a single electric-blue accent
  (`#0066FF`) used only on hover.
- Syne for the display name, IBM Plex Mono everywhere else.
- Projects as a clean vertical list (no cards, no shadows) with a `FEATURED`
  section above for pinned repos.
- Search, language filter tabs, and sort (Recent / Stars / Forks).
- Loading skeletons, and graceful rate-limit / not-found / fetch-failed states
  with retry.
- Subtle staggered fade-in entrance (respects `prefers-reduced-motion`).

## Stack

Vite + React 18. No UI libraries — custom styles only. Data is fetched
client-side with `fetch()` in a `useEffect` hook; no backend required.

## Run

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Configure

Edit [`src/config.js`](src/config.js):

```js
export const CONFIG = {
  githubUsername: "RishabhSinha07",
  name: "Rishabh Sinha",
  title: "Software engineer",
  bio: "…",                       // falls back to your GitHub bio if set
  linkedin: "https://www.linkedin.com/in/rishabh-sinha-99a706164/",
  email: "rishabhsinha220@gmail.com",
  pinnedRepos: [],                // e.g. ["repo-a", "repo-b"] to feature at top
  accentColor: "#0066FF",
};
```

`pinnedRepos` lists repo names to surface in the `FEATURED` section (fetched
individually if they're outside the 30 most-recently-updated). The hero pulls
your avatar, name, and bio from the GitHub API, falling back to `CONFIG`.

> Note: unauthenticated GitHub API calls are limited to 60/hour per IP. The app
> surfaces a clear rate-limit state with a retry when that's hit.

## Structure

```
index.html            # Vite entry, loads Google Fonts
src/
  main.jsx            # React root
  App.jsx             # layout + filter/sort/search state
  config.js           # CONFIG + GitHub language colors
  styles.css          # design tokens + keyframes
  lib/
    useGitHub.js      # data hook (profile + repos + pinned)
    format.js         # timeAgo / formatNum / dedupe helpers
  components/
    Hero.jsx  RepoRow.jsx  Filters.jsx  Label.jsx
    Skeleton.jsx  ErrorState.jsx  Footer.jsx
    Reveal.jsx  icons.jsx
```
