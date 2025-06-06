<script lang="ts">
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
    class: className,
  }: {
    kicker?: string;
    name: string;
    bio: string;
    image: string;
    extraImages?: string[];
    socials?: SocialLinkType[];
    class?: string;
  } = $props();
</script>

<div class={['o-about-author-card', 'u-container', className]}>
  <div class="o-about-author-card__container">
    <div class="o-about-author-card__image-container">
      <AuthorAvatar src={image} alt={name} {extraImages} size="164px" theme="rainbow" animated />
    </div>
    <div class="o-about-author-card__content">
      {#if kicker}
        <p class="o-about-author-card__kicker">{kicker}</p>
      {/if}
      <p class="o-about-author-card__name">{name}</p>
      <div class="o-about-author-card__bio u-markdown">
        <MarkdownRenderer content={bio} />
      </div>
      {#if socials}
        <div class="o-about-author-card__socials">
          {#each socials as social}
            <SocialLink name={social.name} url={social.url} label={social.label} class="o-about-author-card__social" />
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  @use '/src/styles/typography';

  .o-about-author-card {
    container-type: inline-size;
    &__container {
      padding: var(--spacing-lg) var(--spacing-xl);
      background-color: var(--theme--background-card-color);
      border-radius: var(--border-radius);
      box-shadow: var(--theme--shadow-card);
      container-type: inline-size;

      display: flex;
      align-items: flex-start;
      justify-content: center;
      gap: var(--spacing-xl);
      flex-wrap: wrap;
    }

    &__image-container {
      flex: 0 0 164px;
    }

    &__content {
      flex: 1;
      min-width: min(380px, 100%);

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-sm);
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
    }

    &__bio {
      @include typography.b2;
      gap: 1rem;
      text-align: left;
    }

    &__socials {
      display: flex;
      gap: var(--spacing-md) var(--spacing-sm);
      flex-wrap: wrap;
      align-items: center;

      margin-top: var(--spacing-sm);
    }

    @supports (container-type: inline-size) {
      @container (max-width: 688px) {
        .o-about-author-card {
          &__container {
            padding: var(--spacing-lg);
          }
          &__kicker,
          &__name {
            text-align: center;
            align-self: center;
          }
          &__name {
            margin-top: calc(var(--spacing-sm) * -1);
          }
          &__socials {
            justify-content: center;
          }
        }
      }
    }
  }
</style>
