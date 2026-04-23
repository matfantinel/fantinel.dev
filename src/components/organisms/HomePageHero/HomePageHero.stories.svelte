<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import HomePageHero from './HomePageHero.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Home Page Hero',
    component: HomePageHero,
    tags: ['autodocs'],
    argTypes: {
      title: { control: 'text' },
      body: { control: 'text' },
      kicker: { control: 'text' },
      buttons: { control: 'array' },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <HomePageHero title={args.title ?? LoremIpsum.sentence} {...args} />
{/snippet}

<Story 
  name="Default" 
  args={{
    kicker: LoremIpsum.words,
    title: LoremIpsum.words, 
    body: LoremIpsum.paragraph,
    buttons: [{ text: 'Button', url: '#' }],
    image: "https://picsum.photos/500/500", 
    extraImages: [
      "https://picsum.photos/501/501",
      "https://picsum.photos/502/502",
    ],
  }} 
/>