<script lang="ts">
  import { HttpRegex } from '@utils/regex';
  import type { Snippet } from 'svelte';

  let {
    href,
    target,
    rel,
    color = 'default',
    class: className,
    icon,
    children,
    ...props
  }: {
    href?: string;
    target?: string;
    rel?: string;
    color?: 'default' | 'complementary' | 'green' | 'yellow' | 'peach' | 'red' | 'mauve' | 'blue' | 'teal';
    class?: string;
    icon?: Snippet;
    children?: Snippet;
    [key: string]: any;
  } = $props();

  let tag = $derived(href ? 'a' : 'button');
  let isExternalLink = $derived(!!href && HttpRegex.test(href));
  let linkProps = $derived({
    href,
    target: target ?? (isExternalLink ? '_blank' : undefined),
    rel: rel ?? (isExternalLink ? 'noopener noreferrer' : undefined),
  });

  let classList = $derived(['a-button', `a-button--${color}`, className]);
</script>

<svelte:element
  this={tag}
  {...linkProps}
  class={classList}
  role={tag === 'a' ? 'link' : 'button'}
  tabindex="0"
  {...props}
>
  {#if icon}
    <div class="a-button__icon">
      {@render icon()}
    </div>
  {/if}
  <span class="a-button__text">
    {@render children?.()}
  </span>
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
    box-shadow: var(--theme--shadow-card);
    border: none;

    transition: all 0.25s ease;

    --button-color-background: var(--theme--color-accent);
    --button-color-background-hover: var(--theme--color-accent-tint);
    --button-color-text: var(--theme--color-accent-contrast);
    --button-color-hover-glow: var(--theme--color-accent-glow);

    background: var(--button-color-background);
    color: var(--button-color-text);

    @media (hover: hover) {
      &:hover {
        background: var(--button-color-background-hover);
        box-shadow: var(--button-color-hover-glow);
      }
    }

    &__text {
      @include typography.b1;
    }

    &__icon {
      width: 18px;
      height: 18px;
      aspect-ratio: 1/1;
    }

    &--complementary {
      --button-color-background: var(--theme--color-complementary);
      --button-color-background-hover: var(--theme--color-complementary-tint);
      --button-color-text: var(--theme--color-complementary-contrast);
      --button-color-hover-glow: var(--theme--color-complementary-glow);
    }

    &--green {
      --button-color-background: var(--color--green);
      --button-color-background-hover: var(--color--green-tint);
      --button-color-text: var(--color--green-contrast);
      --button-color-hover-glow: var(--theme--glow-green);
    }

    &--yellow {
      --button-color-background: var(--color--yellow);
      --button-color-background-hover: var(--color--yellow-tint);
      --button-color-text: var(--color--yellow-contrast);
      --button-color-hover-glow: var(--theme--glow-yellow);
    }

    &--peach {
      --button-color-background: var(--color--peach);
      --button-color-background-hover: var(--color--peach-tint);
      --button-color-text: var(--color--peach-contrast);
      --button-color-hover-glow: var(--theme--glow-peach);
    }

    &--red {
      --button-color-background: var(--color--red);
      --button-color-background-hover: var(--color--red-tint);
      --button-color-text: var(--color--red-contrast);
      --button-color-hover-glow: var(--theme--glow-red);
    }

    &--mauve {
      --button-color-background: var(--color--mauve);
      --button-color-background-hover: var(--color--mauve-tint);
      --button-color-text: var(--color--mauve-contrast);
      --button-color-hover-glow: var(--theme--glow-mauve);
    }

    &--blue {
      --button-color-background: var(--color--blue);
      --button-color-background-hover: var(--color--blue-tint);
      --button-color-text: var(--color--blue-contrast);
      --button-color-hover-glow: var(--theme--glow-blue);
    }

    &--teal {
      --button-color-background: var(--color--teal);
      --button-color-background-hover: var(--color--teal-tint);
      --button-color-text: var(--color--teal-contrast);
      --button-color-hover-glow: var(--theme--glow-teal);
    }
  }
</style>
