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
  let noExactMatches = $state<boolean>(false);

  onMount(async () => {
    if (!query) {
      isLoading = false;
      return;
    }    

    let pagefind = ((window as any).pagefind as Pagefind);
    if (!pagefind) {
      pagefind = await import(/* @vite-ignore */ `${origin}/pagefind/pagefind.js`);
    }

    await pagefind.options({
      ranking: {
        // https://pagefind.app/docs/ranking
        termFrequency: 0.0,
        termSimilarity: 0.0,
        termSaturation: 0.0
      }
    });

    // By default, Pagefind looks for similar words
    // e.g. searching for "useful" would return "use" and "using"
    // I don't want that, so I'm wrapping the query in quotes so it only fetches exact matches.
    let search = await pagefind.search(`"${query}"`);
    // If there's no results for an exact match, then do a fuzzy search instead.
    if (search && (!search.results || !search.results.length)) {
      noExactMatches = true;
      search = await pagefind.search(query);
    }

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
      {#if noExactMatches}
        <div class="o-pagefind-search-results__no-results">
          <span>
            No exact matches, but maybe some of these might help:
          </span>
        </div>
      {/if}
      <ul class="o-pagefind-search-results__list">
        {#each results as result}
          <li class="o-pagefind-search-results__item">
            <SearchResult
              title={result.meta.title}
              url={result.url}
              excerpt={result.excerpt}
              subResults={result.sub_results}
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
      margin: 0;
    }
    
    &__item {
      
    }
  }
</style>