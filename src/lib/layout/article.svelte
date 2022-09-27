<script>
	import Header from '$lib/components/layout/header.svelte';
	import Footer from '$lib/components/layout/footer.svelte';
	import Image from '$lib/components/base/image.svelte';
	import { siteBaseUrl } from '$lib/meta';

	export let data;
	let { title, image, excerpt } = data;
</script>

<svelte:head>
	{#if title}
		<title>{title}</title>
		<meta property="og:title" content={title} />
		<meta name="twitter:title" content={title} />
	{/if}

	{#if excerpt}
		<meta name="description" content={excerpt} />
		<meta property="og:description" content={excerpt} />
		<meta name="twitter:description" content={excerpt} />
	{/if}

	{#if image}
		<meta property="og:image" content="{siteBaseUrl}/images/{image.path}/{image.filename}.png" />
		<meta name="twitter:image" content="{siteBaseUrl}/images/{image.path}/{image.filename}.png" />
	{/if}
</svelte:head>

<div class="markdown-layout">
	<Header animated={false} />

	<main>
		<article id="markdown-content">
			{#if title}
				<div class="header">
					<h1>{title}</h1>
				</div>
			{/if}

			{#if image}
				<div class="cover-image">
					<Image path={image.path} filename={image.filename} alt="Cover Image" />
				</div>
			{/if}

			<div class="content">
				<slot />
			</div>
		</article>
	</main>

	<Footer />
</div>
