<script lang="ts">
  import ArrowLink from '@components/atoms/ArrowLink';
  import { PostType } from '@schemas/post-types';
  import Image from '@components/atoms/Image';
  import CoolLinkIcon from '@assets/icons/post-types/cool-link.svelte';
  import PhotographyIcon from '@assets/icons/post-types/photography.svelte';
  import BlogPostIcon from '@assets/icons/post-types/post.svelte';
  import QuickReviewIcon from '@assets/icons/post-types/quick-review.svelte';

  let {
    type,
    title,
    excerpt,
    url,
    subResults,
    image,
    imageAlt,
    class: className,
  }: {
    type?: PostType;
    title: string;
    url: string;
    image?: string;
    imageAlt?: string;
    excerpt?: string;
    subResults?: {
      excerpt: string;
    }[];
    class?: string;
  } = $props();
</script>

<article class={['m-search-result', className]}>
  <div class="m-search-result__container" style={`--tint: var(--t-v6--${type}--rgb, var(--t-v6--accent--rgb))`}>
    <div class="m-search-result__image-container">
      <div class="m-search-result__image-placeholder">{title.substring(0, 5)}</div>
      {#if image}
        <Image class="m-search-result__image" src={image} alt={imageAlt || title} />
      {/if}
    </div>

    <div class="m-search-result__content">
      {#if type}
        <div class="m-search-result__type" style="color: var(--t-v6--{type}, var(--t-v6--text--base))">
          {#if type === PostType.BLOG_POST}
            <BlogPostIcon size="16px" /> Blog Post
          {:else if type === PostType.QUICK_REVIEW}
            <QuickReviewIcon size="16px" /> Quick Review
          {:else if type === PostType.COOL_LINK}
            <CoolLinkIcon size="16px" /> Cool Link
          {:else if type === PostType.PHOTOGRAPHY}
            <PhotographyIcon size="16px" /> Photography
          {:else if type === PostType.PAGE}
            Page
          {/if}
        </div>
      {/if}

      <p class="m-search-result__title">
        {title}
      </p>
      {#if subResults && subResults.length}
        {#each subResults.slice(0, 3) as subResult}
          <p class="m-search-result__excerpt">“(...) {@html subResult.excerpt} (...)”</p>
        {/each}
      {:else if excerpt}
        <p class="m-search-result__excerpt">“(...) {@html excerpt} (...)”</p>
      {/if}

      {#if url}
        <div class="m-search-result__footer">
          <ArrowLink class="m-search-result__link" href={url} title={`Open ${type || 'item'}`} color={type as any}>
            View
          </ArrowLink>
        </div>
      {/if}
    </div>
  </div>
</article>

<style lang="scss">
  @use '/src/styles/typography';

  .m-search-result {
    width: 100%;    

    &__container {
      width: 100%;
      container-type: inline-size;

      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-md);
      padding: var(--spacing-md);      

      background: var(--t-v6--surface--accent);
      border-top: 1px solid var(--t-v6--border--medium);
      border-bottom: 1px solid var(--t-v6--border--medium);

      isolation: isolate;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        transition: all 0.25s ease;
        opacity: 0;
        background: linear-gradient(
          to top,
          rgba(var(--tint), 0.1) 0%,
          transparent 40%,
          transparent 100%
        );
      }
    }

    &__image-container {
      background: var(--t-v6--surface--base);
      isolation: isolate;
      position: relative;
      height: 160px;
      aspect-ratio: 1 / 1;
      border-radius: var(--border-radius--small);
      overflow: hidden;
      container-type: inline-size;
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

      font-size: 160px;
      font-size: 100cqw;
      line-height: 1;
      font-family: var(--font--headings);
      font-weight: 700;
      color: transparent;
      text-shadow: var(--t-v6--blog-card-placeholder-shadow);
    }

    :global(.m-search-result__image) {
      object-fit: cover;
      background-color: var(--t-v6--surface--base);
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);

      flex: 1 0 220px;
    }

    &__type {
      @include typography.b3;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-xxs);
      width: fit-content;
    }

    &__title {
      @include typography.h4;
    }

    &__excerpt {
      @include typography.b2;
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: auto;
    }

    :global(.m-search-result__link) {
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

    @container (max-width: 500px) {
      &__image-container {
        height: min(30vw, 160px);

        &:not(:has(img)) {
          display: none;
        }
      }
      &__content {
        flex: 1 0 100%;
      }
    }
  }

  @media (hover: hover) {
    :global(.m-search-result:has(.m-search-result__link:hover)) {
      .m-search-result__container:before {
        opacity: 1;
      }
    }
  }
</style>
