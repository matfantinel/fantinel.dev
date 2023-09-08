<script lang="ts">
	import { page } from '$app/stores';
	import LinkIcon from '$lib/icons/link.svelte';
	import { copy } from '@svelte-put/copy';
	import { marked } from 'marked';

	export let text: string;
	export let level: number;
	export let raw: string;

	const slugger = new marked.Slugger();

	const headingLevel = level ?? raw.match(/#/g)?.length;
	const element = `h${headingLevel}`;
	const slug = slugger.slug(text);

	const fullUrl = `${$page.url.origin}${$page.url.pathname}#${slug}`;
</script>

<svelte:element this={element} id={slug}>
	{text}

	<a
		class="heading-link"
		href={`#${slug}`}
		title="Copy link directly to this section"
		use:copy={{ text: fullUrl }}
	>
		<LinkIcon />
	</a>
</svelte:element>
