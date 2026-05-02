<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import PhotographyCards from './PhotographyCards.svelte';
  import NewPhotographyCard from '@components/molecules/NewPhotographyCard';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  const { Story } = defineMeta({
    title: 'Molecules/Photography Cards',
    component: PhotographyCards,
    tags: ['autodocs'],
    argTypes: {
      class: { control: false },
    },
    render: template
  });
</script>

{#snippet template(args)}
  <PhotographyCards {...args}>
    {@render args.children?.()}
  </PhotographyCards>
{/snippet}

{#snippet children()}
  {#each Array(6) as _, index}
    <NewPhotographyCard
      title={LoremIpsum.words}
      image="https://placedog.net/1000/1000"
      publishedDate={new Date()}
      photoDate={new Date()}
      content={LoremIpsum.words}
    />
  {/each}
{/snippet}

<Story name="Default" args={{ children }} />

{#snippet immersiveChildren()}
  {#each Array(6) as _, index}
    <NewPhotographyCard
      title={LoremIpsum.words}
      image="https://placedog.net/1000/1000"
      publishedDate={new Date()}
      photoDate={new Date()}
      content={LoremIpsum.words}
      immersive
    />
  {/each}
{/snippet}

<Story name="Immersive" args={{ children: immersiveChildren }} />
