<script lang="ts">
  import { onMount } from 'svelte';
  import Button from '@components/atoms/Button';
  import Filters from '@components/molecules/Filters';
  import SectionHeader from '@components/molecules/SectionHeader';
  import TimelineGroup from '@components/molecules/TimelineGroup';
  import type { BlogPost } from '@schemas/blog';
  import type { CoolLink } from '@schemas/cool-link';
  import type { FilterGroup } from '@schemas/filter';
  import type { Photography } from '@schemas/photography';
  import type { QuickReview } from '@schemas/quick-review';
  import { setActiveFilterGroups } from '@utils/filters';
  import { fly } from 'svelte/transition';

  let {
    title,
    button,
    bottomButton,
    postGroups,
    filterGroups,
    baseUrl,
    class: className,
  }: {
    title?: string;
    button?: { text: string; url: string };
    bottomButton?: { text: string; url: string };
    postGroups: { date: string; posts: { type: string; data: BlogPost | QuickReview | CoolLink | Photography }[] }[];
    filterGroups?: FilterGroup[];
    baseUrl?: string;
    class?: string;
  } = $props();

  const typeLabels: Record<string, string> = {
    blog: 'Blog',
    'quick-review': 'Quick Reviews',
    'cool-link': 'Cool Links',
    photography: 'Photography',
  };

  const allTypes = Object.keys(typeLabels);

  let allFilterGroups = $derived(filterGroups);

  onMount(() => {
    if (filterGroups && filterGroups.length > 0) {
      const typeFilterGroup = {
        label: 'Post Types',
        tags: allTypes.map((type) => ({
          label: typeLabels[type],
          name: type,
          active: true,
          count: postGroups.reduce((acc, group) => acc + group.posts.filter((p) => p.type === type).length, 0),
        })),
      };

      allFilterGroups = [typeFilterGroup, ...(filterGroups ?? [])];
    }
  });

  let enabledTypes = $state(new Set<string>(allTypes));

  function handleFilterChange(name: string, value: boolean) {
    const next = new Set(enabledTypes);
    if (value) {
      next.add(name);
    } else {
      next.delete(name);
    }
    enabledTypes = next;
  }

  let filteredGroups = $derived(
    postGroups
      .map((group) => ({
        ...group,
        posts: group.posts.filter((p) => enabledTypes.has(p.type)),
      }))
      .filter((group) => group.posts.length > 0),
  );

  const processedFilterGroups = $derived(setActiveFilterGroups(allFilterGroups, baseUrl));
</script>

<div class={['o-posts-timeline u-content-grid', className]}>
  {#if processedFilterGroups && processedFilterGroups.length > 0}
    <div class="l-base-archive__filters on-sidebar">
      <Filters
        filterGroups={processedFilterGroups}
        size="small"
        tagColor="inverted"
        collapseInnerGroups
        onFilterChange={handleFilterChange}
      />
    </div>
  {/if}

  <div class="o-posts-timeline__container">
    {#if title}
      <SectionHeader class="o-posts-timeline__header" {title} {button} centered />
    {/if}

    <div class="o-posts-timeline__posts-container">
      {#each filteredGroups as group (group.date)}
        <div
          class="o-posts-timeline__group"
          in:fly={{ duration: 250, x: '-25%', opacity: 0 }}
          out:fly={{ duration: 250, x: '-25%', opacity: 0 }}
        >
          <TimelineGroup date={group.date} posts={group.posts} />
        </div>
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
    --content-max-width: 1100px;

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
