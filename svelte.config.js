import { vitePreprocess } from '@astrojs/svelte';

export default {
  preprocess: vitePreprocess(),
	compilerOptions: {
    warningFilter: (warning) => {
			return warning.code !== 'css_unused_selector'
		}
  }
};
