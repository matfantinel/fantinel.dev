<script lang="ts">
  import { HttpRegex } from '@utils/regex';
  import type { Snippet } from 'svelte';
  import ChevronRight from '@assets/icons/chevron-right.svelte';

  let {
    href,
    target,
    rel,
    color = 'accent',
    iconPosition = 'left',
    class: className,
    icon,
    children,
    ...props
  }: {
    href?: string;
    target?: string;
    rel?: string;
    color?: 'accent' | 'complementary' | 'blog' | 'quick-review' | 'cool-link' | 'photography';
    iconPosition?: 'left' | 'right';
    class?: string;
    icon?: Snippet | 'arrow';
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
    'a-button',
    `a-button--${color}`,
    `a-button--icon-${iconPosition}`,
    className,
  ]);

  let isArrowIcon = $derived(icon === 'arrow');
</script>

<svelte:element
  this={tag}
  {...linkProps}
  class={classList}
  role={tag === 'a' ? 'link' : 'button'}
  tabindex="0"
  {...props}
>
  {#if iconPosition === 'left' && icon}
    <div class="a-button__icon" class:a-button__icon--arrow={isArrowIcon}>
      {#if isArrowIcon}
        <ChevronRight />
      {:else if typeof icon === 'function'}
        {@render icon()}
      {/if}
    </div>
  {/if}
  <span class="a-button__text">
    {@render children?.()}
  </span>
  {#if iconPosition === 'right' && icon}
    <div class="a-button__icon" class:a-button__icon--arrow={isArrowIcon}>
      {#if isArrowIcon}
        <ChevronRight />
      {:else if typeof icon === 'function'}
        {@render icon()}
      {/if}
    </div>
  {/if}
</svelte:element>

<style lang="scss">
  @use '/src/styles/typography';
  .a-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-xs);

    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--border-radius);
    text-decoration: none;
    box-shadow: var(--t-v6--shadow--base);
    border: none;
    cursor: pointer;

    transition: all 0.25s ease;

    --button-color-background: var(--t-v6--accent);
    --button-color-background-hover: var(--t-v6--accent--tint);
    --button-color-text: var(--t-v6--accent--contrast);
    --button-color-hover-glow: var(--t-v6--accent--glow-small);

    background: var(--button-color-background);
    color: var(--button-color-text);

    @media (hover: hover) {
      &:hover {
        background: var(--button-color-background-hover);
        box-shadow: var(--button-color-hover-glow);

        .a-button__icon--arrow {
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
      width: 22px;
      height: 22px;
      aspect-ratio: 1/1;

      transition: transform 0.25s ease;
    }

    &--icon-left {
      .a-button__icon--arrow {
        transform: rotate(180deg);
      }
    }

    &--accent {
      --button-color-background: var(--t-v6--accent);
      --button-color-background-hover: var(--t-v6--accent--tint);
      --button-color-text: var(--t-v6--accent--contrast);
      --button-color-hover-glow: var(--t-v6--accent--glow-small);
    }

    &--complementary {
      --button-color-background: var(--t-v6--complementary);
      --button-color-background-hover: var(--t-v6--complementary--tint);
      --button-color-text: var(--t-v6--complementary--contrast);
      --button-color-hover-glow: var(--t-v6--complementary--glow-small);
    }

    &--blog {
      --button-color-background: var(--t-v6--blog);
      --button-color-background-hover: var(--t-v6--blog--tint);
      --button-color-text: var(--t-v6--blog--contrast);
      --button-color-hover-glow: var(--t-v6--blog--glow-small);
    }

    &--quick-review {
      --button-color-background: var(--t-v6--quick-review);
      --button-color-background-hover: var(--t-v6--quick-review--tint);
      --button-color-text: var(--t-v6--quick-review--contrast);
      --button-color-hover-glow: var(--t-v6--quick-review--glow-small);
    }

    &--cool-link {
      --button-color-background: var(--t-v6--cool-link);
      --button-color-background-hover: var(--t-v6--cool-link--tint);
      --button-color-text: var(--t-v6--cool-link--contrast);
      --button-color-hover-glow: var(--t-v6--cool-link--glow-small);
    }

    &--photography {
      --button-color-background: var(--t-v6--photography);
      --button-color-background-hover: var(--t-v6--photography--tint);
      --button-color-text: var(--t-v6--photography--contrast);
      --button-color-hover-glow: var(--t-v6--photography--glow-small);
    }
  }
</style>
