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
        options: ['accent', 'complementary', 'blog', 'quick-review', 'cool-link', 'photography'],
      },
      iconPosition: {
        control: { type: 'select' },
        options: ['left', 'right'],
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

{#snippet checkIconSnippet()}<Check />{/snippet}

{#snippet template(args)}
  <Button {...args}>{args.children ?? 'Button'}</Button> <br><br>
  <Button {...args} color="complementary">{args.children ?? 'Button'}</Button>  <br><br>
  <Button {...args} color="blog">{args.children ?? 'Button'}</Button>  <br><br>
  <Button {...args} color="quick-review">{args.children ?? 'Button'}</Button>  <br><br>
  <Button {...args} color="cool-link">{args.children ?? 'Button'}</Button>  <br><br>
  <Button {...args} color="photography">{args.children ?? 'Button'}</Button>
{/snippet}

<Story name="Default" />

<Story name="With Arrow Icon (Left)" args={{ icon: 'arrow' }} />

<Story name="With Arrow Icon (Right)" args={{ icon: 'arrow', iconPosition: 'right' }} />

<Story name="With Custom Icon" args={{ icon: checkIconSnippet }} />

<Story name="With Custom Icon (Right)" args={{ icon: checkIconSnippet, iconPosition: 'right' }} />