<script lang="ts">
  import { HttpRegex } from '@utils/regex';
  import type { Snippet } from 'svelte';
  import ChevronRight from '@assets/icons/chevron-right.svelte';

  let {
    href,
    target,
    rel,
    color = 'default',
    class: className,
    children,
    ...props
  }: {
    href?: string;
    target?: string;
    rel?: string;
    color?: 'default' | 'green' | 'yellow' | 'peach' | 'red' | 'mauve' | 'blue' | 'teal';
    class?: string;
    children?: Snippet;
    [key: string]: any;
  } = $props();

  let isExternalLink = $derived(!!href && HttpRegex.test(href));
  let linkProps = $derived({
    href,
    target: target ?? (isExternalLink ? '_blank' : undefined),
    rel: rel ?? (isExternalLink ? 'noopener' : undefined),
  });

  let classList = $derived(['a-arrow-link', `a-arrow-link--${color}`, className]);
</script>

<a {...linkProps} class={classList} {...props}>    
  <span class="a-arrow-link__text">
    {@render children?.()}
  </span>
  <div class="a-arrow-link__icon">
    <ChevronRight />
  </div>
</a>

<style lang="scss">
  @use '/src/styles/typography';
  .a-arrow-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-xxs);
    text-decoration: none;

    transition: all 0.25s ease;

    --arrow-link-color: var(--theme--color-accent);
    --arrow-link-color-hover: var(--theme--color-accent-tint);
    --arrow-link-color-hover-glow: var(--theme--color-accent-glow);

    color: var(--arrow-link-color);

    @media (hover: hover) {
      &:hover {
        color: var(--arrow-link-color-hover);
        filter: drop-shadow(var(--arrow-link-color-hover-glow));

        .a-arrow-link__icon {
          transform: translateX(4px);
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
    }

    &--green {
      --arrow-link-color: var(--color--green);
      --arrow-link-color-hover: var(--color--green-tint);
      --arrow-link-color-hover-glow: var(--theme--glow-green);
    }

    &--yellow {
      --arrow-link-color: var(--color--yellow);
      --arrow-link-color-hover: var(--color--yellow-tint);
      --arrow-link-color-hover-glow: var(--theme--glow-yellow);
    }

    &--peach {
      --arrow-link-color: var(--color--peach);
      --arrow-link-color-hover: var(--color--peach-tint);
      --arrow-link-color-hover-glow: var(--theme--glow-peach);
    }

    &--red {
      --arrow-link-color: var(--color--red);
      --arrow-link-color-hover: var(--color--red-tint);
      --arrow-link-color-hover-glow: var(--theme--glow-red);
    }

    &--mauve {
      --arrow-link-color: var(--color--mauve);
      --arrow-link-color-hover: var(--color--mauve-tint);
      --arrow-link-color-hover-glow: var(--theme--glow-mauve);
    }

    &--blue {
      --arrow-link-color: var(--color--blue);
      --arrow-link-color-hover: var(--color--blue-tint);
      --arrow-link-color-hover-glow: var(--theme--glow-blue);
    }

    &--teal {
      --arrow-link-color: var(--color--teal);
      --arrow-link-color-hover: var(--color--teal-tint);
      --arrow-link-color-hover-glow: var(--theme--glow-teal);
    }
  }
</style>
