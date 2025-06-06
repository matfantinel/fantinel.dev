<script Module>
  import {
    defineMeta,
  } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import AboutAuthorCard from './AboutAuthorCard.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/About Author Card',
    component: AboutAuthorCard,
    tags: ['autodocs'],
    argTypes: {
      kicker: { control: 'text' },
      name: { control: 'text' },
      bio: { control: 'text' },
      image: { control: 'text' },
      extraImages: { control: 'object' },
      socials: { control: 'object' },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <AboutAuthorCard {...args} />
{/snippet}

<Story 
  name="Default" 
  args={{ 
    kicker: LoremIpsum.words,
    name: LoremIpsum.words,
    bio: LoremIpsum.mdCode,
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
        url: "https://linkedin.com/in/matfantinel",
        label: "Connect with me on LinkedIn"
      },
      {
        name: "Email",
        url: "mailto:matt@fantinel.dev",
        label: "Send me an email"
      }
    ],
  }} 
/>