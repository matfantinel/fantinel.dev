<script lang="ts">
  import CoolLinkIcon from '@assets/icons/post-types/cool-link.svelte';
  import PhotographyIcon from '@assets/icons/post-types/photography.svelte';
  import BlogPostIcon from '@assets/icons/post-types/post.svelte';
  import QuickReviewIcon from '@assets/icons/post-types/quick-review.svelte';
  import AuthorAvatar from '@components/molecules/AuthorAvatar';
  import BlogPostCard from '@components/molecules/BlogPostCard';
  import CoolLinkCard from '@components/molecules/CoolLinkCard';
  import PhotographyCard from '@components/molecules/PhotographyCard';
  import QuickReviewCard from '@components/molecules/QuickReviewCard';
  import metaConfig from '@public/cms/meta.yml';
  import type { BlogPost } from '@schemas/blog';
  import type { CoolLink } from '@schemas/cool-link';
  import type { Photography } from '@schemas/photography';
  import { PostType } from '@schemas/post-types';
  import type { QuickReview } from '@schemas/quick-review';
  import type { SiteMeta } from '@schemas/site-meta';
  import {
    blogPostToBlogPostCardProps,
    coolLinkToCoolLinkCardProps,
    photographyToPhotographyCardProps,
    quickReviewToQuickReviewCardProps,
  } from '@utils/prop-mapping';
  import dateformat from 'dateformat';
  import { onMount } from 'svelte';
	const siteMeta: SiteMeta = metaConfig;

  let {
    date,
    posts,
    class: className,
  }: {
    date: string;
    posts: { type: string; data: BlogPost | QuickReview | CoolLink | Photography }[];
    class?: string;
  } = $props();

  let isToday = $state(false);

  onMount(() => {
    isToday = dateformat(date, 'UTC:dd mmm yyyy') === dateformat(new Date(), 'UTC:dd mmm yyyy');
  });

  function getPostActionLabel(postType: string) {
    switch (postType) {
      case PostType.BLOG_POST:
        return 'published a <em>Blog Post</em>';
      case PostType.QUICK_REVIEW:
        return 'posted a <em>Quick Review</em>';
      case PostType.COOL_LINK:
        return 'shared a <em>Cool Link</em>';
      case PostType.PHOTOGRAPHY:
        return 'posted a <em>Photo</em>';
      default:
        return 'published <em>something</em>';
    }
  }
</script>

<div class={['m-timeline-group', className]}>
  <div class="m-timeline-group__header">
    <div class="u-noise"></div>
    <h2 class="m-timeline-group__heading">{dateformat(date, 'UTC:dd mmm yyyy')}</h2>
    {#if isToday}
      <span class="m-timeline-group__header-note">Today</span>
    {/if}
  </div>

  {#each posts as post}
    <div class="m-timeline-group__item" style="--color: var(--theme--color-{post.type});">
      <div class="m-timeline-group__item-icon">
        {#if post.type === PostType.BLOG_POST}
          <BlogPostIcon size="32px" />
        {:else if post.type === PostType.QUICK_REVIEW}
          <QuickReviewIcon size="32px" />
        {:else if post.type === PostType.COOL_LINK}
          <CoolLinkIcon size="32px" />
        {:else if post.type === PostType.PHOTOGRAPHY}
          <PhotographyIcon size="32px" />
        {/if}

        <div class="m-timeline-group__item-icon-line" aria-hidden="true"></div>
      </div>
      <div class="m-timeline-group__item-content">
        <div class="m-timeline-group__item-content-header">
          {#if siteMeta.author.image}
            <AuthorAvatar src={siteMeta.author.image} alt={siteMeta.author.name} theme="rainbow" size="36px" />
          {/if}
          <div class="m-timeline-group__item-content-heading">
            {siteMeta.author.shortName} {@html getPostActionLabel(post.type)}
          </div>
        </div>
        {#if post.type === PostType.BLOG_POST}
          <BlogPostCard {...blogPostToBlogPostCardProps(post.data as BlogPost)} />
        {:else if post.type === PostType.QUICK_REVIEW}
          <QuickReviewCard {...quickReviewToQuickReviewCardProps(post.data as QuickReview)} />
        {:else if post.type === PostType.COOL_LINK}
          <CoolLinkCard {...coolLinkToCoolLinkCardProps(post.data as CoolLink)} />
        {:else if post.type === PostType.PHOTOGRAPHY}
          <PhotographyCard {...photographyToPhotographyCardProps(post.data as Photography)} />
        {/if}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  @use '/src/styles/breakpoints';
  @use '/src/styles/typography';

  .m-timeline-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    align-items: center;

    width: 100%;

    &__header {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding-block: var(--spacing-sm);
      width: 100%;

      position: sticky;
      top: 0;
      z-index: 2;
      background: rgba(var(--theme--background-base-color-rgb), 0.9);
      border-bottom-left-radius: var(--border-radius--small);
      border-bottom-right-radius: var(--border-radius--small);
    }

    &:not(:first-child) {
      .m-timeline-group {
        &__header {
          padding-top: var(--spacing-md);
          border-top: 2px solid var(--theme--border-medium-color);
        }
      }
    }

    &__heading {
      @include typography.h3;
      letter-spacing: unset;
    }

    &__header-note {
      @include typography.h4;
    }

    &__item {
      display: flex;
      gap: var(--spacing-sm);
      width: 100%;

      &-icon {
        display: flex;
        flex-direction: column;
        align-items: center;

        color: var(--color);
        filter: drop-shadow(0px 0px 30px var(--color));

        &-line {
          width: 2px;
          background: var(--theme--border-medium-color);
          flex: 1;
        }
      }

      &-content {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
        align-items: flex-start;

        flex: 1;

        &-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        &-heading {
          @include typography.b1;

          :global(em) {
            font-style: normal;
            color: var(--color);
          }
        }
      }
    }
  }
</style>
