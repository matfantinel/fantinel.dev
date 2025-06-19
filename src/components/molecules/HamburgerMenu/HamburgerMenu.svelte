<script lang="ts">
  import IconLink from "@components/atoms/IconLink/IconLink.svelte";
  import type { Snippet } from "svelte";
  import PagefindSearchField from "../PagefindSearchField";

  let {
    links,
    currentSearch,
    class: className,
  }: {
    links: {
      label: string;
      href: string;
      icon?: Snippet;
      title?: string;
    }[];
    currentSearch?: string;
    class?: string;
  } = $props();

  // ✨ Progressive enhancement ✨
  // When closing, add closing class to the menu
  // so it can animate out
  // If no JS is present, everything still works, just not as smoothly
  let menuIsClosing = $state(false);
  let menuLabel = $state('Menu');

  function handleToggle(e: Event) {
    const target = e.target as HTMLInputElement;
    if (!target.checked) {
      menuIsClosing = true;
      menuLabel = 'Menu';      

      setTimeout(() => {
        menuIsClosing = false;
      }, 500);
    } else {
      menuLabel = 'Close';
    }
  }

  function handleMenuItemClick() {
    // Close the menu
    const control = document.getElementById('menu-control') as HTMLInputElement;
    control.checked = false;
  }
</script>

<nav class={['m-hamburger-menu', className]}>
  <div class="m-hamburger-menu__container">
    <input
      id="menu-control"
      class="m-hamburger-menu__checkbox"
      type="checkbox"
      aria-label="Toggle menu"
      aria-controls="menu"
      onchange={handleToggle}
    />

    <label for="menu-control" class="m-hamburger-menu__label">
      <div class="m-hamburger-menu__bars">
        <span class="m-hamburger-menu__bar"></span>
        <span class="m-hamburger-menu__bar"></span>
        <span class="m-hamburger-menu__bar"></span>
      </div>
      <span class="m-hamburger-menu__label-text">{menuLabel}</span>
    </label>

    <ul id="menu" class="m-hamburger-menu__list" class:m-hamburger-menu__list--closing={menuIsClosing}>
      <li class="m-hamburger-menu__item m-hamburger-menu__search">
        <PagefindSearchField class="m-hamburger-menu__search-field" expandable onsubmit={handleMenuItemClick} />
      </li>

      {#each links as link}
        <li class="m-hamburger-menu__item">
          {#if link.icon}
            <IconLink href={link.href} icon={link.icon} title={link.title} onclick={handleMenuItemClick}>{link.label}</IconLink>
          {:else}
            <a href={link.href} class="m-hamburger-menu__link" onclick={handleMenuItemClick}>{link.label}</a>
          {/if}
        </li>
      {/each}      
    </ul>
  </div>
</nav>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .m-hamburger-menu {
    &__container {
      display: grid;
      place-items: center;
      width: 60px;
      height: 32px;
      z-index: 1;

      // Disallow text selection so it doesn't look weird
      -webkit-user-select: none;
      user-select: none;
    }

    &__label {
      z-index: 98;
      display: flex;
      align-items: center;
      gap: var(--spacing-xxs);
    }

    &__label-text {
      @include typography.icon-label;
    }

    &__bars {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xxs);
      transition: gap 0.15s ease;
    }

    &__bar {
      display: block;
      width: var(--spacing-md);
      height: var(--spacing-xxs);
      border-radius: var(--border-radius--small);
      background-color: currentColor;
      transition:
        transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        all 0.5s ease;
    }

    &__list {
      z-index: 97;
      position: fixed;
      top: 0;
      right: 0;
      margin: 0;
      padding: var(--spacing-xxl) var(--spacing-md);
      width: 100dvw;
      height: 100dvh;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-md) var(--spacing-lg);

      background: var(--theme--background-base-color);
      list-style-type: none;
      -webkit-font-smoothing: antialiased;

      transform-origin: top center;
      transform: translate(0, -100%);
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
      opacity: 0;

      &--closing {
        transition:
          transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
          opacity 0.5s cubic-bezier(0.77, 0.2, 0.05, 1) 0.5s;
      }
    }

    &__item {
      margin: 0;
      
      a.m-hamburger-menu__link {
        @include typography.b1;
        font-size: 1.375rem; //22px
        font-weight: 500;
        line-height: 1.2;

        color: currentColor;
        text-decoration: none;
      }
    }

    &__search {
      order: 9;
      margin-inline: calc(var(--spacing-sm) * -1);
    }

    &__checkbox {
      display: block;
      width: 60px;
      height: 32px;
      position: absolute;
      cursor: pointer;
      // Hide the checkbox
      -webkit-appearance: none;
      appearance: none;
      z-index: 99; // and place it over the hamburger

      // https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-touch-callout
      -webkit-touch-callout: none;

      @media (hover: hover) {
        &:hover {
          ~ .m-hamburger-menu__label {
            filter: drop-shadow(var(--theme--glow-links));
            .m-hamburger-menu__bars {
              gap: var(--spacing-xs);
              .m-hamburger-menu__bar {
                color: var(--theme--color-links);
                filter: drop-shadow(var(--theme--glow-links));
              }
            }
          }
        }
      }

      &:checked {
        ~ .m-hamburger-menu__label {
          .m-hamburger-menu__bars {
            .m-hamburger-menu__bar {
              &:first-child {
                transform: rotate(45deg) translate(3px, -3px);
                transform-origin: top left;
              }
              &:nth-child(2) {
                opacity: 0;
                transform: rotate(0deg) scale(0.2, 0.2);
              }
              &:last-child {
                transform: rotate(-45deg) translate(3px, 3px);
                transform-origin: bottom left;
              }
            }
          }
        }

        ~ .m-hamburger-menu__list {
          transform: none;
          opacity: 1;
        }

        @media (hover: hover) {
          &:hover {
            ~ .m-hamburger-menu__label {
              .m-hamburger-menu__bars {
                gap: var(--spacing-xxs);
              }
            }
          }
        }
      }
    }

    @include breakpoints.for-tablet-portrait-up {
      // Just show the menu as regular links

      &__checkbox,
      &__label {
        display: none;
      }

      &__container {
        place-items: unset;
        width: unset;
        height: unset;
      }

      &__list {
        flex-direction: row;

        z-index: unset;
        position: relative;
        padding: 0;
        width: fit-content;
        height: unset;
        background: unset;
        transform: unset;
        opacity: 1;
      }

      &__item {
        // order: 2;
        a.m-hamburger-menu__link {
          font-size: 1.125rem; //18px
        }
      }

      // &__search {
      //   order: 1;
      // }
    }
  }
</style>
