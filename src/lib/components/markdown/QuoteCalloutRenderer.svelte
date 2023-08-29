<script lang="ts">
	import Callout from '../molecules/Callout.svelte';

	export let text: string;

	const isCallout = text.trim().startsWith('!!!');
	const calloutType = isCallout ? text.match(/^\w+/)?.[0] || 'info' : undefined;

	let cleanText = text;
	$: {
		if (isCallout) {
			cleanText = cleanText.replace(/^!!!\s?\w+/, '');
		}

		// Remove the line breaks (\n) from beginning and end of the string
		cleanText = cleanText.replace(/^\n|\n$/g, '');

		// Now, replace the remaining line breaks with <br> tags
		cleanText = cleanText.replace(/\n/g, '<br>');
	}
</script>

{#if isCallout}
	<Callout type={calloutType}>{@html cleanText}</Callout>
{:else}
	<blockquote>
		{@html cleanText}
	</blockquote>
{/if}
