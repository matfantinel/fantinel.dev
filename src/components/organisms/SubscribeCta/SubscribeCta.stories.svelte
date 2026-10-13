<script module>
  import {
    defineMeta,
  } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import SubscribeCta from './SubscribeCta.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Subscribe CTA',
    component: SubscribeCta,
    tags: ['autodocs'],
    argTypes: {
      heading: { control: 'text' },
      body: { control: 'text' },
      baseUrl: { control: 'text' },
      items: { control: 'object' },
    },
    render: template
  });

  const everything = { label: 'Everything', description: 'All posts of every type', href: '/rss.xml', icon: 'rss', color: 'og-accent' };
  const feeds = [
    { label: 'Blog', description: 'Blog posts only', href: '/blog/rss.xml', icon: 'post-outline', color: 'blog' },
    { label: 'Cool Links', description: 'Links I found interesting', href: '/cool-links/rss.xml', icon: 'post-types/cool-link', color: 'cool-link' },
  ];
  const newsletter = {
    type: 'newsletter',
    label: 'Newsletter',
    description: LoremIpsum.sentence,
    formUrl: 'https://example.com/newsletter',
    tag: 'website',
  };
</script>

{#snippet template(args)}
  <SubscribeCta {...args} />
{/snippet}

<Story
  name="Default"
  args={{
    heading: 'Subscribe',
    body: LoremIpsum.sentence,
    baseUrl: 'https://example.com',
    items: [everything, newsletter, ...feeds],
  }}
/>

<Story
  name="Newsletter Last"
  args={{
    heading: 'Subscribe',
    body: LoremIpsum.sentence,
    baseUrl: 'https://example.com',
    items: [everything, ...feeds, newsletter],
  }}
/>

<Story
  name="RSS Only"
  args={{
    heading: 'RSS Feeds',
    body: LoremIpsum.sentence,
    baseUrl: 'https://example.com',
    items: [everything, ...feeds],
  }}
/>
