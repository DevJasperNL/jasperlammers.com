import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export function GET(context: APIContext) {
  return rss({
    title: 'Jasper Lammers: essays',
    description: 'Essays by Jasper Lammers.',
    site: context.site!,
    items: [],
  });
}
