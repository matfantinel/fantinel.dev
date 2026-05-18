<script lang="ts">
  import Button from '@components/atoms/Button';
  import AuthorAvatar from '@components/molecules/AuthorAvatar';
  import MarkdownRenderer from '@components/molecules/MarkdownRenderer';
  import SocialLink from '@components/atoms/SocialLink';
  import type { SocialLink as SocialLinkType } from '@schemas/site-meta';

  let {
    kicker,
    name,
    bio,
    image,
    extraImages,
    socials,
    button,
    class: className,
  }: {
    kicker?: string;
    name: string;
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
</script>

<div class={['o-about-author', className]}>
  <div class="o-about-author__container">
    <div class="o-about-author__image-container">
      <AuthorAvatar class="o-about-author__image" src={image} alt={name} {extraImages} size="large" animated />
    </div>
    <div class="o-about-author__name-container">
      {#if kicker}
        <p class="o-about-author__kicker">{kicker}</p>
      {/if}
      <p class="o-about-author__name">{name}</p>
    </div>
    <div class="o-about-author__bio u-markdown">
      <MarkdownRenderer content={bio} />
    </div>
    {#if button}
      <Button href={button.url} class="o-about-author__button">
        {button.text}
      </Button>
    {/if}
    {#if socials}
      <div class="o-about-author__socials">
        {#each socials as social}
          <SocialLink name={social.name} url={social.url} label={social.label} class="o-about-author__social" />
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @use '/src/styles/typography';

  .o-about-author {
    container-type: inline-size;

    &__container {
      display: grid;
      grid-template-columns: 164px 1fr 120px;
      gap: var(--spacing-md) var(--spacing-xl);
      justify-items: start;
      align-items: start;
      grid-template-areas:
        'image name socials'
        'image bio socials'
        'image button socials';
    }

    &__image-container {
      grid-area: image;
      display: grid;
      place-items: center;

      :global(.m-author-avatar) {
        --size: 100%;        
      }
    }

    &__name-container {
      grid-area: name;
    }

    &__kicker {
      @include typography.h5;
      text-transform: lowercase;
      color: var(--t-v6--text--medium);
    }

    &__name {
      @include typography.h1;
      @include typography.gradient-pinkish;
      font-size: clamp(1.35rem, 1.6vw + 1rem, 2.25rem); //36px
      animation: var(--t-v6--glowing-text-animation);
    }

    &__bio {
      @include typography.b2;
      grid-area: bio;
      gap: 1rem;
      text-align: left;
    }

    &__socials {
      grid-area: socials;

      display: flex;
      gap: var(--spacing-md) var(--spacing-sm);
      flex-wrap: wrap;
      align-items: center;
    }

    &__button {
      grid-area: button;
    }

    @container (max-width: 768px) {
      &__container {
        grid-template-columns: 164px 1fr;
        grid-template-areas:
          'image name'
          'image bio'
          'image socials'
          'image button';
        gap: var(--spacing-md);
      }
    }

    @container (max-width: 520px) {
      &__container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }
      &__image-container {
        width: 64px;
      }
      &__bio {
        text-align: justify;
        width: 100%;
      }
      &__socials {
        justify-content: center;
        width: 100%;
      }
      :global(.o-about-author__button) {
        order: 4;
      }
    }
  }
</style>
