<script lang="ts">
  import Button from '@components/atoms/Button';
  import SocialLink from '@components/atoms/SocialLink';
  import AuthorAvatar from '@components/molecules/AuthorAvatar';
  import HeroWaves from '@components/molecules/HeroWaves';
  import MarkdownRenderer from '@components/molecules/MarkdownRenderer';
  import type { SocialLink as SocialLinkType } from '@schemas/site-meta';

  import type { ButtonProps } from '@components/atoms/Button';
  import type { SiteSectionCardProps } from '@components/molecules/SiteSectionCard';
  import SiteSectionCard from '@components/molecules/SiteSectionCard';
  import SiteSectionCards from '@components/molecules/SiteSectionCards';
  import type { BaseProps } from '@utils/types';
  import { PostType } from '@schemas/post-types.ts';

  export type HomePageHeroProps = BaseProps & {
    kicker?: string;
    title: string;
    bio: string;
    image: string;
    extraImages?: string[];
    socials?: SocialLinkType[];
    button?: ButtonProps & { icon?: any };
    secondaryButton?: ButtonProps & { icon?: any };
    sectionCards?: SiteSectionCardProps[];
  };

  let {
    kicker,
    title,
    bio,
    image,
    extraImages,
    socials,
    button,
    secondaryButton,
    sectionCards,
    class: className,
  }: HomePageHeroProps = $props();

  let classList = $derived(['o-home-page-hero', sectionCards ? 'o-home-page-hero--has-cards' : '', className]);

  let cardElements = $state<SiteSectionCard[]>([]);

  function triggerCardAnimation(card: SiteSectionCard) {
    if (card) {
      card.triggerAnimation();
    }
  }

  const cardAnimationConsts = {
    cardEntryDelay: 500,
    cardEntryStaggerDelay: 750,
    cardEntryDuration: 500,
    coolLinksAnimationDelay: 6000,
    coolLinksAnimationDuration: 300,
    cardCrookDelay: 6300, // coolLinksAnimationDelay + coolLinksAnimationDuration
    cardCrookDuration: 250,
    crookDegrees: [-2, 2, -4],
    shakeDelay: 6300,
    shakeDuration: 400,
    blogAnimationDelay: 3500,
    quickReviewsAnimationDelay: 3500,
  };
</script>

<div class={classList}>
  <div class="o-home-page-hero__inner u-content-grid">
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
            <Button href={button.href} color={button.color} icon={button.icon} iconPosition={button.iconPosition}>
              {button.text}
            </Button>
            {#if secondaryButton}
              <Button
                href={secondaryButton.href}
                color={secondaryButton.color}
                icon={secondaryButton.icon}
                iconPosition={secondaryButton.iconPosition}
              >
                {secondaryButton.text}
              </Button>
            {/if}
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

  {#if sectionCards}
    <div
      class="o-home-page-hero__sections"
      style={[
        `--shake-delay:${cardAnimationConsts.shakeDelay}ms;`,
        `--shake-duration:${cardAnimationConsts.shakeDuration}ms;`,
      ].join(' ')}
    >
      <SiteSectionCards class="o-home-page-hero__section-cards">
        {#each sectionCards as sectionCard, index}
          <SiteSectionCard
            class="o-home-page-hero__section-card"
            bind:this={cardElements[index]}
            onmouseenter={() => triggerCardAnimation(cardElements[index])}
            {...sectionCard}
            animateInstantly={sectionCard.postType !== PostType.BLOG_POST}
            animationDelay={sectionCard.postType === PostType.BLOG_POST
              ? cardAnimationConsts.blogAnimationDelay
              : sectionCard.postType === PostType.COOL_LINK
                ? cardAnimationConsts.coolLinksAnimationDelay
                : sectionCard.postType === PostType.QUICK_REVIEW
                  ? cardAnimationConsts.quickReviewsAnimationDelay
                  : 0}
            style={[
              `--card-entry-delay:${cardAnimationConsts.cardEntryDelay + cardAnimationConsts.cardEntryStaggerDelay * index}ms;`,
              `--card-entry-duration:${cardAnimationConsts.cardEntryDuration}ms;`,
              `--card-crook-delay:${cardAnimationConsts.cardCrookDelay}ms;`,
              `--card-crook-duration:${cardAnimationConsts.cardCrookDuration}ms;`,
              `--stamp-animation-duration:${cardAnimationConsts.coolLinksAnimationDuration}ms;`,
              `--crook-rotation:${cardAnimationConsts.crookDegrees[index]}deg;`,
            ].join(' ')}
          />
        {/each}
      </SiteSectionCards>
    </div>
  {/if}
</div>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';
  @use '/src/styles/mixins';

  .o-home-page-hero {
    container-type: inline-size;

    &__inner {
      background-color: var(--t--surface--accent);

      position: relative;
      container-type: inline-size;
      margin-bottom: 64px;
      gap: 0;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;

        background: var(--t--gradient--rainbow);
        mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 50%, transparent 100%);
        mask-repeat: no-repeat;
        mask-position: top;

        @media (prefers-reduced-motion: no-preference) {
          animation: rainbow-breathe 6s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite alternate;
        }
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
      color: var(--t--text--medium);
    }

    &__title {
      @include typography.h1;
      @include typography.gradient-greenish;
      animation: var(--t--glowing-text-animation);
    }

    &__bio {
      @include typography.b2;
      grid-area: bio;
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

    &__buttons {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--spacing-sm);
      margin-top: var(--spacing-sm);
    }

    &__sections {
      z-index: 1;
      margin-top: -140px;
      margin-bottom: var(--spacing-xxl);

      animation: var(--shake-duration) both shake var(--shake-delay);

      @keyframes shake {
        0% {
          transform: translateX(0);
        }
        25% {
          transform: translateX(2px);
        }
        50% {
          transform: translateX(-2px);
        }
        75% {
          transform: translateX(2px);
        }
        100% {
          transform: translateX(0);
        }
      }
    }

    :global(.o-home-page-hero__section-card) {
      animation:
        var(--card-entry-duration) ease-in-out card-entry var(--card-entry-delay) both,
        0.25s ease-out card-crook var(--card-crook-delay) both;
    }

    &--has-cards {
      .o-home-page-hero {
        &__inner {
          padding-bottom: 120px;
        }
      }
    }

    @container (max-width: 768px) {
      &__container {
        gap: var(--spacing-md);
      }
      &__sections {
        margin-bottom: var(--spacing-xl);
      }

      &--has-cards {
        .o-home-page-hero {
          &__inner {
            padding-bottom: 100px;
          }
        }
      }
    }

    @container (max-width: 520px) {
      &:before {
        height: 160px;
      }

      &__container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        gap: var(--spacing-xl) var(--spacing-md);

        padding-block: var(--spacing-xl) var(--spacing-lg);
      }

      &__image-container {
        width: 100px;
        margin-inline: auto;
      }

      &__title-container {
        align-items: center;
        width: 100%;
        margin-inline: auto;
        text-align: center;
        margin-bottom: calc(var(--spacing-lg) * -1);
        order: -1;
      }

      &__bio {
        width: 100%;
      }

      &__socials {
        display: none;
      }

      &__buttons {
        justify-content: center;
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

    @keyframes card-entry {
      from {
        translate: 0 40%;
        opacity: 0;
      }
      to {
        translate: 0 0;
        opacity: 1;
      }
    }

    @keyframes card-crook {
      to {
        rotate: var(--crook-rotation, 0deg);
      }
    }
  }
</style>
