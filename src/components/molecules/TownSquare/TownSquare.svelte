<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  type TownSquareMode = 'desktop' | 'mobile';

  type Props = {
    mode: TownSquareMode;
  };

  let { mode }: Props = $props();

  const BREAKPOINT = 768;

  let isBrowser = $state(false);
  let windowWidth = $state(BREAKPOINT);
  let shouldRegister = $derived(isBrowser && (mode === 'desktop' ? windowWidth >= BREAKPOINT : windowWidth < BREAKPOINT));
  let isRegistered = $state(false);
  let containerEl: HTMLDivElement | null = null;
  let unmountFn: (() => void) | null = null;
  let isRegistering = false;

  // Shared across all instances (module-level singletons)
  let linkEl: HTMLLinkElement | null = null;
  let cssLoadedPromise: Promise<void> | null = null;
  let modulePromise: Promise<any> | null = null;

  function loadStylesheet(): Promise<void> {
    if (!linkEl) {
      linkEl = document.createElement('link');
      linkEl.rel = 'stylesheet';
      linkEl.href = 'https://townsquare.cauenapier.com/widget.css';
      document.head.appendChild(linkEl);

      cssLoadedPromise = new Promise((resolve) => {
        linkEl!.onload = () => {
          resolve();
        };
      });
      return cssLoadedPromise;
    }

    // Link exists but may have been removed from DOM by Astro transitions
    if (!document.head.contains(linkEl)) {
      document.head.appendChild(linkEl);
    }

    return cssLoadedPromise ?? Promise.resolve();
  }

  function getModule() {
    if (!modulePromise) {
      // @ts-ignore
      modulePromise = import('https://townsquare.cauenapier.com/townsquare.mjs');
    }
    return modulePromise;
  }

  async function register() {
    if (isRegistered || isRegistering || !containerEl || !isBrowser) {
      return;
    }

    isRegistering = true;

    await loadStylesheet();

    if (!containerEl) {
      isRegistering = false;
      return;
    }

    const mod = await getModule();

    if (!containerEl) {
      isRegistering = false;
      return;
    }

    containerEl.style.display = 'block';

    const mountResult = mod.mountTownSquare(containerEl, {
      serverOrigin: 'https://townsquare.cauenapier.com',
      siteKey: 'site_k_9oCjUr9qDV93xm',
      scene: {
        benches: 2,
        benchXs: [0.2, 0.72],
        trees: 2,
        treeXs: [0.85, 0.4],
        lamps: 2,
        lampXs: [0.12, 0.64],
        birds: 2,
      },
      theme: 'host',
    });

    if (typeof mountResult === 'function') {
      unmountFn = mountResult;
    }

    isRegistering = false;
    isRegistered = true;
  }

  function unregister() {
    if (!isBrowser || (!isRegistered && !isRegistering)) {
      return;
    }

    if (unmountFn) {
      unmountFn();
      unmountFn = null;
    }

    if (containerEl) {
      containerEl.style.display = 'none';
    }

    isRegistering = false;
    isRegistered = false;
  }

  function onResize() {
    const newWidth = window.innerWidth;
    if (newWidth !== windowWidth) {
      windowWidth = newWidth;
    }
  }

  function onAstroPageLoad() {
    if (!shouldRegister) {
      return;
    }

    if (isRegistered) {
      if (!linkEl || !document.head.contains(linkEl)) {
        linkEl = null;
        cssLoadedPromise = null;
      }
      unregister();
      register();
    } else {
      register();
    }
  }

  onMount(() => {
    isBrowser = true;
    windowWidth = window.innerWidth;
    window.addEventListener('resize', onResize);
    document.addEventListener('astro:page-load', onAstroPageLoad);
  });

  onDestroy(() => {
    unregister();
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', onResize);
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('astro:page-load', onAstroPageLoad);
    }
  });

  $effect(() => {
    if (!isBrowser) {
      return;
    }
    if (shouldRegister) {
      register();
    } else {
      unregister();
    }
  });
</script>

<div id="townsquare-root" bind:this={containerEl} style="display: none;"></div>
