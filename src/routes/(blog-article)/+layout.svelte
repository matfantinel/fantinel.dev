<script>
	import '../../app.scss';
	import Header from '$lib/components/layout/header.svelte';
	import Footer from '$lib/components/layout/footer.svelte';

	import Image from '$lib/components/base/image.svelte';
	import Tag from '$lib/components/base/tag.svelte';
	import dateformat from 'dateformat';
	import BlogPostCard from '$lib/components/base/blog-post-card.svelte';
	import ThreeByThreeGrid from '$lib/components/layout/3x3-grid.svelte';
	import Section from '$lib/components/layout/section.svelte';
	import { keywords, siteBaseUrl, title } from '$lib/meta';

	export let data;
	$: ({ post } = data);
</script>

<svelte:head>
	<meta name="keywords" content={post.tags.concat(keywords).join(', ')} />

	<meta name="description" content={post.excerpt} />
	<meta property="og:description" content={post.excerpt} />
	<meta name="twitter:description" content={post.excerpt} />

	<title>{post.title} - {title}</title>
	<meta property="og:title" content="{post.title} - {title}" />
	<meta name="twitter:title" content="{post.title} - {title}" />

	<meta property="og:image" content="{siteBaseUrl}/images/posts/{post.slug}/cover.jpg" />
	<meta name="twitter:image" content="{siteBaseUrl}/images/posts/{post.slug}/cover.jpg" />
</svelte:head>

<div class="markdown-layout">
	<Header animated={false} />

	<main>
		<article id="markdown-content">
			<div class="header">
				<h1>{post.title}</h1>
				<div class="note">Published on {dateformat(post.date, 'UTC:dd mmmm yyyy')}</div>
				{#if post.updated}
					<div class="note">Updated on {dateformat(post.updated, 'UTC:dd mmmm yyyy')}</div>
				{/if}
				<div class="note">{post.readingTime}</div>
				<div class="tags">
					{#each post.tags as tag}
						<Tag>{tag}</Tag>
					{/each}
				</div>
			</div>
			<div class="cover-image">
				<Image path="posts/{post.slug}" filename="cover" alt="Cover Image" />
			</div>
			<div class="content">
				<slot />
			</div>
		</article>

		{#if post.relatedPosts && post.relatedPosts.length > 0}
			<div class="related-posts container">
				<Section
					title="Related posts"
					description="Have some time? Feel free to read some other posts by me."
					align="top"
				>
					<ThreeByThreeGrid>
						{#each post.relatedPosts as rel}
							<BlogPostCard post={rel} />
						{/each}
					</ThreeByThreeGrid>
				</Section>
			</div>
		{/if}
	</main>

	<Footer />
</div>
