<script module>
  import {
    defineMeta,
  } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import AboutAuthor from './AboutAuthor.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/About Author',
    component: AboutAuthor,
    tags: ['autodocs'],
    argTypes: {
      kicker: { control: 'text' },
      name: { control: 'text' },
      bio: { control: 'text' },
      image: { control: 'text' },
      extraImages: { control: 'object' },
      socials: { control: 'object' },
      button: { control: 'object' },
      isCard: { control: 'boolean' }
    },
    render: template
  });

  const defaultArgs = {
    kicker: 'About the author',
    name: 'Doggy Dogginton',
    bio: LoremIpsum.paragraph,
    image: "https://placedog.net/500/500", 
    extraImages: [
      "https://placedog.net/501/501",
      "https://placedog.net/502/502",
    ],
    socials: [
      {
        name: "Mastodon",
        url: "https://hachyderm.io/@fantinel",
        label: "Say Hi on Mastodon"
      },
      {
        name: "GitHub",
        url: "https://github.com/matfantinel",
        label: "Check out my GitHub profile"
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/matheus-fantinel/",
        label: "Connect with me on LinkedIn"
      },
      {
        name: "Email",
        url: "mailto:matt@fantinel.dev",
        label: "Send me an email"
      }
    ],
  };
</script>

{#snippet template(args)}
  <AboutAuthor {...args} />
{/snippet}

<Story 
  name="Default" 
  args={defaultArgs} 
/>

<Story
  name="With Button"
  args={{
    ...defaultArgs,
    button: {
      text: 'About',
      url: '#'
    }
  }}
/>

<Story
  name="Card"
  args={{
    ...defaultArgs,
    isCard: true
  }}
/>

<Story
  name="Card with Button"
  args={{
    ...defaultArgs,
    isCard: true,
    button: {
      text: 'About',
      url: '#'
    }
  }}
/>