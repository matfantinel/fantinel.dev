<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { BaseProps } from '@utils/types';

  let {
    class: className,
    children,
  }: BaseProps & { children?: Snippet } = $props();
  let classList = $derived(['m-site-section-cards', className]);
</script>

<div class={classList}>
  {@render children?.()}
</div>

<style lang="scss">
  @use '/src/styles/breakpoints';

  .m-site-section-cards {
    display: flex;
    justify-content: center;
    gap: var(--spacing-lg) var(--spacing-sm);
    flex-wrap: wrap;
  }

</style>
