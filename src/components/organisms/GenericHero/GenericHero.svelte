<script lang="ts">
  import Button from '@components/atoms/Button';
  import type { ButtonProps } from '@components/atoms/Button';
  import Image from '@components/atoms/Image';
  import HeroWaves from '@components/molecules/HeroWaves';
  import MarkdownRenderer from '@components/molecules/MarkdownRenderer';
  import PolaroidCard from '@components/molecules/PolaroidCard';
  import type { PolaroidCardProps } from '@components/molecules/PolaroidCard';
  import Stack from '@components/molecules/Stack';
  import type { Snippet } from 'svelte';
  import type { BaseProps } from '@utils/types';
  import TownSquare from '@components/molecules/TownSquare';

  export type GenericHeroProps = BaseProps & {
    title: string;
    body?: string;
    button?: ButtonProps & { icon?: any };
    secondaryButton?: ButtonProps & { icon?: any };
    image?: string;
    imageAlt?: string;
    polaroids?: Omit<PolaroidCardProps, 'class'> | Omit<PolaroidCardProps, 'class'>[];
    hasTownSquare?: boolean;
  };

  let {
    title,
    body,
    button,
    secondaryButton,
    image,
    imageAlt,
    polaroids,
    children,
    hasTownSquare,
    class: className,
  }: GenericHeroProps & { children?: Snippet } = $props();

  let resolvedPolaroids = $derived(polaroids ? (Array.isArray(polaroids) ? polaroids : [polaroids]) : []);
  let hasVisual = $derived(!!(image || resolvedPolaroids.length > 0 || hasTownSquare));
  let classList = $derived(['o-generic-hero u-content-grid', hasVisual ? 'o-generic-hero--has-image' : '', className]);
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

    {#if resolvedPolaroids.length > 1}
      <div class="o-generic-hero__image o-generic-hero__image--slot">
        <Stack itemCount={resolvedPolaroids.length}>
          {#each resolvedPolaroids as polaroid}
            <PolaroidCard {...polaroid} />
          {/each}
        </Stack>
      </div>
    {:else if resolvedPolaroids.length === 1}
      <div class="o-generic-hero__image o-generic-hero__image--slot">
        <PolaroidCard {...resolvedPolaroids[0]} />
      </div>
    {:else if image}
      <Image class="o-generic-hero__image" src={image} alt={imageAlt || title} />
    {:else if hasTownSquare}
      <div class="o-generic-hero__town-square">
        <TownSquare />
      </div>
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
      flex-direction: column;
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
      min-height: 260px;
    }

    :global(.o-generic-hero__image--slot) {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 260px;
    }

    &__town-square {
      width: 100%;
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
            align-items: center;
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
        :global(.o-generic-hero__image--slot) {
          display: flex;
          height: 100%;
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
