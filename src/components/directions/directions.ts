export type DirectionId = 'a' | 'b' | 'c';

export const DIRECTIONS: { id: DirectionId; name: string; summary: string }[] = [
  {
    id: 'a',
    name: 'Cousin',
    summary: 'Figtree and Source Serif 4, teal. Shares devjasper.nl’s heading font and photo arch.',
  },
  {
    id: 'b',
    name: 'Book page',
    summary: 'Newsreader with a drop cap and indented paragraphs, rust. Centred and literary. No shared DNA.',
  },
  {
    id: 'c',
    name: 'Margin',
    summary: 'Public Sans and Literata, moss. A left margin for labels, dates and headings. No shared DNA.',
  },
];

/** Maps a real site URL to its sample inside a direction, so nav links stay inside the samples. */
export function sampleHref(dir: DirectionId, href: string): string {
  if (href === '/') return `/directions/${dir}/`;
  if (href === '/record/') return `/directions/${dir}/record/`;
  if (href === '/essays/') return `/directions/${dir}/essays/existence-part-3/`;
  if (href.startsWith('/essays/')) return `/directions/${dir}${href}`;
  return `/directions/${dir}/`;
}
