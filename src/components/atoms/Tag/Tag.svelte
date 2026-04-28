<script lang="ts">
  import { HttpRegex } from '@utils/regex';
  import type { Snippet } from 'svelte';

  let {
    href,
    target,
    rel,
    title,
    active,
    name,
    size,
    count,
    class: className,
    icon,
    children,
    ...props
  }: {
    href?: string;
    target?: string;
    rel?: string;
    title?: string;
    active?: boolean;
    name?: string;
    size?: 'default' | 'small' | 'responsive';
    count?: number;
    class?: string;
    icon?: Snippet;
    children?: Snippet;
    [key: string]: any;
  } = $props();

  let isCheckbox = $derived(!href);
  let tag = $derived(href ? 'a' : 'label');
  let isExternalLink = $derived(!!href && HttpRegex.test(href));
  let linkProps = $derived({
    href,
    target: target ?? (isExternalLink ? '_blank' : undefined),
    rel: rel ?? (isExternalLink ? 'noopener' : undefined),
  });

  let classList = $derived([
    'a-tag',
    size ? `a-tag--${size}` : undefined,
    !isCheckbox && active ? 'a-tag--active' : undefined,
    className,
  ]);
</script>

<svelte:element this={tag} {...linkProps} class={classList} role={tag === 'a' ? 'link' : undefined} {title} {...props}>
  {#if isCheckbox}
    <input class="a-tag__checkbox" type="checkbox" {name} checked={active} />
  {/if}
  {#if icon}
    <div class="a-tag__icon">
      {@render icon()}
    </div>
  {/if}
  <span class="a-tag__text">
    {@render children?.()}
  </span>
  {#if count}
    <div class="a-tag__count">
      {count}
    </div>
  {/if}
</svelte:element>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .a-tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-xxs);

    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--border-radius);
    text-decoration: none;
    cursor: pointer;
    min-height: 42px;

    transition: all 0.25s ease;

    border: 2px solid var(--t-v6--tag--border--base);
    background: var(--t-v6--tag--bg--base);
    color: var(--t-v6--tag--text--base);    

    &__checkbox {
      appearance: none;
      position: absolute;
      width: 0;
      height: 0;
      opacity: 0;
      pointer-events: none;
    }

    &__text {
      @include typography.b2;
    }

    &__icon {
      width: 22px;
      height: 22px;
      aspect-ratio: 1/1;
    }

    &__count {
      @include typography.b2;
      width: 24px;
      height: 24px;
      aspect-ratio: 1/1;
      margin-left: var(--spacing-xxs);

      transition: all 0.25s ease;

      display: grid;
      place-items: center;
      text-align: center;

      background: var(--t-v6--tag--count--base);
      border-radius: var(--border-radius--round);
    }

    @mixin small-size {
      padding: var(--spacing-xxs) var(--spacing-xs);
      min-height: 30px;

      .a-tag {
        &__text {
          @include typography.b3;
        }
        &__icon {
          width: 16px;
          height: 16px;
        }
        &__count {
          @include typography.icon-label;
          width: 18px;
          height: 18px;
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

    @media (hover: hover) {
      &:hover {
        border-color: var(--t-v6--tag--border--hover);
        color: var(--t-v6--tag--text--hover);
        background: var(--t-v6--tag--bg--hover);

        .a-tag__count {
          background: var(--t-v6--tag--count--hover);
        }
      }
    }

    &.a-tag--active,
    &:has(input:checked) {
      border-color: var(--t-v6--tag--border--active);
      background: var(--t-v6--tag--bg--active);
      color: var(--t-v6--tag--text--active);
      box-shadow: var(--t-v6--tag--glow--active);

      .a-tag__count {
        background: var(--t-v6--tag--count--active);
      }

      @media (hover: hover) {
        &:hover {
          background: var(--t-v6--tag--bg--hover);
        }
      }
    }
  }
</style>
