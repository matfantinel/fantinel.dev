<script lang="ts">
  import type { BaseProps } from '@utils/types';
  import FakeReview6 from "@assets/graphics/fake-review-6.svelte";
  import FakeReview7 from "@assets/graphics/fake-review-7.svelte";
  import FakeReview5 from "@assets/graphics/fake-review-5.svelte";
  import FakeReview4 from "@assets/graphics/fake-review-4.svelte";
  import FakeReview1 from "@assets/graphics/fake-review-1.svelte";
  import FakeReview2 from "@assets/graphics/fake-review-2.svelte";
  import FakeReview3 from "@assets/graphics/fake-review-3.svelte";

  let {
    class: className,
    ...props
  }: BaseProps = $props();
  let classList = $derived(['a-quick-reviews-strip', className]);
</script>

<div class={classList} {...props}>
    <FakeReview1 />
    <FakeReview2 />
    <FakeReview3 />
    <FakeReview4 />
    <FakeReview5 />
    <FakeReview6 />
    <FakeReview7 />
</div>

<style lang="scss">
  .a-quick-reviews-strip {
    display: flex;

    animation: .75s cubic-bezier(0.25, 0.46, 0.45, 0.94) both reviews-strip;

    &:hover {
      :global(> svg) {
        animation: none !important;
      }
    }

    @keyframes reviews-strip {
      0% {
        opacity: 0;
        translate: 100%;
      }
      100% {
        opacity: 1;
        translate: 0%;
      }
    }

    @keyframes auto-hover-pulse {
      // Gotta make this animation idle for most of the cycle
      // because it repeats, and animation-delay only affects the 1st run.
      0%, 92%, 100% { scale: 1; }
      96% { scale: 1.1; }
    }

    :global(> svg) {
      flex: 0 0 75px;
      rotate: -8deg;
      box-shadow: var(--t--shadow--base);

      transition: .15s ease-out;

      animation: auto-hover-pulse 3s ease-out .75s both infinite;
      animation-play-state: var(--inner-animation-state, paused);

      &:not(:first-child) {
        margin-left: -36px;
      }

      // stagger
      @for $i from 1 through 7 {
        &:nth-child(#{$i}) {
          animation-delay: #{($i - 1) * .12}s;
        }
      }

      // &:hover,
      // &.active {
      //   scale: 1.2;
      // }
    }
  }
</style>
