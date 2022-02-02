import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

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
      rehypePlugins: [
				rehypeExternalLinks, // Adds 'target' and 'rel' to external links
				rehypeSlug, // Adds 'id' attributes to Headings (h1,h2,etc)
				[rehypeAutolinkHeadings, { // Adds hyperlinks to the headings, requires rehypeSlug
					behavior: 'append',
					content: {
						type: 'element',
						tagName: 'span',
						properties: {className:['heading-link']},
						children: [{type: 'text', value: '#'}]
					}
				}]
			]
		})
	],
	extensions: extensions,

	kit: {
		// hydrate the <div id="svelte-root"> element in src/app.html
		target: '#svelte-root',
		adapter: adapter()
	}
};

export default config;
