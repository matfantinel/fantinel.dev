<script lang="ts">
  import CoolLinkCard from '@components/molecules/CoolLinkCard';
  import type { CoolLink } from '@schemas/cool-link';
  import type { Snippet } from 'svelte';

  let {
    class: className,
    links,
    children,
  }: {
    class?: string;
    links?: CoolLink[];
    children: Snippet;
  } = $props();
</script>

<div class={['m-cool-link-cards', className]}>
  {@render children?.()}

  {#if links}
    {#each links as link}
      <CoolLinkCard
        title={link.title as string}
        author={link.author as string | undefined}
        url={link.url}
        date={link.savedOn as any}
        tags={link.tags}
        content={link.content as string | undefined}
        style={`view-transition-name: cool-link-card-${link.slug}`}
      />
    {/each}
  {/if}
</div>

<style lang="scss">
  @use '/src/styles/breakpoints';

  .m-cool-link-cards {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
</style>
