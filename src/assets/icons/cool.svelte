<script lang="ts">
  let { size = '100%', class: className }: { size?: string; class?: string } = $props();
</script>

<svg width={size} height={size} class={className} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M24.7086 30H6.15C5.65294 30 5.25 29.5971 5.25 29.1V14.4C5.25 13.903 5.65294 13.5 6.15 13.5H10.3014C11.3552 13.5 12.3317 12.9471 12.8739 12.0435L16.9395 5.26743C17.8169 3.80533 19.8831 3.66634 20.9482 4.9978C21.4503 5.62539 21.6121 6.45954 21.3811 7.22935L19.8475 12.3414C19.6743 12.9189 20.1068 13.5 20.7096 13.5H27.5723C29.5503 13.5 30.987 15.381 30.4665 17.2893L27.6028 27.7893C27.2469 29.0946 26.0615 30 24.7086 30Z"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
  />
  <path d="M10.5 30V13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>
