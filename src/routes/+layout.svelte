<script>
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import '../app.scss';
	import { keywords } from '$lib/meta';
	export const prerender = true;
</script>

<svelte:head>
	<meta name="keywords" content={keywords.join(', ')} />
</svelte:head>

<slot />
