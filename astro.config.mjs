// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  redirects: {
    '/learn/how-an-anthropic-trade-actually-gets-done': '/',
  },
  site: 'https://pre-ipo.graciagroup.com',
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/guide/') && !page.includes('/guide/thanks') && !page.includes('/guide/inside-a-pre-ipo-trade'),
    }),
  ],
  markdown: {
    rehypePlugins: [[rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]],
  },
});
