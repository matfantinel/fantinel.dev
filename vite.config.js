import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [imagetools(), sveltekit()],
	resolve: {
		alias: {
			$routes: path.resolve('./src/routes')
		}
	},
	// https://github.com/vitejs/vite/issues/5532
	build: {
		modulePreload: {
			resolveDependencies: () => []
		}
	}
};

export default config;
