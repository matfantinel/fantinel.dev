<script lang="ts">
  import Button from '@components/atoms/Button';
  import type { ButtonProps } from '@components/atoms/Button';
  import Image from '@components/atoms/Image';
  import HeroWaves from '@components/molecules/HeroWaves';
  import MarkdownRenderer from '@components/molecules/MarkdownRenderer';
  import type { Snippet } from 'svelte';
  import type { BaseProps } from '@utils/types';

  export type GenericHeroProps = BaseProps & {
    title: string;
    body?: string;
    button?: ButtonProps & { icon?: any };
    secondaryButton?: ButtonProps & { icon?: any };
    image?: string;
    imageAlt?: string;
  };

  let {
    title,
    body,
    button,
    secondaryButton,
    image,
    imageAlt,
    children,
    class: className,
  }: GenericHeroProps & { children?: Snippet } = $props();

  let classList = $derived(['o-generic-hero u-content-grid', image ? 'o-generic-hero--has-image' : '', className]);
</script>

<div class={classList}>
  <div class="o-generic-hero__container">
    <div class="o-generic-hero__content">
      <h1 class="o-generic-hero__title">
        {title}
      </h1>

      {#if body}
        <div class="o-generic-hero__body u-markdown">
          <MarkdownRenderer content={body} />
        </div>
      {/if}

      {#if children}
        {@render children()}
      {/if}

      {#if button || secondaryButton}
        <div class="o-generic-hero__buttons">
          {#if button}
            <Button class="o-generic-hero__button" href={button.href}>
              {button.text}
            </Button>
          {/if}

          {#if secondaryButton}
            <Button class="o-generic-hero__button" href={secondaryButton.href} color="complementary">
              {secondaryButton.text}
            </Button>
          {/if}
        </div>
      {/if}
    </div>

    {#if image}
      <Image class="o-generic-hero__image" src={image} alt={imageAlt || title} />
    {/if}
  </div>

  <HeroWaves />
</div>

<style lang="scss">
  @use '/src/styles/_mixins';
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .o-generic-hero {
    background-color: var(--t--surface--accent);

    position: relative;
    margin-bottom: 64px;

    &__container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-md);

      padding-block: var(--spacing-xxxl) var(--spacing-xxl);
    }

    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-md);
      flex: 1;
      max-width: 620px;
    }

    :global(.o-generic-hero__image) {
      display: none;
      border-radius: var(--border-radius--small);
    }

    &__title {
      @include typography.h1;
      text-align: center;
      text-wrap: balance;

      color: var(--t--accent);
      animation: var(--t--glowing-text-animation);
    }

    &__body {
      @include typography.b2;
      text-align: center;
    }

    &__buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: var(--spacing-sm);
      margin-top: var(--spacing-sm);
    }

    &--has-image {
      @include breakpoints.for-tablet-portrait-up {
        .o-generic-hero {
          &__container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: start;
            justify-items: center;
          }

          &__content {
            align-items: flex-start;
            justify-content: flex-start;
            max-width: 480px;
          }

          &__title,
          &__body {
            text-align: left;
          }

          &__buttons {
            justify-content: flex-start;
          }
        }
        :global(.o-generic-hero__image) {
          display: block;
        }
      }
    }

    @include breakpoints.for-phone-only {
      &__container {
        padding-block: var(--spacing-xxl) var(--spacing-md);
      }
    }
  }
</style>
