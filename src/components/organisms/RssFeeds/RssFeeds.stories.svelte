<script module>
  import {
    defineMeta,
  } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import RssFeeds from './RssFeeds.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/RSS Feeds',
    component: RssFeeds,
    tags: ['autodocs'],
    argTypes: {
      heading: { control: 'text' },
      body: { control: 'text' },
      baseUrl: { control: 'text' },
      feeds: { control: 'object' },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <RssFeeds {...args} />
{/snippet}

<Story
  name="Default"
  args={{
    heading: 'Prefer RSS?',
    body: LoremIpsum.sentence,
    baseUrl: 'https://example.com',
    feeds: [
      { label: 'Everything', description: 'All posts of every type', href: '/rss.xml', icon: 'rss', color: 'og-accent' },
      { label: 'Blog', description: 'Blog posts only', href: '/blog/rss.xml', icon: 'post-outline', color: 'blog' },
      { label: 'Cool Links', description: 'Links I found interesting', href: '/cool-links/rss.xml', icon: 'post-types/cool-link', color: 'cool-link' },
    ],
  }}
/>
