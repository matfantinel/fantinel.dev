<script lang="ts">
  import Button from '@components/atoms/Button';
  import MarkdownRenderer from '@components/molecules/MarkdownRenderer';

  let {
    title,
    body,
    button,
    secondaryButton,
    centered,
    class: className,
  }: {
    title: string;
    body?: string;
    button?: {
      text: string;
      url: string;
    };
    secondaryButton?: {
      text: string;
      url: string;
    };
    centered?: boolean;
    class?: string;
  } = $props();
</script>

<div class={['m-section-header', centered ? 'm-section-header--centered' : '', className]}>
  <div class="m-section-header__text">
    <p class="m-section-header__title">{title}</p>
    {#if body}
      <div class="m-section-header__body u-markdown">
        <MarkdownRenderer content={body} />
      </div>
    {/if}
  </div>
  {#if button || secondaryButton}
    <div class="m-section-header__buttons">
      {#if button}
        <Button href={button.url} class="m-section-header__button">
          {button.text}
        </Button>
      {/if}
      {#if secondaryButton}
        <Button href={secondaryButton.url} color="complementary" class="m-section-header__button">
          {secondaryButton.text}
        </Button>
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  @use '/src/styles/breakpoints';
  @use '/src/styles/typography';

  .m-section-header {
    display: flex;
    gap: var(--spacing-md) var(--spacing-lg);
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    container-type: inline-size;

    &__text {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xxs);
      max-width: 600px;
    }

    &__title {
      @include typography.h2;
      color: var(--t-v6--accent);
    }

    &__body {
      @include typography.b2;
    }

    &__buttons {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    @mixin section-header-centered {
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .m-section-header {
        &__text {
          align-items: center;
        }

        &__title {
          text-align: center;
        }

        &__body {
          text-align: center;
        }

        &__buttons {
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }
      }
    }

    &--centered {
      @include section-header-centered;
    }

    @include breakpoints.for-phone-only {
      @include section-header-centered;
    }
  }
</style>
