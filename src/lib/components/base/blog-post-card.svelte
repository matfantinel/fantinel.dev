<script>
	import Card from '$lib/components/base/card.svelte';
	import Image from '$lib/components/base/image.svelte';
	import Tag from './tag.svelte';

	export let post;
	export let showImage = true;
</script>

{#if post}
	<Card url="/{post.slug}">
		<div slot="image">
			{#if showImage}
				<Image path="posts/{post.slug}" filename="cover" alt="Cover Image" />
			{/if}
		</div>
		<div slot="content">
			<div class="title">{post.title}</div>
			<div class="note">{post.readingTime}</div>
			<div class="text">{post.excerpt}</div>
		</div>
		<div slot="footer">
			{#if post.tags}
				<div class="tags">
					{#each post.tags.slice(0, 2) as tag}
						<Tag>{tag}</Tag>
					{/each}
				</div>
			{/if}
		</div>
	</Card>
{/if}
