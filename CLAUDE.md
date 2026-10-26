# CLAUDE.md

Guidance for AI coding sessions (Claude Code) working in this repository.

## Project

Personal website of Jasper Lammers: who he is, his essays, a dated record of things built and written, and a few project highlights. Fully static output, hosted on Cloudflare Workers (static assets).
Priorities, in order: fast load times, strong SEO, clean and maintainable code. Keep it small; do not add sections, pages or features that were not asked for.

- **No sales copy.** The only exception is the one "Hiring a .NET freelancer? → devjasper.nl" line on the home page. Freelance work is sold on devjasper.nl, not here.
- **No tech blog.** Tech articles live on DEV.to. Old articles are kept in `archive/articles/` for provenance but are never rendered.
- The process and its decisions come from `C:\git\site analysis\docs\` (`migration-plan.md`, `structure.md`, `phase3-report.md`). The phase prompts are in `C:\git\site analysis\prompts\jasperlammers.com\`, adapted from the template in `C:\git\site analysis\prompts\devjasper.nl\`.
- **Never use `C:\git\Websites`** (made for another company): not its prompts, not its content.

## Public repository

This repo is public (for provenance). Everything committed is published.
- `_input/` is gitignored and holds working material (project dossiers, reference sites, notes). Never commit it.
- Never commit anything from the WordPress database dumps, comments, subscriber or commenter data, or `C:\git\site analysis\content\_unpublished\`.
- Before every commit, check the staged files for anything that should not be public.

## Tech stack

- **Framework:** Astro (static output, `output: 'static'`, the default)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 via the `@tailwindcss/vite` plugin (CSS-first config, no `tailwind.config.js`)
- **SEO:** `@astrojs/sitemap` and `@astrojs/rss`; `site` is `https://jasperlammers.com`
- **Runtime:** Node.js LTS, pinned in `.nvmrc`
- **Package manager:** npm (commit `package-lock.json`)

Ship zero client-side JavaScript by default. Only add interactivity with a `<script>` tag in a component, or an island (`client:visible` / `client:idle`) when truly needed. Do not add a UI framework (React, Vue, Svelte) without asking first.

## Scripts

| Command           | Purpose                                         |
| ----------------- | ----------------------------------------------- |
| `npm install`     | Install dependencies                            |
| `npm run dev`     | Local dev server at http://localhost:4321 (HMR) |
| `npm run build`   | Production build into `dist/`                   |
| `npm run preview` | Serve the built `dist/` locally to verify       |
| `npm run check`   | Type-check `.astro` and `.ts` files             |

Always run `npm run build` and `npm run check` before considering a change done. A failing build means a failing deploy.

## URLs are fixed

The old WordPress URLs redirect to this site through a map built in `C:\git\site analysis\scripts\redirects.mjs`. That map assumes the site serves exactly its `NEW_PAGES` list, with trailing slashes:

`/`, `/essays/`, `/essays/<slug>/` (13 essays), `/record/`, `/projects/`, `/projects/strategic-rps/`, `/projects/vip-graduation/`, `/projects/retro-bw-game-pack/`, `/rss.xml`, `/sitemap-index.xml`, `/robots.txt`.

Do not add, rename or remove pages, change essay slugs, move the feed or change the slash style without asking: it means updating `NEW_PAGES` and regenerating the map, or every redirect becomes two hops. `public/_redirects` is generated from `C:\git\site analysis\redirects\`; never edit it by hand.

## Project structure

```
/
├── public/              # Static assets copied as-is (favicon, robots.txt, _headers, _redirects)
├── src/
│   ├── components/      # Reusable .astro components (PascalCase.astro)
│   ├── layouts/         # Page shells (BaseLayout.astro holds <head>, meta, SEO tags)
│   ├── pages/           # File-based routing; each file = one URL
│   └── styles/
│       └── global.css   # @import "tailwindcss"; plus @theme design tokens
├── archive/             # Outside the build: old articles, later design history
├── astro.config.mjs
├── tsconfig.json
├── .nvmrc
└── CLAUDE.md
```

`archive/` is never built, routed or imported from `src/`. Do not modify it unless asked.

## Conventions

- Components: one component per file, PascalCase names, typed `Props` interface in the frontmatter.
- Pages stay thin: compose layouts and components, no large inline markup blocks.
- Every page sets a unique `title` and `description` through `BaseLayout` (Open Graph and canonical URL included).
- Design tokens (colors, fonts, spacing) live in `@theme` in `src/styles/global.css`. Avoid arbitrary one-off values when a token fits.
- Images: use Astro's `<Image />` / `<Picture />` from `astro:assets` for local images so they get optimized. Always provide `alt` text.
- Semantic HTML and accessibility first: landmarks, heading order, focus states, sufficient contrast.
- Fonts: self-host (e.g. Fontsource) rather than loading from third-party CDNs.
- Keep dependencies minimal. Ask before adding a new package.

## Writing rules for site copy

- No em dashes.
- Never invent facts, dates, roles or results. If something is missing, mark it `[TODO: ...]` and ask.
- No AI or marketing phrases ("passionate", "leverage", "seamless", "cutting-edge", "unlock", "elevate").
- The essays are existing text and are not rewritten.
- The 13 existing essays are Jasper's own prose and carry no AI disclosure. When adding a new essay, ask whether AI helped write the prose; if so, disclose it on `/essays` and in its Zenodo metadata (structure.md §4).

## Design system

Direction A ("Cousin"), chosen 2026-10-26. Full decisions in `docs/design.md`; read it before changing anything visual.

- **Fonts:** Figtree Variable for headings and interface (600 to 800, never 900), Source Serif 4 Variable (optical sizes) for reading. Self-hosted via Fontsource.
- **Tokens** (`@theme` in `src/styles/global.css`), light / dark: `paper` #FAF7F2 / #1A1D21, `ink` #22272E / #E8E4DC, `muted` #5A5F66 / #A8A49C, `accent` (teal) #2C6A63 / #7FC2B8, `rule` #E4DED3 / #33373D, `tint` #EFE9DF / #23272C.
- **Essays:** 19px Source Serif 4, line height 1.65, 36rem column. Essay pages have no motion.
- **Dark mode:** follows `prefers-color-scheme`, CSS only, no toggle.
- **Shared with devjasper.nl:** Figtree and the photo arch. Not shared: blazer blue, 900-weight headings, section bands.

## Build and deploy

- **Host:** Cloudflare Workers with static assets, built by Workers Builds from this GitHub repo. Not Cloudflare Pages. Build settings live in the Cloudflare dashboard; check there before assuming build or deploy commands.
- **Trigger:** every push to `main` builds and deploys.
- **Worker:** `jasperlammers-com`, production branch `main`.
- **Preview:** until cutover the site is only on https://jasperlammers-com.jasper-lammers.workers.dev/. `public/_headers` sends `X-Robots-Tag: noindex` on every path so the preview is not indexed. Remove it only at cutover (migration Phase 7).
- **Domain:** the custom domain `jasperlammers.com` is not attached yet; that is Phase 7. The old WordPress site keeps serving the domain until then.
- No adapter is needed (pure static). Do not add `@astrojs/cloudflare` unless server-side rendering is explicitly requested.
- Redirects and headers go in `public/_redirects` and `public/_headers` (Workers static assets reads both).

## Git workflow

- Commit directly on `main`; no branches or pull requests. Archived states are kept with git tags.
- **Ask before every push.** Every push to `main` deploys.
- Commit only when `npm run build` and `npm run check` pass locally.
- Never commit `dist/`, `.astro/`, `node_modules/`, `_input/` or `.env*` files.
- Small, descriptive commits.
