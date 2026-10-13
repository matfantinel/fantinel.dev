<script lang="ts">
  import Button from "@components/atoms/Button";
  import Input from "@components/atoms/Input";
  import MarkdownRenderer from "@components/molecules/MarkdownRenderer";
  import { getIcon } from "@utils/icons";
  import type { BaseProps } from "@utils/types";
  import { copyToClipboard } from "@svelte-put/copy";

  type SubscribeCtaBaseItem = {
    label: string;
    description?: string;
    icon?: string;
    color?: string;
  };

  export type SubscribeCtaFeed = SubscribeCtaBaseItem & {
    type?: "rss";
    href: string;
  };

  export type SubscribeCtaNewsletter = SubscribeCtaBaseItem & {
    type: "newsletter";
    formUrl: string;
    tag?: string;
  };

  export type SubscribeCtaItem = SubscribeCtaFeed | SubscribeCtaNewsletter;

  export type SubscribeCtaProps = BaseProps & {
    heading: string;
    body?: string;
    baseUrl?: string;
    items: SubscribeCtaItem[];
  };

  let {
    heading,
    body,
    baseUrl = "",
    items,
    class: className,
  }: SubscribeCtaProps = $props();
  let classList = $derived(["o-subscribe-cta", className]);

  const RssIcon = getIcon("rss");
  const NewsletterIcon = getIcon("newsletter");

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
  <div class="o-subscribe-cta__container">
    <div class="o-subscribe-cta__overlay"></div>
    <div class="o-subscribe-cta__header">
      <h2 class="o-subscribe-cta__heading u-h3">{heading}</h2>
      {#if body}
        <div class="o-subscribe-cta__body u-markdown">
          <MarkdownRenderer content={body} />
        </div>
      {/if}
    </div>

    <ul class="o-subscribe-cta__list">
      {#each items as item}
        {@const isNewsletter = item.type === "newsletter"}
        {@const DefaultIcon = isNewsletter ? NewsletterIcon : RssIcon}
        {@const ItemIcon = (item.icon && getIcon(item.icon)) || DefaultIcon}
        <li
          class={[
            "o-subscribe-cta__item",
            isNewsletter && "o-subscribe-cta__item--newsletter",
          ]}
          style={item.color ? `--color: var(--t--${item.color})` : undefined}
        >
          {#snippet itemContent()}
            {#if ItemIcon}
              <span class="o-subscribe-cta__icon">
                <ItemIcon size="24px" />
              </span>
            {/if}
            <span class="o-subscribe-cta__text">
              <span class="o-subscribe-cta__label">{item.label}</span>
              {#if item.description}
                <span class="o-subscribe-cta__description"
                  >{item.description}</span
                >
              {/if}
              {#if item.type !== "newsletter"}
                <code class="o-subscribe-cta__url">{baseUrl}{item.href}</code>
              {/if}
            </span>
          {/snippet}

          {#if item.type === "newsletter"}
            <div class="o-subscribe-cta__link">
              {@render itemContent()}
            </div>
            <form
              class="o-subscribe-cta__form"
              action={item.formUrl}
              method="post"
              target="popupwindow"
            >
              <Input
                class="o-subscribe-cta__input"
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                aria-label="Your email"
              />
              <input type="hidden" name="tag" value={item.tag ?? "website"} />
              <Button type="submit">Subscribe</Button>
            </form>
          {:else}
            {@const href = item.href}
            <a class="o-subscribe-cta__link" {href} data-astro-reload>
              {@render itemContent()}
            </a>
            <button
              type="button"
              class="o-subscribe-cta__copy"
              onclick={() => copyUrl(href)}
              aria-label={`Copy ${item.label} feed URL`}
            >
              {copiedHref === href ? "Copied!" : "Copy URL"}
            </button>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</div>

<style lang="scss">
  @use "/src/styles/typography";

  .o-subscribe-cta {
    container-type: inline-size;

    &__container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);

      padding: var(--spacing-lg) var(--spacing-xl);
      background-color: var(--t--surface--card);
      border-radius: var(--border-radius);
      box-shadow: var(--t--shadow--base);

      position: relative;
      isolation: isolate;
    }

    &__overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;

      opacity: 0.05;
      overflow: hidden;
      border-radius: inherit;
      pointer-events: none;

      &:before,
      &:after {
        content: "";
        width: 50%;
        height: 50%;
        display: block;
        position: absolute;
        background: var(--t--accent);
        filter: blur(100px);
      }

      &:before {
        top: 0;
        left: 0;
        translate: 100% 100%;
        animation: floating-large 2s infinite cubic-bezier(0.455, 0.03, 0.515, 0.955);
      }

      &:after {
        bottom: 0;
        right: 0;
        translate: -100% -100%;
        animation: floating-large 3s infinite cubic-bezier(0.455, 0.03, 0.515, 0.955);
      }
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

      padding-block: var(--spacing-xs);
      margin: 0;

      &--newsletter {
        &:last-child {
          border-top: 1px solid var(--t--border--light);
          padding-top: var(--spacing-md);
        }

        &:not(:last-child) {
          border-bottom: 1px solid var(--t--border--light);
          padding-bottom: var(--spacing-md);
        }
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

      &:is(a):focus {
        filter: none;

        .o-subscribe-cta__label {
          color: var(--color, var(--t--accent));
        }

        .o-subscribe-cta__icon {
          animation: nudge-and-grow 0.5s ease-in;
        }
      }

      @media (hover: hover) {
        &:is(a):hover {
          filter: none;

          .o-subscribe-cta__label {
            color: var(--color, var(--t--accent));
          }

          .o-subscribe-cta__icon {
            animation: nudge-and-grow 0.5s ease-in;
          }
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
      text-wrap: pretty;
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

      &:focus {
        color: var(--color, var(--t--accent));
        border-color: currentColor;
      }

      @media (hover: hover) {
        &:hover {
          color: var(--color, var(--t--accent));
          border-color: currentColor;
        }
      }
    }

    &__form {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      flex-shrink: 0;

      :global(.o-subscribe-cta__input) {
        width: 220px;
      }
    }

    @supports (container-type: inline-size) {
      @container (max-width: 688px) {
        &__container {
          padding: var(--spacing-lg);
        }

        &__item--newsletter {
          flex-direction: column;
          align-items: stretch;
        }

        &__form {
          margin-left: calc(24px + var(--spacing-sm));

          :global(.o-subscribe-cta__input) {
            width: auto;
            flex: 1;
            min-width: 0;
          }
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

        &__form {
          flex-direction: column;
          align-items: stretch;
          margin-left: 0;
          width: 100%;
        }
      }
    }
  }
</style>
