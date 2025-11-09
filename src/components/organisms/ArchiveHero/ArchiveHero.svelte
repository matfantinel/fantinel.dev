<script lang="ts">
  import Tag from '@components/atoms/Tag';
  import Tags from '@components/molecules/Tags';
  import Image from '@components/atoms/Image';

  type TagGroup = {
    label: string;
    tags: (string | { name: string; slug: string; url: string; active?: boolean })[];
  };

  let {
    title,
    body,
    tagGroups,
    image,
    postType = 'blog',
    class: className,
  }: {
    title: string;
    body?: string;
    tagGroups?: TagGroup[];
    image?: string;
    postType?: 'blog' | 'cool-link' | 'quick-review' | 'photography';
    class?: string;
  } = $props();

  // Determine title color based on post type
  const titleColorClass = $derived(() => {
    switch (postType) {
      case 'blog':
        return 'o-archive-hero__title--teal';
      case 'cool-link':
        return 'o-archive-hero__title--blue';
      case 'quick-review':
        return 'o-archive-hero__title--peach';
      case 'photography':
        return 'o-archive-hero__title--maroon';
      default:
        return 'o-archive-hero__title--teal';
    }
  });

  let classList = $derived(['o-archive-hero', image ? 'o-archive-hero--has-image' : '', className]);
</script>

<div class={classList}>
  <div class="o-archive-hero__container">
    <div class="o-archive-hero__main u-container">
      <div class="o-archive-hero__content">
        <h1 class={['o-archive-hero__title', titleColorClass()]}>
          {title}
        </h1>

        {#if body}
          <p class="o-archive-hero__body">
            {body}
          </p>
        {/if}
      </div>

      {#if image}
        <Image class="o-archive-hero__image" src={image} alt={title} style={`view-transition-name: archive-hero-image`} />
      {/if}
    </div>

    {#if tagGroups && tagGroups.length > 0}
      <div class="o-archive-hero__tag-groups u-container-small">
        {#each tagGroups as group}
          <div class="o-archive-hero__tag-group">
            <h3 class="o-archive-hero__tag-group-label">{group.label}</h3>
            <Tags size="responsive">
              {#each group.tags as tag}
                {#if typeof tag === 'string'}
                  <Tag size="responsive">{tag}</Tag>
                {:else}
                  <Tag
                    size="responsive"
                    href={tag.url}
                    selected={tag.active}
                    title={`View all posts in category "${tag.name}"`}
                    style={`view-transition-name: tag-${tag.name.replace('#', '')}`}
                  >
                    {tag.name}
                  </Tag>
                {/if}
              {/each}
            </Tags>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @use '/src/styles/_mixins';
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .o-archive-hero {
    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-lg);

      padding-block: var(--spacing-xxl);
    }

    &__main {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-xl);
      width: 100%;
    }

    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-md);
      max-width: 620px;
      flex: 1;
    }

    :global(.o-archive-hero__image) {
      display: none;
      border-radius: var(--border-radius--small);
    }

    &__title {
      @include typography.h1;
      text-align: center;
      text-wrap: balance;
      animation: var(--theme--glowing-text-animation);

      &--teal {
        color: var(--color--teal);
      }

      &--blue {
        color: var(--color--blue);
        --glow-color: var(--color--blue-rgb);
      }

      &--peach {
        color: var(--color--peach);
        --glow-color: var(--color--peach-rgb);
      }

      &--maroon {
        color: var(--color--maroon);
        --glow-color: var(--color--maroon-rgb);
      }
    }

    &__body {
      @include typography.b1;
      text-align: center;
    }

    &__tag-groups {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      width: 100%;
    }

    &__tag-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-sm);
    }

    &__tag-group-label {
      font-family: var(--font--mono);
      font-size: 1rem;
      color: var(--theme--text-accent-color);
      font-weight: 600;
      margin-top: var(--spacing-sm);
    }

    &--has-image {
      @include breakpoints.for-tablet-portrait-up {
        .o-archive-hero {
          &__main {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: start;
            justify-items: center;
          }

          &__content {
            align-items: flex-start;
            justify-content: flex-start;
            max-width: 480px;
          }

          &__title,
          &__body {
            text-align: left;
          }
        }
        :global(.o-archive-hero__image) {
          display: block;
        }
      }
    }
  }
</style>
