import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const essays = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    firstPublished: z.string(),
    lastModified: z.string().optional(),
    originalUrl: z.url(),
    waybackUrl: z.url(),
    firstCaptured: z.string().optional(),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    order: z.number(),
    youtube: z.array(z.url()).optional(),
    podcast: z.array(z.url()).optional(),
    alsoPublished: z.array(z.url()).optional(),
    wpId: z.number().optional(),
  }),
});

// YAML parses full dates as Date, bare years as numbers and year-months as strings.
const recordDate = z.union([z.date(), z.number(), z.string()]);

// Each top-level group of record.yaml (essays, openSource, articles, ...) becomes one entry.
const record = defineCollection({
  loader: file('src/data/record.yaml'),
  schema: z.array(
    z.looseObject({
      title: z.string().optional(),
      name: z.string().optional(),
      org: z.string().optional(),
      href: z.string().optional(),
      repo: z.string().optional(),
      platform: z.string().optional(),
      date: recordDate.optional(),
      start: recordDate.optional(),
      end: recordDate.nullable().optional(),
      include: z.boolean().optional(),
    }),
  ),
});

export const collections = { essays, record };
