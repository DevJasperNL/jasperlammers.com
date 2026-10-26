# jasperlammers.com site copy

Status: approved at the copy gate, 2026-10-26 (Phase 5 step 3, Copy). Chosen section by section.

## Decisions

- **Provenance line:** "first published <date> on openminddough.com", linking the earliest Wayback capture. The 2018 YouTube and Podbean versions are not mentioned (site brief).
- **"Start here" order:** A Map of Existence first, then the other essays by `order`. The Existence series is listed apart, lower down, as the original five-part version (site brief; overrides the `order` values 2 to 6).
- **No AI disclosure:** all 13 essays are Jasper's own prose; The Fate of our Children (2025) only had spell-check help. The colophon has no AI line (overrides structure.md §4 for the existing essays). Future essays: ask per essay.
- **Location:** not mentioned on the site.
- **Strategic RPS:** started 2014, picked up again in 2018, dormant since 2019. `record.yaml` and the brief were corrected from 2016.
- **Project videos:** individual YouTube videos on the project pages may be linked (check during the build that they are still public). The personal channel itself is not linked.
- **V.I.P. page:** mentions the cum laude degree and offers the thesis PDF and the ZIP with the (Dutch) appendices. The grades are not mentioned.
- **Record career lines:** checked against LinkedIn by Jasper (2026-10-26).
- **Footer links:** GitHub, LinkedIn, DEV.to, plus "© Jasper Lammers". No email address, no RSS link in the footer (RSS lives on `/essays`).

### Essay text fixes (applied when the essays are copied in, build phase)

Typo fixes only; no rewrites. Grammar and the mix of British and American spelling stay as they are.

| Essay | From | To |
|---|---|---|
| origin-of-consciousness (title) | Why the origin of consciousness is will always be a belief | Why the origin of consciousness will always be a belief (slug unchanged) |
| conscious-deterministic-simulation | Elon Must | Elon Musk |
| matter-over-mind, origin-of-consciousness | Velmans quote credited to Max Velmans in one, Susan Schneider in the other | One consistent attribution, checked against the source first |
| a-map-of-existence, existence-part-1 | move though | move through |
| a-map-of-existence, existence-part-1 | many have past my mind | many have passed my mind |
| a-map-of-existence, existence-part-1 | used too | used to |
| a-map-of-existence, existence-part-1 | spacial (2×) | spatial |
| a-map-of-existence, existence-part-5 | without any bases in existence | without any basis in existence |
| the-white-room | encountered for | accounted for |
| familiar-existence | a nights sleep | a night's sleep |
| familiar-existence | fall of a cliff | fall off a cliff |
| familiar-existence | I think, therefor I am | I think, therefore I am |
| matter-over-mind | physical world. our experience | physical world. Our experience |
| matter-over-mind | more a believe | more a belief |
| matter-over-mind | Or could would our accumulation | Or could our accumulation |
| conscious-deterministic-simulation | the simulation hypotheses, recently popularized | the simulation hypothesis, recently popularized |
| conscious-deterministic-simulation | one assumption at the time | one assumption at a time |
| conscious-deterministic-simulation | followed be a short conclusion | followed by a short conclusion |
| conscious-deterministic-simulation | arguable a very large USB stick | arguably a very large USB stick |
| conscious-deterministic-simulation | proceed at exactly the same way | proceed in exactly the same way |
| conscious-deterministic-simulation | can be ran in reverse | can be run in reverse |
| conscious-deterministic-simulation | might not be effected | might not be affected |
| conscious-deterministic-simulation (fn 14) | besides the point | beside the point |
| conscious-deterministic-simulation (fn 15) | as much a single value | as much as a single value |
| the-case-for-karma | all there is too karma | all there is to karma |
| the-case-for-karma | if it were. | as it were. |
| the-case-for-karma | if the explore this idea | if we explore this idea |
| the-case-for-karma | will not go into that this article | will not go into that in this article |
| the-case-for-karma | trail of thought | train of thought |

Not fixed: "the next series we marvel" in existence-part-5 stays as written.

Also removed: the bare YouTube URL on the last line of a-map-of-existence and of matter-over-mind (leftovers of old video embeds; the YouTube versions are not shown).

## Home (`/`)

> Hi, I'm Jasper.
>
> I build software for a living, freelance since 2022. I've been making games since primary school. At some point I started wondering why anything exists at all, and I wrote it down.
>
> Hiring a .NET freelancer? → devjasper.nl
>
> Off the clock I go bouldering. If you challenge me to a board game, I won't say no.
>
> Essays · Record · Projects

Sources: freelance via DevJasper since 2022 (DAF, `record.yaml`); ".NET" is left to the Hiring line; games since primary school, bouldering, board games (devjasper.nl `site.ts`).

## Essays index (`/essays/`)

> Essays
>
> Between 2018 and 2020 I wrote down the questions I kept coming back to: why anything exists, what consciousness is, and whether you are still you a year from now. In 2025 I wrote one more. If you read one, read A Map of Existence.

**Start here** (title, year of first publication, a one-question standfirst)

1. **A Map of Existence** (2018). Why is there something rather than nothing?
2. **The White Room** (2018). If a perfect copy of you appeared, which one would be you?
3. **Familiar Existence** (2018). What is the world we take for granted?
4. **Matter over Mind** (2018). Is consciousness a fundamental force, or a chocolate cake?
5. **The Consequences of a Conscious Deterministic Simulation** (2019). If a program could be conscious, what does that say about you?
6. **Why the origin of consciousness will always be a belief** (2020). How do you know anyone else is conscious?
7. **The Case for Karma** (2020). Are you still you ten years from now?
8. **The Fate of our Children** (2025). What would existence be like for the machines that surpass us?

**The Existence series (2018)**

> The original five-part version of A Map of Existence.

Part 1 · Part 2 · Part 3 · Part 4 · Part 5 (each links its essay; full titles on hover/in the link text)

> New essays: RSS

### Colophon (on `/essays/`, below the list)

> **About these essays**
>
> They were first published on openminddough.com between 2018 and 2025. Each essay links to its earliest capture in the Wayback Machine. The texts are as published, apart from fixed typos and one corrected quote attribution.

## Essay page: provenance line

Directly under the title, in place of a separate date line. "openminddough.com" links to the essay's `waybackUrl` (its earliest Wayback capture).

> First published {firstPublished as "21 July 2018"} on [openminddough.com]({waybackUrl})

Date format, site-wide: day month year, month written out ("21 July 2018"). Where the source only has a month or a year: "June 2011", "2014".

## The Fate of our Children: framing intro

Shown above the essay, visually set apart from it (a standfirst, not part of the text).

> A short piece from 2025, written five years after the other essays. It imagines the machines we are building to surpass us, and asks what existence would be like for them.

## Essay page: series navigation

Below the essay, the whole series as a list. Every part links to its essay except the current one, which is marked. Nothing extra at the top: the essay titles already say "Part n".

> **The Existence series (2018)**
> 1. Existence
> 2. Nothing is not a thing
> 3. Everything. Infinity. ← you are here
> 4. The Fathomable
> 5. Island Shore
>
> Also available as one essay: A Map of Existence.

> **The Familiar Existence series (2018)**
> 1. Familiar Existence
> 2. Matter over Mind

List labels are the essay subtitles (Part 1 has none, so it reads "Existence"; Matter over Mind drops its subtitle). The "Also available as one essay" line appears only under the Existence series.

## Record (`/record/`)

> Record
>
> What I built or wrote that left a trace, since 2009. Newest first, with dates, so you don't have to take my word for it.

Grouped by type, newest first within each group. One short sentence per entry. Articles only get their platform (and a note where there is one), because the title already says what they are about. Stars and merged-PR counts come from the GitHub API at build time; the numbers below are from 2026-10-26.

### Writing

| Entry | Date | Sentence |
|---|---|---|
| Essays → /essays | 2018–2025 | Thirteen essays on existence, consciousness and identity, on their own page. |
| I Retired My Hue Bridge. Here's How I Rebuilt Everything It Did (and More) in C# | 19 October 2026 | On DEV.to. |
| Occurify: Fluent Time Modeling for .NET Developers | 5 April 2025 | On DEV.to. |
| Supercharging Home Assistant Automations: Initial States and Boolean Logic for NetDaemon Rx | 28 January 2025 | On DEV.to. |
| Flexible Tado Schedules using Home Assistant and Node-RED | 19 May 2022 | On CodeProject (archived copy). |
| How .NET's Math.Round has Nothing to do with Maths. And That's OK! | 23 December 2018 | On CodeProject, where it reached number 3 in the top articles. |
| The false sense of security in the ING Bankieren (Banking) App | 18 June 2018 | On LinkedIn. |
| Continued code execution after (throwing) an Exception | 21 December 2017 | On CodeProject (archived copy). |
| Retaining (and altering) key functions when using Console.ReadKey() | 5 June 2017 | On CodeProject (archived copy). |
| Multithreaded UI in Windows Console Applications | 3 May 2017 | On CodeProject (archived copy). |
| Using Autocomplete in Windows Console Applications | 16 April 2017 | On CodeProject (archived copy). |

"archived copy" links the first Wayback capture (CodeProject is a parked domain now).

### Open source

| Entry | Date | Sentence |
|---|---|---|
| DependencyInjection.Composite | 2026 | An extension for Microsoft's dependency injection that adds composite service providers and contextual scopes. |
| CodeCasa.Showcase | 2025 | An example smart home in C#, built on NetDaemon and CodeCasa. ★ 35 |
| Occurify | 2025 | A .NET library for defining, filtering and scheduling timelines of instants and periods. ★ 79 |
| NetDaemon | 2025 | I contribute to NetDaemon, the .NET app daemon for Home Assistant: 14 merged pull requests so far. |
| CodeCasa | 2025 | My .NET libraries for smart home automation, Home Assistant and NetDaemon. ★ 12 |
| Reactive.Boolean | 2025 | Reactive extensions made specifically for IObservable<bool>. |

Stars are shown only when there are any. Sentences are based on each repo's GitHub description.

### Projects

| Entry | Date | Sentence |
|---|---|---|
| Strategic RPS → /projects/strategic-rps | 2014–2019 | A multiplayer space strategy game in Java, built from scratch. A playable prototype, dormant since 2019. |
| Retro Black & White Game Pack → /projects/retro-bw-game-pack | 2011–2012 | Three retro mini-games for Windows Phone 7 and Android. No longer available. |
| V.I.P. (Video Internet Pipeline) → /projects/vip-graduation | June 2011 | My graduation project at Memoria Media: a framework that spreads video processing over multiple computers. |

### Work

| Entry | Date | Sentence |
|---|---|---|
| New Media Systems → devjasper.nl | 2024–now | Freelance software architect, product owner and developer, through DevJasper. |
| DAF → devjasper.nl | 2022–2024 | Freelance software developer, through DevJasper. |
| Vanderlande → devjasper.nl | 2015–2022 | Started as a C# developer on ADAPTO, ended as tech lead on STOREPICK. |
| Hightech ICT | 2011–2015 | Software developer, seconded to SPS BV (2011–2013) and SeaChange International (2013–2015). |
| Memoria Media | 2009–2011 | Built software for their camera system, and came back for my graduation internship. |
| TNO Automotive | 2009–2010 | Intern on PreScan. |

Elidan & Plantema stays out (`include: false`).

### Education

| Entry | Date | Sentence |
|---|---|---|
| Fontys | June 2011 | Bachelor's degree in computing and engineering, cum laude. |

## Projects index (`/projects/`)

> Projects
>
> Three things I built, and what became of them.

1. **Strategic RPS** (2014–2019). A multiplayer space strategy game in Java, built from scratch. A dormant prototype.
2. **V.I.P. (Video Internet Pipeline)** (2011). My graduation project: a framework that spreads video processing over multiple computers.
3. **Retro Black & White Game Pack** (2011–2012). Three retro mini-games for Windows Phone 7 and Android. No longer available.

## Strategic RPS (`/projects/strategic-rps/`)

> Strategic RPS
> A dormant prototype, 2014 to 2019.
>
> In 2014 I started a space strategy game based on rock paper scissors. I wanted to build it from almost nothing: Java, which I didn't use at work, and my own networking, physics and collision detection.
>
> You send ships through a portal, one at a time. Rock beats scissors, scissors beat paper, paper beats rock. Enemy ships stay blue until you fire on them, so you find out what you're up against the hard way. Meteors can be occupied and turned into a slow, heavy fourth unit.
>
> In 2018 I dug it up again. The code held up better than I expected, so I kept going and released 13 versions in ten months, starting 7 June 2018. Three colleagues play-tested it in November 2018. In February 2019 I ran 10,000 ships in formation to see if it would hold. It did.
>
> Version 0.13 came out on 4 April 2019. It's a working prototype, and that's where it stands.

**Under the hood**

| | |
|---|---|
| Language | Java, with Slick2D and Guava |
| Networking | My own client/server protocol: TCP for the lobby, UDP in the game. Every client runs the same deterministic simulation from the same commands. |
| Simulation | My own fixed-point math and physics |
| Collision detection | My own quadtree |

**Media** (captions)

- Screenshots from a multiplayer test session, November 2018 (picture1–5).
- Video: version 0.13 gameplay, April 2019 (youtu.be/9Q2tKguidNY).
- Video: 10,000 ships in formation, February 2019 (youtu.be/Cz1bwrgLFDs).

No download link and no plans: the brief rules out a release promise.

## V.I.P. graduation project (`/projects/vip-graduation/`)

> V.I.P. (Video Internet Pipeline)
> Graduation project at Memoria Media, February to June 2011.
>
> Memoria Media filmed funerals with a camera system they had built themselves, edited the footage on the spot and streamed it over the internet. After five years they wanted to replace the hardware with software. A first software prototype from 2010 wasn't stable enough, and it used a video library (Medialooks) they wanted to swap for a cheaper one.
>
> My graduation assignment was to find out how to do it properly, then design and build it. I was project leader, architect and developer.
>
> The research pointed to spreading the work over several computers that share their processing power. That became V.I.P.: a framework that forms a cloud from the computers you give it, and distributes the steps of a processing pipeline over them, based on what each step does and what each machine can handle. It used DirectShow instead of the paid library, and a plug-in design so it could be extended.
>
> The research turned out bigger and more important than planned, so the implementation wasn't finished within the graduation period. What did work: a pipeline running across multiple computers, controlled over a network or the internet. I handed the project over to Memoria Media to finish.
>
> I graduated in June 2011, cum laude.

**Thesis**

- Thesis (PDF)
- Thesis with appendices (ZIP; the appendices are in Dutch)
- The record in the HBO Kennisbank

**Videos**

- The graduation presentation
- Demonstration on one computer
- Demonstration across multiple computers
- Fault tolerance demonstration

## Retro Black & White Game Pack (`/projects/retro-bw-game-pack/`)

> Retro Black & White Game Pack
> Windows Phone 7 and Android, 2011 to 2012. No longer available.
>
> I wrote it to try out XNA, Microsoft's game framework, and to get something into the Windows Phone marketplace. It's three simple games in one app: Bouncy, a pong-like game against your phone or a friend; Snaily, based on snake; and Plankmen, based on the old seesaw game.
>
> It went live on 1 September 2011 for $1, under my publisher name JaLaCom. A free trial followed in November.
>
> I was working with Java for another project at the time and wanted to learn Android, so I ported it. That meant writing a small game engine to replace XNA and supporting every screen resolution. The Android version came out on 27 February 2012.
>
> Neither version is available anymore. The trailer is still on YouTube.

**Media**: icon, feature graphic, trailer video (youtube.com/watch?v=KAh23zU9O4g).

## 404

> Page not found
>
> This page doesn't exist, or it moved when the site was rebuilt. Try the [essays](/essays/), the [record](/record/) or the [projects](/projects/). Or start at the [home page](/).

## Navigation, footer and link texts

- **Nav:** "Jasper Lammers" (links home) · Essays · Record · Projects. The current page is marked.
- **Skip link:** "Skip to content"
- **Footer:** © Jasper Lammers · GitHub · LinkedIn · DEV.to
- **Home links:** Essays · Record · Projects. Hiring line links "devjasper.nl".
- **Essay page:** provenance link "openminddough.com"; back link "← All essays"; series list as in "Series navigation".
- **Project page:** back link "← All projects".
- **`/essays/`:** RSS link "RSS" (in "New essays: RSS").
- **`/record/`:** entry titles link to their target; CodeProject articles add "archived copy" (Wayback).

## Page titles and meta descriptions

Pattern: "Page | Jasper Lammers"; home is just the name. `og:title` and `og:description` reuse these. Essay titles appear as published (with the title fix), except Matter over Mind, which drops its subtitle in the `<title>` to stay readable in search results.

| Page | Title | Meta description |
|---|---|---|
| `/` | Jasper Lammers | Jasper Lammers builds software for a living and writes essays about existence and consciousness. Essays, projects and a dated record of work. |
| `/essays/` | Essays \| Jasper Lammers | Thirteen essays by Jasper Lammers on existence, consciousness and identity, written between 2018 and 2025. Start with A Map of Existence. |
| `/record/` | Record \| Jasper Lammers | A dated record of what Jasper Lammers built and wrote since 2009: open source, articles, projects and work. |
| `/projects/` | Projects \| Jasper Lammers | Three projects by Jasper Lammers: Strategic RPS, the V.I.P. graduation project and the Retro Black & White Game Pack. |
| `/projects/strategic-rps/` | Strategic RPS \| Jasper Lammers | Strategic RPS, a multiplayer space strategy game built from scratch in Java by Jasper Lammers. A dormant prototype, 2014 to 2019. |
| `/projects/vip-graduation/` | V.I.P. (Video Internet Pipeline) \| Jasper Lammers | V.I.P., Jasper Lammers' graduation project at Memoria Media in 2011: a framework that spreads video processing over multiple computers. Thesis included. |
| `/projects/retro-bw-game-pack/` | Retro Black & White Game Pack \| Jasper Lammers | Three retro mini-games for Windows Phone 7 and Android, made by Jasper Lammers in 2011 and 2012. No longer available. |
| `/essays/a-map-of-existence/` | A Map of Existence \| Jasper Lammers | Why is there something rather than nothing? An essay by Jasper Lammers on nothing, everything and the limits of what we can fathom. 2018. |
| `/essays/existence-part-1/` | Existence (Part 1) \| Jasper Lammers | Part 1 of the Existence series by Jasper Lammers (2018): why the search for what existence is has to start beyond our own frame of reference. |
| `/essays/existence-part-2/` | Existence (Part 2) - Nothing is not a thing \| Jasper Lammers | Part 2 of the Existence series by Jasper Lammers (2018): why nothing, taken literally, is not a thing. |
| `/essays/existence-part-3/` | Existence (Part 3) - Everything. Infinity. \| Jasper Lammers | Part 3 of the Existence series by Jasper Lammers (2018): if nothing is not a thing, existence is everything. Infinite. |
| `/essays/existence-part-4/` | Existence (Part 4) - The Fathomable \| Jasper Lammers | Part 4 of the Existence series by Jasper Lammers (2018): the mind as a sense, and the limits of the fathomable. |
| `/essays/existence-part-5/` | Existence (Part 5) - Island Shore \| Jasper Lammers | Part 5 of the Existence series by Jasper Lammers (2018): islands of the fathomable in a sea of the unfathomable. |
| `/essays/the-white-room/` | The White Room \| Jasper Lammers | A perfect copy of you appears across a white room. Which one is you? A short thought experiment by Jasper Lammers, 2018. |
| `/essays/familiar-existence/` | Familiar Existence \| Jasper Lammers | The physical world feels most real, yet the mind is the one thing we know exists. An essay by Jasper Lammers, 2018. |
| `/essays/matter-over-mind/` | Matter over Mind \| Jasper Lammers | If consciousness comes from matter, is it a fundamental force or a chocolate cake? An essay by Jasper Lammers, 2018. |
| `/essays/conscious-deterministic-simulation/` | The Consequences of a Conscious Deterministic Simulation \| Jasper Lammers | If a deterministic computer program could be conscious, what follows for free will, time and identity? An essay by Jasper Lammers, 2019. |
| `/essays/origin-of-consciousness/` | Why the origin of consciousness will always be a belief \| Jasper Lammers | Every consciousness except your own, right now, is a belief. A short essay by Jasper Lammers, 2020. |
| `/essays/the-case-for-karma/` | The Case for Karma \| Jasper Lammers | A case for karma without a cosmic ledger, built on what "you" means over time. An essay by Jasper Lammers, 2020. |
| `/essays/the-fate-of-our-children/` | The Fate of our Children \| Jasper Lammers | A short piece by Jasper Lammers from 2025. It imagines the machines we are building to surpass us, and asks what existence would be like for them. |
| 404 | Page not found \| Jasper Lammers | (none; not indexed) |
