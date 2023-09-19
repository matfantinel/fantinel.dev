<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import Callout from '../molecules/Callout.svelte';

	export let text: string;

	const isCallout = text.trim().startsWith('!!!');
	const calloutType = isCallout ? text.match(/!!!\s*(.*?)\n/)?.[1] || 'info' : undefined;

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
	<Callout type={calloutType}>
		<SvelteMarkdown source={cleanText} />
	</Callout>
{:else}
	<blockquote>
		<SvelteMarkdown source={cleanText} />
	</blockquote>
{/if}
