<script lang="ts">
  import type { Snippet } from 'svelte';
  import Quotes from '@assets/icons/quotes.svelte';

  let { 
    cite,
    class: className,
    children,
    ...props
  } : {
    cite?: string;
    class?: string;
    children?: Snippet;
  } = $props();
</script>

<blockquote
  class={['a-blockquote', className]}
  {cite}
  {...props}
>
  <div class="a-blockquote__quotes" aria-hidden="true">
    <Quotes class="a-blockquote__quote" size="24px" />
    <Quotes class="a-blockquote__quote" size="24px" />
  </div>

  {@render children?.()}
</blockquote>

<style lang="scss">
  .a-blockquote {
    position: relative;
    background-color: var(--theme--background-accent-color);
    padding: var(--spacing-md);
    padding-left: var(--spacing-xl);
    border-radius: var(--border-radius);
    box-shadow: var(--theme--shadow-card);

    &__quotes {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      width: 100%;
      padding: var(--spacing-xs);
      display: flex;
      justify-content: space-between;
    }

    :global(.a-blockquote__quote) {
      color: var(--theme--color-accent);
      &:first-child {
        transform: scale(-1, 1);
      }
    }
  }
</style>