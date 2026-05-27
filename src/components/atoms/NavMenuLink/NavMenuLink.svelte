<script lang="ts">
  import { HttpRegex } from '@utils/regex';
  import type { Snippet, Component } from 'svelte';
  import type { SVGAttributes } from 'svelte/elements';
  import type { BaseProps } from '@utils/types';
  import { getIcon } from '@utils/icons';

  export type NavMenuLinkProps = BaseProps & {
    href?: string;
    target?: string;
    rel?: string;
    title?: string;
    active?: boolean;
    isMobile?: boolean;
    color?: string;
    icon?: string;
    text?: string;
    onclick?: EventListener;
  };

  let {
    href,
    target,
    rel,
    title,
    active,
    isMobile,
    color,
    icon,
    children,
    onclick,
    class: className,
    ...props
  }: NavMenuLinkProps & { children?: Snippet } = $props();

  let IconComponent = $derived(icon ? getIcon(icon) : undefined);
  let tag = $derived(href ? 'a' : 'button');
  let isExternalLink = $derived(!!href && HttpRegex.test(href));

  let linkProps = $derived({
    href,
    target: target ?? (isExternalLink ? '_blank' : undefined),
    rel: rel ?? (isExternalLink ? 'noopener' : undefined),
  });

  let classList = $derived([
    'a-nav-menu-link',
    className,
    { 'a-nav-menu-link--active': active, 'a-nav-menu-link--mobile': isMobile },
  ]);

  let customStyles = $derived([color ? `--color: var(--t--${color})` : '']);
</script>

<svelte:element this={tag} {...linkProps} class={classList} {...props} {title} {onclick} style={customStyles.join(';')}>
  {#if IconComponent}
    <div class="a-nav-menu-link__icon">
      <IconComponent size="24px" />
    </div>
  {/if}
  <span class="a-nav-menu-link__text">
    {@render children?.()}
  </span>
</svelte:element>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .a-nav-menu-link {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);

    text-decoration: none;
    border: none;
    appearance: none;
    background-color: transparent;
    text-align: left;
    cursor: pointer;

    padding: var(--spacing-xs);
    border-radius: var(--border-radius--small);
    width: calc(100% + var(--spacing-sm));
    margin-inline: calc(var(--spacing-xs) * -1);

    transition: all 0.25s ease;

    color: var(--t--text--base);
    background: transparent;

    &__icon {
      width: 24px;
      height: 24px;
      aspect-ratio: 1/1;
    }

    &__text {
      @include typography.b1;
      font-weight: 500;
    }

    @mixin mobile-styles {
      gap: var(--spacing-xxs);
      padding: var(--spacing-xxs) var(--spacing-xs);

      width: unset;
      margin-inline: 0;
      text-wrap: nowrap;

      .a-nav-menu-link {
        &__text {
          @include typography.icon-label;
        }

        &__icon {
          display: none;
        }
      }
    }

    &--active {
      background: var(--t--surface--accent);
      color: var(--color, var(--t--accent));
    }

    @include breakpoints.for-phone-only {
      @include mobile-styles;
    }

    &--mobile {
      @include mobile-styles;
    }

    &:hover,
    &:active,
    &:focus {
      filter: none;
      color: var(--color, var(--t--accent));

      .a-nav-menu-link {
        &__icon {
          animation: nudge-and-grow 0.5s ease-in;
        }
      }
    }
  }
</style>
