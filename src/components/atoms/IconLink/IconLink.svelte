<script lang="ts">
  import { HttpRegex } from '@utils/regex';
  import type { Snippet } from 'svelte';
  import Check from '@assets/icons/check.svelte';

  let {
    href,
    target,
    rel,
    title,
    class: className,
    icon,
    children,
    onclick,
    ...props
  }: {
    href: string;
    target?: string;
    rel?: string;
    title?: string;
    class?: string;
    icon: Snippet;
    children?: Snippet;
    onclick?: EventListener;
  } = $props();

  let isExternalLink = $derived(!!href && HttpRegex.test(href));
  let linkProps = $derived({
    href,
    target: target ?? (isExternalLink ? '_blank' : undefined),
    rel: rel ?? (isExternalLink ? 'noopener noreferrer' : undefined),
  });

  let classList = $derived(['a-icon-link', className]);
</script>

<a {...linkProps} class={classList} {...props} title={title} {onclick}>
  <div class="a-icon-link__icon">
    {@render icon()}
  </div>
  <span class="a-icon-link__text">
    {@render children?.()}
  </span>
</a>

<style lang="scss">
  @use '/src/styles/typography';

  .a-icon-link {
    display: flex;
    align-items: center;
    gap: var(--spacing-xxs);

    text-decoration: none;
    color: currentColor;

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
        filter: drop-shadow(var(--theme--glow-links));
      }
    }
  }
</style>
