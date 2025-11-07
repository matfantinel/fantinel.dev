<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import CoolLinkCards from './CoolLinkCards.svelte';
  import CoolLinkCard from '@components/molecules/CoolLinkCard';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  const { Story } = defineMeta({
    title: 'Molecules/Cool Link Cards',
    component: CoolLinkCards,
    tags: ['autodocs'],
    argTypes: {
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <CoolLinkCards {...args}>
    {@render args.children?.()}
  </CoolLinkCards>
{/snippet}

{#snippet children()}
  {#each Array(10) as _, index}
    <CoolLinkCard
      title={LoremIpsum.words}
      url="#"
      date="2025-01-01"
      author="Author Name"
      tags={['Tag 1', 'Tag 2']}
      content={LoremIpsum.paragraph}
    />
  {/each}
{/snippet}

<Story name="Default" args={{ children }} />
