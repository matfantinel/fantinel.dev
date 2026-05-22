<script lang="ts">
  import Button from '@components/atoms/Button';
  import AuthorAvatar from '@components/molecules/AuthorAvatar';
  import MarkdownRenderer from '@components/molecules/MarkdownRenderer';
  import SocialLink from '@components/atoms/SocialLink';
  import type { SocialLink as SocialLinkType } from '@schemas/site-meta';
  import HeroWaves from '@components/molecules/HeroWaves';

  let {
    kicker,
    title,
    bio,
    image,
    extraImages,
    socials,
    button,
    class: className,
  }: {
    kicker?: string;
    title: string;
    bio: string;
    image: string;
    extraImages?: string[];
    socials?: SocialLinkType[];
    button?: {
      text: string;
      url: string;
    };
    class?: string;
  } = $props();

  let classList = $derived(['o-home-page-hero u-content-grid', className]);
</script>

<div class={classList}>
  <div class="o-home-page-hero__container smol">
    <div class="o-home-page-hero__image-container">
      <AuthorAvatar class="o-home-page-hero__image" src={image} alt={title} {extraImages} size="large" animated />
    </div>

    <h1 class="o-home-page-hero__title-container">
      {#if kicker}
        <span class="o-home-page-hero__kicker">{kicker}</span>
      {/if}
      <span class="o-home-page-hero__title">{title}</span>
    </h1>

    <div class="o-home-page-hero__bio u-markdown">
      <MarkdownRenderer content={bio} />

      {#if button}
        <div class="o-home-page-hero__buttons">
          <Button href={button.url} class="o-home-page-hero__button">
            {button.text}
          </Button>
        </div>
      {/if}
    </div>
    {#if socials}
      <div class="o-home-page-hero__socials">
        {#each socials as social}
          <SocialLink name={social.name} url={social.url} label={social.label} class="o-home-page-hero__social" />
        {/each}
      </div>
    {/if}
  </div>

  <HeroWaves />
</div>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';
  @use '/src/styles/mixins';

  .o-home-page-hero {
    background-color: var(--t-v6--surface--accent);

    position: relative;
    container-type: inline-size;
    margin-bottom: 64px;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 80px;

      background: var(--t-v6--gradient--rainbow);
      mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 50%, transparent 100%);
      mask-repeat: no-repeat;
      mask-position: top;

      @media (prefers-reduced-motion: no-preference) {
        animation: rainbow-breathe 6s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite alternate;
      }
    }

    &__container {
      padding-block: 80px var(--spacing-lg);

      display: grid;
      grid-template-columns: 164px 1fr;
      gap: var(--spacing-md) var(--spacing-xl);
      grid-template-areas:
        'image title'
        'image bio'
        'socials bio'
        '. bio';
    }

    &__image-container {
      grid-area: image;
      display: grid;
      place-items: center;
      aspect-ratio: 1/1;

      :global(.m-author-avatar) {
        --size: 100%;
      }
    }

    &__title-container {
      grid-area: title;

      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    &__kicker {
      @include typography.h5;
      color: var(--t-v6--text--medium);
    }

    &__title {
      @include typography.h1;
      @include typography.gradient-greenish;
      animation: var(--t-v6--glowing-text-animation);
    }

    &__bio {
      @include typography.b2;
      grid-area: bio;
      gap: 1rem;
      text-align: left;
      text-wrap: pretty;
    }

    &__socials {
      grid-area: socials;

      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
      flex-wrap: wrap;
      align-items: flex-start;

      width: fit-content;
      margin-inline: auto;
    }

    @container (max-width: 768px) {
      &__container {
        gap: var(--spacing-md);
      }
    }

    @container (max-width: 520px) {
      &__container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        gap: var(--spacing-xl) var(--spacing-md);

        padding-block: var(--spacing-xl) var(--spacing-lg);
      }
      &__image-container {
        width: 80px;
      }
      &__bio {
        width: 100%;
      }
      &__socials {
        display: none;
      }
    }

    @keyframes rainbow-breathe {
      0% {
        mask-size: 100% 30%;
      }
      100% {
        mask-size: 100% 100%;
      }
    }
  }
</style>
