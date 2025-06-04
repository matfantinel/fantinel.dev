import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html as toReactNode } from 'satori-html';
import { experimental_AstroContainer } from "astro/container";
import { getContainerRenderer as svelteContainerRenderer } from "@astrojs/svelte";
import { loadRenderers } from 'astro:container';

import { readFileSync } from 'fs';
import { resolve } from 'path';

const rootDir = process.cwd();
const monaspaceKryptonPath = resolve(
  rootDir,
  'public/og/monaspace-krypton-latin-600-normal.woff'
);

const monaSansPath = resolve(
  rootDir,
  'public/og/MonaSans-ExtraBold.otf'
);

const monaspaceKryptonBuffer = readFileSync(monaspaceKryptonPath);
const monaSansBuffer = readFileSync(monaSansPath);

export async function componentToPng(component: any, props: any) {
	const renderers = await loadRenderers([svelteContainerRenderer()]);
	const container = await experimental_AstroContainer.create({
		renderers
	});
	const result = await container.renderToString(component, { props });
	const markup = toReactNode(result);

	const svg = await satori(markup, {
		fonts: [
			{
				name: 'Monaspace Krypton',
				data: monaspaceKryptonBuffer,
				style: 'normal'
			},
			{
				name: 'Mona Sans',
				data: monaSansBuffer,
				style: 'normal'
			}
		],
		width: 1200,
		height: 630
	});

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: 1200
		}
	});

	const png = resvg.render();

	return new Response(png.asPng(), {
		headers: {
			'content-type': 'image/png'
		}
	});
}