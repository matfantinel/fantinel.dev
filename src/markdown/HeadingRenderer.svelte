<script lang="ts">
	import MarkdownRenderer from '@components/molecules/MarkdownRenderer';
  import AnchorLinkIndicator from '@components/atoms/AnchorLinkIndicator';
	import GithubSlugger from 'github-slugger'

	let {
		text,
		depth,
		raw
	} : {
		text: string;
		depth?: number;
		raw: string;
	} = $props();

	const slugger = new GithubSlugger();

	const headingLevel = depth ?? raw.match(/#/g)?.length;
	const element = `h${headingLevel}`;
	const slug = slugger.slug(text);

</script>

<svelte:element this={element} id={slug}>
	<MarkdownRenderer content={text} isInline />

	<AnchorLinkIndicator anchor={slug} title="Copy link directly to this section" />
</svelte:element>
