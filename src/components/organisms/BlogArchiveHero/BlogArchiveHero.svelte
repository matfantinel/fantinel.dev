<script lang="ts">
  import Tag from '@components/atoms/Tag';
  import Tags from '@components/molecules/Tags';

  let {
    title,
    body,
    tags,
    class: className,
  }: {
    title: string;
    body?: string;
    tags?: (string | { name: string; slug: string; url: string; active?: boolean })[];
    class?: string;
  } = $props();
</script>

<div class={['o-blog-archive-hero', className]}>
  <div class="o-blog-archive-hero__container u-container-small">
    <div class="o-blog-archive-hero__content">
      <h1 class="o-blog-archive-hero__title">
        {title}
      </h1>

      {#if body}
        <p class="o-blog-archive-hero__body">
          {body}
        </p>
      {/if}
    </div>

    {#if tags && tags.length > 0}
      <div class="o-blog-archive-hero__tags">
        <Tags size="responsive">
          {#each tags as tag}
            {#if typeof tag === 'string'}
              <Tag size="responsive">{tag}</Tag>
            {:else}
              <Tag
                size="responsive"
                href={tag.url}
                selected={tag.active}
                title={`View all posts in category “${tag.name}”`}
              >
                {tag.name}
              </Tag>
            {/if}
          {/each}
        </Tags>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .o-blog-archive-hero {
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

    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-md);
      max-width: 620px;
    }

    &__title {
      @include typography.h1;
      color: var(--theme--color-accent);
      text-align: center;
      text-wrap: balance;
      animation:var(--theme--glowing-text-animation);
    }

    &__body {
      @include typography.b1;
      text-align: center;
    }
  }  
</style>
