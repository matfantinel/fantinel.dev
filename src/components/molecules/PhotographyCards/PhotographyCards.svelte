<script lang="ts">
  import NewPhotographyCard from '@components/molecules/NewPhotographyCard';
  import type { Photography } from '@schemas/photography';
  import type { Snippet } from 'svelte';

  import { photographyToPhotographyCardProps } from '@utils/prop-mapping';

  let {
    class: className,
    photographies,
    children,
  }: {
    class?: string;
    photographies?: Photography[];
    children?: Snippet;
  } = $props();

</script>

<div class={['m-photography-cards', className]}>
  {@render children?.()}

  {#if photographies}
    {#each photographies as photography}
      <NewPhotographyCard
        {...photographyToPhotographyCardProps(photography)}
        title={photography.title}
        slug={photography.slug}
        image={photography.image}
        photoDate={photography.photoDate}
        publishedDate={photography.publishedDate}
        imageAlt={photography.imageAlt as string | undefined}
        content={photography.content as string}
        url={photography.url as string | undefined}
        immersive
      />
    {/each}
  {/if}
</div>

<style lang="scss">
  @use '/src/styles/breakpoints';

  .m-photography-cards {
    display: grid;
    display: grid-lanes;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--spacing-md);

  }
</style>
