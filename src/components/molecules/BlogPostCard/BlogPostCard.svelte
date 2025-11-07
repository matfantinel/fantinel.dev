<script lang="ts">
  import ArrowLink from '@components/atoms/ArrowLink';
  import Image from '@components/atoms/Image';
  import Tag from '@components/atoms/Tag';
  import Tags from '@components/molecules/Tags';

  let {
    image,
    imageAlt,
    title,
    slug,
    readingTime,
    excerpt,
    tags,
    url,
    hideImage,
    class: className,
  }: {
    title: string;
    slug?: string;
    url: string;
    image?: string;
    imageAlt?: string;
    readingTime?: string;
    excerpt?: string;
    tags?: (string | { name: string; slug: string; url: string })[];
    hideImage?: boolean;
    class?: string;
  } = $props();
</script>

<article class={['m-blog-post-card', className]}>
  {#if !hideImage}
    <div class="m-blog-post-card__image-container">
      <div class="m-blog-post-card__image-placeholder">{title.substring(0, 5)}</div>
      {#if image}
        <Image class="m-blog-post-card__image" src={image} alt={imageAlt || title} />
      {/if}
    </div>
  {/if}
  <div class="m-blog-post-card__content">
    <p class="m-blog-post-card__title">
      {title}
    </p>
    {#if readingTime}
      <p class="m-blog-post-card__reading-time">{readingTime}</p>
    {/if}
    {#if excerpt}
      <p class="m-blog-post-card__excerpt">{excerpt}</p>
    {/if}
  </div>
  <div class="m-blog-post-card__footer">
    {#if tags}
      <Tags size="responsive" class="m-blog-post-card__tags">
        {#each tags as tag}
          {#if typeof tag === 'string'}
            <Tag size="small" class="m-blog-post-card__tag">{tag}</Tag>
          {:else}
            <Tag
              size="small"
              class="m-blog-post-card__tag"
              href={tag.url}
              title={`View all posts in category “${tag.name}”`}
            >
              {tag.name}
            </Tag>
          {/if}
        {/each}
      </Tags>
    {/if}

    <ArrowLink class="m-blog-post-card__link" href={url} title={`Open blog post`}>Read</ArrowLink>
  </div>
</article>

<style lang="scss">
  @use '/src/styles/typography';

  .m-blog-post-card {
    border-radius: var(--border-radius);
    box-shadow: var(--theme--shadow-card);
    background-color: var(--theme--background-card-color);
    overflow: hidden;
    position: relative;

    display: flex;
    flex-direction: column;
    transition: all .25s ease-in-out;

    &__image-container {
      background: var(--theme--background-card-accent-color);
      isolation: isolate;
      position: relative;
      min-height: 214px;
      aspect-ratio: 324 / 214;
    }

    &__image-placeholder {
      position: absolute;
      top: 50%;
      left: 0;
      translate: 0 -50%;
      max-height: 100%;
      max-width: 100%;
      overflow: hidden;
      z-index: -1;

      font-size: 260px;
      line-height: 1;
      font-family: var(--font--headings);
      font-weight: 700;
      color: transparent;
      text-shadow:
        0px 4px 4px var(--theme--color-inner-text-shadow-light),
        0 0 18px var(--theme--color-inner-text-shadow),
        0px 4px 4px var(--theme--color-inner-text-shadow-light);
    }

    :global(.m-blog-post-card__image) {
      object-fit: cover;
    }

    :global(.m-cool-links-image) {
      pointer-events: none;
    }

    &__content {
      padding: var(--spacing-md) var(--spacing-md) 0;
      flex-grow: 1;
      background-color: var(--theme--background-card-color);

      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    &__title {
      @include typography.h4;
    }

    &__reading-time {
      @include typography.b3;
      color: var(--theme--text-accent-color);
    }

    &__excerpt {
      @include typography.b2;
      text-align: justify;

      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }

    &__footer {
      padding: var(--spacing-md);

      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--spacing-xs);
    }

    :global(.m-blog-post-card__link) {
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

    :global(.m-blog-post-card__tags) {
      justify-content: flex-start;
      flex-wrap: nowrap;
      z-index: 2;
    }
  }

  @media (hover: hover) {
    :global(.m-blog-post-card:has(.m-blog-post-card__link:hover)) {
      box-shadow: var(--theme--shadow-card-high);
    }
  }
</style>
