// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import yaml from '@modyfi/vite-plugin-yaml';

import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: "https://fantinel.dev",
  integrations: [svelte(),sitemap()],

  vite: {
    plugins: [yaml()]
  },

  adapter: vercel()
});