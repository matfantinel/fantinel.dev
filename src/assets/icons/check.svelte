<script lang="ts">
  let { size = '100%', class: className }: { size?: string; class?: string } = $props();
</script>

<svg
  width={size}
  height={size}
	class={className}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>