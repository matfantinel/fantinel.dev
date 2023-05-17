<script lang="ts">
	import '$lib/scss/global.scss';
	import type { Hst } from '@histoire/plugin-svelte';
	import BlogPostCard from './BlogPostCard.svelte';

	export let Hst: Hst;
</script>

<Hst.Story title="Molecules/Blog Post Card" layout={{ type: 'grid', width: 400 }}>
	<div style="padding: 12px;">
		<Hst.Variant title="Default">
			<BlogPostCard
				slug="blog-post"
				title="Blog Post"
				coverImage={{ png: 'https://placedog.net/500' }}
				excerpt="This is a blog post"
				categories={['Category 1']}
				tags={['Tag 1', 'Tag 2']}
				readingTime="5 min read"
			/>
		</Hst.Variant>

		<Hst.Variant title="No Image">
			<BlogPostCard
				slug="blog-post"
				title="Blog Post"
				excerpt="This is a blog post"
				categories={['Category 1']}
				tags={['Tag 1', 'Tag 2']}
				readingTime="5 min read"
			/>
		</Hst.Variant>
	</div>
</Hst.Story>
