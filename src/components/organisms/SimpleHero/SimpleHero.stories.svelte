<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import SimpleHero from './SimpleHero.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Simple Hero',
    component: SimpleHero,
    tags: ['autodocs'],
    argTypes: {
      title: { control: 'text' },
      body: { control: 'text' },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <PostHero title={args.title ?? LoremIpsum.sentence} {...args} />
{/snippet}

<Story 
  name="Default" 
  args={{ 
    title: LoremIpsum.words, 
    body: LoremIpsum.paragraph,
  }} 
/>