<script lang="ts">
  import MarkdownRenderer from '@components/molecules/MarkdownRenderer';
  import PhotographyThumbnail from '@components/molecules/PhotographyThumbnail';
  import dateformat from 'dateformat';

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

  let classList = $derived(['m-new-photography-card', immersive ? 'm-new-photography-card--immersive' : '', className]);
</script>

<article class={classList}>
  <div class="m-new-photography-card__container">
    <PhotographyThumbnail
      class="m-new-photography-card__thumbnail"
      {image}
      {imageAlt}
      {additionalImages}
      {photoDate}
      {content}
      {url}
    />

    <div class="m-new-photography-card__content">
      <p class="m-new-photography-card__title">
        {title}
      </p>
      {#if photoDate}
        <div class="m-new-photography-card__date">
          Taken on {dateformat(photoDate, 'yyyy-mm-dd', true)}
        </div>
      {/if}
      {#if content}
        <div class="m-new-photography-card__description u-markdown">
          <MarkdownRenderer {content} />
        </div>
      {/if}
    </div>
  </div>
</article>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .m-new-photography-card {
    border-radius: var(--border-radius);
    box-shadow: var(--theme--shadow-card);
    background-color: var(--theme--background-card-color);
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

    :global(.m-new-photography-card__thumbnail) {
      isolation: isolate;
      position: relative;
      min-height: 214px;
      aspect-ratio: 324 / 214;
    }

    &__content {
      padding: var(--spacing-md) var(--spacing-md) var(--spacing-lg);
      flex-grow: 1;
      background-color: var(--theme--background-card-color);

      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    &__title {
      @include typography.h4;
      font-family: var(--font--spicy);
      color: var(--theme--color-photography);
    }

    &__date {
      @include typography.b3;
      color: var(--theme--text-accent-color);
    }

    &__description {
      @include typography.b2;
      text-align: justify;

      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    :global(.m-new-photography-card__link) {
      margin-left: auto;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      }
    }

    @container (min-width: 600px) {
      .m-new-photography-card {
        &__container {
          display: grid;
          grid-template-columns: 50% 50%;
          grid-template-rows: 1fr;
        }
      }

      :global(.m-new-photography-card__thumbnail) {
        aspect-ratio: unset;
      }
    }

    &--immersive {
      @media (hover: hover) {        
        .m-new-photography-card {
          &__container {
            flex-direction: row;
          }
          &__content {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;

            padding: var(--spacing-sm);

            background: var(--theme--background-card-color);
            translate: 0 100%;
            transition: 0.25s ease-out;

            pointer-events: none;
          }
        }

        :global(.m-new-photography-card__thumbnail) {
          aspect-ratio: 3/4;
          width: auto;
          height: auto;
        }

        &:hover {
          .m-new-photography-card {
            &__content {
              translate: 0 0;
            }
          }
        }
      }
    }
  }
</style>
