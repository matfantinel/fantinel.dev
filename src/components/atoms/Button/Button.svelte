<script lang="ts">
  import { HttpRegex } from '@utils/regex';
  import type { Snippet } from 'svelte';
  import ChevronRight from '@assets/icons/chevron-right.svelte';
  import type { BaseProps } from '@utils/types';
  import { getIcon } from '@utils/icons';

  export type ButtonProps = BaseProps & {
    href?: string;
    target?: string;
    rel?: string;
    color?: 'accent' | 'complementary' | 'blog' | 'quick-review' | 'cool-link' | 'photography' | 'about' | 'project';
    icon?: string | 'arrow';
    iconPosition?: 'left' | 'right';
    text?: string;
  };

  let {
    href,
    target,
    rel,
    color = 'accent',
    icon,
    iconPosition = 'left',
    children,
    class: className,
    ...props
  }: ButtonProps & { children?: Snippet } = $props();

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
  let IconComponent = $derived(!isArrowIcon && icon ? getIcon(icon) : undefined);
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
        <ChevronRight size="22px" />
      {:else if IconComponent}
        <IconComponent size="22px" />
      {/if}
    </div>
  {/if}
  <span class="a-button__text">
    {@render children?.()}
  </span>
  {#if iconPosition === 'right' && icon}
    <div class="a-button__icon" class:a-button__icon--arrow={isArrowIcon}>
      {#if isArrowIcon}
        <ChevronRight size="22px" />
      {:else if IconComponent}
        <IconComponent size="22px" />
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
    box-shadow: var(--t--shadow--base);
    border: none;
    cursor: pointer;

    transition: all 0.25s ease;

    --button-color-background: var(--t--accent);
    --button-color-background-hover: var(--t--accent--tint);
    --button-color-text: var(--t--accent--contrast);
    --button-color-hover-glow: var(--t--accent--glow-small);

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
      --button-color-background: var(--t--accent);
      --button-color-background-hover: var(--t--accent--tint);
      --button-color-text: var(--t--accent--contrast);
      --button-color-hover-glow: var(--t--accent--glow-small);
    }

    &--complementary {
      --button-color-background: var(--t--complementary);
      --button-color-background-hover: var(--t--complementary--tint);
      --button-color-text: var(--t--complementary--contrast);
      --button-color-hover-glow: var(--t--complementary--glow-small);
    }

    &--blog {
      --button-color-background: var(--t--blog);
      --button-color-background-hover: var(--t--blog--tint);
      --button-color-text: var(--t--blog--contrast);
      --button-color-hover-glow: var(--t--blog--glow-small);
    }

    &--quick-review {
      --button-color-background: var(--t--quick-review);
      --button-color-background-hover: var(--t--quick-review--tint);
      --button-color-text: var(--t--quick-review--contrast);
      --button-color-hover-glow: var(--t--quick-review--glow-small);
    }

    &--cool-link {
      --button-color-background: var(--t--cool-link);
      --button-color-background-hover: var(--t--cool-link--tint);
      --button-color-text: var(--t--cool-link--contrast);
      --button-color-hover-glow: var(--t--cool-link--glow-small);
    }

    &--photography {
      --button-color-background: var(--t--photography);
      --button-color-background-hover: var(--t--photography--tint);
      --button-color-text: var(--t--photography--contrast);
      --button-color-hover-glow: var(--t--photography--glow-small);
    }

    &--about {
      --button-color-background: var(--t--about);
      --button-color-background-hover: var(--t--about--tint);
      --button-color-text: var(--t--about--contrast);
      --button-color-hover-glow: var(--t--about--glow-small);
    }

    &--project {
      --button-color-background: var(--t--project);
      --button-color-background-hover: var(--t--project--tint);
      --button-color-text: var(--t--project--contrast);
      --button-color-hover-glow: var(--t--project--glow-small);
    }
  }
</style>
