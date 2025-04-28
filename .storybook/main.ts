import type { StorybookConfig } from '@storybook/svelte-vite';
import path from 'path';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-svelte-csf",
  ],
  "framework": {
    "name": "@storybook/svelte-vite",
    "options": {}
  },
  "viteFinal": async (config) => {
    const { svelte } = await import('@sveltejs/vite-plugin-svelte');
    const tsconfigPaths = await import('vite-tsconfig-paths').then(m => m.default);
    
    config.plugins = config.plugins || [];
    config.plugins.push(
      svelte({
        exclude: ["node_modules/@storybook/**"],
      }),
      tsconfigPaths({
        projects: ['./tsconfig.json'],
      })
    );


    // Add alias for SCSS @styles
    config.resolve = config.resolve || {};
    const stylesPath = path.resolve(process.cwd(), 'src/styles');
    if (Array.isArray(config.resolve.alias)) {
      config.resolve.alias.push({
        find: '@styles',
        replacement: stylesPath
      });
    } else {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        '@styles': stylesPath
      };
    }

    return config;
  }
};
export default config;