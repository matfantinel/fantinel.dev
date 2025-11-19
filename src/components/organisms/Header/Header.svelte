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

  let {
    color = 'default',
    hasBackground = false,
    currentSearch,
    currentUrl,
    class: className,
  }: {
    color?: 'default' | 'inverted';
    hasBackground?: boolean;
    currentSearch?: string;
    currentUrl?: string;
    class?: string;
  } = $props();

  let pathname = $state('/');

  if (currentUrl) {
    let urlTest = new URL(currentUrl);
    pathname = urlTest.pathname;
  }

  // Update pathname on client-side navigation
  $effect(() => {
    const updatePathname = () => {
      pathname = window.location.pathname;
    };

    // Listen for Astro view transition navigation
    document.addEventListener('astro:page-load', updatePathname);

    return () => {
      document.removeEventListener('astro:page-load', updatePathname);
    };
  });

  const links = $derived([
    { label: 'Home', href: '/', icon: homeIconSnippet, active: pathname === '/', color: 'generic' },
    { label: 'Blog', href: '/blog', icon: postIconSnippet, active: pathname.startsWith('/blog'), color: 'post' },
    {
      label: 'Quick Reviews',
      href: '/quick-reviews',
      icon: quickReviewIconSnippet,
      active: pathname.startsWith('/quick-reviews'),
      color: 'quick-review',
    },
    {
      label: 'Cool Links',
      href: '/cool-links',
      icon: coolLinkIconSnippet,
      active: pathname.startsWith('/cool-links'),
      color: 'cool-link',
    },
    {
      label: 'Photography',
      href: '/photography',
      icon: photographyIconSnippet,
      active: pathname.startsWith('/photography'),
      color: 'photography',
    },
    { label: 'RSS Feed', href: '/rss.xml', icon: rssIconSnippet, title: 'Subscribe to my RSS Feed', color: 'generic' },
  ]);
</script>

{#snippet rssIconSnippet()}<Rss size="20px" />{/snippet}
{#snippet postIconSnippet()}<PostIcon size="20px" />{/snippet}
{#snippet quickReviewIconSnippet()}<QuickReviewIcon size="20px" />{/snippet}
{#snippet coolLinkIconSnippet()}<CoolLinkIcon size="20px" />{/snippet}
{#snippet photographyIconSnippet()}<PhotographyIcon size="20px" />{/snippet}
{#snippet homeIconSnippet()}<HomeIcon size="20px" />{/snippet}

<header
  class={['o-header', className]}
  class:o-header--inverted={color === 'inverted'}
  class:o-header--has-background={hasBackground}
  style="view-transition-name: header"
>
  <div class="o-header__container u-container">
    <a href="/" aria-label="Home" class="o-header__logo">
      <Logo size="80px" {color} />
    </a>

    <div class="o-header__links">
      <HamburgerMenu class="o-header__hamburger-menu" {links} {currentSearch} />

      <ThemeToggle class="o-header__theme-toggle" />
    </div>
  </div>
</header>

<style lang="scss">
  @use '/src/styles/breakpoints';

  .o-header {
    color: var(--theme--text-base-color);
    position: relative;
    z-index: 9;
    height: var(--header-height);

    container-type: inline-size;

    &__container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-lg);
      padding-block: var(--spacing-lg);

      @include breakpoints.for-phone-only {
        gap: var(--spacing-sm);
        padding-block: var(--spacing-sm);
      }
    }

    &__logo {
      height: 80px;
      z-index: 98;

      &:is(a):hover {
        filter: none;
      }
    }

    &__links {
      display: flex;
      align-items: center;
      gap: var(--spacing-md) var(--spacing-lg);
    }

    :global(.o-header__hamburger-menu) {
      order: 3;
    }

    :global(.o-header__theme-toggle) {
      order: 1;
      z-index: 98;
    }

    @include breakpoints.for-tablet-portrait-up {
      :global(.o-header__hamburger-menu) {
        order: 2;
      }

      :global(.o-header__theme-toggle) {
        order: 3;
      }

      @container (min-width: 321px) {
        :global(.m-hamburger-menu__item) {
          width: fit-content;
        }
        :global(.a-nav-menu-link) {
          width: fit-content;
        }
        :global(.a-nav-menu-link__icon) {
          display: none;
        }
      }

      @container (max-width: 320px) {
        .o-header {
          &__container {
            flex-direction: column;
            align-items: flex-start;
            height: 100dvh;
            justify-content: flex-start;
          }
          &__links {
            flex-direction: column;
            width: 100%;
            align-items: flex-start;
          }

          :global(.o-header__hamburger-menu) {
            width: 100%;
          }
        }
      }
    }

    &--inverted {
      color: var(--theme--text-inverse-color);
    }

    &--has-background {
      @include breakpoints.for-phone-only {
        background-color: var(--theme--background-accent-color);
      }

      // @include breakpoints.for-tablet-portrait-up {
      //   box-shadow: var(--theme--shadow-image);
      //   border-top-right-radius: var(--border-radius--small);
      //   border-bottom-right-radius: var(--border-radius--small);
      // }
    }
  }
</style>
