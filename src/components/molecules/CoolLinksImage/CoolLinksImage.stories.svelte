<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import CoolLinksImage from './CoolLinksImage.svelte';

  const { Story } = defineMeta({
    title: 'Molecules/Cool Links Image',
    component: CoolLinksImage,
    tags: ['autodocs'],
    argTypes: {
      title: { control: 'text' },
      date: { control: 'date' },
      background: { control: 'color' },
      willRenderWithSatori: { control: 'boolean' },
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <div style="width: 1200px; height: 630px;">
    <CoolLinksImage
      title={args.title || 'Cool Links'}
      {...args}
    />
  </div>
{/snippet}

<Story
  name="January"
  args={{
    title: 'Cool Links',
    date: new Date(2026, 0, 1),
  }}
/>

<Story
  name="February"
  args={{
    title: 'Cool Links',
    date: new Date(2026, 1, 1),
  }}
/>

<Story
  name="March"
  args={{
    title: 'Cool Links',
    date: new Date(2026, 2, 1),
  }}
/>

<Story
  name="April"
  args={{
    title: 'Cool Links',
    date: new Date(2026, 3, 1),
  }}
/>

<Story
  name="May"
  args={{
    title: 'Cool Links',
    date: new Date(2026, 4, 1),
  }}
/>

<Story
  name="June"
  args={{
    title: 'Cool Links',
    date: new Date(2026, 5, 1),
  }}
/>

<Story
  name="July"
  args={{
    title: 'Cool Links',
    date: new Date(2026, 6, 1),
  }}
/>

<Story
  name="August"
  args={{
    title: 'Cool Links',
    date: new Date(2026, 7, 1),
  }}
/>

<Story
  name="September"
  args={{
    title: 'Cool Links',
    date: new Date(2026, 8, 1),
  }}
/>

<Story
  name="October"
  args={{
    title: 'Cool Links',
    date: new Date(2026, 9, 1),
  }}
/>

<Story
  name="November"
  args={{
    title: 'Cool Links',
    date: new Date(2026, 10, 1),
  }}
/>

<Story
  name="December"
  args={{
    title: 'Cool Links',
    date: new Date(2026, 11, 1),
  }}
/>
