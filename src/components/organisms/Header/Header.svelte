<script lang="ts">
  import Logo from '@assets/brand/Logo.svelte';
  import Rss from '@assets/icons/rss.svelte';
  import HamburgerMenu from '@components/molecules/HamburgerMenu';
  import ThemeToggle from '@components/molecules/ThemeToggle';

  let {
    color = 'default',
    class: className,
  }: {
    color?: 'default' | 'inverted';
    class?: string;
  } = $props();
</script>

{#snippet rssIconSnippet()}<Rss />{/snippet}

<header
  class={['o-header', className]}
  class:o-header--inverted={color === 'inverted'}
  style="view-transition-name: header"
>
  <div class="o-header__container u-container">
    <a href="/" aria-label="Home" class="o-header__logo">
      <Logo size="80px" {color} />
    </a>

    <div class="o-header__links">
      <HamburgerMenu
        class="o-header__hamburger-menu"
        links={[
          { label: 'Blog', href: '/blog' },
          { label: 'About', href: '/about' },
          { label: 'RSS', href: '/rss.xml', icon: rssIconSnippet, title: 'Subscribe to my RSS Feed' },
        ]}
      />

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
    }

    &--inverted {
      color: var(--theme--text-inverse-color);
    }
  }
</style>
