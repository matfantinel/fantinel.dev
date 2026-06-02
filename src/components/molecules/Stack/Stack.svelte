<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { BaseProps } from '@utils/types';

  export type StackProps = BaseProps & {
    children: Snippet;
    itemCount: number;
  };

  let { children, class: className, itemCount }: StackProps = $props();

  let classList = $derived(['m-stack', itemCount === 2 ? 'm-stack--two-items' : '', className]);

  // Track z-index order: array indices are child indices, values are z-index (1 to itemCount)
  // Higher z-index = on top. Initialize with [1, 2, 3, ...]
  let zOrder = $state<number[]>(Array.from({ length: itemCount }, (_, i) => i + 1));
  let container: HTMLDivElement | null = $state(null);

  // Apply z-index to children whenever zOrder changes
  $effect(() => {
    if (!container) return;
    const children = Array.from(container.children) as HTMLElement[];
    children.forEach((child, i) => {
      if (zOrder[i] !== undefined) {
        child.style.zIndex = String(zOrder[i]);
      }
    });
  });

  function handleClick(e: MouseEvent) {
    if (!container) return;
    const target = e.target as HTMLElement;

    // Find the direct child of stack that contains the clicked element
    let clickedChild: Element | null = null;
    for (const child of container.children) {
      if (child === target || child.contains(target)) {
        clickedChild = child;
        break;
      }
    }

    if (!clickedChild) return;

    const clickedIndex = Array.from(container.children).indexOf(clickedChild);
    if (clickedIndex === -1) return;

    const clickedZ = zOrder[clickedIndex];
    const maxZ = itemCount;

    // If already on top, do nothing
    if (clickedZ === maxZ) return;

    // Smart swap: bring clicked to top, shift everything above it down by 1
    zOrder = zOrder.map((z, i) => {
      if (i === clickedIndex) return maxZ;
      if (z > clickedZ) return z - 1;
      return z;
    });
  }
</script>

<div
  bind:this={container}
  class={classList}
  style={`--item-count: ${itemCount}; --stack-scale: ${Math.min(0.8, 2 / itemCount)}`}
  onclick={handleClick}
  role="presentation"
>
  {@render children()}
</div>

<style lang="scss">
  .m-stack {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    justify-items: center;
    align-items: center;

    :global(> *) {
      // Stack all items together
      grid-column: 1;
      grid-row: 1;

      // Scale items based on count (1.8 factor creates ~20% overlap)
      transform: scale(var(--stack-scale, 1));
      transform-origin: center;

      transition: all 0.25s ease;
    }

    :global(> *:nth-child(1)) {
      translate: -22% 0%;
      rotate: 5deg;
    }
    :global(> *:nth-child(2)) {
      translate: 0% -12%;
      rotate: -2deg;
    }
    :global(> *:nth-child(3)) {
      translate: 28% -6%;
      rotate: -10deg;
    }
    :global(> *:nth-child(4)) {
      translate: 23% 10%;
      rotate: 5deg;
    }
    :global(> *:nth-child(5)) {
      translate: 5% 20%;
      rotate: -3deg;
    }
    :global(> *:nth-child(6)) {
      translate: -20% 16%;
      rotate: 2deg;
    }

    &--two-items {
      grid-template-columns: 1fr 1fr;

      :global(> *) {
        grid-column: unset;
        grid-row: unset;
      }

      :global(> *:nth-child(1)) {
        translate: 0;
      }
    }
  }
</style>
