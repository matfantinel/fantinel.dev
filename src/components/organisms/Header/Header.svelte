<script lang="ts">
  import Logo from '@assets/brand/Logo.svelte';
  import HamburgerMenu from '@components/molecules/HamburgerMenu';

  let {
    color = 'default',
    className,
  }: {
    color?: 'default' | 'inverted';
    className?: string;
  } = $props();
</script>

<div
  class={['o-header', className]}
  class:o-header--inverted={color === 'inverted'}
  style="view-transition-name: header"
>
  <div class="o-header__container u-container">
    <a href="/" aria-label="Home" class="o-header__logo">
      <Logo {color} />
    </a>

    <div class="o-header__links">
      <HamburgerMenu
        links={[
          { label: 'All Posts', href: '/' },
          { label: 'Testing Grounds', href: '/blog/testing-grounds' },
        ]}
      />
    </div>
  </div>
</div>

<style lang="scss">
  @use '@styles/_breakpoints.scss';

  .o-header {
    color: var(--theme--text-base-color);

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
    }

    &--inverted {
      color: var(--theme--text-inverse-color);
    }
  }
</style>
