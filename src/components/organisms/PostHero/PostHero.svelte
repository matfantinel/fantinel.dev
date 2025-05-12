<script lang="ts">
  import Tag from '@components/atoms/Tag';
  import Tags from '@components/molecules/Tags';
  import dateformat from 'dateformat';

  let {
    title,
    author,
    date,
    readingTime,
    tags,
    class: className,
  }: {
    title: string;
    author?: {
      name: string;
      image: string;
    };
    date?: Date;
    readingTime?: string;
    tags?: string[];
    class?: string;
  } = $props();
</script>

<div class={['o-post-hero', className]}>
  <div class="o-post-hero__container u-container-small">
    <h1 class="o-post-hero__title">{title}</h1>

    <div class="o-post-hero__meta">
      {#if author?.image}
        <img class="o-post-hero__author-image" src={author.image} alt={author.name} />
      {/if}
      <div class="o-post-hero__details">
        {#if author?.name}
          <div class="o-post-hero__detail">by {author.name}</div>
        {/if}
        {#if date || readingTime}
          <div class="o-post-hero__detail">
            {[
              date ? dateformat(date, 'UTC:dd mmm yyyy') : undefined,
              readingTime ? readingTime : undefined,
            ]
              .filter(Boolean)
              .join(' - ')}
          </div>
        {/if}
      </div>
    </div>

    {#if tags && tags.length > 0}
      <div class="o-post-hero__tags">
        <Tags size="responsive">
          {#each tags as tag}
            <Tag size="responsive">{tag}</Tag>
          {/each}
        </Tags>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @use '@styles/_typography.scss';
  @use '@styles/_breakpoints.scss';

  .o-post-hero {
    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-lg);

      padding-block: var(--spacing-xxl);

      @include breakpoints.for-phone-only {
        padding-block: var(--spacing-xl);
      }
    }

    &__title {
      @include typography.h1;
      @include typography.gradient-pinkish;
      text-align: center;
      text-wrap: balance;
    }

    &__meta {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    &__author-image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      margin: 0;
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
  }
</style>
