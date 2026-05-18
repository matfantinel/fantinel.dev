<script lang="ts">
  import CloseButton from '@components/atoms/CloseButton';

  let {
    class: className,
    slug,
    children,
  }: {
    class?: string;
    slug?: string;
    children?: () => any;
  } = $props();

  let dialogEl = $state<HTMLDialogElement | null>(null);
  let containerEl = $state<HTMLDivElement | null>(null);

  let touchStartY = 0;
  let overscrollAccum = 0;
  const CLOSE_THRESHOLD = 200;

  function onTouchStart(e: TouchEvent) {
    touchStartY = e.touches[0].clientY;
    overscrollAccum = 0;
  }

  function onTouchMove(e: TouchEvent) {
    if (!containerEl) return;
    const dy = e.touches[0].clientY - touchStartY;
    if (containerEl.scrollTop <= 0 && dy > 0) {
      overscrollAccum = dy;
      if (overscrollAccum >= CLOSE_THRESHOLD) {
        dialogEl?.close();
        overscrollAccum = 0;
      }
    }
  }
</script>

<dialog class={['m-bottom-sheet-dialog u-content-grid', className]} id={slug} bind:this={dialogEl}>
  <div
    class="m-bottom-sheet-dialog__container"
    bind:this={containerEl}
    ontouchstart={onTouchStart}
    ontouchmove={onTouchMove}
  >
    <CloseButton {slug} />
    <div class="m-bottom-sheet-dialog__content">
      {@render children?.()}
    </div>
  </div>
  <div class="safari-liquid-glass-toolbar-fixer" aria-hidden="true"></div>
</dialog>

<style lang="scss">
  @use '/src/styles/breakpoints';
  @use '/src/styles/mixins';
  @use '/src/styles/typography';

  .m-bottom-sheet-dialog {
    --content-max-width: 720px;
    overscroll-behavior: contain;

    width: 100vw;
    height: 100vh;
    // Use the short vh if supported (avoids iOS address bar issues)
    height: 100svh;
    background: none;
    border: none;
    padding: 0;
    max-height: unset;
    max-width: unset;

    // Animate dialog opening
    opacity: 1;
    transform: translateY(0%);
    transition:
      opacity 0.3s ease,
      transform 0.3s ease,
      overlay 0.3s ease allow-discrete,
      display 0.3s ease allow-discrete;

    // Starting state for opening animation
    @starting-style {
      opacity: 0;
      transform: translateY(100%);
    }

    // Closing state
    &:not([open]) {
      opacity: 0;
      display: none;
      transform: translateY(100%);
    }

    &::backdrop {
      background: rgba(0,0,0, 0.4);
      backdrop-filter: blur(20px);
      transition:
        background 0.3s ease,
        backdrop-filter 0.3s ease,
        overlay 0.3s ease allow-discrete,
        display 0.3s ease allow-discrete;

      @starting-style {
        background: rgba(0,0,0, 0);
        backdrop-filter: blur(0px);
      }
    }

    &:not([open])::backdrop {
      background: rgba(0,0,0, 0);
      backdrop-filter: blur(0px);
    }

    &__container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      align-items: center;
      overflow-y: auto;
      // overscroll-behavior: contain;

      margin-top: var(--spacing-md);
      height: 100%;
      padding: var(--spacing-sm) var(--spacing-sm) var(--spacing-lg);

      background: rgba(var(--t-v6--surface--card--rgb), 0.9);
      box-shadow: var(--t-v6--shadow--high);
      border-top-left-radius: var(--border-radius);
      border-top-right-radius: var(--border-radius);
    }

    &__content {
      width: 100%;
    }
  }
</style>
