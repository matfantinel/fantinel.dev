import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const extensions = ['.svelte', '.md'];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: ({ path }) => {
				if (path.indexOf('.avif') || path.indexOf('.webp') || path.indexOf('.png')) {
					// Ignore 404 errors for images (as they're likely not optimized yet at build time)
					return;
				}
			}
		}
	},
	preprocess: [vitePreprocess()],
	extensions: extensions
};

export default config;
