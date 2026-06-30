<script lang="ts">
  import Logo from '@assets/brand/Logo.svelte';
  import ThemeToggle from '@components/molecules/ThemeToggle';
  import NavMenuLink from '@components/atoms/NavMenuLink';
  import SocialLink from '@components/atoms/SocialLink';
  import type { SocialLink as SocialLinkType, NavigationLink } from '@schemas/site-meta';
  import PagefindSearchField from '@components/molecules/PagefindSearchField';

  import type { BaseProps } from '@utils/types';

  export type HeaderProps = BaseProps & {
    currentSearch?: string;
    currentUrl?: string;
    socials?: SocialLinkType[];
    navigation?: NavigationLink[];
    secondaryNavigation?: NavigationLink[];
  };

  let { currentSearch, currentUrl, socials, navigation, secondaryNavigation, class: className }: HeaderProps = $props();

  let pathname = $state('/');

  if (currentUrl) {
    let urlTest = new URL(currentUrl);
    pathname = urlTest.pathname;
  }

  // Update pathname on client-side navigation
  $effect(() => {
    const scrollToActiveLink = () => {
      // if window width >= 768, return
      if (window.innerWidth >= 768) {
        return;
      }

      const nav = document.querySelector('.o-header__navigation');
      const activeLink = nav?.querySelector('[aria-current="page"], .a-nav-menu-link--active');
      if (nav && activeLink) {
        activeLink.scrollIntoView({ behavior: 'instant', inline: 'center' });
      }
    };

    const updatePathname = () => {
      pathname = window.location.pathname;

      setTimeout(() => {
        scrollToActiveLink();
      }, 0);
    };

    // Listen for Astro view transition navigation
    document.addEventListener('astro:page-load', updatePathname);
    scrollToActiveLink();

    return () => {
      document.removeEventListener('astro:page-load', updatePathname);
    };
  });

  const links = $derived(
    (navigation ?? []).map((link) => ({
      ...link,
      active: link.href === '/' ? pathname === '/' : pathname.startsWith(link.href),
    })),
  );

  const secondaryLinks = $derived(
    (secondaryNavigation ?? []).map((link) => ({
      ...link,
      active: link.href === '/' ? pathname === '/' : pathname.startsWith(link.href),
    })),
  );
</script>

<header class={['o-header', className]} style="view-transition-name: header">
  <div class="o-header__container">
    <div class="o-header__seasonal-message">
      🏳️‍🌈 <span>Happy Pride month!</span>
    </div>

    <a href="/" aria-label="Home" class="o-header__logo">
      <Logo size="80px" />
    </a>

    <nav class="o-header__navigation" data-nav>
      {#each links as link}
        <NavMenuLink
          class="o-header__nav-link"
          href={link.href}
          icon={link.icon}
          active={link.active}
          color={link.color}
          title={link.title}
        >
          {link.label}
        </NavMenuLink>
      {/each}

      {#if secondaryNavigation}
        <div class="o-header__navigation-secondary" data-nav>
          {#each secondaryLinks as link}
            <NavMenuLink
              class="o-header__nav-link"
              href={link.href}
              icon={link.icon}
              color={link.color}
              title={link.title}
              active={link.active}
              size="small"
            >
              {link.label}
            </NavMenuLink>
          {/each}
        </div>
      {/if}

      <ThemeToggle class="o-header__theme-toggle mobile-only" />

      <PagefindSearchField class="o-header__search-field mobile-only" value={currentSearch} />
    </nav>

    {#if socials}
      <div class="o-header__contact">
        {#each socials as social}
          <SocialLink name={social.name} url={social.url} label={social.label} />
        {/each}
      </div>
    {/if}

    <div class="o-header__actions">
      <PagefindSearchField class="o-header__search-field" value={currentSearch} />

      <ThemeToggle class="o-header__theme-toggle" />
    </div>

  </div>
</header>

<style lang="scss">
  @use '/src/styles/breakpoints';
  @use '/src/styles/typography';

  .o-header {
    position: relative;
    z-index: 9;
    container-type: inline-size;
    width: 100%;
    overflow: auto;

    &__seasonal-message {
      @include typography.icon-label;
      text-align: center;

      position: absolute;
      top: var(--spacing-xs);
      left: 0;
      width: 100%;

      span {
        @include typography.gradient-pride;
      }
    }

    &__container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);

      width: 100%;
      height: 100%;
      padding: var(--spacing-lg) var(--spacing-md);
    }

    &__logo {
      width: fit-content;
    }

    &__navigation {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
      width: 100%;
    }

    &__navigation-secondary,
    &__contact,
    &__actions {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
      width: 100%;

      padding-top: var(--spacing-md);
      border-top: 1px solid var(--t--border--medium);
    }

    &__navigation-secondary {
      margin-top: var(--spacing-xs);
    }

    :global(.o-header__theme-toggle) {
      align-self: center;
    }

    :global(.o-header__theme-toggle.mobile-only) {
      display: none;
      flex-shrink: 0;
    }

    :global(.o-header__search-field.mobile-only) {
      flex-shrink: 0;
      width: min(200px, 100%);
      display: none;
    }

    @include breakpoints.for-phone-only {
      &__seasonal-message {
        display: none;
      }

      &__container {
        flex-direction: row;
        padding: var(--spacing-sm);
        gap: var(--spacing-sm);
        align-items: center;
        width: 100%;
        overflow: hidden;
        height: 64px;
      }

      &__logo {
        :global(.logo) {
          width: 32px !important;
          height: 32px !important;
        }
      }

      :global(.o-header__theme-toggle.mobile-only) {
        display: flex;
      }

      :global(.o-header__search-field.mobile-only) {
        display: block;
      }

      :global(.o-header__nav-link[href='/']) {
        display: none;
      }

      &__navigation {
        flex-direction: row;
        align-items: center;
        gap: var(--spacing-xs);

        width: fit-content;
        overflow: auto;
        padding-bottom: var(--spacing-sm);
        margin-bottom: calc(var(--spacing-sm) * -1);

        // Add dynamic fade effects to the start/end of the nav bar to indicate
        // the user can scroll horizontally
        // From https://css-tricks.com/modern-scroll-shadows-using-scroll-driven-animations/

        @property --left-fade {
          syntax: '<length>';
          inherits: false;
          initial-value: 0;
        }

        @property --right-fade {
          syntax: '<length>';
          inherits: false;
          initial-value: 0;
        }

        @keyframes scrollfade {
          0% {
            --left-fade: 0px;
            --right-fade: var(--spacing-lg);
          }
          10% {
            --left-fade: var(--spacing-lg);
          }
          90% {
            --left-fade: var(--spacing-lg);
            --right-fade: var(--spacing-lg);
          }
          100% {
            --left-fade: var(--spacing-lg);
            --right-fade: 0px;
          }
        }

        mask: linear-gradient(to right, transparent, #000 var(--left-fade) calc(100% - var(--right-fade)), transparent);
        animation: scrollfade;
        animation-timeline: --scrollfade;
        scroll-timeline: --scrollfade x;
      }

      &__navigation-secondary {
        flex-direction: row;
        align-items: center;
        gap: var(--spacing-xs);
        padding-top: 0;
        border: none;
        margin-top: 0;
        width: fit-content;
      }

      &__contact,
      &__actions {
        display: none;
      }
    }
  }
</style>
