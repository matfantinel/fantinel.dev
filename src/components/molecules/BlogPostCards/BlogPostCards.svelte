<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    class: className,
    maxPerRow,
    children,
  }: {
    class?: string;
    maxPerRow?: number;
    children?: Snippet;
  } = $props();
</script>

<div class={['m-blog-post-cards', maxPerRow ? `m-blog-post-cards--max-per-row-${maxPerRow}` : undefined, className]}>
  {@render children?.()}
</div>

<style lang="scss">
  @use '/src/styles/breakpoints';

  .m-blog-post-cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: var(--spacing-md);
    
    &--max-per-row-2 {
      grid-template-columns: 1fr 1fr;

      @include breakpoints.for-phone-only {
        grid-template-columns: 1fr;
      }
    }

    &--max-per-row-1 {
      grid-template-columns: 1fr;
    }
  }

</style>
