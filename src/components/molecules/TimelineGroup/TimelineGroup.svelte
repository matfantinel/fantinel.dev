<script lang="ts">
  import TimelineItem from '@components/molecules/TimelineItem';
  import type { BlogPost } from '@schemas/blog';
  import type { CoolLink } from '@schemas/cool-link';
  import type { Photography } from '@schemas/photography';
  import type { QuickReview } from '@schemas/quick-review';
  import dateformat from 'dateformat';
  import { onMount } from 'svelte';

  let {
    date,
    posts,
    class: className,
  }: {
    date: string;
    posts: { type: string; data: BlogPost | QuickReview | CoolLink | Photography }[];
    class?: string;
  } = $props();

  let isToday = $state(false);

  onMount(() => {
    isToday = dateformat(date, 'UTC:dd mmm yyyy') === dateformat(new Date(), 'UTC:dd mmm yyyy');
  });
</script>

<div class={['m-timeline-group', className]}>
  <div class="m-timeline-group__header">
    <div class="u-noise"></div>
    <h2 class="m-timeline-group__heading">{dateformat(date, 'UTC:dd mmm yyyy')}</h2>
    {#if isToday}
      <span class="m-timeline-group__header-note">Today</span>
    {/if}
  </div>

  {#each posts as post}
    <TimelineItem class="m-timeline-group__item" type={post.type} data={post.data} />
  {/each}
</div>

<style lang="scss">
  @use '/src/styles/breakpoints';
  @use '/src/styles/typography';

  .m-timeline-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);

    width: 100%;

    &__header {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding-block: var(--spacing-sm);
      width: 100%;
    }

    &:not(:first-child) {
      .m-timeline-group {
        &__header {
          padding-top: var(--spacing-md);
          border-top: 2px solid var(--t-v6--border--medium);
        }
      }
    }

    &__heading {
      @include typography.h3;
      letter-spacing: unset;
    }

    &__header-note {
      @include typography.h4;
    }

  }
</style>
