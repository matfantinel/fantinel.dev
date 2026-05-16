<script lang="ts">
  import CoolLinkIcon from '@assets/icons/post-types/cool-link.svelte';
  import PhotographyIcon from '@assets/icons/post-types/photography.svelte';
  import PostIcon from '@assets/icons/post-types/post.svelte';
  import QuickReviewIcon from '@assets/icons/post-types/quick-review.svelte';
  import Button from '@components/atoms/Button';
  import Filters from '@components/molecules/Filters';
  import PrevNextNavigation from '@components/molecules/PrevNextNavigation';
  import SectionHeader from '@components/molecules/SectionHeader';
  import TimelineGroup from '@components/molecules/TimelineGroup';
  import type { BlogPost } from '@schemas/blog';
  import type { CoolLink } from '@schemas/cool-link';
  import type { FilterGroup } from '@schemas/filter';
  import type { Photography } from '@schemas/photography';
  import type { QuickReview } from '@schemas/quick-review';
  import { setActiveFilterGroups } from '@utils/filters';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  let {
    title,
    button,
    bottomButton,
    postGroups,
    filterGroups,
    baseUrl,
    prevNext,
    class: className,
  }: {
    title?: string;
    button?: { text: string; url: string };
    bottomButton?: { text: string; url: string };
    postGroups: { date: string; posts: { type: string; data: BlogPost | QuickReview | CoolLink | Photography }[] }[];
    filterGroups?: FilterGroup[];
    baseUrl?: string;
    prevNext?: { prev?: { label: string; url: string }; next?: { label: string; url: string } };
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
          icon:
            type === 'blog'
              ? postIconSnippet
              : type === 'quick-review'
                ? quickReviewIconSnippet
                : type === 'cool-link'
                  ? coolLinkIconSnippet
                  : type === 'photography'
                    ? photographyIconSnippet
                    : undefined,
          // count: postGroups.reduce((acc, group) => acc + group.posts.filter((p) => p.type === type).length, 0),
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

{#snippet postIconSnippet()}<PostIcon />{/snippet}
{#snippet quickReviewIconSnippet()}<QuickReviewIcon />{/snippet}
{#snippet coolLinkIconSnippet()}<CoolLinkIcon />{/snippet}
{#snippet photographyIconSnippet()}<PhotographyIcon />{/snippet}

<div class={['o-posts-timeline u-content-grid', className]}>
  {#if processedFilterGroups && processedFilterGroups.length > 0}
    <div class="l-base-archive__filters on-sidebar">
      <Filters
        filterGroups={processedFilterGroups}
        size="small"
        collapseInnerGroups
        onFilterChange={handleFilterChange}
      />
    </div>
  {/if}

  <div class="o-posts-timeline__container">
    {#if title}
      <SectionHeader class="o-posts-timeline__header" {title} {button} centered />
    {/if}

    {#if prevNext}
      <PrevNextNavigation
        class="o-posts-timeline__prev-next"
        prev={prevNext.prev}
        next={prevNext.next}
        order="reverse"
      />
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

      {#if filteredGroups.length === 0}
        <div class="o-posts-timeline__no-results u-b2" in:fly={{ delay: 1000, duration: 1500, y: '1000%', opacity: 0 }}>
          Congratulations.
        </div>
        <div class="o-posts-timeline__no-results u-b2" in:fly={{ delay: 2500, duration: 1500, y: '1000%', opacity: 0 }}>
          You have chosen the absence of content.
        </div>
        <div class="o-posts-timeline__no-results u-b2" in:fly={{ delay: 4000, duration: 1500, y: '1000%', opacity: 0 }}>
          You found <sparkly-text number-of-sparkles="2">the void</sparkly-text>, and it stares back at you.
        </div>
        <div class="o-posts-timeline__no-results u-b2" in:fly={{ delay: 6000, duration: 1500, y: '1000%', opacity: 0 }}>
          Select a post type in the filters to unfind it.
        </div>
      {/if}
    </div>

    {#if prevNext}
      <PrevNextNavigation
        class="o-posts-timeline__prev-next"
        prev={prevNext.prev}
        next={prevNext.next}
        order="reverse"
      />
    {/if}

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
  @use '/src/styles/mixins';

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

    &__no-results {
      text-align: center;
      max-width: 400px;
      margin-inline: auto;
      text-wrap: balance;
      font-size: 18px;

      sparkly-text {
        --sparkly-text-color: var(--palette-v6--mauve);
        --sparkly-text-size: 1.25rem;

        font-family: var(--font--spicy);
        font-weight: 700;
      }
    }

    :global(.o-posts-timeline__header) {
      width: 100%;
    }

    :global(.o-posts-timeline__prev-next) {
      justify-content: center;
    }

    :global(.a-tag:has(input[name="blog"])) {
      --t-v6--tag--border--active: var(--t-v6--blog);
      --t-v6--tag--text--active: var(--t-v6--blog);
      --t-v6--tag--glow--active: var(--t-v6--blog--glow-tiny);
    }
    :global(.a-tag:has(input[name="quick-review"])) {
      --t-v6--tag--border--active: var(--t-v6--quick-review);
      --t-v6--tag--text--active: var(--t-v6--quick-review);
      --t-v6--tag--glow--active: var(--t-v6--quick-review--glow-tiny);
    }
    :global(.a-tag:has(input[name="cool-link"])) {
      --t-v6--tag--border--active: var(--t-v6--cool-link);
      --t-v6--tag--text--active: var(--t-v6--cool-link);
      --t-v6--tag--glow--active: var(--t-v6--cool-link--glow-tiny);
    }
    :global(.a-tag:has(input[name="photography"])) {
      --t-v6--tag--border--active: var(--t-v6--photography);
      --t-v6--tag--text--active: var(--t-v6--photography);
      --t-v6--tag--glow--active: var(--t-v6--photography--glow-tiny);
    }
  }
</style>
