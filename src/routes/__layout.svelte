<script>
	import '../app.scss';
	import { keywords } from '$lib/meta';
</script>

<svelte:head>
	<meta name="keywords" content={keywords.join(', ')} />
</svelte:head>

<slot />
