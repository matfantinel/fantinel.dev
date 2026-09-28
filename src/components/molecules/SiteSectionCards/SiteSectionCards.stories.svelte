<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import SiteSectionCards from './SiteSectionCards.svelte';
  import SiteSectionCard from '@components/molecules/SiteSectionCard';
  import { PostType } from "@schemas/post-types.ts";
  import Button from '@components/atoms/Button';

  const { Story } = defineMeta({
    title: 'Molecules/Site Section Cards',
    component: SiteSectionCards,
    tags: ['autodocs'],
    argTypes: {
      class: { control: false },
    },
    render: template,
  });

  let blogEl;
  let linksEl;
  let reviewsEl;

  function handleTriggerAnimations() {
    blogEl.triggerAnimation();
    linksEl.triggerAnimation();
    reviewsEl.triggerAnimation();
  }
</script>

{#snippet template(args)}
  <SiteSectionCards {...args}>
    {@render args.children?.()}
  </SiteSectionCards>

  <br />
  <Button onclick={handleTriggerAnimations}>Trigger animations</Button>
{/snippet}

{#snippet children()}
  <SiteSectionCard
    bind:this={blogEl}
    title="Blog"
    script={[
      {
        text: 'What started in 2019 as a place to document things ',
        typo: 'as a web devel',
        fix: 'I was learning as a web developer ',
      },
      { text: 'has since gr', typo: 'won', fix: 'own into a lot more.' },
    ]}
    postType={PostType.BLOG_POST}
  />

  <SiteSectionCard
    bind:this={linksEl}
    title="Cool Links"
    content="I regularly gather the coolest links I come across on the web and post them here."
    postType={PostType.COOL_LINK}
  />

  <SiteSectionCard
    bind:this={reviewsEl}
    title="Quick Reviews"
    content="Things I’ve watched, played, heard or read."
    postType={PostType.QUICK_REVIEW}
  />
{/snippet}

<Story name="Default" args={{ children }} />
