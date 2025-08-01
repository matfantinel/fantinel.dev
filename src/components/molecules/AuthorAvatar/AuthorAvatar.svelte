<script lang="ts">
  import Image from '@components/atoms/Image';
  import { handleCmsMediaPath } from '@utils/functions';
  import { fly } from 'svelte/transition';

  let {
    src,
    alt,
    extraImages,
    size = '50px',
    theme = 'greenish',
    animated = false,
    class: className,
  }: {
    src: string;
    alt: string;
    extraImages?: string[];
    size?: string;
    theme?: 'greenish' | 'pinkish' | 'rainbow';
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
    `m-author-avatar--theme--${theme}`,
    animated ? 'm-author-avatar--animated' : '',
    className,
  ]}
  style={`--size:${size}`}
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
    margin: 0;
    padding: 0;
    border: none;
    overflow: hidden;
    position: relative;
    isolation: isolate;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    box-shadow: var(--theme--shadow-image);
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

      background: var(--theme--gradient-greenish);
      will-change: transform, opacity;
      transform: rotate(0deg) translate3d(0, 0, 0);
      border-radius: 50%;
      animation: rotate 4s linear infinite;
      animation-play-state: paused;
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

    &--theme--greenish {
      &:before {
        background: var(--theme--color-accent);
      }
    }

    &--theme--pinkish {
      &:before {
        background: var(--theme--gradient-pinkish);
      }
    }

    &--theme--rainbow {
      &:before {
        background: var(--theme--gradient-rainbow-circle-dark);
        filter: blur(4px);
      }
    }
  }
</style>
