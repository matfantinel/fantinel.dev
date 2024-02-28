<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import Callout from '../molecules/Callout.svelte';

	export let text: string;

	// Callouts start with a pattern like [!info] or [!success]
	// So, we need to check if the text starts with that pattern
	// And get the type
	const isCallout = /^\[!([a-z]+)\]/i.test(text);
	const calloutType = isCallout ? text.match(/^\[!([a-z]+)\]/i)?.[1] : undefined;

	let cleanText = text;
	$: {
		if (isCallout) {
			cleanText = cleanText.replace(/^\[!\w+\]\s?/, '');
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
