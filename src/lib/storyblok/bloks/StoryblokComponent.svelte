<script lang="ts">
	// From https://github.com/storyblok/storyblok-svelte/issues/439
	import RichText from '$lib/storyblok/bloks/RichText.svelte';
	import MarkerHighlight from '$lib/storyblok/bloks/MarkerHighlight.svelte';

	export let blok: any;

	const components: any = {
		richText: RichText,
		markerHighlight: MarkerHighlight
	};
</script>

<svelte:component this={components[blok.component]} {blok} />
