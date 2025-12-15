<script lang="ts">
  import FooterWaves from '@assets/brand/FooterWaves.svelte';
  import Tag from '@components/atoms/Tag';
  import Tags from '@components/molecules/Tags';
  import Image from '@components/atoms/Image';
  import Button from '@components/atoms/Button';
  import GithubSlugger from 'github-slugger';
  const slugger = new GithubSlugger();

  type TagGroup = {
    label: string;
    tags: (string | { name: string; slug: string; url: string; active?: boolean })[];
  };

  let {
    title,
    body,
    button,
    tagGroups,
    image,
    class: className,
  }: {
    title: string;
    body?: string;
    button?: { label: string; href: string; color?: string };
    tagGroups?: TagGroup[];
    image?: string;
    class?: string;
  } = $props();

  let classList = $derived(['o-archive-hero', image ? 'o-archive-hero--has-image' : '', className]);

  const slug = slugger.slug(title);
</script>

<div class={classList} style={`view-transition-name: archive-hero-${slug}`}>
  <div class="o-archive-hero__container">
    <div class="o-archive-hero__main u-container">
      <div class="o-archive-hero__content">
        <h1 class="o-archive-hero__title">
          {title}
        </h1>

        {#if body}
          <p class="o-archive-hero__body">
            {body}
          </p>
        {/if}

        {#if button}
          <Button class="o-archive-hero__button" href={button.href} color={button.color as any}>
            {button.label}
          </Button>
        {/if}
      </div>

      {#if image}
        <Image class="o-archive-hero__image" src={image} alt={title} />
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

  <div class="o-archive-hero__waves-container" aria-hidden="true">
    <FooterWaves class="o-archive-hero__waves" opacity={1} forceGray invertWaveColors />
  </div>
  <div class="u-noise"></div>
</div>

<style lang="scss">
  @use '/src/styles/_mixins';
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .o-archive-hero {
    background-color: var(--theme--background-accent-color);
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    margin-top: calc(var(--spacing-lg) * -1);
    margin-left: -1px;
    position: relative;
    overflow: hidden;

    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-lg);

      padding-block: var(--spacing-xxxl) calc(var(--spacing-xxl) + 200px);

      @include breakpoints.for-phone-only {
        padding-block: var(--spacing-xxl) calc(var(--spacing-xxl) + 30px);
      }
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

      color: var(--theme--color-accent);
      --glow-color: var(--theme--color-accent-rgb);
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

    &__waves-container {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 200px;
      z-index: -1;

      @include breakpoints.for-phone-only {
        height: 180px;
        bottom: -100px;
      }

      :global(.o-archive-hero__waves) {
        width: 100%;
        height: 100%;
        display: block;

        --theme--color-footer--wave-1: var(--theme--background-base-color) !important;
      }
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
