import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';
import path from 'path';
import mkcert from 'vite-plugin-mkcert';
// import prismjs from 'vite-plugin-prismjs';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		imagetools(),
		sveltekit(),
		mkcert(),
		[
			'prismjs',
			{
				languages: ['javascript', 'typescript']
			}
		]
	],
	resolve: {
		alias: {
			$routes: path.resolve('./src/routes')
		}
	},
	optimizeDeps: {
		include: ['@storyblok/svelte']
	},
	server: { https: true }
};

export default config;
