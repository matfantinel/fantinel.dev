<script lang="ts">
  import { HttpRegex } from '@utils/regex';
  import type { Snippet } from 'svelte';
  import type { BaseProps } from '@utils/types';
  import { getIcon } from '@utils/icons';

  export type IconLinkProps = BaseProps & {
    href?: string;
    target?: string;
    rel?: string;
    title?: string;
    icon?: string;
    iconPosition?: 'left' | 'right';
    text?: string;
    onclick?: EventListener;
  };

  let {
    href,
    target,
    rel,
    title,
    icon,
    iconPosition = 'left',
    children,
    onclick,
    class: className,
    ...props
  }: IconLinkProps & { children?: Snippet } = $props();

  let IconComponent = $derived(icon ? getIcon(icon) : undefined);
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
  {#if IconComponent && iconPosition === 'left'}
    <div class="a-icon-link__icon">
      <IconComponent size="24px" />
    </div>
  {/if}
  <span class="a-icon-link__text">
    {@render children?.()}
  </span>
  {#if IconComponent && iconPosition === 'right'}
    <div class="a-icon-link__icon">
      <IconComponent size="24px" />
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
        color: var(--t--accent);
      }
    }
  }
</style>
