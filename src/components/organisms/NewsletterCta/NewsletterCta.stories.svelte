<script module>
  import {
    defineMeta,
  } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import NewsletterCta from './NewsletterCta.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Newsletter CTA',
    component: NewsletterCta,
    tags: ['autodocs'],
    argTypes: {
      heading: { control: 'text' },
      body: { control: 'text' },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <NewsletterCta {...args} />
{/snippet}

<Story 
  name="Default" 
  args={{
    heading: 'Subscribe to my newsletter',
    body: LoremIpsum.paragraph,
  }} 
/>