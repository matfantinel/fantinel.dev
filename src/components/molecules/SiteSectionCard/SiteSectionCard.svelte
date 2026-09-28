<script lang="ts">
  import type { BaseProps } from "@utils/types.ts";
  import { PostType } from "@schemas/post-types.ts";
  import ArrowLink from "@components/atoms/ArrowLink";
  import CoolLinkIcon from "@assets/icons/post-types/cool-link.svelte";
  import BlogPostIcon from "@assets/icons/post-types/post.svelte";
  import QuickReviewIcon from "@assets/icons/post-types/quick-review.svelte";
  import CoolLinkStamp from "@components/atoms/CoolLinkStamp";
  import QuickReviewsStrip from "@components/atoms/QuickReviewsStrip";
  import TypewriterEffect from "@components/atoms/TypewriterEffect";
  import { onMount } from "svelte";

  export type SiteSectionCardProps = BaseProps & {
    title: string;
    content?: string;
    script?: {
      text: string;
      typo?: string;
      fix?: string;
    }[];
    url: string;
    postType: PostType.BLOG_POST | PostType.COOL_LINK | PostType.QUICK_REVIEW;
    triggerAnimation: Function;
    animateInstantly?: boolean;
    animationDelay?: number;
  };

  let {
    title,
    content,
    script,
    url,
    postType,
    animateInstantly = false,
    animationDelay = 150,
    class: className,
    style: styleProps,
    ...props
  }: SiteSectionCardProps = $props();

  // svelte-ignore non_reactive_update
  let actionLabel: string;

  switch (postType) {
    case PostType.COOL_LINK:
      actionLabel = "Go to Cool Links";
      break;
    case PostType.QUICK_REVIEW:
      actionLabel = "Go to Quick Reviews";
      break;
    case PostType.BLOG_POST:
      actionLabel = "Go to Blog";
      break;
    default:
      break;
  }

  let classList = $derived([
    "m-site-section-card",
    `m-site-section-card--${postType}`,
    className,
  ]);

  let isAnimationTriggered = $state(false);

  export function triggerAnimation() {
    isAnimationTriggered = true;
  }

  onMount(() => {
    if (animateInstantly) {
      setTimeout(triggerAnimation, animationDelay ?? 0);
    }
  });
</script>

<article
  class={classList}
  class:triggered={isAnimationTriggered}
  style="
    --color: var(--t--{postType});
    --color-rgb: var(--t--{postType}--rgb);
    --color-glow: var(--t--{postType}--glow-tiny);
    --color-glow-big: var(--t--{postType}--glow-small);
    --inner-animation-delay: {(animateInstantly && animationDelay) ?? 0}ms;
    --animation-state: {animateInstantly ? 'running' : 'paused'};
    {styleProps ?? ''}
  "
  {...props}
>
  <div class="m-site-section-card__container">
    <div class="m-site-section-card__header">
      <span class="m-site-section-card__title">
        {title}
      </span>

      <div class="m-site-section-card__icon">
        {#if postType === PostType.BLOG_POST}
          <BlogPostIcon size="24px" />
        {:else if postType === PostType.QUICK_REVIEW}
          <QuickReviewIcon size="24px" />
        {:else if postType === PostType.COOL_LINK}
          <CoolLinkIcon size="24px" />
        {/if}
      </div>
    </div>

    <div class="m-site-section-card__content">
      {content}
      {#if script}
        <TypewriterEffect
          class="m-site-section-card__typewriter-effect"
          {script}
          paused={!isAnimationTriggered}
        />
      {/if}
    </div>

    <div class="m-site-section-card__footer">
      {#if postType === PostType.COOL_LINK}
        <CoolLinkStamp
          class={[
            "m-site-section-card__cool-link-stamp",
            isAnimationTriggered ? "triggered" : "",
          ].join(" ")}
        />
      {:else if postType === PostType.QUICK_REVIEW}
        <QuickReviewsStrip
          class={[
            "m-site-section-card__quick-reviews-strip",
            isAnimationTriggered ? "triggered" : "",
          ].join(" ")}
        />
      {/if}

      <ArrowLink
        color={postType}
        class="m-site-section-card__link"
        href={url}
        title={actionLabel}
        >Go
      </ArrowLink>
    </div>
  </div>
</article>

<style lang="scss">
  @use "/src/styles/typography";

  .m-site-section-card {
    border-radius: var(--border-radius);
    box-shadow: var(--color-glow);
    background-color: var(--t--surface--card);
    overflow: hidden;
    position: relative;

    container-type: inline-size;
    width: min(100%, 310px);

    transition: all 0.25s ease-in-out;

    &__container {
      padding: var(--spacing-sm);

      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);

      background: linear-gradient(
        to bottom,
        rgba(var(--color-rgb), 0.1) 0%,
        transparent 40%
      );
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__title {
      @include typography.h4;
      color: var(--color);
    }

    &__icon {
      color: var(--color);
    }

    &__content {
      @include typography.b2;
    }

    &__footer {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: var(--spacing-sm) var(--spacing-xs);
    }

    :global(.m-site-section-card__link) {
      margin-left: auto;

      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      }
    }

    :global(.m-site-section-card__cool-link-stamp) {
      rotate: -3deg;
      z-index: 0;
      pointer-events: none;

      animation: var(--stamp-animation-duration, 0.3s) ease-in both
        var(--inner-animation-delay) rubber-stamp;
      animation-play-state: var(--animation-state);

      @keyframes rubber-stamp {
        0% {
          opacity: 0;
          transform: scale(5);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
    }

    :global(.triggered) {
      --animation-state: running;
    }

    :global(.m-site-section-card__quick-reviews-strip) {
      flex: 0 0 100%;
      animation-delay: var(--inner-animation-delay);

      animation-play-state: var(--animation-state);
    }

    &--quick-review {
      --inner-animation-state: paused;
    }
  }

  @media (hover: hover) {
    :global(.m-site-section-card:has(.m-site-section-card__link:hover)) {
      scale: 1.05;
      box-shadow: var(--color-glow-big);

      &.m-site-section-card--quick-review {
        --inner-animation-state: running;
      }
    }
  }
</style>
