<script>
	import Waves from '$lib/components/layout/waves.svelte';
	import Header from '$lib/components/layout/header.svelte';
	import Footer from '$lib/components/layout/footer.svelte';
</script>

<Waves />

<Header />

<main>
	<slot />
</main>

<Footer />