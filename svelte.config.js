// import adapter from '@sveltejs/adapter-static';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

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
