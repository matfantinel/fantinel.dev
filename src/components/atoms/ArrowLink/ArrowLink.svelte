<script lang="ts">
  import { HttpRegex } from '@utils/regex';
  import type { Snippet } from 'svelte';
  import ChevronRight from '@assets/icons/chevron-right.svelte';

  let {
    href,
    target,
    rel,
    color = 'accent',
    arrowPosition = 'right',
    class: className,
    children,
    ...props
  }: {
    href?: string;
    target?: string;
    rel?: string;
    color?: 'accent' | 'complementary' | 'blog' | 'quick-review' | 'cool-link' | 'photography';
    arrowPosition?: 'left' | 'right';
    class?: string;
    children?: Snippet;
    [key: string]: any;
  } = $props();

  let tag = $derived(href ? 'a' : 'button');
  let isExternalLink = $derived(!!href && HttpRegex.test(href));
  let linkProps = $derived({
    href,
    target: target ?? (isExternalLink ? '_blank' : undefined),
    rel: rel ?? (isExternalLink ? 'noopener' : undefined),
  });

  let classList = $derived([
    'a-arrow-link',
    `a-arrow-link--${color}`,
    `a-arrow-link--arrow-${arrowPosition}`,
    className,
  ]);
</script>

<svelte:element
  this={tag}
  {...linkProps}
  class={classList}
  role={tag === 'a' ? 'link' : 'button'}
  tabindex="0"
  {...props}
>
  {#if arrowPosition === 'left'}
    <div class="a-arrow-link__icon">
      <ChevronRight />
    </div>
  {/if}
  <span class="a-arrow-link__text">
    {@render children?.()}
  </span>
  {#if arrowPosition === 'right'}
    <div class="a-arrow-link__icon">
      <ChevronRight />
    </div>
  {/if}
</svelte:element>

<style lang="scss">
  @use '/src/styles/typography';
  .a-arrow-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-xxs);
    text-decoration: none;

    transition: all 0.25s ease;

    --arrow-link-color: var(--t-v6--accent);
    --arrow-link-color-hover: var(--t-v6--accent--tint);

    color: var(--arrow-link-color);

    appearance: none;
    border: unset;
    background: unset;
    padding: unset;
    text-align: unset;
    cursor: pointer;

    @media (hover: hover) {
      &:hover {
        color: var(--arrow-link-color-hover);

        .a-arrow-link__icon {
          transform: translateX(4px);

          &:first-child {
            transform: rotate(180deg) translateX(4px);
          }
        }
      }
    }

    &__text {
      @include typography.b1;
    }

    &__icon {
      width: 24px;
      height: 24px;
      aspect-ratio: 1/1;

      transition: transform 0.25s ease;

      &:first-child {
        transform: rotate(180deg);
      }
    }

    &--accent {
      --arrow-link-color: var(--t-v6--accent);
      --arrow-link-color-hover: var(--t-v6--accent--tint);
    }

    &--complementary {
      --arrow-link-color: var(--t-v6--complementary);
      --arrow-link-color-hover: var(--t-v6--complementary--tint);
    }

    &--blog {
      --arrow-link-color: var(--t-v6--blog);
      --arrow-link-color-hover: var(--t-v6--blog--tint);
    }

    &--quick-review {
      --arrow-link-color: var(--t-v6--quick-review);
      --arrow-link-color-hover: var(--t-v6--quick-review--tint);
    }

    &--cool-link {
      --arrow-link-color: var(--t-v6--cool-link);
      --arrow-link-color-hover: var(--t-v6--cool-link--tint);
    }

    &--photography {
      --arrow-link-color: var(--t-v6--photography);
      --arrow-link-color-hover: var(--t-v6--photography--tint);
    }
  }
</style>
