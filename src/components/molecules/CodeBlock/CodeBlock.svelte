<script lang="ts">
	import Prism from 'prismjs';
	import 'prismjs/components/prism-json';
	import 'prismjs/components/prism-bash';
	import 'prismjs/components/prism-css';
	import 'prismjs/components/prism-typescript';
	import 'prismjs/components/prism-git';
	import 'prismjs/components/prism-javascript';
	import 'prismjs/components/prism-jsx';
	import 'prismjs/components/prism-markdown';
	import 'prismjs/components/prism-powershell';
	import 'prismjs/components/prism-scss';
	import 'prism-svelte';
  import type { Snippet } from 'svelte';
	Prism.manual = true;
	const prism = Prism as any;

	let {
		filename,
		lang,
		code,
		class: className,
		children
	} : {
		filename?: string;
		lang?: string;
		code?: string;
		class?: string;
		children?: Snippet;
	} = $props();
</script>

<div class={['m-code-block', className]}>
	{#if filename}
		<div class="m-code-block__filename">{filename}</div>
	{/if}
	{#if lang}
		<div class="m-code-block__lang">{lang}</div>
	{/if}
	{#if code}
		{#if lang}
			<pre class={`language-${lang}`}>{@html Prism.highlight(
					code,
					prism.languages[lang],
					lang
				)}</pre>
		{:else}
			<pre>{code}</pre>
		{/if}
	{:else}
		{@render children?.()}
	{/if}
</div>

<style lang="scss">
	.m-code-block {
		display: block;
		position: relative;
		background-color: var(--theme--color-code-background);
		color: var(--theme--color-code-text);
		font-family: var(--font--mono);
		font-size: 1rem;
		line-height: 1.33em;
		border-radius: 8px;
		box-shadow: var(--theme--shadow-card);

		padding: var(--spacing-lg) var(--spacing-sm) var(--spacing-md);
		margin: var(--spacing-lg) 0;

		:global(pre) {
			font-family: var(--font--mono);
			overflow-x: auto;
			scrollbar-color: var(--theme--color-accent) rgba(var(--theme--color-accent-rgb), 0.5);
			scrollbar-width: thin;
			padding-bottom: var(--spacing-xxs);

			-moz-tab-size: 2;
			-o-tab-size: 2;
			tab-size: 2;

			&::-webkit-scrollbar {
				height: 8px;
			}
			&::-webkit-scrollbar-thumb {
				background: var(--theme--color-accent);
				&:hover {
					background: var(--theme--color-accent-tint);
				}
			}
		}

		.m-code-block__lang {
			position: absolute;
			right: 0;
			top: -15px;
			background: inherit;
			border-radius: var(--border-radius--small);
			padding: var(--spacing-xxs) var(--spacing-xs);
			z-index: 2;
			font-size: 0.85em;
		}

		.m-code-block__filename {
			background: inherit;
			border-top-left-radius: var(--border-radius--small);
			border-top-right-radius: var(--border-radius--small);
			margin-bottom: -2px;
			padding: var(--spacing-xxs) var(--spacing-xs);
			position: absolute;
			left: 0px;
			top: -15px;
			z-index: 1;
		}
	}
</style>