<script lang="ts">
  import MarkdownRenderer from '@components/molecules/MarkdownRenderer';
  import PhotographyThumbnail from '@components/molecules/PhotographyThumbnail';
  import dateformat from 'dateformat';
  import ArrowLink from '@components/atoms/ArrowLink';

  let {
    title,
    slug,
    content,
    photoDate,
    publishedDate,
    image,
    imageAlt,
    additionalImages,
    url,
    immersive,
    class: className,
  }: {
    title: string;
    slug?: string;
    content: string;
    photoDate?: Date;
    publishedDate?: Date;
    image: string;
    imageAlt?: string;
    additionalImages?: Array<{ src: string; alt: string }>;
    url?: string;
    immersive?: boolean;
    class?: string;
  } = $props();

  let classList = $derived(['m-photography-card', immersive ? 'm-photography-card--immersive' : '', className]);

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

<article class={classList}>
  <div class="m-photography-card__container">
    <PhotographyThumbnail
      class="m-photography-card__thumbnail"
      {image}
      {imageAlt}
      {additionalImages}
      {photoDate}
      {content}
      {url}
    />

    <div class="m-photography-card__content">
      <p class="m-photography-card__title">
        {title}
      </p>
      {#if photoDate}
        <div class="m-photography-card__date">
          Taken on {dateformat(photoDate, 'yyyy-mm-dd', true)}
        </div>
      {/if}
      {#if content}
        <div class="m-photography-card__description u-markdown">
          <MarkdownRenderer {content} />
        </div>
      {/if}
      {#if !supportsInvokerCommands}
        <div class="m-photography-card__footer">
          {#if url}
            <ArrowLink class="m-photography-card__link" color="photography" href={url} title={`View photography`}>View</ArrowLink>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</article>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .m-photography-card {
    border-radius: var(--border-radius);
    box-shadow: var(--t-v6--shadow--base);
    background-color: var(--t-v6--surface--card);
    overflow: hidden;
    position: relative;

    container-type: inline-size;
    width: 100%;

    transition: all 0.25s ease-in-out;

    &__container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    :global(.m-photography-card__thumbnail) {
      isolation: isolate;
      position: relative;
      min-height: 214px;
      aspect-ratio: 324 / 214;
    }

    &__content {
      padding: var(--spacing-md) var(--spacing-md) var(--spacing-lg);
      flex-grow: 1;
      background-color: var(--t-v6--surface--card);

      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    &__title {
      @include typography.h4;
      font-family: var(--font--spicy);
      color: var(--t-v6--photography);
    }

    &__date {
      @include typography.b3;
      color: var(--t-v6--text--medium);
    }

    &__description {
      @include typography.b2;
      text-align: justify;
    }

    &__footer {
      margin-top: var(--spacing-md);
      margin-left: auto;
    }

    &:not(.m-photography-card--immersive) {
      @container (min-width: 600px) {
        .m-photography-card {
          &__container {
            display: grid;
            grid-template-columns: 50% 50%;
            grid-template-rows: 1fr;
          }
        }

        :global(.m-photography-card__thumbnail) {
          aspect-ratio: unset;
        }
      }
    } 

    &--immersive {
      @media (hover: hover) {
        .m-photography-card {
          &__container {
            flex-direction: row;
          }
          &__content {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;

            padding: var(--spacing-sm);

            background: var(--t-v6--surface--card);
            translate: 0 100%;
            transition: 0.25s ease-out;

            &:not(:has(.m-photography-card__link)) {
              pointer-events: none;
            }
          }

          &__description {
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            text-align: left;
          }
        }

        :global(.m-photography-card__thumbnail) {
          aspect-ratio: 3/4;
          width: auto;
          height: auto;
        }

        &:hover {
          .m-photography-card {
            &__content {
              translate: 0 0;
            }
          }
        }
      }
    }
  }
</style>
