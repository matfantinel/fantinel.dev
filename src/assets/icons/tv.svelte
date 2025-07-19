<script lang="ts">
  let { size = '100%', class: className }: { size?: string; class?: string } = $props();
</script>

<svg height={size} width={size} class={className} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M1.33325 13.8332V6.49984C1.33325 5.76346 1.93021 5.1665 2.66659 5.1665H13.3333C14.0697 5.1665 14.6666 5.76346 14.6666 6.49984V13.8332C14.6666 14.5696 14.0697 15.1665 13.3333 15.1665H2.66659C1.93021 15.1665 1.33325 14.5696 1.33325 13.8332Z"
    stroke="currentColor"
    stroke-width="1.5"
  />
  <path
    d="M5.66675 2.1665L8.00008 4.49984L10.3334 2.1665"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
