<script lang="ts">
  import Image from '@components/atoms/Image';
  import MarkdownRenderer from '@components/molecules/MarkdownRenderer';
  import dateformat from 'dateformat';
  import type { BaseProps } from '@utils/types';

  export type PolaroidCardProps = BaseProps & {
    title: string;
    image: string;
    imageAlt?: string;
    content?: string;
    photoDate?: Date;
    rotation?: number;
  };

  let {
    title,
    image,
    imageAlt,
    content,
    photoDate,
    rotation = 0,
    class: className,
  }: PolaroidCardProps = $props();

  let classList = $derived(['m-polaroid-card', photoDate || content ? 'm-polaroid-card--has-back' : '', className]);

  // Feature detect Invoker Commands API support
  // If available, then clicking the thumbnail will open the slideshow dialog
  // If not available, we'll show a "View" button that links to the photography page
  // If JS is disabled, shows the button too (even if Invoker Commands is available)
  let supportsInvokerCommands = $state(false);
  $effect(() => {
    if (typeof window !== 'undefined') {
      supportsInvokerCommands = 'commandForElement' in HTMLButtonElement.prototype;
    }
  });
</script>

<article class={classList} style="--polaroid-rotation: {rotation}deg">
  <div class="m-polaroid-card__quadrant one" aria-hidden="true"></div>
  <div class="m-polaroid-card__quadrant two" aria-hidden="true"></div>
  <div class="m-polaroid-card__quadrant three" aria-hidden="true"></div>
  <div class="m-polaroid-card__quadrant four" aria-hidden="true"></div>
  <div class="m-polaroid-card__container">
    <div class="m-polaroid-card__front">
      <div class="m-polaroid-card__image-area">
        <Image class="m-polaroid-thumbnail__image" src={image} alt={imageAlt || title} />
      </div>
      <div class="m-polaroid-card__label-area">
        {#if title}
          <span class="m-polaroid-card__title">{title}</span>
        {/if}
      </div>
    </div>

    {#if photoDate || content}
      <div class="m-polaroid-card__back">        
        {#if content}
          <div class="m-polaroid-card__description u-markdown">
            <MarkdownRenderer {content} />
          </div>
        {/if}

        {#if photoDate}
          <div class="m-polaroid-card__date">
            {dateformat(photoDate, 'yyyy-mm-dd', true)}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</article>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .m-polaroid-card {
    width: 350px;
    height: 420px;
    aspect-ratio: 350 / 420;

    rotate: var(--polaroid-rotation, 0deg);

    transition: all 0.5s ease-out;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;

    &__container {
      grid-column: 1 / 3;
      grid-row: 1 / 3;
      padding: var(--spacing-sm);
      background: var(--t-v6--surface--card);
      box-shadow: var(--t-v6--shadow--base);

      width: 100%;
      height: 100%;

      transition: all 0.5s ease-out;

      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;

      > * {
        grid-column: 1;
        grid-row: 1;
      }
    }

    &__front {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);

      width: 100%;
      height: 100%;
      opacity: 1;

      transition: all 0.25s ease-out;
    }

    &__image-area {
      width: 100%;
      aspect-ratio: 1 / 1;
    }

    :global(.m-polaroid-card__image) {
      object-fit: cover;
    }

    &__label-area {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;

      width: 100%;
      flex: 1;
    }

    &__title {
      font-family: var(--font--spicy);
      color: var(--t-v6--text--base);
      font-size: 24px;
    }

    &__back {
      opacity: 0;
      transform: scaleX(-1);
      animation-delay: 0.25s;

      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);

      width: 100%;
      height: 100%;
    }

    &__date {
      @include typography.b2;
      font-family: var(--font--spicy);
      color: var(--t-v6--text--medium);
    }

    &__description {
      @include typography.b2;
      font-family: var(--font--spicy);
      text-align: left;
    }

    @mixin turned-around-card {
      
      .m-polaroid-card {
        &__container {
          transform: scaleX(-1);
        }

        &__front {
          opacity: 0;
        }

        &__back {
          animation: toggleDisplay 0.175s forwards;
          animation-delay: 0.25s;
        }
      }
    }

    &--has-back {
      &:hover {
        @include turned-around-card;
      }
    }

    @keyframes toggleDisplay {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
</style>
