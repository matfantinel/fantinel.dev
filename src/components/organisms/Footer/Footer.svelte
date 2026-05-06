<script lang="ts">
  import Rss from '@assets/icons/rss.svelte';
  import IconLink from '@components/atoms/IconLink';
  import ThemeToggle from '@components/molecules/ThemeToggle';

  import SocialLink from '@components/atoms/SocialLink';
  import type { SocialLink as SocialLinkType } from '@schemas/site-meta';

  let {
    socials,
    class: className,
  }: {
    socials?: SocialLinkType[];
    class?: string;
  } = $props();

  const currentYear = new Date().getFullYear();
</script>

<footer class={['o-footer', className]} style="view-transition-name: footer">
  <div class="o-footer__wrapper">
    <div class="o-footer__container u-container">
      <div class="o-footer__copyright">
        © {currentYear} Matheus Fantinel
      </div>

      <div class="o-footer__links">
        {#if socials}
          {#each socials as social}
            <SocialLink name={social.name} url={social.url} label={social.label} class="o-footer__link" />
          {/each}
        {/if}

        <SocialLink name="RSS" url="/rss.xml" label="RSS" class="o-footer__link" />
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
    </div>
  </div>
</footer>

<style lang="scss">
  @use '/src/styles/typography';

  .o-footer {
    position: relative;
    z-index: 8;

    &__wrapper {
      background-color: var(--t-v6--surface--accent);
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

        background: var(--t-v6--gradient--rainbow);
        mask-image: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 50%, transparent 100%);
        mask-repeat: no-repeat;
        mask-position: bottom;

        @media (prefers-reduced-motion: no-preference) {
          animation: rainbow-breathe 6s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite alternate;
        }
      }
    }

    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-md);

      padding: var(--spacing-xl) var(--spacing-lg) var(--spacing-xxl);
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
