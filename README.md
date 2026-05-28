# Portfolio

A quiet, restrained personal portfolio that automatically pulls and showcases
public GitHub repositories via the GitHub REST API. Built from the **Portfolio
v3** design — a precise, single-column editorial aesthetic in the spirit of
Linear, Vercel, and rauno.me.

- Dark `#080808` background, hairline borders, a single electric-blue accent
  (`#0066FF`) used only on hover.
- Syne for the display name, IBM Plex Mono everywhere else.
- Projects as a clean vertical list (no cards, no shadows).
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

## Deploy (Vercel)

The repo includes a `vercel.json` so Vercel auto-detects Vite.

Easiest path — **one-click GitHub import**:

1. Go to <https://vercel.com/new>, sign in with GitHub.
2. Pick the `Portfolio` repo and click **Import**.
3. Leave every setting at default (Framework: Vite, Build: `npm run build`, Output: `dist`).
4. Click **Deploy**. The site goes live at `<project>.vercel.app`, and every push to `main` auto-redeploys.

Or via the CLI:

```bash
npx vercel              # first run prompts login + project setup
npx vercel --prod       # subsequent deploys to production
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
  accentColor: "#0066FF",
};
```

The hero pulls your avatar, name, and bio from the GitHub API, falling back to
`CONFIG` when those fields are empty on your profile.

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
