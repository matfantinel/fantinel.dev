<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import ArrowLink from './ArrowLink.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Arrow Link',
    component: ArrowLink,
    tags: ['autodocs'],
    argTypes: {
      color: {
        control: { type: 'select' },
        options: ['accent', 'complementary', 'blog', 'quick-review', 'cool-link', 'photography'],
      },
      href: { control: 'text' },
      children: { control: 'text', name: 'Arrow Link' },
      target: { control: false },
      rel: { control: false },
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <ArrowLink {...args}>{args.children ?? 'Arrow Link'}</ArrowLink> <br><br>
  <ArrowLink {...args} color="complementary">{args.children ?? 'Arrow Link'}</ArrowLink> <br><br>
  <ArrowLink {...args} color="blog">{args.children ?? 'Arrow Link'}</ArrowLink> <br><br>
  <ArrowLink {...args} color="quick-review">{args.children ?? 'Arrow Link'}</ArrowLink> <br><br>
  <ArrowLink {...args} color="cool-link">{args.children ?? 'Arrow Link'}</ArrowLink> <br><br>
  <ArrowLink {...args} color="photography">{args.children ?? 'Arrow Link'}</ArrowLink>
{/snippet}

<Story name="Default" />