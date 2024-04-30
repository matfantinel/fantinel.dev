import { html as toReactNode } from 'satori-html';
import { read } from '$app/server';
import { ImageResponse } from '@vercel/og';

import fixelBold from '$lib/opengraph/fonts/FixelText-Bold.otf';
import fixelBlack from '$lib/opengraph/fonts/FixelText-Black.otf';
const fixelBoldData = read(fixelBold).arrayBuffer();
const fixelBlackData = read(fixelBlack).arrayBuffer();

// This code was written by Geoff Rich and he wrote about it on this blog post:
// https://geoffrich.net/posts/svelte-social-image/

export async function componentToPng(component, props, height = 630, width = 1200) {
	const result = component.render(props);
	const markup = toReactNode(`${result.html}<style>${result.css.code}</style>`);

	return new ImageResponse(markup, {
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
		height: +height,
		width: +width
	});

	// const svg = await satori(markup, {
	// 	fonts: [
	// 		{
	// 			name: 'Fixel',
	// 			data: await fixelBoldData,
	// 			style: 'normal'
	// 		},
	// 		{
	// 			name: 'Fixel Black',
	// 			data: await fixelBlackData,
	// 			style: 'normal'
	// 		}
	// 	],
	// 	height: +height,
	// 	width: +width
	// });

	// const resvg = new Resvg(svg, {
	// 	fitTo: {
	// 		mode: 'width',
	// 		value: +width
	// 	}
	// });

	// const png = resvg.render();

	// return new Response(png.asPng(), {
	// 	headers: {
	// 		'content-type': 'image/png'
	// 	}
	// });
}
