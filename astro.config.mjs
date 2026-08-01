// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import yaml from '@modyfi/vite-plugin-yaml';

import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import sitemapNoindexFilter from './integrations/sitemap-noindex-filter.mjs';

// https://astro.build/config
export default defineConfig({
  site: "https://fantinel.dev",
  integrations: [svelte(), sitemap(), sitemapNoindexFilter()],
  devToolbar: { enabled: false },

  vite: {
    plugins: [yaml()],
    // Vite 8 / Astro 7 now use Lightning CSS for CSS minification by default.
    // Some generated CSS causes Lightning CSS to throw "Unexpected token Delim('.')".
    // Revert to esbuild until the underlying CSS is fixed.
    build: {
      cssMinify: 'esbuild'
    }
  },

  adapter: vercel()
});
