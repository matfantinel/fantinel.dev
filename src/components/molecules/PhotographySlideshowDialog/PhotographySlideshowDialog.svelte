<script lang="ts">
  import CloseIcon from '@assets/icons/close.svelte';
  import ArrowLink from '@components/atoms/ArrowLink';
  import Button from '@components/atoms/Button';
  import Image from '@components/atoms/Image';

  let {
    class: className,
    slug,
    image,
    imageAlt,
    additionalImages,
  }: {
    class?: string;
    slug?: string;
    image: string;
    imageAlt?: string;
    additionalImages?: Array<{ src: string; alt: string }>;
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

{#snippet closeIconSnippet()}<CloseIcon size="18px" />{/snippet}
<dialog class={['m-photography-slideshow-dialog', className]} id={slug}>
  <div class="m-photography-slideshow-dialog__container">
    <Button color="complementary" commandfor={slug} command="close" icon={closeIconSnippet}>Close</Button>
    <enhanced-css-slider>
      <div class="m-photography-slideshow-dialog__list" data-slider-slot="list">
        <Image class="m-photography-slideshow-dialog__image" src={image} alt={imageAlt || ''} />
        {#each additionalImages as additionalImage}
          <Image class="m-photography-slideshow-dialog__image" src={additionalImage.src} alt={additionalImage.alt} />
        {/each}
      </div>

      <div class="m-photography-slideshow-dialog__nav">
        {#if additionalImages && additionalImages.length > 0}
          <ArrowLink class="m-photography-slideshow-dialog__nav-button" data-slider-slot="prev" arrowPosition="left">Previous</ArrowLink>        
          <div class="m-photography-slideshow-dialog__dots">
            <div class="m-photography-slideshow-dialog__dot" data-slider-slot="dot"></div>
            {#each additionalImages as additionalImage}
              <div class="m-photography-slideshow-dialog__dot" data-slider-slot="dot"></div>
            {/each}
          </div>
          <ArrowLink class="m-photography-slideshow-dialog__nav-button" data-slider-slot="next">Next</ArrowLink>
        {/if}
      </div>
    </enhanced-css-slider>
  </div>
</dialog>

<style lang="scss">
  @use '/src/styles/breakpoints';
  @use '/src/styles/mixins';

  .m-photography-slideshow-dialog {
    width: 100vw;
    height: 100vh;
    background: none;
    border: none;
    padding: 0;
    max-height: unset;
    max-width: unset;

    &::backdrop {
      background: rgba(var(--theme--background-base-color-rgb), 0.5);
      backdrop-filter: blur(6px);
    }

    &__container {
      height: 100%;
      padding-block: var(--spacing-lg);

      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-md);
    }

    &__list {
      flex: 1;
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
