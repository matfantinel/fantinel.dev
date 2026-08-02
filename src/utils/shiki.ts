import { createHighlighter, type ShikiTransformer } from 'shiki';

// Svelte 5's SSR `{#await}` block does NOT actually await promises during
// server rendering — it only ever renders the pending branch (see
// `await_block` in `svelte/internal/server`). That means an async
// `codeToHtml()` call (previously run inside `onMount`) never resolves
// during SSR, so highlighted code only ever showed up after client hydration.
//
// To get highlighting on both SSR and CSR, we need a *synchronous*
// `codeToHtml`. Shiki's `createHighlighter()` pre-loads the requested themes
// and languages once, after which `highlighter.codeToHtml()` runs
// synchronously. We create this highlighter once, at module load time, using
// a top-level await (supported by Vite/Astro's ESM build), and reuse the
// singleton everywhere.
export const highlighter = await createHighlighter({
	themes: ['catppuccin-macchiato'],
	langs: [
		'javascript',
		'typescript',
		'jsx',
		'tsx',
		'json',
		'bash',
		'css',
		'scss',
		'markdown',
		'svelte',
		'yaml',
		'html',
		'diff',
		'xml'
	]
});

export const noBackgroundTransformer: ShikiTransformer = {
	pre(node) {
		if (typeof node.properties.style === 'string') {
			node.properties.style = node.properties.style
				.replace(/background-color:[^;]+;?/, '')
				.trim();
		}
	},
	code(node) {
		this.addClassToHast(node, 'm-code-block__code');
	}
};
