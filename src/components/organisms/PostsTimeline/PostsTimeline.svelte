<script lang="ts">
  import Button from '@components/atoms/Button';
  import SectionHeader from '@components/molecules/SectionHeader';
  import TimelineGroup from '@components/molecules/TimelineGroup';
  import type { BlogPost } from '@schemas/blog';
  import type { CoolLink } from '@schemas/cool-link';
  import type { Photography } from '@schemas/photography';
  import type { QuickReview } from '@schemas/quick-review';

  let {
    title,
    button,
    bottomButton,
    postGroups,
    class: className,
  }: {
    title?: string;
    button?: { text: string; url: string };
    bottomButton?: { text: string; url: string };
    postGroups: { date: string; posts: { type: string; data: BlogPost | QuickReview | CoolLink | Photography }[] }[];
    class?: string;
  } = $props();
</script>

<div class={['o-posts-timeline', className]}>
  <div class="o-posts-timeline__container u-container">
    {#if title}
      <SectionHeader 
        class="o-posts-timeline__header"
        title={title}
        button={button}
        centered
      />
    {/if}
    
    <div class="o-posts-timeline__posts-container">
      {#each postGroups as group}
        <TimelineGroup
          date={group.date}
          posts={group.posts}
        />
      {/each}
    </div>

    {#if bottomButton}
      <Button href={bottomButton.url} class="o-posts-timeline__bottom-button">
        {bottomButton.text}
      </Button>
    {/if}
  </div>
</div>

<style lang="scss">
  @use '/src/styles/typography';
  @use '/src/styles/breakpoints';

  .o-posts-timeline {
    &__container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);

      align-items: center;
    }

    &__posts-container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
      
      width: 100%;
      max-width: 828px;
    }

    :global(.o-posts-timeline__header) {
      width: 100%;
    }
  }  
</style>
