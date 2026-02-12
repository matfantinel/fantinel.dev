<script lang="ts">
  import PhotographyIcon from '@assets/icons/post-types/photography.svelte';
  import Image from '@components/atoms/Image';
  import Tag from '@components/atoms/Tag';
  import PhotographySlideshowDialog from '@components/molecules/PhotographySlideshowDialog';

  let {
    class: className,
    slug,
    image,
    imageAlt,
    additionalImages,
    url,
  }: {
    class?: string;
    slug?: string;
    image: string;
    imageAlt?: string;
    additionalImages?: Array<{ src: string; alt: string }>;
    url?: string;
  } = $props();

  // If slug is null, set a random id to it
  if (!slug) {
    slug = `photography-thumbnail-${Math.random()}`;
  }

  // Feature detect Invoker Commands API support
  let supportsInvokerCommands = $state(false);

  $effect(() => {
    if (typeof window !== 'undefined') {
      supportsInvokerCommands = 'commandForElement' in HTMLButtonElement.prototype;
    }
  });
</script>

{#snippet photographyIconSnippet()}<PhotographyIcon size="18px" />{/snippet}

{#snippet thumbnailContent()}
  <div class="m-photography-thumbnail__container">
    <Image
      class="m-photography-thumbnail__image m-photography-thumbnail__main-image"
      src={image}
      alt={imageAlt || ''}
    />
    {#if additionalImages && additionalImages.length > 0}
      <div class="m-photography-thumbnail__additional-images">
        {#each additionalImages.slice(0, 2) as additionalImage}
          <Image class="m-photography-thumbnail__image" src={additionalImage.src} alt={additionalImage.alt} />
        {/each}

        <Tag class="m-photography-thumbnail__total" icon={photographyIconSnippet}>
          {additionalImages.length + 1} photos
        </Tag>
      </div>
    {/if}
  </div>
{/snippet}

<div class={['m-photography-thumbnail', className]}>
  {#if supportsInvokerCommands}
    <button class="m-photography-thumbnail__zoom-button" aria-label="Zoom image" commandfor={slug} command="show-modal">
      {@render thumbnailContent()}
    </button>
  {:else}
    <a class="m-photography-thumbnail__zoom-button" href={url} aria-label="Open image">
      {@render thumbnailContent()}
    </a>
  {/if}
</div>

<PhotographySlideshowDialog {slug} {image} {imageAlt} {additionalImages} />

<style lang="scss">
  @use '/src/styles/breakpoints';
  @use '/src/styles/mixins';

  .m-photography-thumbnail {
    width: 100%;
    height: 100%;

    &__container {
      display: grid;
      grid-template-columns: 60% 40%;
      width: 100%;
      height: 100%;

      overflow: clip;
    }

    &__additional-images {
      display: grid;
      position: relative;
    }

    :global(.m-photography-thumbnail__image) {
      object-fit: cover;
      transition: all 0.2s ease-in-out;
    }

    &__zoom-button {      
      -webkit-appearance: none;
      appearance: none;
      border: none;
      background: none;
      padding: 0;
      overflow: clip;

      cursor: zoom-in;

      width: 100%;
      height: 100%;
    }

    :global(.m-photography-thumbnail__main-image) {
      &:last-child {
        grid-column: span 2;
      }
    }

    :global(.m-photography-thumbnail__total) {
      transition: all 0.2s ease-in-out;
      position: absolute;
      width: max-content;
      right: var(--spacing-md);
      bottom: var(--spacing-md);

      box-shadow: var(--theme--shadow-card-high);
      z-index: 3;
    }
  }
</style>
