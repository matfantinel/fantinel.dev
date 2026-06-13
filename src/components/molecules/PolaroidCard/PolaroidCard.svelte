<script lang="ts">
  import Image from '@components/atoms/Image';
  import MarkdownRenderer from '@components/molecules/MarkdownRenderer';
  import dateformat from 'dateformat';
  import type { BaseProps } from '@utils/types';
  import { onMount } from 'svelte';

  export type PolaroidCardProps = BaseProps & {
    title: string;
    image: string;
    imageAlt?: string;
    content?: string;
    photoDate?: Date;
    rotation?: number;
  };

  let { title, image, imageAlt, content, photoDate, rotation = 0, class: className }: PolaroidCardProps = $props();

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

  let scaleContainer: HTMLElement;

  onMount(() => {
    const setScale = (width: number, height: number) => {
      const scale = Math.min(width / 350, height / 420);
      scaleContainer.style.setProperty('--polaroid-scale', scale.toString());
    };

    const { width, height } = scaleContainer.getBoundingClientRect();
    setScale(width, height);

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setScale(width, height);
    });
    observer.observe(scaleContainer);
    return () => observer.disconnect();
  });

  let hasContent = $derived(!!(photoDate || content));
  let tag = $derived(hasContent ? 'button' : 'article');
</script>

<div class="m-polaroid-card__scale-container" bind:this={scaleContainer}>
  <svelte:element
    this={tag}
    class={classList}
    style="--polaroid-rotation: {rotation}deg"
    role={hasContent ? 'button' : 'article'}
    aria-label={hasContent ? `View details for ${title}` : undefined}
    {...hasContent ? { type: 'button' } : {}}
  >
    <div class="m-polaroid-card__quadrant left" aria-hidden="true"></div>
    <div class="m-polaroid-card__quadrant right" aria-hidden="true"></div>
    <div class="m-polaroid-card__container">
      <div class="m-polaroid-card__front">
        <div class="m-polaroid-card__image-area">
          <Image class="m-polaroid-card__image" src={image} alt={imageAlt || title} />
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
  </svelte:element>
</div>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .m-polaroid-card__scale-container {
    display: flex;
    align-items: center;
    justify-content: center;

    container-type: size;
    width: min(350px, 100%);
    max-width: 350px;
    height: min(420px, 100%);
    max-height: 420px;

    //
    // Dividing two length values in calc() produces a <length>, not a <number>,
    // so this is technically invalid CSS — scale expects a unitless <number>.
    // Firefox correctly rejects it; Chromium and Safari accept it anyway.
    // I added some JS code above that does the same thing, but I'm keeping this here
    // to make sure it will correctly scale, at least in Chromium/Safari, if JS is disabled.
    //
    --polaroid-scale: min(calc(100cqw / 350px), calc(100cqh / 420px));
  }

  .m-polaroid-card {
    width: 350px;
    height: 420px;
    transform-origin: center;
    scale: var(--polaroid-scale, 1);
    aspect-ratio: 350 / 420;

    border: none;
    appearance: none;
    background: transparent;

    rotate: var(--polaroid-rotation, 0deg);

    transition: all 0.5s ease-out;

    display: grid;
    grid-template-columns: 1fr 1fr;

    &__container {
      grid-column: 1 / 3;
      grid-row: 1;
      padding: var(--spacing-sm);
      background: #ffffff;
      box-shadow: var(--t--shadow--base);

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

    &__quadrant {
      z-index: 9;

      &.left {
        grid-column: 1;
        grid-row: 1;
      }

      &.right {
        grid-column: 2;
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
      transition-delay: 0.25s;
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
      color: #4c4f69;
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
      font-family: var(--font--mono);
      color: #5c5f77;
    }

    &__description {
      @include typography.b1;
      font-weight: 500;
      font-family: var(--font--mono);
      text-align: left;
      color: #4c4f69;
    }

    @mixin turned-around-card {
      .m-polaroid-card {
        &__container {
          transform: scaleX(-1);
        }

        &__front {
          opacity: 0;
          transition-delay: 0s;
        }

        &__back {
          animation: toggleDisplay 0.175s forwards;
          animation-delay: 0.25s;
        }
      }
    }

    &--has-back {
      &:active,
      &:focus-within {
        @include turned-around-card;
      }
    }

    &:has(.m-polaroid-card__quadrant.left:hover) {
      transform: rotateX(15deg) rotateY(-10deg);
    }
    &:has(.m-polaroid-card__quadrant.right:hover) {
      transform: rotateX(15deg) rotateY(10deg);
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
