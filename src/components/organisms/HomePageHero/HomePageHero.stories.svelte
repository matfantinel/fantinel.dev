<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import HomePageHero from './HomePageHero.svelte';
  import { PostType } from '@schemas/post-types.ts';

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
    render: template,
  });

  const defaultArgs = {
    kicker: 'Hi, I am',
    title: 'Doggy Dogginton',
    bio: LoremIpsum.paragraph,
    image: 'https://placedog.net/500/500',
    extraImages: ['https://placedog.net/501/501', 'https://placedog.net/502/502'],
    button: {
      text: 'About',
      url: '#',
    },
    socials: [
      {
        name: 'Mastodon',
        url: 'https://hachyderm.io/@fantinel',
        label: 'Say Hi on Mastodon',
      },
      {
        name: 'GitHub',
        url: 'https://github.com/matfantinel',
        label: 'Check out my GitHub profile',
      },
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/matheus-fantinel/',
        label: 'Connect with me on LinkedIn',
      },
      {
        name: 'Email',
        url: 'mailto:hello@fantinel.dev',
        label: 'Send me an email',
      },
    ],
  };
</script>

{#snippet template(args)}
  <HomePageHero {...args} />
{/snippet}

<Story name="Default" args={defaultArgs} />

<Story
  name="No Button"
  args={{
    ...defaultArgs,
    button: undefined,
  }}
/>

<Story
  name="No Socials"
  args={{
    ...defaultArgs,
    socials: undefined,
  }}
/>

<Story
  name="With Section Cards"
  args={{
    ...defaultArgs,
    sectionCards: [
      {
        title: 'Blog',
        script: [
          {
            text: 'What started in 2019 as a place to document things ',
            typo: 'as a web devel',
            fix: 'I was learning as a web developer ',
          },
          { text: 'has since gr', typo: 'won', fix: 'own into a lot more.' },
        ],
        postType: PostType.BLOG_POST,
      },
      {
        title: 'Cool Links',
        content: 'I regularly gather the coolest links I come across on the web and post them here.',
        postType: PostType.COOL_LINK,
      },
      {
        title: 'Quick Reviews',
        content: 'Things I’ve watched, played, heard or read.',
        postType: PostType.QUICK_REVIEW,
      },
    ],
  }}
/>
