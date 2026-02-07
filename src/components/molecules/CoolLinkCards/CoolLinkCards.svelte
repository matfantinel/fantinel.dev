<script lang="ts">
  import CoolLinkCard from '@components/molecules/CoolLinkCard';
  import type { CoolLink } from '@schemas/cool-link';
  import type { Snippet } from 'svelte';
  import { coolLinkToCoolLinkCardProps } from '@utils/prop-mapping';

  let {
    class: className,
    links,
    children,
  }: {
    class?: string;
    links?: CoolLink[];
    children?: Snippet;
  } = $props();
</script>

<div class={['m-cool-link-cards', className]}>
  {@render children?.()}

  {#if links}
    {#each links as link}
      <CoolLinkCard
        {...coolLinkToCoolLinkCardProps(link)}
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
