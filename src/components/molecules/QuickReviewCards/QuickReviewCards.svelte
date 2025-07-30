<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { QuickReview } from '@schemas/quick-review';
  import QuickReviewCard from '@components/molecules/QuickReviewCard';

  let {
    class: className,
    reviews,
    children,
  }: {
    class?: string;
    reviews?: QuickReview[];
    children: Snippet;
  } = $props();
</script>

<div class={['m-quick-review-cards', className]}>
  {@render children?.()}

  {#if reviews}
    {#each reviews as review}
      <QuickReviewCard
        title={review.title}
        metadata={review.metadata as string | undefined}
        slug={review.slug}
        image={review.image as string | undefined}
        rating={review.rating}
        theme={review.theme}
        customBg={review.customBg as string | undefined}
        content={review.content as string}
        type={review.type}
        date={review.date as any}
      />
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

    :global(> *) {
      :global(article) {
        flex: 0 1 780px;
        --direction: 1;

        @supports (animation-timeline: view()) {
          animation: card-slide auto linear;
          animation-timeline: view();
          animation-range: entry;
        }
      }
      &:nth-child(odd) {
        :global(article) {
          --direction: -1;
        }
      }
    }
  }

  @keyframes card-slide {
    0% {
      opacity: 0.5;
      translate: calc(50px * var(--direction)) 5px;
    }
    75% {
      opacity: 1;
      translate: 0 0;
    }
  }
</style>
