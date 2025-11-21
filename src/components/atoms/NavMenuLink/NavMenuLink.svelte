<script lang="ts">
  import { HttpRegex } from '@utils/regex';
  import type { Snippet } from 'svelte';

  let {
    href,
    target,
    rel,
    title,
    active,
    color,
    class: className,
    icon,
    children,
    onclick,
    ...props
  }: {
    href?: string;
    target?: string;
    rel?: string;
    title?: string;
    active?: boolean;
    color?: string;
    class?: string;
    icon?: Snippet;
    children?: Snippet;
    onclick?: EventListener;
  } = $props();

  let tag = $derived(href ? 'a' : 'button');
  let isExternalLink = $derived(!!href && HttpRegex.test(href));
  let linkProps = $derived({
    href,
    target: target ?? (isExternalLink ? '_blank' : undefined),
    rel: rel ?? (isExternalLink ? 'noopener noreferrer' : undefined),
  });

  let classList = $derived(['a-nav-menu-link', className, { 'a-nav-menu-link--active': active }]);

  let customStyles = $derived([
    color ? `--color: var(--theme--color-${color})` : '',
  ]);
</script>

<svelte:element this={tag} {...linkProps} class={classList} {...props} {title} {onclick} style={customStyles.join(';')}>
  {#if icon}
    <div class="a-nav-menu-link__icon">
      {@render icon()}
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
    color: currentColor;

    border: none;
    appearance: none;
    background-color: transparent;
    text-align: left;
    cursor: pointer;
    
    padding: var(--spacing-xs);
    border-radius: var(--border-radius--small);
    width: calc(100% + var(--spacing-sm));
    margin-inline: calc(var(--spacing-xs) * -1);

    &__icon {
      width: 20px;
      height: 20px;
      aspect-ratio: 1/1;
    }

    &__text {
      @include typography.b1;
      font-size: 1.375rem; //22px
      font-weight: 500;
      line-height: 1.2;

      @include breakpoints.for-tablet-portrait-up {
        font-size: 1.125rem; //18px
      }
    }

    &--active {
      background-color: var(--theme--background-accent-color);
      color: var(--theme--color-accent);
    }

    &:hover,
    &:active,
    &:focus {
      filter: none;
      background-color: var(--theme--background-accent-color);

      .a-nav-menu-link {
        &__icon {
          color: var(--color, var(--theme--color-accent));
          animation: nudge-and-grow 0.5s ease-in;
        }
      }
    }
  }
</style>
