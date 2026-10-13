<script lang="ts">
  import { getIcon } from '@utils/icons';
  import type { BaseProps } from '@utils/types';
  import { copyToClipboard } from '@svelte-put/copy';

  export type RssFeed = {
    label: string;
    description: string;
    href: string;
    icon?: string;
    color?: string;
  };

  export type RssFeedsProps = BaseProps & {
    heading: string;
    body?: string;
    baseUrl?: string;
    feeds: RssFeed[];
  };

  let { heading, body, baseUrl = '', feeds, class: className }: RssFeedsProps = $props();
  let classList = $derived(['o-rss-feeds', className]);

  const RssIcon = getIcon('rss');

  let copiedHref = $state<string | undefined>();
  let copiedTimeout: ReturnType<typeof setTimeout> | undefined;

  async function copyUrl(href: string) {
    try {
      await copyToClipboard(baseUrl + href);
      copiedHref = href;
      clearTimeout(copiedTimeout);
      copiedTimeout = setTimeout(() => (copiedHref = undefined), 2000);
    } catch {
      // Clipboard unavailable, the link itself still works
    }
  }
</script>

<div class={classList}>
  <div class="o-rss-feeds__container">
    <div class="o-rss-feeds__header">
      <h2 class="o-rss-feeds__heading u-h3">{heading}</h2>
      {#if body}
        <p class="o-rss-feeds__body">{body}</p>
      {/if}
    </div>

    <ul class="o-rss-feeds__list">
      {#each feeds as feed}
        {@const FeedIcon = getIcon(feed.icon ?? 'rss') ?? RssIcon}
        <li class="o-rss-feeds__item" style={feed.color ? `--color: var(--t--${feed.color})` : undefined}>
          <a class="o-rss-feeds__link" href={feed.href} data-astro-reload>
            {#if FeedIcon}
              <span class="o-rss-feeds__icon">
                <FeedIcon size="24px" />
              </span>
            {/if}
            <span class="o-rss-feeds__text">
              <span class="o-rss-feeds__label">{feed.label}</span>
              <span class="o-rss-feeds__description">{feed.description}</span>
              <code class="o-rss-feeds__url">{baseUrl}{feed.href}</code>
            </span>
          </a>
          <button
            type="button"
            class="o-rss-feeds__copy"
            onclick={() => copyUrl(feed.href)}
            aria-label={`Copy ${feed.label} feed URL`}
          >
            {copiedHref === feed.href ? 'Copied!' : 'Copy URL'}
          </button>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style lang="scss">
  @use '/src/styles/typography';

  .o-rss-feeds {
    container-type: inline-size;

    &__container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);

      padding: var(--spacing-lg) var(--spacing-xl);
      background-color: var(--t--surface--card);
      border-radius: var(--border-radius);
      box-shadow: var(--t--shadow--base);
    }

    &__header {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    &__heading {
      color: var(--t--text--accent);
    }

    &__body {
      @include typography.b2;
    }

    &__list {
      list-style: none;
      margin: 0;
      padding: 0;

      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    &__item {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);

      padding: var(--spacing-xs) var(--spacing-sm);
      margin-inline: calc(var(--spacing-sm) * -1);
      border-radius: var(--border-radius--small);
      transition: background-color 0.25s ease;

      &:hover,
      &:focus-within {
        background-color: var(--t--surface--accent);
      }
    }

    &__link {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-sm);
      flex: 1;
      min-width: 0;

      text-decoration: none;
      color: var(--t--text--base);

      &:hover,
      &:focus {
        filter: none;

        .o-rss-feeds__label {
          color: var(--color, var(--t--accent));
        }

        .o-rss-feeds__icon {
          animation: nudge-and-grow 0.5s ease-in;
        }
      }
    }

    &__icon {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      margin-top: 2px;
      color: var(--color, var(--t--accent));
    }

    &__text {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    &__label {
      @include typography.b1;
      font-weight: 600;
      transition: color 0.25s ease;
    }

    &__description {
      @include typography.b3;
    }

    &__url {
      @include typography.b3;
      opacity: 0.7;
      overflow-wrap: anywhere;

      // Reset the global inline code styles
      padding: 0;
      margin: 0;
      background: none;
      border: none;
      box-shadow: none;
    }

    &__copy {
      @include typography.icon-label;
      flex-shrink: 0;
      cursor: pointer;

      padding: var(--spacing-xxs) var(--spacing-xs);
      border: 1px solid var(--t--border--medium);
      border-radius: var(--border-radius--small);
      background: transparent;
      color: var(--t--text--base);
      transition: all 0.25s ease;

      &:hover,
      &:focus {
        color: var(--color, var(--t--accent));
        border-color: currentColor;
      }
    }

    @supports (container-type: inline-size) {
      @container (max-width: 688px) {
        &__container {
          padding: var(--spacing-lg);
        }
      }

      @container (max-width: 480px) {
        &__item {
          flex-direction: column;
          align-items: flex-start;
        }

        &__copy {
          margin-left: calc(24px + var(--spacing-sm));
        }
      }
    }
  }
</style>
