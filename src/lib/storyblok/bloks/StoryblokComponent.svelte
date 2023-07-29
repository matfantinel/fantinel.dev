<script lang="ts">
	// From https://github.com/storyblok/storyblok-svelte/issues/439
	import RichText from '$lib/storyblok/bloks/RichText.svelte';
	import CodeBlock from '$lib/storyblok/bloks/CodeBlock.svelte';

	export let blok: any;

	const components: any = {
		richText: RichText,
		codeBlock: CodeBlock
	};
</script>

<svelte:component this={components[blok.component]} {blok} />
