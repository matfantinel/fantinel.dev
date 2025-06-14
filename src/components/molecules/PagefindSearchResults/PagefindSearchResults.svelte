<script lang="ts">
  import type { Pagefind, PagefindResult } from '@schemas/global';
  import { onMount } from 'svelte';

  let {
    query,
    class: className,
  }: {
    query?: string;
    class?: string;
  } = $props();

  let results = $state<PagefindResult[]>([]);

  onMount(async () => {
    if (!query) return;

    let pagefind = ((window as any).pagefind as Pagefind);
    if (!pagefind) {
      pagefind = await import(/* @vite-ignore */ `${origin}/pagefind/pagefind.js`);
    }

    const search = await pagefind.search(query);
    results = await Promise.all(search.results.map(async (result) => await result.data()));
  });
</script>

<h1>(WIP)</h1>
{#if !query}
  <p>No valid query provided</p>
{/if}

{#if !results || results.length === 0}
  <p>No results found</p>
{:else}
  <ul>
    {#each results as result}
      <li>
        <a href={result.url}>{result.excerpt}</a>
      </li>
    {/each}
  </ul>
{/if}

<style lang="scss">

</style>