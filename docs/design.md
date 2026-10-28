# jasperlammers.com design

Status: final. Date: 2026-10-26. Chosen design: direction A ("Cousin"), as built on `/directions/a/` (route removed in the build phase). Exploration history: `archive/README.md`, tag `design-directions-v1`.

In one line: warm paper and a teal accent, Figtree for headings and interface, Source Serif 4 for reading; a cousin of devjasper.nl that shares its heading font and photo arch but not its blue or its heavy headings over long text.

## Fonts
Self-hosted via Fontsource.

| Role | Font | Package | Weights used |
| --- | --- | --- | --- |
| Headings and interface (`font-display`, `font-ui`) | Figtree Variable | `@fontsource-variable/figtree` | 600, 700, 800 |
| Reading (`font-reading`): essays, intros, record sentences | Source Serif 4 Variable, optical sizes | `@fontsource-variable/source-serif-4` (`opsz.css`, `opsz-italic.css`) | 400, italic 400 |

- Figtree is devjasper.nl's heading font: the one shared font that makes the sites cousins. Source Serif 4 is the serif sibling of devjasper.nl's Source Sans 3.
- No weight 900 and no third font. No monospace.

## Colour tokens
Defined in `@theme` in `src/styles/global.css`. Dark mode follows the system setting (`prefers-color-scheme`), CSS only, no toggle; light is the default.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `paper` | `#FAF7F2` | `#1A1D21` | Page background |
| `ink` | `#22272E` | `#E8E4DC` | Text, headings |
| `muted` | `#5A5F66` | `#A8A49C` | Secondary text, nav, provenance line, footer |
| `accent` | `#2C6A63` | `#7FC2B8` | Teal: links, pill outlines, current-page underline, record dates, focus ring |
| `rule` | `#E4DED3` | `#33373D` | Hairlines (footer, footnotes) |
| `tint` | `#EFE9DF` | `#23272C` | Quote cards, series card, hiring line, record rows, photo arch |

Contrast (WCAG), light on paper / on tint: ink 14.1 / 12.4, muted 6.0 / 5.3, accent 5.9 / 5.2; paper on accent 5.9. Dark on paper / on tint: ink 13.3 / 11.8, muted 6.8 / 6.0, accent 8.3 / 7.4; paper on accent 8.3. All pass AA for body text.

## Type scale
Mobile / from `md` (768px) up.

**Interface and pages (Figtree unless noted)**

| Element | Size | Weight | Style |
| --- | --- | --- | --- |
| Home greeting (h1) | 3rem / 3.75rem (`text-5xl` / `md:text-6xl`) | 800 | ink, tight tracking |
| Page title (Record, Essays) | 3rem | 800 | ink, tight tracking |
| Section heading (h2) | 1.5rem | 700 | ink |
| Intro text | 1.25rem / 1.375rem | 400, Source Serif 4 | ink, `leading-relaxed` |
| Secondary text | 1.125rem | 400, Source Serif 4 | muted, `leading-relaxed` |
| Header name | 1.125rem | 700 | ink, tight tracking |
| Nav, labels, small links | 0.875rem to 0.95rem | 600 | muted; current page ink with accent underline |
| Footer | 0.875rem | 400 | muted |

**Essay page**

| Element | Size | Weight | Style |
| --- | --- | --- | --- |
| Title (h1) | 2.25rem / 3rem | 700, Figtree | ink, `leading-[1.1]`, tight tracking; shown exactly as published |
| Provenance line | 0.95rem | 400, Figtree | muted; "openminddough.com" in accent, 600 |
| Body | 1.1875rem (19px), line height 1.65 | 400, Source Serif 4 | ink, optical sizing on |
| Headings in the essay (h2 / h3) | 1.5rem / 1.25rem | 700 / 600, Figtree | ink |
| Block quote | 1.0625rem | 400, Source Serif 4 | in a tint card |
| Footnote references | 0.75em | 700, Figtree | accent, no underline |
| Footnotes | 0.9375rem, line height 1.55 | 400, Source Serif 4 | muted, below a hairline |

## Measure and spacing
- Essay column: `max-w-[36rem]`, about 65 characters per line at 19px. Never wider.
- Site column (header, home, footer): `max-w-5xl` (64rem). Record: `max-w-3xl`.
- Side gutters: `px-5` (1.25rem) on phones, `px-12` (3rem) from `md`.
- Essay rhythm: 1.25em between paragraphs and blocks; 2.25em above an essay heading; 3.5rem above the footnotes.
- Home: the text column and the photo sit side by side from `md` (1.35fr and 1fr), stacked on phones with the photo below.
- Footer: `mt-24`, then a hairline. No full-width bands, no alternating section backgrounds, no one-screen sections.

## Layout principles
- One quiet header on every page: name on the left, Essays · Record on the right. Not sticky.
- Pages are plain columns, not sections with calls to action. The only selling line is the hiring line on the home page.
- Essay page order: "← All essays", title, provenance line, framing intro where there is one (The Fate of our Children), text, footnotes, series card.
- Series navigation is a card below the essay that lists the whole series and marks the current part ("← you are here"). Nothing at the top of the page.

## Components
- **Links in text:** accent, 1px underline with a 3px offset; long URLs may break (`overflow-wrap: anywhere`).
- **Pill links** (home: Essays, Record): `rounded-full`, 2px accent border, accent text, Figtree 700; filled with accent and paper text on hover.
- **Hiring line:** a tint pill (`rounded-full`, or `rounded-2xl` on phones where it wraps) with "Hiring a .NET freelancer?" and an accent "→ devjasper.nl" link.
- **Quote card:** tint background, `rounded-[1.25rem]`, padding 1.25rem 1.5rem.
- **Series card:** tint background, `rounded-[1.75rem]`; Figtree heading, a numbered list; links in accent, the current part in ink 600.
- **Record row:** tint at 60% (`bg-tint/60`), `rounded-2xl`; title (Figtree 600) on the left, date (Figtree 600, accent, tabular numbers) on the right, the sentence below in Source Serif 4, muted. Star counts as "★ 79" in ink, never wrapped.
- **Focus:** every interactive element shows a 2px accent outline with a 3px offset (`:focus-visible`).
- **Skip link:** "Skip to content", visible on focus as an accent pill.

## Imagery
- The photo sits in an arch (`rounded-t-full`, 4:5 crop) with a tint arch offset behind it (1rem, 1.25rem from `md`), as on devjasper.nl. Optimised through `<Picture>` (avif, webp), loaded eagerly.
- The photo is a casual one (garden, blue shirt), cropped to the upper body (crop B, chosen 2026-10-26). `src/assets/jasper.jpg` is stored pre-cropped at 4:5, 1400 × 1750.
- Essay images: centred, `rounded` 1rem, on a white background in both modes, because the diagrams are drawn on white. Alt texts were added in the build phase. The film still in Conscious Deterministic Simulation carries a source credit below it (`.credit`).
- OG image (`public/og.png`, 1200 × 630): the name in Figtree 800, "jasperlammers.com" in accent, and the photo arch, on paper. Favicon: a "J" stroke in paper on an accent rounded square (SVG, ICO, apple-touch icon).
- No stock photos, no icons, no cosmic or "deep thoughts" imagery.

## Motion
- Home page only: the greeting, intro, hiring line, links and photo rise in one after another (0.7s, 90ms apart).
- Essay pages are still. No motion on `/record` or the project pages either.
- Everything sits inside `@media (prefers-reduced-motion: no-preference)`. CSS only, no JavaScript.

## Do
- Use the tokens; add a token before adding a one-off value.
- Keep the accent for links, outlines and small marks. Headings stay ink.
- Keep long text in Source Serif 4 at 19px in a 36rem column.
- Keep the copy exactly as approved in `docs/site-copy.md`.

## Don't
- No blazer blue, no 900-weight headings, no grey sans body text for long reading (the devjasper.nl traits the brief rules out).
- No section bands, alternating backgrounds or a call to action after every section.
- No motion on essay pages; no blog furniture (tags, reading time, share buttons, comments, related posts).
- No mystical or cosmic look, no terminal or monospace look.
- No em dashes in site copy (essays are left as published).
- No UI framework and no client-side JavaScript for decoration.
