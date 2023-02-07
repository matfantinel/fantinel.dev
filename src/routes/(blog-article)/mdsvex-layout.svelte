<script>
	// @ts-nocheck
	import { post } from '$lib/stores/post';

	// This component reads data from MDsveX 
	// (if posts declare to use the 'article' layout)
	// And then passes it to a Svelte store
	// So that the main layout file can read from it
	$post = { ...$$restProps };
</script>

<slot />
