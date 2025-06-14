<script lang="ts">
  import type { Pagefind, PagefindResult } from '@schemas/pagefind';
  import { onMount } from 'svelte';

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
    if (!query) return;

    let pagefind = ((window as any).pagefind as Pagefind);
    if (!pagefind) {
      pagefind = await import(/* @vite-ignore */ `${origin}/pagefind/pagefind.js`);
    }

    const search = await pagefind.search(query);
    results = await Promise.all(search.results.map(async (result) => await result.data()));
    isLoading = false;
    console.log({results});
  });
</script>

{#if isLoading}
  <p>Loading...</p>
{/if}

{#if !query}
  <p>No valid query provided</p>
{/if}

{#if !results || results.length === 0}
  <p>No results found</p>
{:else}
  <ul>
    {#each results as result}
      <li>
        <p>{result.meta.title}</p>
        <p>{@html result.excerpt}</p>
        <p><a href={result.url}>View</a></p>
      </li>
    {/each}
  </ul>
{/if}

<style lang="scss">

</style>