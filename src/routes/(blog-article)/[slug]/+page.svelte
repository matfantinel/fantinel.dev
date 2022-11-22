<script>
	export let data;
	$: ({ page } = data);
</script>

<svelte:component this={page} />
