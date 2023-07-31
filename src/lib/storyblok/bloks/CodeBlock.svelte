<script lang="ts">
	import CodeBlock from '$lib/components/molecules/CodeBlock.svelte';
	import { storyblokEditable } from '@storyblok/svelte';

	export let blok: any;
</script>

<span use:storyblokEditable={blok}>
	<CodeBlock filename={blok.filename} lang={blok.language} code={blok.text} />
</span>
