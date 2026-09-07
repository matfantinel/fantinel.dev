import { createHighlighterCore, type ShikiTransformer } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

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
// Languages and themes are imported explicitly through `shiki/core` rather
// than the full `shiki` bundle, whose dynamic-import map would otherwise make
// Vite emit one chunk per grammar (~360 files, some >500kB). The JavaScript
// RegExp engine also avoids emitting the ~600kB Oniguruma WASM chunk.
export const highlighter = await createHighlighterCore({
	themes: [
		import('@shikijs/themes/catppuccin-macchiato')
	],
	langs: [
		import('@shikijs/langs/javascript'),
		import('@shikijs/langs/typescript'),
		import('@shikijs/langs/jsx'),
		import('@shikijs/langs/tsx'),
		import('@shikijs/langs/json'),
		import('@shikijs/langs/bash'),
		import('@shikijs/langs/css'),
		import('@shikijs/langs/scss'),
		import('@shikijs/langs/markdown'),
		import('@shikijs/langs/svelte'),
		import('@shikijs/langs/yaml'),
		import('@shikijs/langs/html'),
		import('@shikijs/langs/diff'),
		import('@shikijs/langs/xml')
	],
	engine: createJavaScriptRegexEngine()
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
