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

		html = handleMarkHighlights(html);
		html = handleSparklesHighlights(html);
		return { html };
	});

	export let blok: any;

	function handleMarkHighlights(html: string): string {
		// Storyblok does not support <mark> tags, using instead <span> with background-color
		// Here we replace those with the <mark> tag for better accessibility and ease of styling
		const spanRegex = /<span style="background-color:[^"]*">(.*?)<\/span>/g;
		return html.replace(spanRegex, '<mark>$1</mark>');
	}

	function handleSparklesHighlights(html: string): string {
		const highlightedTextRegex = /\/\/\/(.*?)\/\/\//g;
		return html.replace(
			highlightedTextRegex,
			'<span class="sparkles-wrapper highlight"><strong class="sparkles-content">$1</strong></span>'
		);
	}
</script>

{#each segments as segment}
	{#if segment.html}
		{@html segment.html}
	{:else}
		<StoryblokComponent blok={segment.blok} />
	{/if}
{/each}
