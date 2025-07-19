<script lang="ts">
  import { QuickReviewRating } from '@schemas/quick-review';

  let {
    rating,
    theme,
    monochrome,
    class: className,
  }: {
    rating: QuickReviewRating;
    theme?: string;
    monochrome?: boolean;
    class?: string;
  } = $props();

  let ratings = $derived(
    Object.values(QuickReviewRating).map((value) => {
      let color;
      if (!monochrome || value === QuickReviewRating.LovedIt) {
        switch (value) {
          case QuickReviewRating.LovedIt:
            color = 'var(--theme--qr-loved-color)';
            break;
          case QuickReviewRating.LikeIt:
            color = 'var(--theme--qr-liked-color)';
            break;
          case QuickReviewRating.Decent:
            color = 'var(--theme--qr-decent-color)';
            break;
          case QuickReviewRating.DidntLikeIt:
            color = 'var(--theme--qr-not-liked-color)';
            break;
          default:
            break;
        }
      }
      return {
        value,
        selected: value === rating,
        color,
      };
    })
  );

  let classList = $derived([
    'm-quick-review-ratings',
    theme ? `m-quick-review-ratings--${theme}` : null,
    monochrome ? 'm-quick-review-ratings--monochrome' : null,
    className,
  ]);
</script>

<div class={classList}>
  {#each ratings as rating}
    <div
      class="m-quick-review-ratings__rating"
      class:m-quick-review-ratings__rating--active={rating.selected}
      class:m-quick-review-ratings__rating--loved={rating.value === QuickReviewRating.LovedIt}
      class:m-quick-review-ratings__rating--monochrome={monochrome}
      style={rating.color ? `--rating-color: ${rating.color}` : ''}
    >
      {#if rating.value === QuickReviewRating.LovedIt && rating.selected}
        <sparkly-text number-of-sparkles="2" style="--sparkly-text-color: rainbow; --sparkly-text-size: 1.25rem">
          {rating.value}
        </sparkly-text>
      {:else}
        {rating.value}
      {/if}
    </div>
  {/each}
</div>

<style lang="scss">
  @use '/src/styles/typography';

  .m-quick-review-ratings {
    padding: var(--spacing-xs) var(--spacing-lg);
    height: 54px;
    border-radius: 54px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    --text-color: var(--theme--qr-base-light-color);
    --rating-color: var(--theme--color-accent);

    border: 1px solid var(--text-color);
    color: var(--text-color);

    &--monochrome {
      --rating-color: var(--theme--qr-base-dark-color);
    }

    &--light {
      --text-color: var(--theme--qr-base-dark-color);

      &.m-quick-review-ratings--monochrome {
        --rating-color: var(--theme--qr-base-light-color);
      }
    }    

    &__rating {
      @include typography.b1;
      padding: var(--spacing-xs) var(--spacing-sm);
      border-radius: var(--border-radius);

      &--active {
        background: var(--rating-color);
        box-shadow: var(--theme--shadow-card-high);

        &:first-child {
          margin-left: calc(var(--spacing-md) * -1);
        }
        &:last-child {
          margin-right: calc(var(--spacing-md) * -1);
        }

        &:not(.m-quick-review-ratings__rating--monochrome) {
          color: var(--theme--qr-base-dark-color);
        }

        &.m-quick-review-ratings__rating--loved {
          color: var(--theme--qr-base-dark-color);
          
          --glow-color: var(--color--yellow-rgb);
          animation: text-glow 3.5s cubic-bezier(0.66, 0, 0.34, 1) infinite alternate;
        }
      }
    }
  }
</style>
