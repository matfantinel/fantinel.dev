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
    image: "https://placedog.net/500/500", 
    extraImages: [
      "https://placedog.net/501/501",
      "https://placedog.net/502/502",
    ],
  }} 
/>