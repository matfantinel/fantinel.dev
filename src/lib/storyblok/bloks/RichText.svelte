<script lang="ts">
	// From https://github.com/storyblok/storyblok-svelte/issues/439
	// Rendering happens at model.ts

	import StoryblokComponent from '$lib/storyblok/bloks/StoryblokComponent.svelte';

	$: segments = content.split('__BLOK__').map((html: string) => {
		if (html.startsWith('!!!')) {
			const parseComponent = JSON.parse(html.replace('!!!', ''));
			return { blok: parseComponent };
		}

		return { html };
	});

	export let content: any;
</script>

{#each segments as segment}
	{#if segment.html}
		{@html segment.html}
	{:else}
		<StoryblokComponent blok={segment.blok} />
	{/if}
{/each}
