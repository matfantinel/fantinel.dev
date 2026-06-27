<script lang="ts">
  import TownSquare from '@components/molecules/TownSquare';
  import ThemeToggle from '@components/molecules/ThemeToggle';

  import SocialLink from '@components/atoms/SocialLink';
  import type { SocialLink as SocialLinkType } from '@schemas/site-meta';
  import type { BaseProps } from '@utils/types';

  export type FooterProps = BaseProps & {
    socials?: SocialLinkType[];
  };

  let { socials, class: className }: FooterProps = $props();

  const currentYear = new Date().getFullYear();
</script>

<footer class={['o-footer', className]} style="view-transition-name: footer">
  <div class="o-footer__wrapper">
    <div class="o-footer__container u-content-grid">
      <div class="o-footer__copyright">
        © {currentYear} Matheus Fantinel
      </div>

      <div class="o-footer__links">
        {#if socials}
          {#each socials as social}
            <SocialLink name={social.name} url={social.url} label={social.label} class="o-footer__link" />
          {/each}
        {/if}

        <ThemeToggle class="o-footer__theme-toggle" />
      </div>

      <div class="o-footer__badges">
        <div class="o-footer__badge">
          <img src="/badges/MadeInBrazil.svg" alt="Made in Brazil" />
        </div>

        <div class="o-footer__badge">
          <img src="/badges/MadeInSerraGaucha.svg" alt="Made in Serra Gaúcha" />
        </div>

        <div class="o-footer__badge">
          <img src="/badges/NowInItaly.svg" alt="Now in Italy" />
        </div>

        <div class="o-footer__badge">
          <img src="/badges/PoweredByAutism.svg" alt="Powered by Autism" />
        </div>

        <div class="o-footer__badge">
          <img src="/badges/TransRights.svg" alt="Trans Rights are Human Rights" />
        </div>
      </div>

      <div class="o-footer__townsquare-container u-content-grid full-width">
        <div class="o-footer__townsquare smol">
          <TownSquare excludePaths={['/garden']} />
        </div>
      </div>
    </div>
  </div>
</footer>

<style lang="scss">
  @use '/src/styles/typography';

  .o-footer {
    position: relative;
    z-index: 8;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    &__wrapper {
      background-color: var(--t--surface--accent);
      position: relative;
      margin-top: 100px;

      &:before {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 0;
        width: 100%;
        height: 100px;
        z-index: -1;

        background: var(--t--gradient--rainbow);
        mask-image: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 50%, transparent 100%);
        mask-repeat: no-repeat;
        mask-position: bottom;

        @media (prefers-reduced-motion: no-preference) {
          animation: rainbow-breathe 6s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite alternate;
        }
      }
    }

    &__container {
      row-gap: var(--spacing-md);
      padding-block: var(--spacing-xl) var(--spacing-xxl);
    }

    &__copyright {
      @include typography.b1;
      text-align: center;
      text-wrap: balance;
    }

    &__links,
    &__badges {
      display: flex;
      gap: var(--spacing-md) var(--spacing-sm);
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }

    &__badge {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__townsquare-container {
      --smol-max-width: 504px;
      width: 100%;
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
</style>
