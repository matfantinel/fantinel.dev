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
    class: className,
  }: {
    title: string;
    slug?: string;
    content: string;
    photoDate?: Date;
    publishedDate?: Date;
    image: string;
    imageAlt?: string;
    class?: string;
  } = $props();

  let classList = $derived(['m-photography-card', className]);
  let isBrowser = $state(false);

  $effect(() => {
    isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
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

    container-type: inline-size;

    &__container {
      padding: var(--spacing-sm);

      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs) var(--spacing-md);
    }

    :global(.m-photography-card__image) {
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
      font-family: var(--font--spicy);
      font-size: 0.875rem; //14px
      font-weight: 500;
      color: var(--theme--text-accent-color);
    }

    &__content {
      font-family: var(--font--spicy);
      color: var(--theme--text-accent-color);
    }

    @container (min-width: 600px) {
      &__container {
        flex-direction: row;
      }

      :global(.m-photography-card__image) {
        max-width: 60%;
        max-height: 440px;
        width: auto;
      }
    }
  }
</style>
