<script lang="ts">
  import { HttpRegex } from '@utils/regex';
  import type { Snippet } from 'svelte';

  let {
    href,
    target,
    rel,
    title,
    class: className,
    icon,
    iconPosition = 'left',
    children,
    onclick,
    ...props
  }: {
    href?: string;
    target?: string;
    rel?: string;
    title?: string;
    class?: string;
    icon?: Snippet;
    iconPosition?: 'left' | 'right';
    children?: Snippet;
    onclick?: EventListener;
    [key: string]: any;
  } = $props();

  let tag = $derived(href ? 'a' : 'button');
  let isExternalLink = $derived(!!href && HttpRegex.test(href));
  let linkProps = $derived({
    href,
    target: target ?? (isExternalLink ? '_blank' : undefined),
    rel: rel ?? (isExternalLink ? 'noopener' : undefined),
  });

  let classList = $derived(['a-icon-link', className]);
</script>

<svelte:element
  this={tag}
  {...linkProps}
  class={classList}
  {...props}
  title={title}
  {onclick}
>
  {#if icon && iconPosition === 'left'}
    <div class="a-icon-link__icon">
      {@render icon()}
    </div>
  {/if}
  <span class="a-icon-link__text">
    {@render children?.()}
  </span>
  {#if icon && iconPosition === 'right'}
    <div class="a-icon-link__icon">
      {@render icon()}
    </div>
  {/if}
</svelte:element>

<style lang="scss">
  @use '/src/styles/typography';

  .a-icon-link {
    display: flex;
    align-items: center;
    gap: var(--spacing-xxs);

    text-decoration: none;
    color: currentColor;

    transition: all 0.25s ease;

    border: none;
    appearance: none;
    background-color: transparent;
    text-align: left;
    width: fit-content;
    cursor: pointer;

    &__icon {
      width: 24px;
      height: 24px;
      aspect-ratio: 1/1;
    }

    &__text {
      @include typography.icon-label;
    }

    @media (hover: hover) {
      &:hover {
        color: var(--t-v6--accent);
      }
    }
  }
</style>
