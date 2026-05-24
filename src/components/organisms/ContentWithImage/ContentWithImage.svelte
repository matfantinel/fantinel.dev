<script lang="ts">
  import Button from '@components/atoms/Button';
  import type { ButtonProps } from '@components/atoms/Button';
  import Image from '@components/atoms/Image';
  import MarkdownRenderer from '@components/molecules/MarkdownRenderer';
  import PolaroidCard from '@components/molecules/PolaroidCard';
  import type { PolaroidCardProps } from '@components/molecules/PolaroidCard';
  import type { Snippet } from 'svelte';
  import type { BaseProps } from '@utils/types';

  export type ContentWithImageProps = BaseProps & {
    heading: string;
    body?: string;
    button?: ButtonProps & { icon?: any };
    secondaryButton?: ButtonProps & { icon?: any };
    image?: string;
    imageAlt?: string;
    imageBehavior?: 'cover' | 'contain';
    imagePosition?: 'before' | 'after';
    background?: 'clear' | 'card';
    animateOnEntry?: boolean;
    headingColor?: string;
    polaroidProps?: Omit<PolaroidCardProps, 'class'>;
  };

  let {
    heading,
    body,
    button,
    secondaryButton,
    image,
    imageAlt,
    imageBehavior = 'cover',
    imagePosition = 'after',
    background = 'clear',
    animateOnEntry = false,
    headingColor,
    polaroidProps,
    imageSlot,
    class: className,
  }: ContentWithImageProps & { imageSlot?: Snippet } = $props();

  let hasSlotContent = $derived(!!(imageSlot || polaroidProps));
  let resolvedImageBehavior = $derived(hasSlotContent ? 'contain' : imageBehavior);

  let classList = $derived([
    'o-content-with-image',
    `o-content-with-image--image-behavior-${resolvedImageBehavior}`,
    `o-content-with-image--image-position-${imagePosition}`,
    `o-content-with-image--background-${background}`,
    headingColor ? `o-content-with-image--heading-glow` : '',
    animateOnEntry ? 'o-content-with-image--animate-on-entry' : '',
    className,
  ]);
</script>

<div class={classList}>
  <div class="o-content-with-image__container">
    <div class="o-content-with-image__content">
      <h2
        class="o-content-with-image__heading u-h2"
        style={headingColor ? `color: var(--t--${headingColor}); --glow-color: var(--t--${headingColor}--rgb)` : ''}
      >
        {heading}
      </h2>

      {#if body}
        <div class="o-content-with-image__body u-markdown u-b2">
          <MarkdownRenderer content={body} />
        </div>
      {/if}

      {#if button || secondaryButton}
        <div class="o-content-with-image__buttons">
          {#if button}
            <Button href={button.href} color={button.color} icon={button.icon} iconPosition={button.iconPosition}>
              {button.text}
            </Button>
          {/if}

          {#if secondaryButton}
            <Button
              href={secondaryButton.href}
              color={secondaryButton.color ?? 'complementary'}
              icon={secondaryButton.icon}
              iconPosition={secondaryButton.iconPosition}
            >
              {secondaryButton.text}
            </Button>
          {/if}
        </div>
      {/if}
    </div>

    {#if imageSlot}
      <div class="o-content-with-image__image o-content-with-image__image--slot">
        {@render imageSlot()}
      </div>
    {:else if polaroidProps}
      <div class="o-content-with-image__image o-content-with-image__image--slot">
        <PolaroidCard {...polaroidProps as PolaroidCardProps} />
      </div>
    {:else if image}
      <Image class="o-content-with-image__image" src={image} alt={imageAlt ?? ''} />
    {/if}
  </div>
</div>

<style lang="scss">
  @use '/src/styles/breakpoints';
  .o-content-with-image {
    container-type: inline-size;

    &__container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: clamp(var(--spacing-md), 4cqw, var(--spacing-xl));

      align-items: center;
      justify-items: center;
      justify-content: center;
    }

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: var(--spacing-sm);

      padding-block: var(--spacing-md);
      max-width: 420px;
    }

    &__heading {
      text-wrap: pretty;
    }

    &__image--slot {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &--heading-glow {
      .o-content-with-image__heading {
        animation: var(--t--glowing-text-animation);
      }
    }

    &__body {
      text-align: left;
    }

    &__buttons {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-sm);
      margin-top: var(--spacing-sm);
    }

    &--image-position-before {
      :global(.o-content-with-image__image) {
        order: 1;
        --animation-direction: -1;
      }
      .o-content-with-image__content {
        order: 2;
        --animation-direction: 1;
      }
    }

    &--image-position-after {
      :global(.o-content-with-image__image) {
        order: 2;
        --animation-direction: 1;
      }
      .o-content-with-image__content {
        order: 1;
        --animation-direction: -1;
      }
    }

    &--image-behavior-cover {
      :global(.o-content-with-image__image) {
        border-radius: var(--border-radius);
        object-fit: cover;
      }
    }

    &--image-behavior-contain {
      // .o-content-with-image {
      //   &__container {
      //     grid-template-columns: auto auto;
      //   }
      // }
      :global(.o-content-with-image__image) {
        // padding-block: var(--spacing-md);
        width: auto;
        height: auto;
      }
      :global(.o-content-with-image__image--slot) {
        width: 100%;
        height: 100%;
      }
    }

    &--background-card {
      background: var(--t--surface--card);
      box-shadow: var(--t--shadow--base);
      border-radius: var(--border-radius);
      overflow: hidden;

      :global(.o-content-with-image__image) {
        border-radius: 0;
      }

      &.o-content-with-image--image-behavior-cover {
        .o-content-with-image {
          &__container {
            column-gap: 0;
          }
          &__content {
            padding-inline: var(--spacing-lg);
          }
        }
      }

      &.o-content-with-image--image-behavior-contain {
        .o-content-with-image {
          &__container {
            padding-inline: var(--spacing-lg);
          }
        }
      }
    }

    @container (max-width: 600px) {
      .o-content-with-image {
        &__container {
          grid-template-columns: 1fr;
        }
      }

      :global(.o-content-with-image__image) {
        order: -1;
        // --animation-direction: -1;
      }

      &.o-content-with-image--image-behavior-contain {
        :global(.o-content-with-image__image) {
          max-height: 200px;
        }
        :global(.o-content-with-image__image--slot) {
          height: 200px;
          width: 100%;
        }
      }

      &.o-content-with-image--background-card {
        &.o-content-with-image--image-position-after {
          .o-content-with-image {
            &__content {
              padding-top: var(--spacing-lg);
            }
          }
        }
      }
    }

    &--animate-on-entry {
      // @include breakpoints.for-phone-only {
      .o-content-with-image {
        &__content {
          @supports (animation-timeline: view()) {
            animation: content-slide cubic-bezier(0.175, 0.885, 0.32, 1);
            animation-fill-mode: both;
            animation-timeline: view();
            animation-range-start: cover 0%;
            animation-range-end: cover 50%;

            @include breakpoints.for-phone-only {
              animation-range-end: cover 90%;
            }
          }
        }
      }

      :global(.o-content-with-image__image) {
        @supports (animation-timeline: view()) {
          animation: content-slide cubic-bezier(0.175, 0.885, 0.32, 1);
          animation-fill-mode: both;
          animation-timeline: view();
          animation-range-start: cover 0%;
          animation-range-end: cover 50%;

          @include breakpoints.for-phone-only {
            animation-range-end: cover 90%;
          }
        }
      }
      @keyframes content-slide {
        0% {
          opacity: 0.5;
          translate: calc(50% * var(--animation-direction)) 5px;
        }
        75% {
          opacity: 1;
          translate: 0 0;
        }
      }
      // }
    }
  }
</style>
