<script lang="ts">
  import ArrowLink from '@components/atoms/ArrowLink';
  import CloseButton from '@components/atoms/CloseButton';
  import Image from '@components/atoms/Image';
  import MarkdownRenderer from '@components/molecules/MarkdownRenderer';
  import dateformat from 'dateformat';

  let {
    class: className,
    slug,
    title,
    image,
    imageAlt,
    additionalImages,
    photoDate,
    content,
  }: {
    class?: string;
    slug?: string;
    title?: string;
    image: string;
    imageAlt?: string;
    additionalImages?: Array<{ src: string; alt: string }>;
    photoDate?: Date;
    content?: string;
  } = $props();

  let isBrowser = $state(false);

  $effect(() => {
    isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      // @ts-ignore
      import('enhanced-css-slider/src/enhanced-css-slider.js');
    }
  });
</script>

<dialog class={['m-photography-slideshow-dialog', className]} id={slug}>
  <div class="m-photography-slideshow-dialog__container">
    <CloseButton {slug} />

    <div class="m-photography-slideshow-dialog__about">
      <p class="m-photography-slideshow-dialog__title">
        {title}
      </p>
      {#if photoDate}
        <div class="m-photography-slideshow-dialog__date">
          Taken on {dateformat(photoDate, 'yyyy-mm-dd', true)}
        </div>
      {/if}
      {#if content}
        <div class="m-photography-slideshow-dialog__description u-markdown">
          <MarkdownRenderer {content} />
        </div>
      {/if}
    </div>

    <enhanced-css-slider centered>
      <div class="m-photography-slideshow-dialog__list" data-slider-slot="list">
        <Image class="m-photography-slideshow-dialog__image" src={image} alt={imageAlt || ''} />
        {#each additionalImages as additionalImage}
          <Image class="m-photography-slideshow-dialog__image" src={additionalImage.src} alt={additionalImage.alt} />
        {/each}
      </div>

      <div class="m-photography-slideshow-dialog__nav">
        {#if additionalImages && additionalImages.length > 0}
          <ArrowLink
            class="m-photography-slideshow-dialog__nav-button"
            color="photography"
            data-slider-slot="prev"
            arrowPosition="left"
          >
            Previous
          </ArrowLink>
          <div class="m-photography-slideshow-dialog__dots">
            <div class="m-photography-slideshow-dialog__dot" data-slider-slot="dot"></div>
            {#each additionalImages as _}
              <div class="m-photography-slideshow-dialog__dot" data-slider-slot="dot"></div>
            {/each}
          </div>
          <ArrowLink class="m-photography-slideshow-dialog__nav-button" color="photography" data-slider-slot="next">
            Next
          </ArrowLink>
        {/if}
      </div>

      <noscript style="display: none">
        <!-- Hide JS-only elements if JavaScript is unavailable -->
        <style>
          .m-photography-slideshow-dialog__nav {
            display: none !important;
          }
          /* Show the scrollbar when JavaScript is unavailable */
          .m-photography-slideshow-dialog__list {
            scrollbar-width: auto !important; /* Firefox */
          }
          .m-photography-slideshow-dialog__list::-webkit-scrollbar {
            width: 16px !important;
            height: 8px !important;
            display: block !important;
          }
          .m-photography-slideshow-dialog__list::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1) !important;
          }
          .m-photography-slideshow-dialog__list::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.3) !important;
            border-radius: 4px !important;
          }
        </style>
      </noscript>
    </enhanced-css-slider>
  </div>
</dialog>

<style lang="scss">
  @use '/src/styles/breakpoints';
  @use '/src/styles/mixins';
  @use '/src/styles/typography';

  .m-photography-slideshow-dialog {
    width: 100vw;
    height: 100vh;
    // Use the short vh if supported (avoids iOS address bar issues)
    height: 100svh;
    background: none;
    border: none;
    padding: 0;
    max-height: unset;
    max-width: unset;

    // Animate dialog opening
    opacity: 1;
    transform: scale(1);
    transition:
      opacity 0.3s ease,
      transform 0.3s ease,
      overlay 0.3s ease allow-discrete,
      display 0.3s ease allow-discrete;

    // Starting state for opening animation
    @starting-style {
      opacity: 0;
      transform: scale(0.95);
    }

    // Closing state
    &:not([open]) {
      opacity: 0;
      transform: scale(0.95);
    }

    &::backdrop {
      background: rgba(var(--t-v6--surface--base--rgb), 0.9);
      backdrop-filter: blur(20px);
      transition:
        background 0.3s ease,
        backdrop-filter 0.3s ease,
        overlay 0.3s ease allow-discrete,
        display 0.3s ease allow-discrete;

      @starting-style {
        background: rgba(var(--t-v6--surface--base--rgb), 0);
        backdrop-filter: blur(0px);
      }
    }

    &:not([open])::backdrop {
      background: rgba(var(--t-v6--surface--base--rgb), 0);
      backdrop-filter: blur(0px);
    }

    &__container {
      height: 100%;
      padding-block: var(--spacing-lg);

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-md);
    }

    &__about {
      max-width: 480px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-xs);

      padding: var(--spacing-md) var(--spacing-md) var(--spacing-lg);
    }

    &__title {
      @include typography.h4;
      font-family: var(--font--spicy);
      color: var(--t-v6--photography);
      text-align: center;
    }

    &__date {
      @include typography.b3;
      color: var(--t-v6--text--medium);
      text-align: center;
    }

    &__description {
      @include typography.b2;
      color: var(--t-v6--text--base);
      text-align: center;
      gap: 1rem;
    }

    &__list {
      // flex: 1;
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      overscroll-behavior: contain;

      //hide scrollbar
      scrollbar-width: none; /* Firefox */
      &::-webkit-scrollbar {
        /* WebKit */
        width: 0;
        height: 0;
        display: none;
      }

      // Adds empty space to the end of the list so it centers the last item
      &:after {
        content: '';
        flex: 0 0 50%;
      }
    }

    &__nav {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--spacing-md);
    }

    &__dots {
      display: flex;
      gap: var(--spacing-xs);
    }

    &__dot {
      transition: background-color 0.2s ease;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: rgba(var(--theme--color-accent-rgb), 0.3);

      &.active {
        background-color: rgba(var(--theme--color-accent-rgb), 1);
      }
    }
    :global(.m-photography-slideshow-dialog__image) {
      @include mixins.padded-container;
      max-width: calc(1080px - var(--spacing-lg));

      scroll-snap-align: center;

      &:first-of-type {
        margin-left: 50vw;
      }
    }

    :global(.m-photography-slideshow-dialog__nav-button:disabled) {
      opacity: 0;
    }

    :global(enhanced-css-slider) {
      display: contents;
    }
  }
</style>
