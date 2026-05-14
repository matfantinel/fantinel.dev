<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import GenericHero from './GenericHero.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Generic Hero',
    component: GenericHero,
    tags: ['autodocs'],
    argTypes: {
    },
    render: template
  });
</script>

{#snippet template(args)}
  <GenericHero title={args.title ?? LoremIpsum.words} {...args} />
{/snippet}

<Story 
  name="Default" 
  args={{ 
    title: LoremIpsum.words, 
    body: LoremIpsum.sentence,
    button: {
      text: 'Primary',
      url: '#'
    },
    secondaryButton: {
      text: 'Secondary',
      url: '#'
    },
    image: 'https://placedog.net/600/400'
  }} 
/>

<Story 
  name="No Image" 
  args={{ 
    title: LoremIpsum.words, 
    body: LoremIpsum.sentence,
    button: {
      text: 'Primary',
      url: '#'
    },
    secondaryButton: {
      text: 'Secondary',
      url: '#'
    },
  }} 
/>