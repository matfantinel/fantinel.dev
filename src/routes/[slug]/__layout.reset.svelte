<script context="module">
	export async function load({ page, fetch }) {
		const slug = page.path.split('/').slice(-1)[0]; // last part of url path
		const url = `/${slug}.json`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					post: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

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

	export let post;
</script>

<svelte:head>
	<meta name="keywords" content="{post.tags.concat(keywords).join(', ')}" />

	<meta name="description" content={post.excerpt} />
	<meta property="og:description" content={post.excerpt} />
	<meta name="twitter:description" content={post.excerpt} />

	<title>{post.title} - {title}</title>
  <meta property="og:title" content="{post.title} - {title}" />
	<meta name="twitter:title" content="{post.title} - {title}" />

	<meta property="og:image" content="{siteBaseUrl}/images/posts/{post.slug}/cover.jpg" />
	<meta name="twitter:image" content="{siteBaseUrl}/images/posts/{post.slug}/cover.jpg" />
</svelte:head>

<div class="blog-layout">
	<Header animated={false} />

	<main>
		<article id="blog-post">
			<div class="header">
				<h1>{post.title}</h1>
				<div class="note">Published on {dateformat(post.date, 'UTC:dd mmmm yyyy')}</div>
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
					description="Have some time? Feel free to read other posts about the same subject."
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

<style lang="scss">
	.blog-layout {
		background-color: var(--post-page-background-color);
		:global(header) {
			background: var(--footer-background);
		}
		:global(footer) {
			--body-background-color: var(--post-page-background-color);
		}
	}

	@import '../../lib/scss/mixins.scss';

	// #region Layout styles
	#blog-post {
		position: relative;
		padding-top: 40px;
		padding-bottom: 80px;
		padding-right: 15px;
		padding-left: 15px;

		@include for-iphone-se {
			padding-left: 0;
			padding-right: 0;
		}

		@include for-tablet-portrait-up {
			padding-right: 20px;
			padding-left: 20px;
		}

		@include for-tablet-landscape-up {
			padding-right: 30px;
			padding-left: 30px;
		}

		display: grid;
		grid-template-columns:
			1fr
			min(65ch, 100%)
			1fr;
		grid-row-gap: 30px;
		> * {
			grid-column: 2;
		}
		.full-bleed {
			width: 100%;
			grid-column: 1 / 4;

			:global(img) {
				object-fit: cover;
			}
		}

		.header {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-align: center;
			gap: 10px;

			.note {
				font-size: 90%;
				color: rgba(var(--text-color-rgb), 0.8);
			}
		}

		.cover-image {
			width: 100%;
			max-height: 400px;
			box-shadow: var(--image-shadow);

			:global(img) {
				object-fit: cover;
			}
		}

		.tags {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 5px;
			flex-wrap: wrap;
		}
	}
	// #endregion

	// #region Element styles

	#blog-post {
		.content {
			:global(p) {
				margin: 0.75rem 0;
				line-height: 1.55em;
			}

			:global(h2) {
				margin: 3rem 0 0.5rem;
			}

			:global(h3) {
				font-size: 1.2rem;
				margin: 2rem 0 0.3rem;
			}

			:global(h4) {
				font-size: 1.3rem;
				margin: 2rem 0 0.3rem;
			}

			:global(img) {
				display: block;
				margin-left: auto;
				margin-right: auto;
				margin-top: 2rem;
				margin-bottom: 2rem;

				max-width: 100%;
				height: auto;
				width: auto;

				box-shadow: var(--image-shadow);
			}

			:global(figcaption) {
				font-size: 0.85rem;
				text-align: center;
				margin-bottom: 2rem;
				color: rgba(var(--text-color-rgb), 0.8);
			}

			:global(blockquote) {
				padding: 25px 25px 15px;
				border-radius: 20px;
				font-size: 1.1rem;
				border-left: 4px solid var(--primary-color);
				background: var(--callout-background-color);
			}

			:global(code:not([class^='language-'])) {
				background: var(--inline-code-background-color);
				padding: 5px 10px;
				border-radius: 5px;
				font-family: var(--mono-font);
			}
		}
	}

	// #endregion
</style>
