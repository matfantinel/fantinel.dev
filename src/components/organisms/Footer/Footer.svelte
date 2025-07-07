<script lang="ts">
  import FooterWaves from '@assets/brand/FooterWaves.svelte';
  import Rss from '@assets/icons/rss.svelte';
  import IconLink from '@components/atoms/IconLink';
  import ThemeToggle from '@components/molecules/ThemeToggle';

  import SocialLink from '@components/molecules/SocialLink';
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
  <div class="o-footer__waves-container" aria-hidden="true">
    <FooterWaves class="o-footer__waves" />
  </div>

  <div class="o-footer__container u-container">
    <div class="o-footer__copyright">
      © {currentYear} Matheus Fantinel
    </div>    
    <div class="o-footer__links">
      {#if socials}
        {#each socials as social}
          <SocialLink
            name={social.name}
            url={social.url}
            label={social.label}
            class="o-footer__link"
          />
        {/each}
      {/if}

      {#snippet rssIconSnippet()}<Rss />{/snippet}
      <IconLink
        class="o-footer__link"
        icon={rssIconSnippet}
        href="/rss.xml"
        target="_blank"
        rel="noopener noreferrer"
        title="Subscribe to my RSS Feed"
      >
        RSS
      </IconLink>

      <ThemeToggle class="o-footer__theme-toggle" />
    </div>
    <div class="o-footer__badges">
      <div class="o-footer__badge">
        <a href="https://astro.build"><img src="https://astro.badg.es/v2/built-with-astro/tiny.svg" alt="Built with Astro" width="120" height="20"></a>
      </div>
    </div>
    <div class="o-footer__badges">
      <!-- <div class="o-footer__badge">
        <img src="/badges/CoffeePowered.svg" alt="Coffee Powered" />
      </div> -->

      <div class="o-footer__badge">
        <img src="/badges/MadeInBrazil.svg" alt="Made in Brazil" />
      </div>

      <div class="o-footer__badge">
        <img src="/badges/MadeByAHuman.svg" alt="Made by a human" />
      </div>

      <div class="o-footer__badge">
        <img src="/badges/RssIsAwesome.svg" alt="RSS is awesome" />
      </div>

      <div class="o-footer__badge">
        <img src="/badges/TransRights.svg" alt="Trans Rights are Human Rights" />
      </div>
    </div>
  </div>
</footer>

<style lang="scss">
  @use '/src/styles/typography';

  .o-footer {
    color: var(--theme--text-base-color);
    position: relative;
    z-index: 8;

    margin-top: var(--spacing-xxl);

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    &__waves-container {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;

      :global(.o-footer__waves) {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    &__container {
      padding-top: calc(var(--spacing-xxxl) * 2);
      padding-bottom: var(--spacing-xl);

      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-sm);
    }

    &__copyright,
    &__credits {
      @include typography.b1;
      text-align: center;
      text-wrap: balance;
    }

    &__links {
      display: flex;
      gap: var(--spacing-md) var(--spacing-sm);
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;

      margin-top: var(--spacing-sm);
    }

    &__badges {
      display: flex;
      gap: var(--spacing-md) var(--spacing-sm);
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;

      margin-top: var(--spacing-sm);
    }

    &__badge {
      display: flex;
      align-items: center;
      justify-content: center;

      #wcb.carbonbadge {
        --b2: var(--color--teal);
        --b1: var(--color--teal-contrast);

        :global(#wcb_g) {
          background: var(--theme--background-base-color);
          color: var(--theme--text-base-color);
        }

        :global(#wcb_2) {
          color: var(--theme--text-base-color);
        }
      }
    }
  }
</style>
