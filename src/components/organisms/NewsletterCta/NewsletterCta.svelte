<script lang="ts">
  import Button from '@components/atoms/Button';
  import AuthorAvatar from '@components/molecules/AuthorAvatar';
  import MarkdownRenderer from '@components/molecules/MarkdownRenderer';
  import SocialLink from '@components/molecules/SocialLink';
  import type { SocialLink as SocialLinkType } from '@schemas/site-meta';
  import EmailIcon from '@assets/icons/socials/email.svelte';

  let {
    heading,
    body,
    tag = 'website',
    class: className,
  }: {
    heading: string;
    body: string;
    tag?: string;
    class?: string;
  } = $props();
</script>

<div class={['o-newsletter-cta', 'u-container', className]}>
  <div class="o-newsletter-cta__container">
    <div class="o-newsletter-cta__content">
      <h2 class="o-newsletter-cta__heading">{heading}</h2>
      <div class="o-newsletter-cta__body u-markdown">
        <MarkdownRenderer content={body} />
      </div>
    </div>
    <form class="o-newsletter-cta__form" action="https://buttondown.com/api/emails/embed-subscribe/fantinel" method="post" target="popupwindow">
      <div class="u-field-group">
        <label for="email">Your Email</label>
        <input type="email" name="email" required placeholder="you@example.com" />
        <input type="hidden" name="tag" value={tag} />
      </div>
      {#snippet emailIconSnippet()}<EmailIcon />{/snippet}
      <Button type="submit" icon={emailIconSnippet} color="complementary">
        Subscribe
      </Button>
    </form>
  </div>
</div>

<style lang="scss">
  @use '/src/styles/typography';

  .o-newsletter-cta {
    container-type: inline-size;

    &__container {
      display: grid;
      grid-template-columns: 1fr 254px;
      align-items: center;
      gap: var(--spacing-lg) var(--spacing-xl);

      padding: var(--spacing-lg) var(--spacing-xl);
      background-color: var(--theme--background-card-color);
      border-radius: var(--border-radius);
      box-shadow: var(--theme--shadow-card);
      border: 1px dashed var(--theme--color-complementary);
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    &__heading {
      @include typography.gradient-pinkish;
    }

    &__body {
      @include typography.b2;
      gap: 1rem;
      text-align: left;
    }

    &__form {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-sm);
    }

    @supports (container-type: inline-size) {
      @container (max-width: 688px) {
        &__container {
          padding: var(--spacing-lg);
          grid-template-columns: 1fr;
        }
      }
    }
  }
</style>
