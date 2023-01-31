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
	}
};

export default config;
