# Archive

Design history and, later, old articles for jasperlammers.com. Nothing here is part of the site.

- This folder sits outside `src/`, so Astro never builds or routes it. It is excluded from type checking in `tsconfig.json` and from Tailwind's class scanning (`@source not` in `src/styles/global.css`).
- Never import from it or modify it unless asked.
- `archive/articles/` will hold the old tech articles, kept for provenance and never rendered (see CLAUDE.md).
- Each archived design keeps its files under a `src/` subfolder that mirrors the original paths. To restore one, copy that `src/` tree back into the project root, add it back to `src/components/directions/registry.ts` and `directions.ts`, and reinstall the font packages listed in its README.
- Easier: every round is tagged in git before it was archived. Check out the tag to see all options in their original working state, for example `git checkout design-directions-v1`, then `npm install` and `npm run dev`, and open `/directions/`.

## Contents

| Folder | Tag | What |
| --- | --- | --- |
| `design-directions/` | `design-directions-v1` | Directions B ("Book page") and C ("Margin"). A ("Cousin") was chosen; its design is written down in `docs/design.md`. |
