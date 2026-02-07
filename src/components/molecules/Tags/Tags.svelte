<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    size,
    class: className,
    children,
  }: {
    size?: 'default' | 'small' | 'responsive';
    class?: string;
    children?: Snippet;
  } = $props();
</script>

<div class={['m-tags', size ? `m-tags--${size}` : undefined, className]}>
  {@render children?.()}
</div>

<style lang="scss">
  @use '/src/styles/breakpoints';

  .m-tags {
		display: flex;
		gap: var(--spacing-sm) var(--spacing-xs);
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;

    &--small {
      gap: var(--spacing-xs) var(--spacing-xxs);
    }

    &--responsive {
			@include breakpoints.for-phone-only {
				gap: var(--spacing-xs) var(--spacing-xxs);
			}
    }
  }
</style>
