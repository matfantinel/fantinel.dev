<script lang="ts">
  import Logo from '@assets/brand/Logo.svelte';
  import Rss from '@assets/icons/rss.svelte';
  import PostIcon from '@assets/icons/post-types/post.svelte';
  import QuickReviewIcon from '@assets/icons/post-types/quick-review.svelte';
  import CoolLinkIcon from '@assets/icons/post-types/cool-link.svelte';
  import PhotographyIcon from '@assets/icons/post-types/photography.svelte';
  import HamburgerMenu from '@components/molecules/HamburgerMenu';
  import ThemeToggle from '@components/molecules/ThemeToggle';
  import HomeIcon from '@assets/icons/home.svelte';
  import TimelineIcon from '@assets/icons/timeline.svelte';
  import { PostType } from '@schemas/post-types';
  import NavMenuLink from '@components/atoms/NavMenuLink';
  import SocialLink from '@components/atoms/SocialLink';
  import type { SocialLink as SocialLinkType } from '@schemas/site-meta';
  import PagefindSearchField from '@components/molecules/PagefindSearchField';

  let {
    currentSearch,
    currentUrl,
    socials,
    class: className,
  }: {
    currentSearch?: string;
    currentUrl?: string;
    socials?: SocialLinkType[];
    class?: string;
  } = $props();

  let pathname = $state('/');

  if (currentUrl) {
    let urlTest = new URL(currentUrl);
    pathname = urlTest.pathname;
  }

  // Update pathname on client-side navigation
  $effect(() => {
    const scrollToActiveLink = () => {
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

  const links = $derived([
    { label: 'Home', href: '/', icon: homeIconSnippet, active: pathname === '/', color: 'accent' },
    {
      label: 'Archive',
      href: '/timeline',
      icon: timelineIconSnippet,
      active: pathname === '/timeline',
      color: 'accent',
    },
    {
      label: 'Blog',
      href: '/blog',
      icon: postIconSnippet,
      active: pathname.startsWith('/blog'),
      color: PostType.BLOG_POST,
    },
    {
      label: 'Quick Reviews',
      href: '/quick-reviews',
      icon: quickReviewIconSnippet,
      active: pathname.startsWith('/quick-reviews'),
      color: PostType.QUICK_REVIEW,
    },
    {
      label: 'Cool Links',
      href: '/cool-links',
      icon: coolLinkIconSnippet,
      active: pathname.startsWith('/cool-links'),
      color: PostType.COOL_LINK,
    },
    {
      label: 'Photography',
      href: '/photography',
      icon: photographyIconSnippet,
      active: pathname.startsWith('/photography'),
      color: PostType.PHOTOGRAPHY,
    },
    { label: 'RSS', href: '/rss.xml', icon: rssIconSnippet, title: 'Subscribe to my RSS Feed', color: 'generic' },
  ]);
</script>

{#snippet rssIconSnippet()}<Rss size="24px" />{/snippet}
{#snippet postIconSnippet()}<PostIcon size="24px" />{/snippet}
{#snippet quickReviewIconSnippet()}<QuickReviewIcon size="24px" />{/snippet}
{#snippet coolLinkIconSnippet()}<CoolLinkIcon size="24px" />{/snippet}
{#snippet photographyIconSnippet()}<PhotographyIcon size="24px" />{/snippet}
{#snippet homeIconSnippet()}<HomeIcon size="24px" />{/snippet}
{#snippet timelineIconSnippet()}<TimelineIcon size="24px" />{/snippet}

<header class={['o-header', className]} style="view-transition-name: header">
  <div class="o-header__container">
    <a href="/" aria-label="Home" class="o-header__logo">
      <Logo size="80px" />
    </a>

    <nav class="o-header__navigation">
      {#each links as link}
        <NavMenuLink href={link.href} icon={link.icon} active={link.active} color={link.color}>
          {link.label}
        </NavMenuLink>
      {/each}
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
    </div>
  </div>
</header>

<style lang="scss">
  @use '/src/styles/breakpoints';

  .o-header {
    position: relative;
    z-index: 9;
    container-type: inline-size;
    width: 100%;
    overflow: auto;

    &__container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);

      width: 100%;
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

    &__contact,
    &__actions {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
      width: 100%;

      padding-top: var(--spacing-md);
      border-top: 1px solid var(--t-v6--border--medium);
    }

    @include breakpoints.for-phone-only {
      &__container {
        flex-direction: row;
        padding: var(--spacing-sm);
        gap: var(--spacing-sm);
        align-items: center;
        width: 100%;
        overflow: hidden;
      }

      &__logo {
        :global(.logo) {
          width: 32px !important;
          height: 32px !important;
        }
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

      &__contact,
      &__actions {
        display: none;
      }
    }
  }
</style>
