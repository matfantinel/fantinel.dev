<script lang="ts">
  let {
    totalPages,
    currentPage,
    baseUrl,
    class: className,
  }: {
    totalPages: number;
    currentPage: number;
    baseUrl: string;
    class?: string;
  } = $props();

  function range(start: number, end: number) {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  }

  // How many pages to show at the beginning and end of the pagination (first and last pages)
  const boundaryCount = 1;
  // How many pages to show before and after the current page
  const paddingCount = 1;

  const startPages = range(1, Math.min(boundaryCount, totalPages));
  const endPages = range(Math.max(totalPages - boundaryCount + 1, boundaryCount + 1), totalPages);

  const paddingStart = Math.max(
    Math.min(currentPage - paddingCount, totalPages - boundaryCount - paddingCount * 2 - 1),
    boundaryCount + 2
  );

  const paddingEnd = Math.min(
    Math.max(currentPage + paddingCount, boundaryCount + paddingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : totalPages - 1
  );

  const items = [
    ...startPages,
    ...(paddingStart > boundaryCount + 2
      ? ['ellipsis']
      : boundaryCount + 1 < totalPages - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...range(paddingStart, paddingEnd),
    ...(paddingEnd < totalPages - boundaryCount - 1
      ? ['ellipsis']
      : totalPages - boundaryCount > boundaryCount
        ? [totalPages - boundaryCount]
        : []),
    ...endPages,
  ];
</script>

<ul class={['m-pagination', className]}>
  {#each items as item}
    {#if item === 'ellipsis'}
      <li class="m-pagination__item">...</li>
    {:else}
      <li class="m-pagination__item">
        <a
          class={['m-pagination__link', item === currentPage ? 'm-pagination__link--active' : '']}
          href={item === 1 ? baseUrl : `${baseUrl}/page/${item}`}
          target="_self"
          title={`Go to page ${item}`}
        >
          {item}
        </a>
      </li>
    {/if}
  {/each}
</ul>

<style lang="scss">
  @use '/src/styles/typography';

  .m-pagination {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    &__item {
      margin: 0;
    }

    &__link {
      @include typography.b1;
      transition: all 0.2s ease-in-out;
      border-radius: var(--border-radius--small);
      padding: var(--spacing-xs) var(--spacing-sm);
      display: grid;
      place-items: center;
      text-decoration: none;

      @media (hover: hover) {
        &:hover {
          background-color: var(--theme--background-card-color);
        }
      }

      &--active {
        background-color: var(--theme--background-card-color);
        box-shadow: var(--theme--shadow-card);
        color: var(--theme--color-accent);
      }
    }
  }
</style>
