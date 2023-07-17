<script lang="ts">
	import MarkerHighlight from '$lib/components/molecules/MarkerHighlight.svelte';
	import { storyblokEditable } from '@storyblok/svelte';

	export let blok: any;
</script>

<span use:storyblokEditable={blok}>
	<MarkerHighlight color={blok.color}>{blok.text}</MarkerHighlight>
</span>
