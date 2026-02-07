<script lang="ts">
  import { HttpRegex } from '@utils/regex';
  import type { Snippet } from 'svelte';
  import Check from '@assets/icons/check.svelte';

  let {
    selected,
    size,
    href,
    target,
    rel,
    title,
    class: className,
    icon,
    children,
    ...props
  }: {
    selected?: boolean;
    size?: 'default' | 'small' | 'responsive';
    href?: string;
    target?: string;
    rel?: string;
    title?: string;
    class?: string;
    icon?: Snippet;
    children?: Snippet;
    [key: string]: any;
  } = $props();

  let tag = $derived(href ? 'a' : 'div');
  let isExternalLink = $derived(!!href && HttpRegex.test(href));
  let linkProps = $derived({
    href,
    target: target ?? (isExternalLink ? '_blank' : undefined),
    rel: rel ?? (isExternalLink ? 'noopener' : undefined),
  });

  let classList = $derived([
    'a-tag',
    size ? `a-tag--${size}` : undefined,
    selected ? 'a-tag--selected' : undefined,
    className,
  ]);
</script>

<svelte:element
  this={tag}
  {...linkProps}
  class={classList}
  role={tag === 'a' ? 'link' : undefined}
  title={title}
  {...props}  
>
  {#if selected}
    <div class="a-tag__icon">
      <Check />
    </div>
  {/if}
  {#if icon}
    <div class="a-tag__icon">
      {@render icon()}
    </div>
  {/if}
  <span class="a-tag__text">
    {@render children?.()}
  </span>
</svelte:element>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .a-tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-xxs);

    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--border-radius);
    text-decoration: none;
    border: none;

    transition: all 0.25s ease;

    --tag-color-background: var(--theme--color-tags-background);
    --tag-color-background-hover: var(--theme--color-tags-background-hover);
    --tag-color-text: var(--theme--text-base-color);

    background: var(--tag-color-background);
    color: var(--tag-color-text);

    @media (hover: hover) {
      &:is(a) {
        &:hover {
          background: var(--tag-color-background-hover);
        }
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

    &--selected {
      --tag-color-text: var(--theme--color-callouts-success);
      box-shadow: inset var(--theme--glow-green);
    }

    @mixin small-size {
      gap: var(--spacing-xxs);
      padding: var(--spacing-xxs) var(--spacing-xs);

      .a-tag {
        &__text {
          @include typography.b3;
        }
      }
    }

    &--small {
      @include small-size;
    }

    &--responsive {
      @include breakpoints.for-phone-only {
        @include small-size;
      }
    }
  }
</style>
