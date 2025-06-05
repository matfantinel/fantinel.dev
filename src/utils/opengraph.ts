import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html as toReactNode } from 'satori-html';
import { experimental_AstroContainer } from "astro/container";
import svelteRenderer from "@astrojs/svelte/server.js";

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
	const container = await experimental_AstroContainer.create();
	container.addServerRenderer({ renderer: svelteRenderer, name: "svelte" });
	const result = await container.renderToString(component, { props });
	const html = unescapeHtml(result);
	const markup = toReactNode(html);

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

// https://github.com/natemoo-re/satori-html/issues/20
function unescapeHtml(html: string) {
	return html
			.replace(/&amp;/g, '&')
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&quot;/g, '"')
			.replace(/&#39;/g, "'");
}