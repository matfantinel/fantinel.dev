<script lang="ts">
	let {
		size = '100%',
		class: className,
	}: { size?: string; class?: string } = $props();
</script>
<svg
	height={size}
	width={size}
	class={className}
	stroke-width="2"
	viewBox="0 0 24 24"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Circle background -->
	<path
		d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
		fill="var(--icon-background-color, transparent)"
	/>
	<!-- Circle border -->
	<path
		d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
		stroke="currentColor"
		fill="none"
	/>
	<!-- Info symbol -->
	<path 
		d="M12 11.5V16.5M12 7.51L12.01 7.49889" 
		stroke="currentColor" 
		stroke-linecap="round" 
		stroke-linejoin="round"
		fill="none"
	/>

</svg>
