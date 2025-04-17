<script lang="ts">
	let {
		size = '100%',
		class: className,
	}: { size?: string; class?: string } = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	class={className}
	fill="none"
	stroke-width="1.5"
	viewBox="0 0 24 24"
	><path
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linecap="round"
		d="M10 12H5a1 1 0 0 1-1-1V7.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V12Zm0 0c0 2.5-1 4-4 5.5M20 12h-5a1 1 0 0 1-1-1V7.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V12Zm0 0c0 2.5-1 4-4 5.5"
	/></svg
>
