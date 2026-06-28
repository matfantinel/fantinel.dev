<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  type Props = {
    excludePaths?: string[];
  };

  let { excludePaths = [] }: Props = $props();

  let isBrowser = $state(false);
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

  function internalCleanup() {
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

  async function register() {
    if (isRegistered || isRegistering || !containerEl || !isBrowser) return;
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    if (excludePaths.includes(path)) return;

    isRegistering = true;
    await loadStylesheet();
    if (!containerEl) { isRegistering = false; return; }
    const mod = await getModule();
    if (!containerEl) { isRegistering = false; return; }

    containerEl.style.display = 'block';

    const mountResult = mod.mountTownSquare(containerEl, {
      serverOrigin: 'https://townsquare.cauenapier.com',
      siteKey: 'site_k_9oCjUr9qDV93xm',
      theme: 'host',
    });

    if (typeof mountResult === 'function') {
      unmountFn = mountResult;
    }

    isRegistering = false;
    isRegistered = true;
  }

  function unregister() {
    if (!isBrowser || (!isRegistered && !isRegistering)) return;
    internalCleanup();
  }

  function onAstroPageLoad() {
    if (isRegistered) {
      if (!linkEl || !document.head.contains(linkEl)) {
        linkEl = null;
        cssLoadedPromise = null;
      }
      internalCleanup();
      register();
    } else {
      register();
    }
  }

  onMount(() => {
    isBrowser = true;
    document.addEventListener('astro:page-load', onAstroPageLoad);
  });

  onDestroy(() => {
    unregister();
    if (typeof document !== 'undefined') {
      document.removeEventListener('astro:page-load', onAstroPageLoad);
    }
  });

  $effect(() => {
    if (!isBrowser) return;
    register();
  });
</script>

<div id="townsquare-root" bind:this={containerEl} style="display: none;"></div>
