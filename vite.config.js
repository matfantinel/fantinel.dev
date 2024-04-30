import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			external: ['@resvg/resvg-js']
		}
	},
	resolve: {
		alias: {
			$routes: path.resolve('./src/routes'),
			$cms: path.resolve('./cms')
		}
	}
};

export default config;
