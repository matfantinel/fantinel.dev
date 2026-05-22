<script lang="ts">
  import TimelineItem from '@components/molecules/TimelineItem';
  import type { BlogPost } from '@schemas/blog';
  import type { CoolLink } from '@schemas/cool-link';
  import type { Photography } from '@schemas/photography';
  import type { QuickReview } from '@schemas/quick-review';
  import dateformat from 'dateformat';
  import { onMount } from 'svelte';
  import type { BaseProps } from '@utils/types';

  export type TimelineGroupProps = BaseProps & {
    date: string;
    posts: { type: string; data: BlogPost | QuickReview | CoolLink | Photography }[];
  };

  let {
    date,
    posts,
    class: className,
  }: TimelineGroupProps = $props();

  let isToday = $state(false);

  onMount(() => {
    isToday = dateformat(date, 'UTC:dd mmm yyyy') === dateformat(new Date(), 'UTC:dd mmm yyyy');
  });
</script>

<div class={['m-timeline-group', className]}>
  <div class="m-timeline-group__header">
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

      position: sticky;
      top: 0;
      z-index: 2;
      width: calc(100% + 20px);
      margin-left: -10px;
      padding-left: 10px;
      background: linear-gradient(to bottom, var(--t-v6--surface--base) 60%, transparent);
      @include breakpoints.for-phone-only {
        top: 64px;
      }
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
