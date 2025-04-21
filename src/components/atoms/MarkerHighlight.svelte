<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    text,
    children,
  }: {
    text?: string;
    children?: Snippet;
  } = $props();
</script>

<mark class="m-marker-highlight">
  <span>
    {#if text}
      {text}
    {:else}
      {@render children?.()}
    {/if}
  </span>
</mark>

<style lang="scss">
  .m-marker-highlight {
    background: transparent;

    span {
      background: linear-gradient(
          90deg,
          var(--theme--color-marker-highlight) 50%,
          rgba(var(--theme--color-marker-highlight-rgb), 0.5) 50%
        )
        110% 0 / 200% 100% no-repeat;
      color: var(--theme--color-marker-highlight-contrast);
      background-position: calc((1 - var(--highlighted)) * 110%) 0;
      transition: background-position 1s;
    }

    @supports (animation-timeline: view()) {
      --highlighted: 0;
      animation: highlight steps(1) both;
      animation-timeline: view();
      animation-range: entry 100% cover 10%;
    }

    @keyframes highlight {
      to {
        --highlighted: 1;
      }
    }
  }
</style>
