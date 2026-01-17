<script lang="ts">
  import SectionHeader from '@components/molecules/SectionHeader';
  import type { BlogPost } from '@schemas/blog';
  import type { QuickReview } from '@schemas/quick-review';
  import type { CoolLink } from '@schemas/cool-link';
  import type { Photography } from '@schemas/photography';
  import TimelineGroup from '@components/molecules/TimelineGroup';

  let {
    postGroups,
    class: className,
  }: {
    postGroups: { date: string; posts: { type: string; data: BlogPost | QuickReview | CoolLink | Photography }[] }[];
    class?: string;
  } = $props();
</script>

<div class={['o-posts-timeline', className]}>
  <div class="o-posts-timeline__container u-container">
    {#each postGroups as group}
      <TimelineGroup
        date={group.date}
        posts={group.posts}
      />
    {/each}
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
      max-width: 828px;
    }
  }  
</style>
