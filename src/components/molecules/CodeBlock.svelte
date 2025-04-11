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
		children
	} : {
		filename?: string;
		lang: string;
		code?: string;
		fullBleed?: boolean;
		children?: Snippet;
	} = $props();
</script>

<div class="code-block">
	{#if filename}
		<div class="filename">{filename}</div>
	{/if}
	{#if lang}
		<div class="lang">{lang}</div>
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
