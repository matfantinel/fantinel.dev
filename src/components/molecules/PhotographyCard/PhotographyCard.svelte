<script lang="ts">
  import Image from '@components/atoms/Image';
  import dateformat from 'dateformat';
  import MarkdownRenderer from '@components/molecules/MarkdownRenderer';

  let {
    title,
    slug,
    content,
    photoDate,
    publishedDate,
    image,
    imageAlt,
    additionalImages,
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
    class?: string;
  } = $props();

  let classList = $derived(['m-photography-card', className]);
  let isBrowser = $state(false);

  $effect(() => {
    isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      // @ts-ignore
      import('@utils/dialog-image.js');
    }
  });
</script>

<article class={classList}>
  <div class="m-photography-card__container">
    {#if isBrowser}
      <dialog-image>
        <Image class="m-photography-card__image" src={image} alt={imageAlt ? imageAlt : content} />
      </dialog-image>
    {:else}
      <Image class="m-photography-card__image" src={image} alt={imageAlt ? imageAlt : content} />
    {/if}

    <div class="m-photography-card__footer">
      <p class="m-photography-card__title">
        {title}
      </p>
      {#if content}
        <div class="m-photography-card__content u-markdown">
          <MarkdownRenderer {content} />
        </div>
      {/if}
      {#if photoDate}
        <div class="m-photography-card__date">
          {dateformat(photoDate, 'yyyy-mm-dd', true)}
        </div>
      {/if}
    </div>

    {#if photoDate}
      <div class="m-photography-card__date-cool">
        {dateformat(photoDate, 'yyyy-mm-dd', true)}
      </div>
    {/if}
  </div>
</article>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .m-photography-card {
    border-radius: var(--border-radius);
    box-shadow: var(--theme--shadow-card);
    background-color: var(--theme--background-card-color);
    overflow: hidden;
    position: relative;
    width: 100%;

    container-type: inline-size;

    &__container {
      --container-padding: var(--spacing-sm);
      padding: var(--container-padding);

      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs) var(--spacing-md);
    }

    :global(.m-photography-card__image) {
      transition: 0.15s ease-in-out;
      border-radius: var(--border-radius--small);
    }

    &__footer {
      display: flex;
      flex-direction: column;
      padding-bottom: var(--spacing-xs);
    }

    &__title {
      font-family: var(--font--spicy);
      font-size: clamp(1.25rem, 1.4vw + 1rem, 1.75rem); //28px
      font-weight: 600;
      // color: var(--theme--text-base-color);
      color: var(--color--maroon);
    }

    &__date {
      font-family: var(--font--mono);
      font-size: 0.875rem; //14px
      font-weight: 500;
      color: var(--theme--text-accent-color);
      display: none;
    }

    &__date-cool {
      font-family: var(--font--mono);
      font-size: 1rem;
      font-weight: 700;
      color: #fee92f;
      text-shadow: 0 0 6px black;
      position: absolute;
      top: calc(var(--container-padding) + var(--spacing-xs));
      right: calc(var(--container-padding) + var(--spacing-xs));
      opacity: 0.8;
    }

    &__content {
      color: var(--theme--text-accent-color);
    }

    @container (min-width: 1000px) {
      &__container {
        flex-direction: row;
      }

      :global(.m-photography-card__image) {
        max-width: 60%;
        max-height: 440px;
        width: auto;
      }

      &__date-cool {
        display: none;
      }

      &__date {
        display: block;
      }
    }

    @container (max-width: 999px) {
      @media (hover: hover) {
        &:hover {
          .m-photography-card {
            &__footer {
              translate: 0 0;
            }
          }
        }

        .m-photography-card {
          &__container {
            --container-padding: 0px;
          }
          &__footer {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;

            padding: var(--spacing-sm);

            background: rgba(var(--theme--background-card-color-rgb), 0.8);

            translate: 0 100%;
            transition: 0.25s ease-in-out;
          }
        }
      }
    }
  }
</style>
