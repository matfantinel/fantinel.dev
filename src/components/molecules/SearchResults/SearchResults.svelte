<script lang="ts">
  import SearchResult from '@components/molecules/SearchResult';
  import type { Snippet } from 'svelte';
  import { PostType } from '@schemas/post-types';

  let {
    class: className,
    results,
    children,
  }: {
    class?: string;
    results?: {
      type?: PostType;
      title: string;
      url: string;
      image?: string;
      imageAlt?: string;
      excerpt?: string;
      subResults?: { excerpt: string }[];
    }[];
    children?: Snippet;
  } = $props();
</script>

<div class={['m-search-results', className]}>
  {@render children?.()}

  {#if results}
    {#each results as result}
      <SearchResult {...result} />
    {/each}
  {/if}
</div>

<style lang="scss">
  .m-search-results {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
