<script lang="ts">
  import Email from '@assets/icons/socials/email.svelte';
  import Button from '@components/atoms/Button';
  import MarkdownRenderer from '@components/molecules/MarkdownRenderer';
  import type { Snippet } from 'svelte';
  import type { BaseProps } from '@utils/types';

  export type CommentCtaProps = BaseProps & {
    content?: string;
    email: string;
    emailSubject?: string;
  };

  let {
    content,
    email,
    emailSubject,
    class: className,
  }: CommentCtaProps = $props();
</script>

{#snippet emailIconSnippet()}<Email />{/snippet}

<div class={['o-comment-cta', className]}>
  {#if content}
    <div class="o-comment-cta__content u-markdown">
      <MarkdownRenderer {content} />
    </div>
  {/if}

  <Button
    color="complementary"
    icon={emailIconSnippet}
    href={`mailto:${email}${emailSubject ? `?subject=${emailSubject}` : ''}`}
  >
    {email}
  </Button>
</div>

<style lang="scss">
  @use '/src/styles/typography';

  .o-comment-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);

    padding: var(--spacing-md);
    border-radius: var(--border-radius);
    background-color: var(--t-v6--surface--root);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000000' fill-opacity='0.12' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
    max-width: 520px;
    margin-inline: auto;

    &__content {
      font-family: var(--font--spicy);
      color: var(--t-v6--complementary);
      text-align: center;
      text-wrap: balance;
    }
  }
</style>
