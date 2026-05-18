<script module>
  import {
    defineMeta,
  } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import CommentCta from './CommentCta.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Comment Cta',
    component: CommentCta,
    tags: ['autodocs'],
    argTypes: {
      content: {
        control: 'text',
      },
      email: {
        control: 'text',
      },
      emailSubject: {
        control: 'text',
      },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <CommentCta {...args} />
{/snippet}

<Story 
  name="Default" 
  args={{
    content: LoremIpsum.sentence,
    email: 'example@example.com',
    emailSubject: 'I saw your component and have a question',
  }}
/>