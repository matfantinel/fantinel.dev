<script lang="ts">
  import Image from '@components/atoms/Image';
  import { handleCmsMediaPath } from '@utils/functions';
  import { fly } from 'svelte/transition';

  let {
    src,
    alt,
    extraImages,
    size = 'medium',
    animated = false,
    class: className,
  }: {
    src: string;
    alt: string;
    extraImages?: string[];
    size?: 'large' | 'medium' | 'small' | 'tiny';
    animated?: boolean;
    class?: string;
  } = $props();

  let tag = $derived(extraImages ? 'button' : 'div');
  let images = $derived(
    extraImages ? [handleCmsMediaPath(src), ...extraImages.map(handleCmsMediaPath)] : [handleCmsMediaPath(src)]
  );
  let currentImage = $state(0);

  function onclick() {
    currentImage = (currentImage + 1) % images.length;
  }
</script>

<svelte:element
  this={tag}
  class={[
    'm-author-avatar',
    animated ? 'm-author-avatar--animated' : '',
    `m-author-avatar--size--${size}`,
    className,
  ]}
  {onclick}
  role="button"
  tabindex="-1"
>
  {#key currentImage}
    <div
      in:fly={{ delay: 700, duration: 500, y: parseInt(size), opacity: 1 }}
      out:fly={{ duration: 500, y: parseInt(size), opacity: 1 }}
    >
      <Image class="m-author-avatar__image" src={images[currentImage]} {alt} height={size} width={size} lazy={false} />
    </div>
  {/key}
</svelte:element>

<style lang="scss">
  .m-author-avatar {
    --size: 72px;

    margin: 0;
    padding: 0;
    border: none;
    overflow: hidden;
    position: relative;
    isolation: isolate;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    box-shadow: var(--t-v6--shadow--low);
    background: none;

    &:is(button) {
      cursor: pointer;
    }

    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: -1;

      background: var(--t-v6--gradient--rainbow--circle);
      filter: blur(4px);
      will-change: transform, opacity;
      transform: rotate(0deg) translate3d(0, 0, 0);
      border-radius: 50%;
      animation: rotate 4s linear infinite;
      animation-play-state: paused;
    }

    &--size--large {
      --size: 164px;
    }

    &--size--medium {
      --size: 72px;
    }

    &--size--small {
      --size: 50px;
    }

    &--size--tiny {
      --size: 36px;
    }

    &--animated {
      &:before {
        animation-play-state: running;
      }
    }

    &:hover,
    &:active,
    &:focus,
    &:focus-within {
      &:before {
        animation-play-state: running;
      }
    }

    :global(.m-author-avatar__image) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      will-change: transform;
      transition: transform 0.2s ease-in-out;

      &.m-author-avatar__image--extra {
        display: none;
      }

      &:hover {
        transform: scale(1.1) rotate(5deg);
      }
    }
  }
</style>
