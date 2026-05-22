<script lang="ts">
  import SearchResult from '@components/molecules/SearchResult';
  import type { SearchResultProps } from '@components/molecules/SearchResult';
  import type { Snippet } from 'svelte';
  import type { BaseProps } from '@utils/types';

  export type SearchResultsProps = BaseProps & {
    results?: SearchResultProps[];
  };

  let {
    class: className,
    results,
    children,
  }: SearchResultsProps & { children?: Snippet } = $props();
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
