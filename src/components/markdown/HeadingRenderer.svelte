<script lang="ts">
	import { marked } from 'marked';
	import MarkdownRenderer from '@components/molecules/MarkdownRenderer.svelte';
  import AnchorLinkIndicator from '@components/atoms/AnchorLinkIndicator.svelte';

	let {
		text,
		depth,
		raw
	} : {
		text: string;
		depth?: number;
		raw: string;
	} = $props();

	const slugger = new marked.Slugger();

	const headingLevel = depth ?? raw.match(/#/g)?.length;
	const element = `h${headingLevel}`;
	const slug = slugger.slug(text);

</script>

<svelte:element this={element} id={slug}>
	<MarkdownRenderer content={text} isInline />

	<AnchorLinkIndicator anchor={slug} title="Copy link directly to this section" />
</svelte:element>
