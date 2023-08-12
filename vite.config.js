import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import mkcert from 'vite-plugin-mkcert';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), mkcert()],
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
