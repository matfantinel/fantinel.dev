<script lang="ts">
  import Tag from '@components/atoms/Tag';
  import AuthorAvatar from '@components/molecules/AuthorAvatar';
  import HeroWaves from '@components/molecules/HeroWaves';
  import Tags from '@components/molecules/Tags';
  import type { SiteAuthor } from '@schemas/site-meta';
  import dateformat from 'dateformat';
  import type { BaseProps } from '@utils/types';

  export type PostHeroProps = BaseProps & {
    title: string;
    slug?: string;
    author?: SiteAuthor;
    date?: Date;
    updated?: Date;
    readingTime?: string;
    tags?: (string | { name: string; slug: string; url: string })[];
  };

  let {
    title,
    author,
    slug,
    date,
    updated,
    readingTime,
    tags,
    class: className,
  }: PostHeroProps = $props();
</script>

<div class={['o-post-hero u-content-grid', className]}>
  <div class="o-post-hero__container">
    <h1 class="o-post-hero__title">
      {title}
    </h1>

    <div class="o-post-hero__meta" data-pagefind-ignore="all">
      {#if author?.image}
        <AuthorAvatar class="o-post-hero__author-avatar" src={author.image} alt={author.name} extraImages={author.extraImages} size="small" />
      {/if}
      <div class="o-post-hero__details">
        {#if author?.name}
          <div class="o-post-hero__detail">by {author.name}</div>
        {/if}
        {#if date || readingTime}
          <div class="o-post-hero__detail">
            {[date ? dateformat(date, 'UTC:dd mmm yyyy') : undefined, readingTime ? readingTime : undefined]
              .filter(Boolean)
              .join(' - ')}
          </div>
        {/if}
        {#if updated && updated.getTime() > 86400000}
          <div class="o-post-hero__detail">Updated {dateformat(updated, 'UTC:dd mmm yyyy')}</div>
        {/if}
      </div>
    </div>

    {#if tags && tags.length > 0}
      <div class="o-post-hero__tags">
        <Tags size="responsive">
          {#each tags as tag}
            {#if typeof tag === 'string'}
              <Tag size="responsive">{tag}</Tag>
            {:else}
              <Tag size="responsive" href={tag.url} title={`View all posts in category “${tag.name}”`}>{tag.name}</Tag>
            {/if}
          {/each}
        </Tags>
      </div>
    {/if}
  </div>

  <HeroWaves />
</div>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .o-post-hero {
    --content-max-width: 790px;
    background-color: var(--t--surface--accent);
    
    position: relative;
    margin-bottom: 64px;
    
    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-lg);

      padding-block: var(--spacing-xxxl) var(--spacing-xxl);
    }

    &__title {
      @include typography.h1;
      @include typography.gradient-pinkish;
      text-align: center;
      text-wrap: balance;
      --glow-color: var(--palette--pink--rgb);
      animation: var(--t--glowing-text-animation);
    }

    &__meta {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    &__details {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    &__detail {
      @include typography.b1;
      @include typography.gradient-greenish;
    }

    @include breakpoints.for-phone-only {
      &__container {
        padding-block: var(--spacing-xxl) var(--spacing-md);
      }
      &__details {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xxs);
      }
      &__detail {
        @include typography.b3;
        font-weight: 700;
      }
      :global(.o-post-hero__author-avatar) {
        --size: 40px;
      }
    }
  }
</style>
