// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import yaml from '@modyfi/vite-plugin-yaml';

import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import metaConfig from "@public/cms/meta.yml";
const siteMeta = metaConfig;

// https://astro.build/config
export default defineConfig({
  site: siteMeta.baseUrl,
  integrations: [svelte(),sitemap()],

  vite: {
    plugins: [yaml()]
  },

  adapter: vercel()
});