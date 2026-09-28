<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { LoremIpsum } from '@utils/lorem-ipsum';

  import SiteSectionCard from './SiteSectionCard.svelte';
  import { PostType } from '@schemas/post-types.ts';

  import Button from '@components/atoms/Button';

  const { Story } = defineMeta({
    title: 'Molecules/Site Section Card',
    component: SiteSectionCard,
    tags: ['autodocs'],
    argTypes: {
      title: { control: 'text' },
      content: { control: 'text' },
      url: { control: 'text' },
      postType: { control: 'select', options: [PostType.BLOG_POST, PostType.COOL_LINK, PostType.QUICK_REVIEW] },
      class: { control: false },
    },
    render: template,
  });

  let el;

  function handleTriggerAnimation() {
    el.triggerAnimation();
  }
</script>

{#snippet template(args)}
  <SiteSectionCard
    bind:this={el}
    title={args.title || LoremIpsum.words}
    content={args.content || LoremIpsum.sentence}
    url={args.url || '#'}
    {...args}
  />
  <br />
  <Button onclick={handleTriggerAnimation}>Trigger animation</Button>
{/snippet}

<Story
  name="Blog"
  args={{
    title: 'Blog',
    content: '',
    script: [
      {
        text: 'What started in 2019 as a place to document things ',
        typo: 'as a web devel',
        fix: 'I was learning as a web developer ',
      },
      { text: 'has since gr', typo: 'won', fix: 'own into a lot more.' },
    ],
    postType: PostType.BLOG_POST,
  }}
/>

<Story
  name="Cool Links"
  args={{
    title: 'Cool Links',
    content: 'I regularly gather the coolest links I come across on the web and post them here.',
    postType: PostType.COOL_LINK,
  }}
/>

<Story
  name="Quick Reviews"
  args={{
    title: 'Quick Reviews',
    content: 'Things I’ve watched, played, heard or read.',
    postType: PostType.QUICK_REVIEW,
  }}
/>
