<script lang="ts">
  import ArrowLink from '@components/atoms/ArrowLink';

  let {
    title,
    excerpt,
    url,
    subResults,
    class: className,
  }: {
    title: string;
    url: string;
    readingTime?: string;
    excerpt?: string;
    subResults?: {
      excerpt: string;
    }[];
    class?: string;
  } = $props();
</script>

<article class={['m-search-result', className]}>
  <div class="m-search-result__content">
    <p class="m-search-result__title">
      {title}
    </p>
    {#if subResults && subResults.length}
      {#each subResults.slice(0, 3) as subResult}
        <p class="m-search-result__excerpt">“(...) {@html subResult.excerpt} (...)”</p>
      {/each}
    {:else if excerpt}
      <p class="m-search-result__excerpt">“(...) {@html excerpt} (...)”</p>
    {/if}
  </div>
  <div class="m-search-result__footer">
    <ArrowLink class="m-search-result__link" href={url} title={`Open blog post`}>Read</ArrowLink>
  </div>
</article>

<style lang="scss">
  @use '/src/styles/typography';

  .m-search-result {
    border-radius: var(--border-radius);
    box-shadow: var(--theme--shadow-card);
    background-color: var(--theme--background-card-color);
    overflow: hidden;
    position: relative;

    display: flex;
    flex-direction: column;
    transition: all .25s ease-in-out;

    &__content {
      padding: var(--spacing-md) var(--spacing-md) 0;
      flex-grow: 1;
      background-color: var(--theme--background-card-color);

      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    &__title {
      @include typography.h4;
    }

    &__excerpt {
      @include typography.b2;
      font-style: italic;
    }

    &__footer {
      padding: var(--spacing-md);

      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--spacing-xs);
    }

    :global(.m-search-result__link) {
      margin-left: auto;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        // background: rgba(var(--theme--color-accent-rgb), 0.2);
        // backdrop-filter: invert(1);
        z-index: 1;
      }
    }
  }

  @media (hover: hover) {
    :global(.m-search-result:has(.m-search-result__link:hover)) {
      box-shadow: var(--theme--shadow-card-high);
    }
  }
</style>
