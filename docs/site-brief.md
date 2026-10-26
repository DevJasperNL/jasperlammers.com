# jasperlammers.com site brief

Status: draft for approval. Date: 2026-10-25. Output of Phase 5 step 2 (Discovery). Goal, audience, sections and content mapping come from `structure.md` (site analysis) and are summarised here, not reopened.

## Purpose and audience

The site shows who Jasper Lammers is: what he wrote and what he built. It sells nothing. Freelance work is sold on devjasper.nl, and this site points there once.

Audience:
- people who are curious, including clients who click through from devjasper.nl;
- essay readers, most of them arriving from search or from the old openminddough.com links;
- recruiters who google the name.

What a visitor should take away: someone who thinks hard about things and builds what he thinks about, with dated evidence for both.

Rules that follow from this:
- No sales copy, apart from the one "Hiring a .NET freelancer? → devjasper.nl" line on the home page.
- No tech blog. Tech articles live on DEV.to and are listed in `/record`.
- A client is never one click from the latest and darkest essay.

## Sections

The URL set is fixed (see `CLAUDE.md`). Nothing is added.

| Page | Purpose | Content |
|---|---|---|
| `/` | Who Jasper is, in a few lines, and the way into the rest | Short who-I-am covering software, philosophy and the off-the-clock side (games, bouldering, board games); the "Hiring?" line near the top; links to essays, record and projects |
| `/essays/` | A curated collection, not a feed | Intro, "Start here" order, colophon, RSS link |
| `/essays/<slug>/` (13) | Long-form reading | Original text, original publication date, provenance line, series prev/next |
| `/record/` | A dated record of things built and written | Generated from `record.yaml` plus the GitHub API (stars, releases); essays as one collection entry |
| `/projects/` | Three highlights | Strategic RPS, V.I.P. graduation project, Retro Black & White Game Pack |

### Essays
- **"Start here" order:** A Map of Existence first. It is the one-piece version of the Existence series and already contains parts 1 to 5, so the series is listed apart, lower down, as the original five-part version (2018), not as the next reading step. Then the other essays in their `order`. The Fate of our Children comes last.
- **The Fate of our Children** opens with a framing intro of one or two sentences (the essay itself is 287 words), for readers who land on it from search.
- **Series navigation** (prev/next) for both series: Existence 1 to 5, and Familiar Existence → Matter over Mind.
- **Provenance line** per essay: "first published <date> on openminddough.com", linking the earliest Wayback capture. The 2018 YouTube and Podbean versions are not shown.
- **Colophon** on `/essays/`: the ideas and arguments are Jasper's, the prose is AI-assisted (structure.md §4).
- **Essay text is not rewritten.** Exceptions: the title "Why the origin of consciousness is will always be a belief" becomes "Why the origin of consciousness will always be a belief" (the slug stays `origin-of-consciousness`), and two factual slips are fixed (see "Decided after review").

### Record
- One data file, `record.yaml`, with every fact sourced. Entry wording is copy (Phase 5 step 3).
- Essays appear as one entry ("Essays, 2018–2025 → /essays"), never one line per essay.
- Career entries are dated and match LinkedIn.

### Projects
Highlight pages written from the source dossiers. Stalled work is described matter-of-factly: what it was, what it achieved, when it stopped. No apology, no release promise. Strategic RPS is a dormant 2016–2019 prototype; the game pack is labelled no longer available.

## Content sources

| Content | Source |
|---|---|
| 13 essays (frontmatter + Markdown, images) | Phase 3 output, `content/jasperlammers.com/essays/` (site analysis); copied into the repo in the build phase |
| Record data | `content/jasperlammers.com/record.yaml` (site analysis) |
| Project highlights | Source dossiers in `_input/projects/` (gitignored, working material only); the V.I.P. thesis PDF and appendices go into the repo |
| Archive articles | `archive/articles/`, kept for provenance, never rendered |
| Freelance summary | devjasper.nl, linked, not repeated |

## Tone of voice

- **Plain and dry, first person.** devjasper.nl's directness without the selling. Short sentences, a little dry humour, no adjectives doing the work.
- **The essays carry the depth.** Copy around them stays short and light and does not imitate their 2018 voice.
- **Home:** a person introducing himself, not a profile. The off-the-clock side belongs here more than on devjasper.nl.
- **Record:** facts and dates; the wording stays out of the way.
- **Projects:** matter-of-fact, including about what stalled.
- Writing rules from `CLAUDE.md` apply: no em dashes, no invented facts (mark `[TODO]`), no AI or marketing phrases.

## Visual direction

**Relation to devjasper.nl: cousins.** Clearly the same person (same restraint, warmth, a photo, possibly one shared font), but with its own accent colour and reading typography, so the site does not read as the business brand. Not siblings (same fonts and blazer blue), not unrelated.

From devjasper.nl, keep:
- a small palette defined as tokens, one accent;
- self-hosted fonts;
- warmth and friendliness over "serious intellectual";
- CSS-only motion inside `prefers-reduced-motion`, no JavaScript for decoration;
- its accessibility rules (visible focus, AA contrast).

Do not carry over:
- 900-weight display headings over long text;
- muted grey sans body text for long reading;
- one-screen sections and a call to action after every section;
- blue on every heading.

Decided:
- **Mood:** warm paper. An off-white or cream background, dark ink text, one muted accent. Book-like and calm.
- **Typography:** a serif for essay body text, a sans for headings and interface. Long-form reading is the priority.
- **Dark mode:** follows the system setting (`prefers-color-scheme`), CSS only, no toggle. Light by default.
- **Photo:** a casual, personal photo, not the 2022 blazer headshot from devjasper.nl. That headshot is the placeholder until Jasper supplies one.
- **Avoid:**
  - a mystical or cosmic look (starfields, galaxies, gradients, "deep thoughts" imagery);
  - a terminal or developer look (monospace, dark hacker styling);
  - motion on essay pages: essays are still;
  - blog furniture: tag clouds, reading-time badges, share buttons, comments, related posts.

### Reference sites
Main reference: devjasper.nl (`C:\git\DevJasperNL\devjasper.nl\docs\design.md` and the live site). Example sites, all opened and verified live on 2026-10-25:

| Site | Page | What to look at |
|---|---|---|
| Craig Mod | https://craigmod.com/essays/software_bonkers/ | Essay page rhythm: serif title with italic subtitle, drop cap, narrow column, quiet navigation |
| Aeon | https://aeon.co/essays/sometimes-you-just-know-somethings-off-but-how | The one-line standfirst under the title, as a model for the framing intro and for `/essays` entries. Ignore the magazine furniture and hero image |
| Maggie Appleton | https://maggieappleton.com/essays | Essays as a curated set rather than a feed; serif essays, sans interface. Ignore the illustrated cards (too much upkeep) |
| Josh W. Comeau | https://www.joshwcomeau.com/about-josh/ | Closest to devjasper.nl's DNA: how a casual photo and humour carry a personal page. Ignore the interactive toys and dark hero |
| Derek Sivers | https://sive.rs/ | "Me in 10 seconds": who-I-am as a few dated lines that link out; warm paper and serif. Also shows how a stance on AI reads in one line |
| Frank Chimero | https://frankchimero.com/blog/ | The shape of a dated one-line list for `/record`: title left, date right, light rules. Ignore the monospace and dark sidebar |

The design directions phase tests these on an essay page first, then home and a slice of `/record`. At least one direction shares devjasper.nl's DNA and one does not.

## Email subscription

- **At launch: RSS only** (`/rss.xml`). The old `/feed/` URLs redirect to it, so existing feed readers move over.
- **After go-live:** Buttondown, starting on the free plan (up to 100 subscribers) with a manual send per new essay, about 5 minutes, a few times a year. The RSS-to-email add-on (+$9/month on Buttondown's pricing page, checked 2026-10-25) is bought only if the list grows or sends get forgotten. This relaxes the "no manual send" requirement from structure.md: at this publishing rate it saves about 15 minutes a year for about $108.
- **Old email subscribers** from the WordPress sites are not imported. They can subscribe again.

## Decided after review (2026-10-26)

- **Photo:** the devjasper.nl headshot is a placeholder until a casual photo replaces it.
- **TNO Automotive role** filled in `record.yaml`; no `[TODO]` left.
- **Dutch Case for Karma** (structure.md §6.2): dropped. Its old URL redirects to the English essay.
- **Personal YouTube link** (§6.3): not shown.
- **Two more fixes inside essays** are allowed, next to the title fix: "Elon Must" becomes "Elon Musk" in The Consequences of a Conscious Deterministic Simulation, and the Velmans quote gets one consistent attribution in Matter over Mind and the origin-of-consciousness essay (checked against its source before changing). The rest of the essay text stays as it is.

- **Old essays on Zenodo** (structure.md §6.1): one deposit for the whole collection, all 13 essays in one PDF with their original publication dates in the metadata, made once after go-live when the texts are final. It records the collection as of 2026; the 2018 to 2020 dates rest on the openminddough.com dates and Wayback captures. New essays each get their own deposit when published (structure.md §4).

## Open questions

1. **Casual photo:** to replace the placeholder, ideally before the design directions phase.
