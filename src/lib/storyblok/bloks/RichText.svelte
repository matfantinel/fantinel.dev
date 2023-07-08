<script lang="ts">
	// From https://github.com/storyblok/storyblok-svelte/issues/439
	import { renderRichText } from '@storyblok/svelte';

	import StoryblokComponent from '$lib/storyblok/bloks/StoryblokComponent.svelte';

	$: render = renderRichText(blok.content, {
		resolver: (_, blok) => {
			return `__BLOK__!!!${JSON.stringify(blok)}__BLOK__`;
		}
	});

	$: segments = render.split('__BLOK__').map((html: string) => {
		if (html.startsWith('!!!')) {
			const parseComponent = JSON.parse(html.replace('!!!', ''));
			return { blok: parseComponent };
		}
		return { html };
	});

	export let blok: any;
</script>

{#each segments as segment}
	{#if segment.html}
		{@html segment.html}
	{:else}
		<StoryblokComponent blok={segment.blok} />
	{/if}
{/each}
