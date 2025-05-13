<script module lang="ts">
  import {
    defineMeta,
    setTemplate,
    type Args,
    type StoryContext,
  } from '@storybook/addon-svelte-csf';

  import IconLink from './IconLink.svelte';
  import Rss from '@assets/icons/rss.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Icon Link',
    component: IconLink,
    tags: ['autodocs'],
    argTypes: {
      href: { control: 'text', required: true },
      children: { control: 'text', name: 'Example' },
      icon: { control: false },
      target: { control: false },
      rel: { control: false },
      class: { control: false },
    },
  });
</script>

<script lang="ts">
  setTemplate(template);
</script>

{#snippet iconSnippet()}<Rss />{/snippet}
{#snippet template(args: Args<typeof Story>, context: StoryContext<typeof Story>)}
  <IconLink {...args} href="#" icon={iconSnippet}>{args.children ?? 'Example'}</IconLink>
{/snippet}

<Story name="Default" />