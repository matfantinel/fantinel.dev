<script lang="ts">
  import type { Snippet } from 'svelte';
  import Quotes from '@assets/icons/quotes.svelte';

  let { 
    cite,
    text,
    class: className,
    children,
    ...props
  } : {
    cite?: string;
    text?: string;
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

  {#if text}
    {text}
  {:else}
    {@render children?.()}
  {/if}

</blockquote>

<style lang="scss">
  .a-blockquote {
    position: relative;
    background-color: var(--t-v6--surface--accent);
    padding: var(--spacing-md);
    padding-left: var(--spacing-xl);
    border-radius: var(--border-radius);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000000' fill-opacity='0.12' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
    word-wrap: break-word;

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
      color: var(--t-v6--accent);
      &:first-child {
        transform: scale(-1, 1);
      }
    }
  }
</style>