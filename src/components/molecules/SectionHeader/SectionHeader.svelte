<script lang="ts">
  import Button from '@components/atoms/Button';

  let {
    title,
    button,
    centered,
    class: className,
  }: {
    title: string;
    button?: {
      text: string;
      url: string;
    };
    centered?: boolean;
    class?: string;
  } = $props();
</script>

<div class={['m-section-header', centered ? 'm-section-header--centered' : '', className]}>
  <p class="m-section-header__title">{title}</p>
  {#if button}
    <Button href={button.url} class="m-section-header__button">
      {button.text}
    </Button>
  {/if}
</div>

<style lang="scss">
  @use '/src/styles/typography';

  .m-section-header {
    display: flex;
    gap: var(--spacing-md) var(--spacing-lg);
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    &__title {
      @include typography.h2;
      color: var(--theme--color-accent);
    }

    &--centered {
      flex-direction: column;
      justify-content: center;

      .m-section-header {
        &__title {
          text-align: center;
        }
      }
    }
  }
</style>
