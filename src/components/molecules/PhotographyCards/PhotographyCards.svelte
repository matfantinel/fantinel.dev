<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Photography } from '@schemas/photography';
  import PhotographyCard from '@components/molecules/PhotographyCard';

  let {
    class: className,
    photographies,
    children,
  }: {
    class?: string;
    photographies?: Photography[];
    children: Snippet;
  } = $props();
</script>

<div class={['m-photography-cards', className]}>
  {@render children?.()}

  {#if photographies}
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
