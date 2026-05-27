<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { QuickReview } from '@schemas/quick-review';
  import QuickReviewCard from '@components/molecules/QuickReviewCard';
  import { quickReviewToQuickReviewCardProps } from '@utils/prop-mapping';
  import type { BaseProps } from '@utils/types';

  export type QuickReviewCardsProps = BaseProps & {
    reviews?: QuickReview[];
  };

  let {
    class: className,
    reviews,
    children,
  }: QuickReviewCardsProps & { children?: Snippet } = $props();
</script>

<div class={['m-quick-review-cards', className]}>
  {@render children?.()}

  {#if reviews}
    {#each reviews as review}
      <QuickReviewCard {...quickReviewToQuickReviewCardProps(review)} />
    {/each}
  {/if}
</div>

<style lang="scss">
  @use '/src/styles/breakpoints';

  .m-quick-review-cards {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-md);
    align-items: flex-start;
    justify-content: center;
  }
</style>
