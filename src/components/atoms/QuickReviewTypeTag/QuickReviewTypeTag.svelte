<script lang="ts">
  import { QuickReviewType } from '@schemas/quick-review-types';
  import MovieIcon from '@assets/icons/movie.svelte';
  import TvIcon from '@assets/icons/tv.svelte';
  import GameIcon from '@assets/icons/game.svelte';
  import AlbumIcon from '@assets/icons/album.svelte';

  let {
    type,
    class: className,
  }: {
    type: QuickReviewType;
    class?: string;
  } = $props();

  let classList = $derived([
    'a-quick-review-type-tag',
    type ? `a-quick-review-type-tag--${type.toLowerCase().replace(' ', '-')}` : undefined,
    className,
  ]);
</script>

{#snippet icon()}
  {#if type === QuickReviewType.Movie}
    <MovieIcon size="16px" />
  {/if}
  {#if type === QuickReviewType.TvShow}
    <TvIcon size="16px" />
  {/if}
  {#if type === QuickReviewType.Game}
    <GameIcon size="16px" />
  {/if}
  {#if type === QuickReviewType.Album}
    <AlbumIcon size="16px" />
  {/if}
{/snippet}

<div class={classList}>
  <div class="a-quick-review-type-tag__bg" aria-hidden="true"></div>
  <div class="a-quick-review-type-tag__icon">
    {@render icon()}
  </div>
  <span class="a-quick-review-type-tag__text">
    {type}
  </span>
</div>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .a-quick-review-type-tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-xxs);
    position: relative;
    overflow: hidden;
    
    padding: var(--spacing-xxs) var(--spacing-xs);
    border-radius: var(--border-radius);
    height: 24px;
    width: fit-content;

    background-color: var(--theme--qr-base-light-color);
    color: var(--theme--qr-base-dark-color);

    --icon-color: var(--theme--qr-base-dark-color);

    &__icon {
      width: 16px;
      height: 16px;
      aspect-ratio: 1/1;
      color: var(--icon-color);
    }

    &__text {
      @include typography.b3;
    }

    &__bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--icon-color);
      opacity: 0.1;
    }

    &--movie {
      --icon-color: var(--theme--qr-movie-color);
    }

    &--tv-show {
      --icon-color: var(--theme--qr-tv-show-color);
    }

    &--game {
      --icon-color: var(--theme--qr-game-color);
    }

    &--album {
      --icon-color: var(--theme--qr-album-color);
    }
  }
</style>
