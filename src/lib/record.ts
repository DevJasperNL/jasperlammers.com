import { getEntry } from 'astro:content';
import { formatDate } from './essays';

type RecordDate = string | number | Date;

export interface RecordItem {
  title: string;
  href?: string;
  date: string;
  sentence: string;
  stars?: number;
}

export interface RecordGroup {
  heading: string;
  items: RecordItem[];
}

// Temporary for the design directions: the entry sentences from docs/site-copy.md and the
// star counts of 2026-10-26. The real /record gets its own data file and the GitHub API.
const SENTENCES: Record<string, string> = {
  Essays: 'Thirteen essays on existence, consciousness and identity, on their own page.',
  'DependencyInjection.Composite':
    "An extension for Microsoft's dependency injection that adds composite service providers and contextual scopes.",
  'CodeCasa.Showcase': 'An example smart home in C#, built on NetDaemon and CodeCasa.',
  Occurify: 'A .NET library for defining, filtering and scheduling timelines of instants and periods.',
  'NetDaemon contributions':
    'I contribute to NetDaemon, the .NET app daemon for Home Assistant: 14 merged pull requests so far.',
  CodeCasa: 'My .NET libraries for smart home automation, Home Assistant and NetDaemon.',
  'Reactive.Boolean': 'Reactive extensions made specifically for IObservable<bool>.',
  'New Media Systems': 'Freelance software architect, product owner and developer, through DevJasper.',
  DAF: 'Freelance software developer, through DevJasper.',
  Vanderlande: 'Started as a C# developer on ADAPTO, ended as tech lead on STOREPICK.',
  'Hightech ICT':
    'Software developer, seconded to SPS BV (2011–2013) and SeaChange International (2013–2015).',
  'TNO Automotive': 'Intern on PreScan.',
  'Memoria Media': 'Built software for their camera system, and came back for my graduation internship.',
};
const STARS: Record<string, number> = { 'CodeCasa.Showcase': 35, Occurify: 79, CodeCasa: 12 };

function year(value: RecordDate): number {
  return value instanceof Date ? value.getUTCFullYear() : Number(String(value).slice(0, 4));
}

function sortKey(value: RecordDate | null | undefined): string {
  if (value == null) return '';
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value);
}

function endKey(value: RecordDate | null | undefined): string {
  return value === null ? '9999' : sortKey(value);
}

function range(start: RecordDate, end: RecordDate | null | undefined): string {
  if (end === null) return `${year(start)}–now`;
  if (end === undefined || year(end) === year(start)) return String(year(start));
  return `${year(start)}–${year(end)}`;
}

/** A slice of /record for the design directions: writing, open source and work. */
export async function getRecordSample(): Promise<RecordGroup[]> {
  const [essays, articles, openSource, career] = await Promise.all(
    ['essays', 'articles', 'openSource', 'career'].map(async (id) => (await getEntry('record', id))!.data),
  );

  const writing: RecordItem[] = [
    ...essays.map((e) => ({
      title: e.title!,
      href: e.href!.endsWith('/') ? e.href : `${e.href}/`,
      date: range(e.start!, e.end),
      sentence: SENTENCES[e.title!],
    })),
    ...articles.slice(0, 3).map((a) => ({
      title: a.title!,
      href: a.href,
      date: formatDate(a.date!),
      sentence: `On ${a.platform}.`,
    })),
  ];

  const code: RecordItem[] = [...openSource]
    .sort((a, b) => sortKey(b.start).localeCompare(sortKey(a.start)))
    .map((o) => ({
      title: o.name === 'NetDaemon contributions' ? 'NetDaemon' : o.name!,
      href: o.href ?? `https://github.com/${o.repo}`,
      date: String(year(o.start!)),
      sentence: SENTENCES[o.name!],
      stars: STARS[o.name!],
    }));

  // Newest first by end date, so a role that is still running comes first.
  const work: RecordItem[] = career
    .filter((c) => c.include !== false)
    .sort((a, b) => endKey(b.end).localeCompare(endKey(a.end)))
    .map((c) => ({ title: c.org!, href: c.href, date: range(c.start!, c.end), sentence: SENTENCES[c.org!] }));

  return [
    { heading: 'Writing', items: writing },
    { heading: 'Open source', items: code },
    { heading: 'Work', items: work },
  ];
}
