// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import yaml from '@modyfi/vite-plugin-yaml';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  vite: {
    plugins: [yaml()]
  }
});