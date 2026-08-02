import Prism from 'prismjs';

// `prismjs` only attaches itself to `global` in Node (see prism-core.js), never
// to `window` in the browser. All prismjs language components (and third-party
// grammars like `prism-svelte`) are plain scripts that assume a global `Prism`
// variable already exists.
//
// In dev this "just works" because Vite pre-bundles deps with esbuild in a way
// that happens to leak `Prism` into scope for sibling modules. In the
// production Rollup build, chunks are isolated (especially for code-split
// hydrated islands), so that global never gets set and importing any language
// component throws `ReferenceError: Prism is not defined`.
//
// Importing this module first (before any `prismjs/components/*` or
// `prism-svelte` imports) guarantees `window.Prism` is set before those
// side-effect imports run, since ES module evaluation fully evaluates each
// import in source order before moving to the next.
if (typeof window !== 'undefined') {
	(window as unknown as { Prism: typeof Prism }).Prism = Prism;
}

export default Prism;
