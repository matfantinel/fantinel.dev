<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import SocialLink from './SocialLink.svelte';

  const { Story } = defineMeta({
    title: 'Atoms/Social Link',
    component: SocialLink,
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component: 'Helper component that uses IconLink behind the scenes.'
        }
      }
    },
    argTypes: {
      name: {
        control: { type: 'radio' },
        options: ['Mastodon', 'GitHub', 'LinkedIn', 'Email', 'RSS'],
      },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <SocialLink label={args.name} {...args} />
{/snippet}

<Story name="Mastodon" args={{ name: 'Mastodon' }} />
<Story name="GitHub" args={{ name: 'GitHub' }} />
<Story name="LinkedIn" args={{ name: 'LinkedIn' }} />
<Story name="Email" args={{ name: 'Email' }} />
<Story name="RSS" args={{ name: 'RSS' }} />
