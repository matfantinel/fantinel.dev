<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { BaseProps } from '@utils/types';

  export type StackProps = BaseProps & {
    children: Snippet;
    itemCount: number;
  };

  let { children, class: className, itemCount }: StackProps = $props();

  let classList = $derived(['m-stack', className]);
</script>

<div class={classList} style={`--item-count: ${itemCount}; --stack-scale: ${Math.min(1, 2 / itemCount)}`}>
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

      transition: all .25s ease;
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
  }
</style>
