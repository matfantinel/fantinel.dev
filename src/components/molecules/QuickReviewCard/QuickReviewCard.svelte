<script lang="ts">
  import Image from '@components/atoms/Image';
  import QuickReviewTypeTag from '@components/atoms/QuickReviewTypeTag';
  import MarkdownRenderer from '@components/molecules/MarkdownRenderer';
  import QuickReviewRatings from '@components/molecules/QuickReviewRatings';
  import type { QuickReviewRating, QuickReviewType } from '@schemas/quick-review';
  import dateformat from 'dateformat';

  let {
    title,
    slug,
    metadata,
    date,
    image,
    rating,
    theme = 'dark',
    customBg,
    type,
    content,
    class: className,
  }: {
    title: string;
    slug?: string;
    metadata?: string;
    date?: string;
    image?: string;
    rating: QuickReviewRating;
    theme?: string;
    customBg?: string;
    type: QuickReviewType;
    content: string;
    class?: string;
  } = $props();

  let classList = $derived(['m-quick-review-card', theme ? `m-quick-review-card--${theme}` : null, className]);

  let customStyles = $derived([
    customBg ? `--background-color: ${customBg.startsWith('#') ? customBg : `#${customBg}`}` : '',
  ]);
</script>

<article class={classList} style={customStyles.join(';')}>
  <div class="m-quick-review-card__container">
    <div class="m-quick-review-card__image-container">
      {#if image}
        <Image class="m-quick-review-card__image" src={image} alt={`Cover of ${title}`} />
      {/if}
    </div>

    <p class="m-quick-review-card__title">{title}</p>

    {#if metadata}
      <p class="m-quick-review-card__metadata">{metadata}</p>
    {/if}

    {#if date}
      <p class="m-quick-review-card__date">Reviewed on {dateformat(date, 'mmm dd, yyyy', true)}</p>
    {/if}

    {#if rating}
      <QuickReviewRatings class="m-quick-review-card__rating" {rating} {theme} monochrome={Boolean(customBg)} />
    {/if}

    {#if content}
      <div class="m-quick-review-card__content">
        <MarkdownRenderer {content} />
      </div>
    {/if}

    {#if type}
      <QuickReviewTypeTag class="m-quick-review-card__type" {type} />
    {/if}
  </div>
</article>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .m-quick-review-card {
    padding: var(--spacing-sm);
    border-radius: var(--border-radius);
    box-shadow: var(--theme--shadow-card);
    width: min(100%, 780px);
    container-type: inline-size;

    --background-color: var(--theme--qr-base-dark-color);
    --text-color: var(--theme--qr-base-light-color);

    color: var(--text-color);
    background-color: var(--background-color);

    &--light {
      --background-color: var(--theme--qr-base-light-color);
      --text-color: var(--theme--qr-base-dark-color);
    }

    &__container {
      display: grid;
      grid-template-columns: min(220px, 30%) 1fr;
      align-items: start;
      column-gap: var(--spacing-md);
      position: relative;
    }

    &__image-container {
      grid-column: 1;
      grid-row: span 5;

      background: var(--theme--background-card-accent-color);
      isolation: isolate;
      width: 100%;
      height: auto;
      border-radius: var(--border-radius);
      overflow: hidden;
      box-shadow: var(--theme--shadow-image);
    }

    :global(.m-quick-review-card__image) {
      object-fit: cover;
    }

    &__title {
      @include typography.h3;
      order: 2;
      margin-top: var(--spacing-xs);
    }

    &__metadata {
      @include typography.b2;
      order: 3;
      margin-top: var(--spacing-xs);
    }

    &__date {
      font-family: var(--font--mono);
      font-size: clamp(0.775rem, 0.6985rem + 0.3137vw, 0.875rem); //14px
      font-weight: 500;
      line-height: 1.2;
      order: 1;
      margin-top: var(--spacing-xxs);
    }

    &__content {
      order: 4;
      margin-top: var(--spacing-sm);
    }

    :global(.m-quick-review-card__type) {
      @include typography.b2;
      position: absolute;
      top: 0;
      right: 0;
    }

    :global(.m-quick-review-card__rating) {
      grid-column: span 2;
      order: 5;
      margin-top: var(--spacing-md);
    }

    @mixin small-layout-styles {
      &__container {
        grid-template-columns: min(220px, 30%) 1fr;
        column-gap: var(--spacing-md);
      }

      &__image-container {
        grid-column: 1;
        grid-row: span 5;
      }

      &__date {
        order: 5;
        grid-column: span 2;
        margin-top: var(--spacing-sm);
      }

      &__content {
        grid-column: span 2;
      }

      :global(.m-quick-review-card__type) {
        position: relative;
      }

      :global(.m-quick-review-card__rating) {
        grid-column: span 2;
        order: 5;
      }
    }

    @container (max-width: 600px) {
      @include small-layout-styles;
    }

    @container (max-width: 420px) {
      &__container {
        grid-template-columns: min(220px, 40%) 1fr;
        column-gap: var(--spacing-sm);
      }
    }

    // Fallback styles for browsers that don't support container queries
    @supports not (container-type: inline-size) {
      @include breakpoints.for-phone-only {
        @include small-layout-styles;
      }
    }
  }
</style>
