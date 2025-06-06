<script lang="ts">
  import { fly } from 'svelte/transition';

  let {
    src,
    alt,
    extraImages,
    size = '50px',
    theme = 'greenish',
    class: className,
  }: {
    src: string;
    alt: string;
    extraImages?: string[];
    size?: string;
    theme?: 'greenish' | 'pinkish' | 'rainbow'
    class?: string;
  } = $props();

  let tag = $derived(extraImages ? 'button' : 'div');
  let images = $derived(extraImages ? [src, ...extraImages] : [src]);
  let currentImage = $state(0);

  function onclick() {
    currentImage = (currentImage + 1) % images.length;
  }
</script>

<svelte:element
  this={tag}
  class={['m-author-avatar', `m-author-avatar--theme--${theme}`, className]}
  style={`--size:${size}`}
  {onclick}
  role="button"
  tabindex="-1"
>
  {#key currentImage}
    <img 
      class="m-author-avatar__image" 
      src={images[currentImage]} 
      {alt} 
      height={size} 
      width={size} 
      in:fly={{ delay: 1300, duration: 500, y: parseInt(size), opacity: 1 }}
      out:fly={{ duration: 500, y: parseInt(size), opacity: 1 }}
    />
  {/key}
</svelte:element>

<style lang="scss">
  .m-author-avatar {
    margin: 0;
    padding: 0;
    border: none;
    overflow: hidden;
    position: relative;
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
      filter: blur(4px);
      animation: rotate 4s linear infinite;
      animation-play-state: paused;
    }

    &:hover,
    &:active,
    &:focus,
    &:focus-within {
      &:before {
        animation-play-state: running;
      }
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;

      &--extra {
        display: none;
      }
    }

    &--theme--greenish {
      &:before {
        background: var(--theme--gradient-greenish);
      }
    }

    &--theme--pinkish {
      &:before {
        background: var(--theme--gradient-pinkish);
      }
    }

    &--theme--rainbow {
      &:before {
        background: var(--theme--gradient-rainbow-circle);
      }
    }
  }
</style>
