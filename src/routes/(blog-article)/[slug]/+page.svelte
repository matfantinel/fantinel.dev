<script lang="ts">
	export let data: { page: any };
	$: ({ page } = data);
</script>

<svelte:component this={page} />
