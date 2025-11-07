<script lang="ts">
  import ArrowLink from '@components/atoms/ArrowLink';
  import Tag from '@components/atoms/Tag';
  import Tags from '@components/molecules/Tags';
  import MarkdownRenderer from '@components/molecules/MarkdownRenderer';
  import CoolLinkStamp from '@components/atoms/CoolLinkStamp';

  let {
    title,
    author,
    url,
    date,
    tags,
    content,
    class: className,
    ...props
  }: {
    title: string;
    author?: string;
    url: string;
    date?: string;
    tags?: (string | { name: string; slug: string; url: string })[];
    content?: string;
    class?: string;
    [key: string]: any;
  } = $props();
</script>

<article class={['m-cool-link-card', className]} {...props}>
  <div class="m-cool-link-card__container">
    <div class="m-cool-link-card__header">
      <p class="m-cool-link-card__title">
        <a class="m-cool-link-card__title-link" href={url} target="_blank" rel="noopener">{title}</a>
        {#if author}
          <span class="m-cool-link-card__author">, by {author}</span>
        {/if}
      </p>

      <CoolLinkStamp class="m-cool-link-card__badge" {date} />
      {#if tags}
        <Tags size="responsive" class="m-cool-link-card__tags">
          {#each tags as tag}
            {#if typeof tag === 'string'}
              <Tag size="small" class="m-cool-link-card__tag">#{tag}</Tag>
            {:else}
              <Tag
                size="small"
                class="m-cool-link-card__tag"
                href={tag.url}
                title={`View all cool links tagged with “${tag.name}”`}
              >
                #{tag.name}
              </Tag>
            {/if}
          {/each}
        </Tags>
      {/if}
    </div>

    {#if content}
      <div class="m-cool-link-card__content u-markdown">
        <MarkdownRenderer {content} />
      </div>
    {/if}

    <ArrowLink color="blue" class="m-cool-link-card__link" href={url} title={`Open cool link`}>Open</ArrowLink>
  </div>
</article>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .m-cool-link-card {
    border: 2px dashed var(--color--blue);
    border-radius: var(--border-radius);
    background: var(--theme--background-card-color);
    // box-shadow: var(--theme--shadow-card);
    position: relative;

    transition: all 0.25s ease-in-out;

    &__container {
      padding: var(--spacing-md);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-sm);
    }

    &__header {
      display: grid;
      grid-template-columns: 1fr 110px;
      align-items: start;
      justify-items: start;
      gap: var(--spacing-sm);
      width: 100%;
      min-height: 60px;

      @include breakpoints.for-phone-only {
        grid-template-columns: 1fr 88px;
        column-gap: 0;
      }
    }

    &__title {
      @include typography.h4;
    }

    &__title-link {
      color: var(--color--blue);
      text-decoration: underline;
      text-decoration-color: var(--color--blue);

      text-underline-offset: 0.1em;
      text-decoration-thickness: 2px;
      transition: all 0.2s ease-in-out;
    }

    &__author {
      margin-left: -4px;
    }

    &__content {
      :global(blockquote) {
        padding-left: var(--spacing-md);
        border-left: 4px solid var(--theme--border-base-color);
      }
    }
  }

  :global(.m-cool-link-card__badge) {
    margin-bottom: -100%;
    translate: 0 -15%;
    rotate: 7deg;

    @include breakpoints.for-phone-only {
      scale: 0.8;
    }
  }

  :global(.m-cool-link-card__link) {
    margin-left: auto;

    // &:before {
    //   content: '';
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 100%;
    //   z-index: 1;
    // }
  }

  @media (hover: hover) {
    :global(.m-cool-link-card:has(.m-cool-link-card__link:hover)),
    :global(.m-cool-link-card:has(.m-cool-link-card__title-link:hover)) {
      box-shadow: var(--theme--shadow-card-high);
      .m-cool-link-card__title-link {
        text-underline-offset: 0.3em;
        filter: unset;
      }
    }
  }
</style>
