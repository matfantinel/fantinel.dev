<script lang="ts">
  let { size = '100%', class: className }: { size?: string; class?: string } = $props();
</script>

<svg
  width={size}
  height={size}
  class={className}
  viewBox="0 0 24 24"
  stroke-width="1.5"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M21 3L15 3M21 3L12 12M21 3V9"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  ></path>
  <path
    d="M21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H11"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  ></path>
</svg>