<script lang="ts">
  import type { Pagefind, PagefindResult } from '@schemas/pagefind';
  import { onMount } from 'svelte';
  import SearchResult from '@components/molecules/SearchResult';
  import Search from '@assets/icons/search.svelte';
  import ArrowLink from '@components/atoms/ArrowLink';

  let {
    query,
    class: className,
  }: {
    query?: string;
    class?: string;
  } = $props();

  let results = $state<PagefindResult[]>([]);
  let isLoading = $state<boolean>(true);

  onMount(async () => {
    if (!query) {
      isLoading = false;
      return;
    }

    let pagefind = ((window as any).pagefind as Pagefind);
    if (!pagefind) {
      pagefind = await import(/* @vite-ignore */ `${origin}/pagefind/pagefind.js`);
    }

    const search = await pagefind.search(query);
    results = await Promise.all(search.results.map(async (result) => await result.data()));
    isLoading = false;
  });
</script>

<section class={['o-pagefind-search-results', className]}>
  <div class="o-pagefind-search-results__container u-container">
    {#if isLoading}
      <div class="o-pagefind-search-results__loading">
        <Search size="24px" /> Searching...
      </div>
    {:else if !query || !results || results.length === 0}
      <div class="o-pagefind-search-results__no-results">
        <span>
          {#if !query}
            No valid query provided
          {:else}
            No results found
          {/if}
        </span>

        <ArrowLink
          class="o-pagefind-search-results__button"
          href="/"
        >
          Back to home page
        </ArrowLink>
      </div>
    {:else}
      <ul class="o-pagefind-search-results__list">
        {#each results as result}
          <li class="o-pagefind-search-results__item">
            <SearchResult
              title={result.meta.title}
              url={result.url}
              excerpt={result.excerpt}
            />
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</section>

<style lang="scss">
  @use '/src/styles/typography';

  .o-pagefind-search-results {
    &__container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      align-items: center;
      justify-content: center;
    }
    
    &__loading {
      @include typography.b1;
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);

      :global(svg) {
        animation: magnifying-glass 5s ease-in-out infinite;
        @keyframes magnifying-glass {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(0px, 5px);
          }
          50% {
            transform: translate(5px, 5px);
          }
          75% {
            transform: translate(5px, 0px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      }
    }
    
    &__no-results {
      @include typography.b1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-sm);
      color: var(--color--red);
    }
    
    &__list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }
    
    &__item {
      
    }
  }
</style>