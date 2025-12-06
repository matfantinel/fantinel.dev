<script lang="ts">
  import PhotographyCard from '@components/molecules/PhotographyCard';
  import type { Photography } from '@schemas/photography';
  import type { Snippet } from 'svelte';
  import Masonry from 'svelte-masonry';

  import { onMount } from 'svelte';

  let {
    class: className,
    photographies,
    children,
  }: {
    class?: string;
    photographies?: Photography[];
    children: Snippet;
  } = $props();

  let refreshLayout = $state<() => void>();

  onMount(() => {
    // Manuall refreshLayout of masonry now that JS is available
    setTimeout(() => {
      refreshLayout?.();

      setTimeout(() => {
        // Do it again just to make sure it worked...
        refreshLayout?.();
      }, 950);
    }, 50);
  });

</script>

<div class={['m-photography-cards', className]}>
  {@render children?.()}

  {#if photographies}
    <Masonry bind:refreshLayout colWidth={'minmax(Min(30rem, 100%), 1fr)'}>
      {#each photographies as photography}
        <PhotographyCard
          title={photography.title}
          slug={photography.slug}
          image={photography.image}
          photoDate={photography.photoDate}
          publishedDate={photography.publishedDate}
          imageAlt={photography.imageAlt as string | undefined}
          content={photography.content as string}
        />
      {/each}
    </Masonry>
  {/if}
</div>

<style lang="scss">
  @use '/src/styles/breakpoints';

  .m-photography-cards {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
</style>
