<script lang="ts">
  import Button from '@components/atoms/Button';
  import AuthorAvatar from '@components/molecules/AuthorAvatar';
  import MarkdownRenderer from '@components/molecules/MarkdownRenderer';
  import SocialLink from '@components/molecules/SocialLink';
  import type { SocialLink as SocialLinkType } from '@schemas/site-meta';

  let {
    kicker,
    name,
    bio,
    image,
    extraImages,
    socials,
    button,
    isCard,
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
    isCard?: boolean;
    class?: string;
  } = $props();
</script>

<div
  class={[
    'o-about-author',
    isCard ? 'o-about-author--is-card' : '',
    button ? 'o-about-author--has-button' : '',
    'u-container',
    className,
  ]}
>
  <div class="o-about-author__container">
    <div class="o-about-author__image-container">
      <AuthorAvatar
        class="o-about-author__image"
        src={image}
        alt={name}
        {extraImages}
        size="164px"
        theme="rainbow"
        animated
      />
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
      grid-template-columns: 164px 1fr;
      grid-template-areas:
        'image name'
        'image bio'
        'image socials';
      align-items: flex-start;
      justify-items: start;
      gap: var(--spacing-md) var(--spacing-xl);
    }

    &__image-container {
      grid-area: image;
      display: grid;
      place-items: center;
    }

    &__name-container {
      grid-area: name;
    }

    &__kicker {
      @include typography.h5;
      text-transform: lowercase;
      color: var(--theme--text-accent-color);
    }

    &__name {
      @include typography.h1;
      @include typography.gradient-greenish;
      font-size: clamp(1.35rem, 1.6vw + 1rem, 2.25rem); //36px
      animation: var(--theme--glowing-text-animation);
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

    &--is-card {
      .o-about-author {
        &__container {
          padding: var(--spacing-lg) var(--spacing-xl);
          background-color: var(--theme--background-card-color);
          border-radius: var(--border-radius);
          box-shadow: var(--theme--shadow-card);
        }
      }
    }

    &--has-button {
      .o-about-author {
        &__container {
          grid-template-columns: 164px 1fr 120px;
          grid-template-areas:
            'image name socials'
            'image bio socials'
            'image button socials';
        }
      }
    }

    @supports (container-type: inline-size) {
      @container (max-width: 688px) {
        &--is-card {
          .o-about-author {
            &__container {
              padding: var(--spacing-lg);
            }
          }
        }

        .o-about-author {
          &__container {
            align-items: center;
            grid-template-columns: 120px 1fr;
            grid-template-areas:
              'image name'
              'bio bio'
              'socials socials';
            gap: var(--spacing-md);
          }
          &__socials {
            justify-content: center;
          }
        }

        &--has-button {
          .o-about-author {
            &__container {
              grid-template-areas:
                'image name'
                'bio bio'
                'socials socials'
                'button button';
            }
          }
        }

        :global(.o-about-author__image) {
          width: 100%;
          aspect-ratio: 1 / 1;
          height: auto;
        }
      }

      @container (max-width: 380px) {
        .o-about-author {
          &__container {
            grid-template-columns: 64px 1fr;
          }
          &__socials {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
        }
      }
    }
  }
</style>
