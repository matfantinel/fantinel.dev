import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html as toReactNode } from 'satori-html';
import { read } from '$app/server';

import fixelBold from '$lib/opengraph/fonts/FixelText-Bold.otf';
import fixelBlack from '$lib/opengraph/fonts/FixelText-Black.otf';
const fixelBoldData = read(fixelBold).arrayBuffer();
const fixelBlackData = read(fixelBlack).arrayBuffer();

// This code was written by Geoff Rich and he wrote about it on this blog post:
// https://geoffrich.net/posts/svelte-social-image/

export async function componentToPng(component, props) {
	const result = component.render(props);
	const markup = toReactNode(`${result.html}<style>${result.css.code}</style>`);

	const svg = await satori(markup, {
		fonts: [
			{
				name: 'Fixel',
				data: await fixelBoldData,
				style: 'normal'
			},
			{
				name: 'Fixel Black',
				data: await fixelBlackData,
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
