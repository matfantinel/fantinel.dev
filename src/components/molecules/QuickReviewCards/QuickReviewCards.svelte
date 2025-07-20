<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    class: className,
    children,
  }: {
    class?: string;
    children: Snippet;
  } = $props();
</script>

<div class={['m-quick-review-cards', className]}>
  {@render children?.()}
</div>

<style lang="scss">
  @use '/src/styles/breakpoints';

  .m-quick-review-cards {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-md);
    align-items: flex-start;
    justify-content: center;

    :global(> *) {
      :global(article) {
        flex: 0 1 780px;
        --direction: 1;

        @supports (animation-timeline: view()) {
          animation: card-slide auto linear;
          animation-timeline: view();
          animation-range: entry;
        }
      }
      &:nth-child(odd) {
        :global(article) {
          --direction: -1;
        }
      }
    }
  }

  @keyframes card-slide {
    0% {
      opacity: 0.5;
      translate: calc(50px * var(--direction)) 5px;
    }
    75% {
      opacity: 1;
      translate: 0 0;
    }
  }
</style>
