<script>
	// @ts-nocheck

	// This component exists to wrap the Layout
	// Because MDsveX does not support TypeScript in layout files.
	// This component just serves to pass the props to the layout without throwing
	// any errors.
	import Layout from './blog-article-layout.svelte';
</script>

<Layout data={{ post: { ...$$restProps } }}>
	<slot />
</Layout>
