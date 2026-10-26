// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://jasperlammers.com',
  // The redirect map for the old WordPress URLs targets slash-terminated paths.
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap({ filter: (page) => !page.includes('/404') })]
});
