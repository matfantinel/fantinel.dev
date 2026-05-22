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
    headerBody,
    headerCentered = true,
    button,
    bottomButton,
    postGroups,
    filterGroups,
    baseUrl,
    prevNext,
    class: className,
  }: {
    title?: string;
    headerBody?: string;
    headerCentered?: boolean;
    button?: { text: string; url: string; icon?: any; iconPosition?: 'left' | 'right' };
    bottomButton?: { text: string; url: string; icon?: any; iconPosition?: 'left' | 'right' };
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

  const emptyStateMessages = [
    'Congratulations. You have encountered *the void*, and *the void* is staring back at you. Play around with the filters to hide from its gaze.',
    'You have chosen the absence of content. You are alone with your thoughts. Bold choice! If that’s too scary, try playing around with the filters to find something.',
    'This space is reserved for content that does not exist in this dimension. Try getting into a wormhole and coming back. Or, you know, just play around with the filters if interdimensional travel is not your thing.',
  ];

  function typewriter(node: HTMLElement, { speed = 1 }: { speed?: number }) {
    const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

    if (!valid) {
      throw new Error(`This transition only works on elements with a single text node child`);
    }

    const text = node.textContent;
    const duration = text.length / (speed * 0.01);

    return {
      duration,
      tick: (t) => {
        const i = ~~(text.length * t);
        node.textContent = text.slice(0, i);
      },
    };
  }

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

    emptyStateMessage = emptyStateMessages[Math.floor(Math.random() * emptyStateMessages.length)];
  });

  let emptyStateMessage = $state(emptyStateMessages[Math.floor(Math.random() * emptyStateMessages.length)]);

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
    <div class="o-posts-timeline__filters on-sidebar">
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
      <SectionHeader class="o-posts-timeline__header" {title} body={headerBody} centered={headerCentered} {button} />
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
        <div class="o-posts-timeline__no-results" in:typewriter={{ speed: 2 }}>
          {emptyStateMessage}
        </div>
      {/if}
    </div>

    {#if prevNext && filteredGroups.length > 0}
      <PrevNextNavigation
        class="o-posts-timeline__prev-next"
        prev={prevNext.prev}
        next={prevNext.next}
        order="reverse"
      />
    {/if}

    {#if bottomButton}
      <Button href={bottomButton.url} class="o-posts-timeline__bottom-button" icon={bottomButton.icon} iconPosition={bottomButton.iconPosition}>
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

    &__filters {
      position: sticky;
      top: var(--spacing-lg);
    }

    &__posts-container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);

      width: 100%;
      max-width: 848px;
    }

    &__no-results {
      font-size: 18px;
      font-family: var(--font--mono);
      color: var(--t-v6--text--medium);
      font-weight: 700;
      width: min(400px, 100%);
      margin-inline: auto;
    }

    :global(.o-posts-timeline__header) {
      width: 100%;
    }

    :global(.o-posts-timeline__prev-next) {
      justify-content: center;
    }

    :global(.a-tag:has(input[name='blog'])) {
      --t-v6--tag--border--active: var(--t-v6--blog);
      --t-v6--tag--text--active: var(--t-v6--blog);
      --t-v6--tag--glow--active: var(--t-v6--blog--glow-tiny);
    }
    :global(.a-tag:has(input[name='quick-review'])) {
      --t-v6--tag--border--active: var(--t-v6--quick-review);
      --t-v6--tag--text--active: var(--t-v6--quick-review);
      --t-v6--tag--glow--active: var(--t-v6--quick-review--glow-tiny);
    }
    :global(.a-tag:has(input[name='cool-link'])) {
      --t-v6--tag--border--active: var(--t-v6--cool-link);
      --t-v6--tag--text--active: var(--t-v6--cool-link);
      --t-v6--tag--glow--active: var(--t-v6--cool-link--glow-tiny);
    }
    :global(.a-tag:has(input[name='photography'])) {
      --t-v6--tag--border--active: var(--t-v6--photography);
      --t-v6--tag--text--active: var(--t-v6--photography);
      --t-v6--tag--glow--active: var(--t-v6--photography--glow-tiny);
    }
  }
</style>
