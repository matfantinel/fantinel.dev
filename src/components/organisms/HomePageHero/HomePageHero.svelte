<script lang="ts">
  import FooterWaves from '@assets/brand/FooterWaves.svelte';
  import Button from '@components/atoms/Button';
  import AuthorAvatar from '@components/molecules/AuthorAvatar';
  import MarkdownRenderer from '@components/molecules/MarkdownRenderer';

  let {
    kicker,
    title,
    body,
    image,
    extraImages,
    buttons,
    class: className,
  }: {
    kicker?: string;
    title: string;
    body?: string;
    image: string;
    extraImages?: string[];
    buttons?: { text: string; url: string; color?: string }[];
    class?: string;
  } = $props();
</script>

<div class={['o-home-page-hero', 'u-container', className]}>
  <div class="o-home-page-hero__container">
    <div class="o-home-page-hero__image-container">
      <AuthorAvatar
        class="o-home-page-hero__image"
        src={image}
        alt={title}
        {extraImages}
        size="164px"
        theme="rainbow"
        animated
      />
    </div>
    <div class="o-home-page-hero__title-container">
      {#if kicker}
        <p class="o-home-page-hero__kicker">{kicker}</p>
      {/if}
      <h1 class="o-home-page-hero__title">{title}</h1>
    </div>
    {#if body}
      <div class="o-home-page-hero__body u-markdown">
        <MarkdownRenderer content={body} />
      </div>
    {/if}
    {#if buttons}
      <div class="o-home-page-hero__buttons">
        {#each buttons as button}
          <Button href={button.url} class="o-home-page-hero__button" color={button.color as any}>
            {button.text}
          </Button>
        {/each}
      </div>
    {/if}

    <div class="o-home-page-hero__waves-container" aria-hidden="true">
      <FooterWaves class="o-home-page-hero__waves" />
    </div>
  </div>
</div>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';
  @use '/src/styles/mixins';

  .o-home-page-hero {
    &__container {
      position: relative;
      isolation: isolate;
      overflow: hidden;

      padding: var(--spacing-xxl);
      background-color: var(--theme--background-base-color);
      border-radius: var(--border-radius);
      box-shadow: var(--theme--shadow-card), inset 0 0 400px var(--theme--background-card-color);

      display: grid;
      grid-template-columns: 164px 1fr;
      grid-template-areas:
        'image title'
        'image body'
        'image buttons';
      align-items: flex-start;
      justify-items: start;
      gap: var(--spacing-md) var(--spacing-xl);
    }

    &__image-container {
      grid-area: image;
      display: grid;
      place-items: center;
      width: 100%;
    }

    :global(.o-home-page-hero__image) {
      width: 100%;
      aspect-ratio: 1 / 1;
      height: auto;
    }

    &__title-container {
      grid-area: title;
    }

    &__kicker {
      @include typography.h2;
    }

    &__title {
      @include typography.h1;
      @include typography.gradient-greenish;
      // color: var(--color--green);
      animation: var(--theme--glowing-text-animation);
    }

    &__body {
      @include typography.b2;
      grid-area: body;
      gap: 1rem;
      text-align: left;
    }

    &__buttons {
      grid-area: buttons;

      display: flex;
      gap: var(--spacing-md) var(--spacing-sm);
      flex-wrap: wrap;
      align-items: center;
    }

    &__waves-container {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 40%;
      z-index: -1;

      :global(.o-home-page-hero__waves) {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    @include breakpoints.for-tablet-portrait-down {
      &__container {
        grid-template-columns: 1fr 164px;
        grid-template-areas:
          'title image'
          'body body'
          'buttons buttons';
      }
    }

    @include breakpoints.for-phone-only {
      padding-inline: 0;
      margin-top: calc(var(--header-height) * -1);

      &__container {
        @include mixins.padded-container;
        
        padding-top: calc(var(--header-height) + var(--spacing-lg));
        padding-bottom: 0;
        text-align: center;

        background-color: unset;
        border-radius: unset;
        box-shadow: unset;

        justify-items: center;
        grid-template-columns: 1fr;
        grid-template-areas:
          'title'
          'image'
          'buttons'
          'body';
      }

      &__image-container {
        width: 164px;
      }

      &__waves-container {
        top: 0;
        rotate: 180deg;
        height: calc(var(--header-height) + var(--spacing-lg) + 200px);        
      }

      &__kicker,
      &__title {
        text-align: center;
      }

      &__body {
        text-align: justify;
      }
    }
  }
</style>
