<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import PostHero from './PostHero.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Post Hero',
    component: PostHero,
    tags: ['autodocs'],
    argTypes: {
      title: { control: 'text' },
      author: { control: 'object' },
      date: { control: 'date' },
      readingTime: { control: 'number' },
      tags: { control: 'object' },
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
    author: { 
      name: "Matt Fantinel", 
      image: "https://www.gravatar.com/avatar/08fc2cb6e6efa9c31179805bc0e8d8bd?s=100" 
    },
    date: new Date("2025-01-15T12:00:00"),
    readingTime: '5 min read',
    tags: ["Lorem", "Ipsum", "Dolor sit amet"]
  }} 
/>

<Story 
  name="Long Title" 
  args={{ 
    title: LoremIpsum.sentence, 
    author: { 
      name: "Matt Fantinel", 
      image: "https://www.gravatar.com/avatar/08fc2cb6e6efa9c31179805bc0e8d8bd?s=100" 
    },
    date: new Date("2025-02-20T12:00:00"),
    readingTime: '5 min read',
    tags: ["Lorem", "Ipsum", "Dolor sit amet"]
  }} 
/>

<Story 
  name="No Author Image" 
  args={{ 
    title: LoremIpsum.words, 
    author: { 
      name: "Matt Fantinel", 
      image: "" 
    },
    date: new Date("2025-03-10T12:00:00"),
    readingTime: '5 min read',
    tags: ["Lorem", "Ipsum", "Dolor sit amet"]
  }} 
/>

<Story 
  name="No Tags" 
  args={{ 
    title: LoremIpsum.words, 
    author: { 
      name: "Matt Fantinel", 
      image: "https://www.gravatar.com/avatar/08fc2cb6e6efa9c31179805bc0e8d8bd?s=100" 
    },
    date: new Date("2025-04-05T12:00:00"),
    readingTime: '5 min read',
    tags: []
  }} 
/>