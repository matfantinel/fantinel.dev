<script lang="ts">
  import { theme } from '@stores/theme';
  import { cubicOut } from 'svelte/easing';

  let {
    class: className,
  }: {
    class?: string;
  } = $props();

  const themes = {
    auto: 'Auto',
    light: 'Light',
    dark: 'Dark',
  };

  function toggleTheme() {
    if ($theme === 'auto') {
      theme.set('light');
    } else if ($theme === 'light') {
      theme.set('dark');
    } else {
      theme.set('auto');
    }
  }

  // Combined transition function
  function flyAndBlur(node: HTMLElement, { delay = 0, duration = 300, x = -30, y = 0, amount = 5 } = {}) {
    return {
      delay,
      duration,
      css: (t: number, u: number) => {
        const eased = cubicOut(t);
        return `
          transform: translate(${(1 - eased) * x}px, ${(1 - eased) * y}px);
          filter: blur(${u * amount}px);
        `;
      }
    };
  }
</script>

<!-- Hide the theme toggle if JavaScript is disabled -->
<noscript style="display: none;">
  <style>
    .m-theme-toggle {
      display: none !important;
    }
  </style>
</noscript>

<button
  class={['m-theme-toggle', className]}
  title="Toggle between light and dark theme. Current theme: {$theme}"
  aria-label="Toggle between light and dark theme. Current theme: {$theme}"
  data-theme={$theme}
  onclick={toggleTheme}
>
  <svg class="m-theme-toggle__icon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
    <mask class="m-theme-toggle__moon" id="moon">
      <rect x="0" y="0" width="100%" height="100%" fill="white" />
      <circle cx="40" cy="8" r="11" fill="black" />
    </mask>
    <circle class="m-theme-toggle__sun" id="sun" cx="12" cy="12" r="11" mask="url(#moon)" />
    <g class="m-theme-toggle__sun-beams" id="sun-beams">
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </g>
    <text
      class="m-theme-toggle__auto"
      x="12"
      y="16"
      text-anchor="middle"
      font-size="12"
      font-family="inherit"
      fill="currentColor"
      pointer-events="none"
    >
      A
    </text>
  </svg>

  {#key $theme}
    <span class="m-theme-toggle__label" in:flyAndBlur>
      {themes[$theme as keyof typeof themes] ?? 'Auto'}
    </span>
  {/key}
</button>

<style lang="scss">
  @use '/src/styles/typography';

  .m-theme-toggle {
    height: 24px;
    padding: 0;
    appearance: none;
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    color: currentColor;
    transition: all 0.2s ease-in-out;

    @media (hover: hover) {
      &:hover {
        filter: drop-shadow(var(--theme--glow-links));
      }
    }

    &__label {
      @include typography.icon-label;
      transition: all 0.5s cubic-bezier(0.25, 0, 0.2, 1);
      color: currentColor;
      width: 5ch;
    }

    &__moon,
    &__sun {
      fill: currentColor;
      stroke: none;
    }

    &__sun {
      transition: all 0.5s cubic-bezier(0.25, 0, 0.2, 1);
      transform-origin: center center;
    }

    &__sun-beams {
      --_opacity-dur: 0.15s;
      stroke: currentColor;
      stroke-width: 2px;
      transform-origin: center center;
      transition:
        all 0.5s cubic-bezier(0.25, 0, 0.2, 1),
        opacity var(--_opacity-dur) cubic-bezier(0.25, 0, 0.2, 1);
    }

    &__moon > circle {
      transition: all 0.5s cubic-bezier(0.25, 0, 0.2, 1);
    }

    &__auto {
      transition: all 0.5s cubic-bezier(0.25, 0, 0.2, 1);
      transform: scale(0);
      transform-origin: center center;
    }
  }

  .m-theme-toggle:not([data-theme]),
  [data-theme='auto'] {
    .m-theme-toggle {
      &__sun {
        transform: scale(0);
      }

      &__sun-beams {
        transform: rotateZ(0.25turn);
        --_opacity-dur: 0.5s;
      }

      &__auto {
        transform: scale(1);
      }
    }
  }

  [data-theme='light'] {
    .m-theme-toggle {
      &__sun {
        transform: scale(0.5);
      }

      &__sun-beams {
        transform: rotateZ(0.25turn);
        --_opacity-dur: 0.5s;
      }
    }
  }

  [data-theme='dark'] {
    .m-theme-toggle {
      &__moon > circle {
        transform: translateX(-20px);
      }

      &__sun-beams {
        opacity: 0;
      }
    }
  }
</style>
