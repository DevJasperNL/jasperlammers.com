import { getCollection, type CollectionEntry } from 'astro:content';

export type Essay = CollectionEntry<'essays'>;

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Site-wide date format: "21 July 2018", "June 2011" or "2014", depending on the precision of the source. */
export function formatDate(value: string | number | Date): string {
  if (value instanceof Date) {
    return `${value.getUTCDate()} ${MONTHS[value.getUTCMonth()]} ${value.getUTCFullYear()}`;
  }
  const [year, month, day] = String(value).split('-').map(Number);
  if (day) return `${day} ${MONTHS[month - 1]} ${year}`;
  if (month) return `${MONTHS[month - 1]} ${year}`;
  return String(year);
}

/** Adds a line break opportunity after "...", so "Consciousness...Fundamental" never overflows a phone screen. */
export function breakable(text: string): string {
  return text.replaceAll('...', '...\u200b');
}

/** Splits "Existence (Part 3) - Everything. Infinity." into its title and subtitle, for display only. */
export function splitTitle(title: string): { main: string; subtitle?: string } {
  const [main, subtitle] = title.split(' - ');
  return { main, subtitle };
}

export const SERIES: Record<string, { name: string; oneEssay?: string }> = {
  existence: { name: 'The Existence series (2018)', oneEssay: 'a-map-of-existence' },
  'familiar-existence': { name: 'The Familiar Existence series (2018)' },
};

/** The label of an essay in its series list: its subtitle, or the bare title when it has none (Part 1). */
function seriesLabel(essay: Essay): string {
  if (essay.data.slug === 'matter-over-mind') return 'Matter over Mind';
  const { main, subtitle } = splitTitle(essay.data.title);
  return subtitle ?? main.replace(/\s*\(Part \d\)$/, '');
}

export async function getSeries(essay: Essay) {
  const key = essay.data.series;
  if (!key) return undefined;
  const all = await getCollection('essays');
  const parts = all
    .filter((e) => e.data.series === key)
    .sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0))
    .map((e) => ({ slug: e.data.slug, label: seriesLabel(e), current: e.data.slug === essay.data.slug }));
  const oneEssaySlug = SERIES[key].oneEssay;
  const oneEssay = oneEssaySlug ? all.find((e) => e.data.slug === oneEssaySlug) : undefined;
  return { name: SERIES[key].name, parts, oneEssay: oneEssay && { slug: oneEssay.data.slug, title: oneEssay.data.title } };
}

export type Series = NonNullable<Awaited<ReturnType<typeof getSeries>>>;
