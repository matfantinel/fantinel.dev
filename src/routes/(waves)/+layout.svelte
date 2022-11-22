<script>
	import Waves from '$lib/components/layout/waves.svelte';
	import Header from '$lib/components/layout/header.svelte';
	import Footer from '$lib/components/layout/footer.svelte';

	import { description, image, keywords, title } from '$lib/meta';
</script>

<svelte:head>
	<meta name="keywords" content={keywords.join(', ')} />

	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
	<meta name="twitter:description" content={description} />

	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />

	<meta property="og:image" content={image} />
	<meta name="twitter:image" content={image} />
</svelte:head>

<Waves />

<Header />

<main>
	<slot />
</main>

<Footer />
