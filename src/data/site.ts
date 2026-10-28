// Copy as approved in docs/site-copy.md. Do not edit wording here without updating that file.

export const siteName = 'Jasper Lammers';

export const home = {
  title: 'Jasper Lammers',
  description:
    'Jasper Lammers builds software for a living and writes essays about existence and consciousness. Essays and a dated record of work.',
  greeting: "Hi, I'm Jasper.",
  intro:
    "I build software for a living, freelance since 2022. I've been making games since primary school. At some point I started wondering why anything exists at all, and I wrote it down.",
  hiring: { text: 'Hiring a .NET freelancer?', linkText: 'devjasper.nl', href: 'https://devjasper.nl/' },
  offClock: "Off the clock I go bouldering. If you challenge me to a board game, I won't say no.",
  photoAlt: 'Jasper Lammers, smiling, leaning back on an outdoor lounger in a blue shirt',
};

export const nav = [
  { label: 'Essays', href: '/essays/' },
  { label: 'Record', href: '/record/' },
];

export const footerLinks = [
  { label: 'GitHub', href: 'https://github.com/DevJasperNL' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jasper-lammers/' },
  { label: 'DEV.to', href: 'https://dev.to/devjaspernl' },
];

export const essaysPage = {
  title: 'Essays | Jasper Lammers',
  description:
    'Thirteen essays by Jasper Lammers on existence, consciousness and identity, written between 2018 and 2025. Start with A Map of Existence.',
  heading: 'Essays',
  intro:
    'Between 2018 and 2020 I wrote down the questions I kept coming back to: why anything exists, what consciousness is, and whether you are still you a year from now. In 2025 I wrote one more. If you read one, read A Map of Existence.',
  startHere: 'Start here',
  seriesHeading: 'The Existence series (2018)',
  seriesIntro: 'The original five-part version of A Map of Existence.',
  colophonHeading: 'About these essays',
  colophon:
    'They were first published on openminddough.com between 2018 and 2025. Each essay links to its earliest capture in the Wayback Machine. The texts are as published, apart from fixed typos and one corrected quote attribution.',
};

/** "Start here" order on /essays/, with the one-question standfirst per essay. */
export const startHere: { slug: string; standfirst: string }[] = [
  { slug: 'a-map-of-existence', standfirst: 'Why is there something rather than nothing?' },
  { slug: 'the-white-room', standfirst: 'If a perfect copy of you appeared, which one would be you?' },
  { slug: 'familiar-existence', standfirst: 'What is the world we take for granted?' },
  { slug: 'matter-over-mind', standfirst: 'Is consciousness a fundamental force, or a chocolate cake?' },
  { slug: 'conscious-deterministic-simulation', standfirst: 'If a program could be conscious, what does that say about you?' },
  { slug: 'origin-of-consciousness', standfirst: 'How do you know anyone else is conscious?' },
  { slug: 'the-case-for-karma', standfirst: 'Are you still you ten years from now?' },
  { slug: 'the-fate-of-our-children', standfirst: 'What would existence be like for the machines that surpass us?' },
];

/** Framing intros shown above an essay, set apart from its text. */
export const essayIntros: Record<string, string> = {
  'the-fate-of-our-children':
    'A short piece from 2025, written five years after the other essays. It imagines the machines we are building to surpass us, and asks what existence would be like for them.',
};

/** Per essay: the <title> (when it differs from the essay title) and the meta description. */
export const essayMeta: Record<string, { title?: string; description: string }> = {
  'a-map-of-existence': {
    description:
      'Why is there something rather than nothing? An essay by Jasper Lammers on nothing, everything and the limits of what we can fathom. 2018.',
  },
  'existence-part-1': {
    description:
      'Part 1 of the Existence series by Jasper Lammers (2018): why the search for what existence is has to start beyond our own frame of reference.',
  },
  'existence-part-2': {
    description: 'Part 2 of the Existence series by Jasper Lammers (2018): why nothing, taken literally, is not a thing.',
  },
  'existence-part-3': {
    description:
      'Part 3 of the Existence series by Jasper Lammers (2018): if nothing is not a thing, existence is everything. Infinite.',
  },
  'existence-part-4': {
    description: 'Part 4 of the Existence series by Jasper Lammers (2018): the mind as a sense, and the limits of the fathomable.',
  },
  'existence-part-5': {
    description:
      'Part 5 of the Existence series by Jasper Lammers (2018): islands of the fathomable in a sea of the unfathomable.',
  },
  'the-white-room': {
    description:
      'A perfect copy of you appears across a white room. Which one is you? A short thought experiment by Jasper Lammers, 2018.',
  },
  'familiar-existence': {
    description:
      'The physical world feels most real, yet the mind is the one thing we know exists. An essay by Jasper Lammers, 2018.',
  },
  'matter-over-mind': {
    title: 'Matter over Mind',
    description:
      'If consciousness comes from matter, is it a fundamental force or a chocolate cake? An essay by Jasper Lammers, 2018.',
  },
  'conscious-deterministic-simulation': {
    description:
      'If a deterministic computer program could be conscious, what follows for free will, time and identity? An essay by Jasper Lammers, 2019.',
  },
  'origin-of-consciousness': {
    description: 'Every consciousness except your own, right now, is a belief. A short essay by Jasper Lammers, 2020.',
  },
  'the-case-for-karma': {
    description:
      'A case for karma without a cosmic ledger, built on what "you" means over time. An essay by Jasper Lammers, 2020.',
  },
  'the-fate-of-our-children': {
    description:
      'A short piece by Jasper Lammers from 2025. It imagines the machines we are building to surpass us, and asks what existence would be like for them.',
  },
};

export const recordPage = {
  title: 'Record | Jasper Lammers',
  description:
    'A dated record of what Jasper Lammers built and wrote since 2004: open source, articles, projects and work.',
  heading: 'Record',
  intro:
    "What I built or wrote that left a trace, since 2004. Newest first, with dates, so you don't have to take my word for it.",
};

/**
 * Entry wording for /record, keyed by the entry's title, name or org in record.yaml.
 * Articles get their sentence from the platform; see src/lib/record.ts.
 */
export const recordCopy: Record<string, { title?: string; sentence: string }> = {
  Essays: { sentence: 'Thirteen essays on existence, consciousness and identity, on their own page.' },
  'DependencyInjection.Composite': {
    sentence:
      "An extension for Microsoft's dependency injection that adds composite service providers and contextual scopes.",
  },
  'CodeCasa.Showcase': { sentence: 'An example smart home in C#, built on NetDaemon and CodeCasa.' },
  Occurify: { sentence: 'A .NET library for defining, filtering and scheduling timelines of instants and periods.' },
  'NetDaemon contributions': {
    title: 'NetDaemon',
    sentence: 'I contribute to NetDaemon, the .NET app daemon for Home Assistant: {count} merged pull requests so far.',
  },
  CodeCasa: { sentence: 'My .NET libraries for smart home automation, Home Assistant and NetDaemon.' },
  'Reactive.Boolean': { sentence: 'Reactive extensions made specifically for IObservable<bool>.' },
  'Strategic RPS': {
    sentence: 'A multiplayer space strategy game in Java, built from scratch. A playable prototype, dormant since 2019.',
  },
  'Retro Black & White Game Pack': {
    sentence: 'Three retro mini-games for Windows Phone 7 and Android. No longer available.',
  },
  'Budget Toko and Filament Webshop': {
    sentence:
      'Two webshops I built and ran with a partner, one for gadgets and one for 3D printer filament. They made a profit, but not enough for the hours, so we stopped.',
  },
  'Media Mixer Featherlight': {
    sentence:
      'A free program to decode, mix, transform, encode and stream video. I built it as the first product of Video Mixing Company.',
  },
  'GameMaker games': {
    sentence:
      'Games I made in GameMaker between 14 and 18, which is how I learned to program. In 2015 I recovered a few and made a compilation video.',
  },
  'V.I.P. (Video Internet Pipeline), graduation project': {
    title: 'V.I.P. (Video Internet Pipeline)',
    sentence: 'My graduation project at Memoria Media: a framework that spreads video processing over multiple computers.',
  },
  'New Media Systems': { sentence: 'Freelance software architect, product owner and developer, through DevJasper.' },
  DAF: { sentence: 'Freelance software developer, through DevJasper.' },
  Vanderlande: { sentence: 'Started as a C# developer on ADAPTO, ended as tech lead on STOREPICK.' },
  'Hightech ICT': {
    sentence: 'Software developer, seconded to SPS BV (2011–2013) and SeaChange International (2013–2015).',
  },
  'Memoria Media': { sentence: 'Built software for their camera system, and came back for my graduation internship.' },
  'TNO Automotive': { sentence: 'Intern on PreScan.' },
  'Bachelor degree computing and engineering (cum laude)': {
    title: 'Fontys',
    sentence: "Bachelor's degree in computing and engineering, cum laude.",
  },
};

/** Article sentences that differ from the default "On <platform>." / "On CodeProject (archived copy)." */
export const articleSentences: Record<string, string> = {
  "How .NET's Math.Round has Nothing to do with Maths. And That's OK!":
    'On CodeProject, where it reached number 2 in the top articles.',
};

export const notFound = {
  title: 'Page not found | Jasper Lammers',
  heading: 'Page not found',
};
