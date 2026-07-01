<script lang="ts">
  import Button from '@components/atoms/Button';
  import Field from '@components/molecules/Field';
  import MarkdownRenderer from '@components/molecules/MarkdownRenderer';
  import type { BaseProps } from '@utils/types';

  export type NewsletterCtaProps = BaseProps & {
    heading: string;
    body: string;
    formUrl: string;
    tag?: string;
  };

  let { heading, body, formUrl, tag = 'website', class: className }: NewsletterCtaProps = $props();
</script>

<div class={['o-newsletter-cta', className]}>
  <div class="o-newsletter-cta__container">
    <div class="o-newsletter-cta__overlay"></div>
    <div class="o-newsletter-cta__content">
      <h2 class="o-newsletter-cta__heading u-h3">{heading}</h2>
      <div class="o-newsletter-cta__body u-markdown">
        <MarkdownRenderer content={body} />
      </div>
    </div>
    <form class="o-newsletter-cta__form" action={formUrl} method="post" target="popupwindow">
      <Field label="Your Email" type="email" name="email" required placeholder="you@example.com" />
      <input type="hidden" name="tag" value={tag} />
      <Button type="submit" icon="newsletter">Subscribe</Button>
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

      opacity: 0.2;      
      overflow: hidden;

      &:before,
      &:after {
        content: '';
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

    &__content {
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
