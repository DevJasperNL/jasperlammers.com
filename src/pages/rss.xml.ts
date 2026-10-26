import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { essayMeta } from '../data/site';

export async function GET(context: APIContext) {
  const essays = (await getCollection('essays')).sort((a, b) =>
    b.data.firstPublished.localeCompare(a.data.firstPublished),
  );
  return rss({
    title: 'Jasper Lammers: essays',
    description: 'Essays by Jasper Lammers on existence, consciousness and identity.',
    site: context.site!,
    items: essays.map((essay) => ({
      title: essay.data.title,
      link: `/essays/${essay.data.slug}/`,
      pubDate: new Date(essay.data.firstPublished),
      description: essayMeta[essay.data.slug]?.description,
    })),
    customData: '<language>en</language>',
  });
}
