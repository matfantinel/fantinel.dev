<script lang="ts">
	import MarkdownRenderer from '@components/molecules/MarkdownRenderer';
  import AnchorLinkIndicator from '@components/atoms/AnchorLinkIndicator';
	import GithubSlugger from 'github-slugger'

	let {
		text,
		depth,
		raw,
		addAnchorToHeadings = true
	} : {
		text: string;
		depth?: number;
		raw: string;
		addAnchorToHeadings?: boolean;
	} = $props();

	const slugger = new GithubSlugger();

	const headingLevel = depth ?? raw.match(/#/g)?.length;
	const element = `h${headingLevel}`;
	const slug = slugger.slug(text);

	// Parse custom class from parentheses containing only #s, e.g., ## (####) -> h4
	const customClassMatch = raw.match(/^#+\s*\((#+)\)/);
	const customClass = customClassMatch ? `u-h${customClassMatch[1].length}` : undefined;

	// Strip the class marker from text if present
	const cleanText = customClassMatch
		? text.replace(new RegExp(`^\\s*\\(${customClassMatch[1]}\\)\\s*`), '')
		: text;

</script>

<svelte:element this={element} id={slug} class={customClass}>
	<MarkdownRenderer content={cleanText} isInline />

	{#if addAnchorToHeadings}
		<AnchorLinkIndicator anchor={slug} title="Copy link directly to this section" />
	{/if}
</svelte:element>
