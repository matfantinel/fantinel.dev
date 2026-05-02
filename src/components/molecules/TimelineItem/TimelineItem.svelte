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

	const siteMeta: SiteMeta = metaConfig;

  let {
    type,
    data,
    class: className,
  }: {
    type: string;
    data: BlogPost | QuickReview | CoolLink | Photography;
    class?: string;
  } = $props();

  function getPostActionLabel(postType: string, postData: BlogPost | QuickReview | CoolLink | Photography) {
    if (postType === PostType.BLOG_POST) {
      return 'published a <em>Blog Post</em>';
    } else if (postType === PostType.QUICK_REVIEW) {
      return 'posted a <em>Quick Review</em>';
    } else if (postType === PostType.COOL_LINK) {
      return 'shared a <em>Cool Link</em>';
    } else if (postType === PostType.PHOTOGRAPHY) {
      const photoCount = ((postData as Photography).additionalImages?.length || 0) + 1;
      if (photoCount > 1) {
        return `posted <em>${photoCount} Photos</em>`;
      }
      return 'posted a <em>Photo</em>';
    } else {
      return 'published <em>something</em>';
    }
  }
</script>

<div class={['m-timeline-item', className]} style="--color: var(--t-v6--{type});">
  <div class="m-timeline-item__icon">
    {#if type === PostType.BLOG_POST}
      <BlogPostIcon size="32px" />
    {:else if type === PostType.QUICK_REVIEW}
      <QuickReviewIcon size="32px" />
    {:else if type === PostType.COOL_LINK}
      <CoolLinkIcon size="32px" />
    {:else if type === PostType.PHOTOGRAPHY}
      <PhotographyIcon size="32px" />
    {/if}

    <div class="m-timeline-item__icon-line" aria-hidden="true"></div>
  </div>
  <div class="m-timeline-item__content">
    <div class="m-timeline-item__content-header">
      {#if siteMeta.author.image}
        <AuthorAvatar src={siteMeta.author.image} alt={siteMeta.author.name} size="tiny" />
      {/if}
      <div class="m-timeline-item__content-heading">
        {siteMeta.author.shortName} {@html getPostActionLabel(type, data)}
      </div>
    </div>
    {#if type === PostType.BLOG_POST}
      <BlogPostCard class="m-timeline-item__card" {...blogPostToBlogPostCardProps(data as BlogPost)} />
    {:else if type === PostType.QUICK_REVIEW}
      <QuickReviewCard class="m-timeline-item__card" {...quickReviewToQuickReviewCardProps(data as QuickReview)} />
    {:else if type === PostType.COOL_LINK}
      <CoolLinkCard class="m-timeline-item__card" {...coolLinkToCoolLinkCardProps(data as CoolLink)} />
    {:else if type === PostType.PHOTOGRAPHY}
      <PhotographyCard class="m-timeline-item__card" {...photographyToPhotographyCardProps(data as Photography)} />
    {/if}
  </div>
</div>

<style lang="scss">
  @use '/src/styles/typography';

  .m-timeline-item {
    display: flex;
    gap: var(--spacing-sm);
    width: 100%;

    &__icon {
      display: flex;
      flex-direction: column;
      align-items: center;

      color: var(--color);
      filter: drop-shadow(0px 0px 30px var(--color));

      &-line {
        width: 2px;
        background: var(--t-v6--border--medium);
        flex: 1;
      }
    }

    &__content {
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
</style>
