<script lang="ts">
	let {
		size = '100%',
		class: className,
	}: { size?: string; class?: string } = $props();
</script>

<svg
	width={size}
	height={size}
	class={className}
	stroke-width="1.5"
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M7 19V11C7 9.89543 7.89543 9 9 9H20C21.1046 9 22 9.89543 22 11V19C22 20.1046 21.1046 21 20 21H9C7.89543 21 7 20.1046 7 19Z"
		stroke="currentColor"
		stroke-width="1.5"
	/>
	<path
		d="M6.5 16H4C2.89543 16 2 15.1046 2 14V6C2 4.89543 2.89543 4 4 4H15C16.1046 4 17 4.89543 17 6V9"
		stroke="currentColor"
		stroke-width="1.5"
	/>
	<path d="M10 12H11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
	<path d="M5 7H6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
</svg>
