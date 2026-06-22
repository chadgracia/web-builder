import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guideSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const companies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/companies' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    blurb: z.string().optional(),
    sector: z.string().optional(),
    logo: z.string().optional(),
  }),
});

const learn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/learn' }),
  schema: guideSchema,
});

export const collections = { companies, learn };
