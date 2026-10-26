import { getEntry } from 'astro:content';
import { articleSentences, recordCopy } from '../data/site';
import { formatDate } from './essays';
import { getGitHubNumbers } from './github';

type RecordDate = string | number | Date;

export interface RecordItem {
  title: string;
  href?: string;
  date: string;
  sentence: string;
  /** A trailing link inside the sentence, e.g. "archived copy" for CodeProject articles. */
  sentenceLink?: { text: string; href: string; after: string };
  stars?: number;
}

export interface RecordGroup {
  heading: string;
  items: RecordItem[];
}

function year(value: RecordDate): number {
  return value instanceof Date ? value.getUTCFullYear() : Number(String(value).slice(0, 4));
}

function sortKey(value: RecordDate | null | undefined): string {
  if (value === null) return '9999';
  if (value === undefined) return '';
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value);
}

function range(start: RecordDate, end: RecordDate | null | undefined): string {
  if (end === null) return `${year(start)}–now`;
  if (end === undefined || year(end) === year(start)) return String(year(start));
  return `${year(start)}–${year(end)}`;
}

/** Internal links get the trailing slash the redirect map expects. */
function link(href: string | undefined): string | undefined {
  if (!href?.startsWith('/')) return href;
  return href.endsWith('/') ? href : `${href}/`;
}

async function group(id: string) {
  const entry = await getEntry('record', id);
  if (!entry) throw new Error(`record.yaml has no "${id}" group`);
  return entry.data.filter((item) => item.include !== false);
}

/** The copy for an entry. A missing sentence or an open [TODO] fails the build instead of being rendered. */
function copyFor(key: string): { title: string; sentence: string } {
  const copy = recordCopy[key];
  if (!copy) throw new Error(`No /record copy for "${key}" in src/data/site.ts`);
  if (copy.sentence.includes('[TODO')) throw new Error(`Open [TODO] in the /record copy for "${key}"`);
  return { title: copy.title ?? key, sentence: copy.sentence };
}

function byDateDesc<T>(items: T[], date: (item: T) => RecordDate | null | undefined): T[] {
  return [...items].sort((a, b) => sortKey(date(b)).localeCompare(sortKey(date(a))));
}

export async function getRecord(): Promise<RecordGroup[]> {
  const [essays, articles, openSource, projects, career, education] = await Promise.all(
    ['essays', 'articles', 'openSource', 'projects', 'career', 'education'].map(group),
  );
  const github = await getGitHubNumbers(openSource.flatMap((o) => (o.repo ? [o.repo] : [])));

  const writing: RecordItem[] = [
    ...essays.map((e) => ({ ...copyFor(e.title!), href: link(e.href), date: range(e.start!, e.end) })),
    ...byDateDesc(articles, (a) => a.date).map((a): RecordItem => {
      const wayback = typeof a.wayback === 'string' ? a.wayback : undefined;
      const item = { title: a.title!, href: a.href ?? wayback, date: formatDate(a.date!) };
      const sentence = articleSentences[a.title!];
      if (sentence) return { ...item, sentence };
      if (wayback) {
        return { ...item, sentence: `On ${a.platform} (`, sentenceLink: { text: 'archived copy', href: wayback, after: ').' } };
      }
      return { ...item, sentence: `On ${a.platform}.` };
    }),
  ];

  const code: RecordItem[] = byDateDesc(openSource, (o) => o.start).map((o) => {
    const { title, sentence } = copyFor(o.name!);
    const stars = o.repo ? github.stars[o.repo] : undefined;
    return {
      title,
      href: o.href ?? `https://github.com/${o.repo}`,
      date: String(year(o.start!)),
      sentence: sentence.replace('{count}', String(github.netDaemonMergedPrs)),
      stars: stars ? stars : undefined,
    };
  });

  const projectItems: RecordItem[] = byDateDesc(projects, (p) => p.end ?? p.date).map((p) => ({
    ...copyFor(p.name!),
    href: link(p.href),
    date: p.date ? formatDate(p.date) : range(p.start!, p.end),
  }));

  // Newest first by end date, so a role that is still running comes first.
  const work: RecordItem[] = byDateDesc(career, (c) => c.end).map((c) => ({
    ...copyFor(c.org!),
    href: c.href,
    date: range(c.start!, c.end),
  }));

  const schooling: RecordItem[] = education.map((e) => ({ ...copyFor(e.title!), date: formatDate(e.end!) }));

  return [
    { heading: 'Writing', items: writing },
    { heading: 'Open source', items: code },
    { heading: 'Projects', items: projectItems },
    { heading: 'Work', items: work },
    { heading: 'Education', items: schooling },
  ];
}
