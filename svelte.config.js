import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import rehypeExternalLinks from 'rehype-external-links';

const extensions = ['.svelte', '.md'];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
      preserve: ['module']
    }),
		mdsvex({
			extensions: extensions,
      rehypePlugins: [rehypeExternalLinks]
		})
	],
	extensions: extensions,

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter()
	}
};

export default config;
