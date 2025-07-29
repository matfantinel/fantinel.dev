<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import Button from './Button.svelte';
  import Check from '@assets/icons/check.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
      color: {
        control: { type: 'select' },
        options: ['default', 'green', 'yellow', 'peach', 'red', 'mauve', 'blue', 'teal'],
      },
      href: { control: 'text' },
      children: { control: 'text', name: 'Button Text' },
      target: { control: false },
      rel: { control: false },
      class: { control: false },
      icon: { control: false }
    },
    render: template
  });
</script>

{#snippet template(args)}
  <Button {...args}>{args.children ?? 'Button'}</Button> <br><br>
  <Button {...args} color="green">{args.children ?? 'Button'}</Button> <br><br>
  <Button {...args} color="yellow">{args.children ?? 'Button'}</Button> <br><br>
  <Button {...args} color="peach">{args.children ?? 'Button'}</Button> <br><br>
  <Button {...args} color="red">{args.children ?? 'Button'}</Button> <br><br>
  <Button {...args} color="mauve">{args.children ?? 'Button'}</Button> <br><br>
  <Button {...args} color="blue">{args.children ?? 'Button'}</Button> <br><br>
  <Button {...args} color="teal">{args.children ?? 'Button'}</Button>
{/snippet}

<Story name="Default" />

{#snippet iconSnippet()}<Check />{/snippet}
<Story name="With Icon" args={{ icon: iconSnippet }} />