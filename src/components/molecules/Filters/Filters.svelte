<script lang="ts">
  import type { FilterGroup } from '@schemas/filter';
  import Tag from '@components/atoms/Tag';
  import Tags from '@components/molecules/Tags';
  import Button from '@components/atoms/Button';
  import FilterIcon from '@assets/icons/filter.svelte';
  import { animatedDetails } from 'svelte-animated-details';
  import BottomSheetDialog from '@components/molecules/BottomSheetDialog';

  let {
    heading,
    filterGroups,
    size = 'responsive',
    tagColor,
    collapseInnerGroups = false,
    onFilterChange,
    class: className,
  }: {
    heading?: string;
    filterGroups: FilterGroup[];
    size?: 'default' | 'small' | 'responsive';
    tagColor?: 'default' | 'inverted';
    collapseInnerGroups?: boolean;
    onFilterChange?: (name: string, value: boolean) => void;
    class?: string;
  } = $props();

  function normalizeFilterGroup(group: FilterGroup, depth: number = 0) {
    const hasNestedGroups = group.groups && group.groups.length > 0;
    const hasTags = group.tags && group.tags.length > 0;

    return {
      group,
      depth,
      hasNestedGroups,
      hasTags,
    };
  }

  let supportsInvokerCommands = $state(false);
  $effect(() => {
    if (typeof window !== 'undefined') {
      supportsInvokerCommands = 'commandForElement' in HTMLButtonElement.prototype;
    }
  });

  function handleFiltersClick() {
    if (!supportsInvokerCommands) {
      const dialog = document.getElementById('filters-modal') as HTMLDialogElement;
      dialog?.showModal();
    }
  }

  function handleFilterChange(event: Event) {
    onFilterChange?.((event.target as HTMLInputElement).name, (event.target as HTMLInputElement).checked);
  }

  let classList = $derived(['m-filters', className]);
</script>

{#snippet filtersContent()}
  {#if heading}
    <h2 class="m-filters__heading">{heading}</h2>
  {/if}

  <div class="m-filters__groups">
    {#each filterGroups as filterGroup}
      {@const normalized = normalizeFilterGroup(filterGroup)}
      <div class="m-filters__group" data-depth={normalized.depth}>
        <p class="m-filters__group-label">{normalized.group.label}</p>

        {#if normalized.hasTags}
          <Tags {size} class="m-filters__tags">
            {#each normalized.group.tags as tag}
              <Tag {size} href={tag.url} active={tag.active} color={tagColor} count={tag.count} name={tag.name} onchange={handleFilterChange}>
                {tag.label}
              </Tag>
            {/each}
          </Tags>
        {/if}

        {#if normalized.hasNestedGroups}
          <div class="m-filters__nested-groups">
            {#each normalized.group.groups as nestedGroup}
              {@const nestedNormalized = normalizeFilterGroup(nestedGroup, normalized.depth + 1)}
              {@const hasActiveTag = nestedNormalized.hasTags && nestedNormalized.group.tags?.some((tag) => tag.active)}
              {#if collapseInnerGroups}
                <details class="m-filters__details" open={hasActiveTag || nestedNormalized.group.defaultOpen} use:animatedDetails={{ duration: 250 }}>
                  <summary class="m-filters__group-label m-filters__group-label--nested m-filters__summary">
                    {nestedNormalized.group.label}
                  </summary>
                  <div class="m-filters__group m-filters__group--nested" data-depth={nestedNormalized.depth}>
                    {#if nestedNormalized.hasTags}
                      <Tags {size} class="m-filters__tags">
                        {#each nestedNormalized.group.tags as tag}
                          <Tag {size} href={tag.url} active={tag.active} color={tagColor} count={tag.count} name={tag.name} onchange={handleFilterChange}>
                            {tag.label}
                          </Tag>
                        {/each}
                      </Tags>
                    {/if}
                  </div>
                </details>
              {:else}
                <div class="m-filters__group m-filters__group--nested" data-depth={nestedNormalized.depth}>
                  <h4 class="m-filters__group-label m-filters__group-label--nested">{nestedNormalized.group.label}</h4>

                  {#if nestedNormalized.hasTags}
                    <Tags {size} class="m-filters__tags">
                      {#each nestedNormalized.group.tags as tag}
                        <Tag {size} href={tag.url} active={tag.active} color={tagColor} count={tag.count} name={tag.name} onchange={handleFilterChange}>
                          {tag.label}
                        </Tag>
                      {/each}
                    </Tags>
                  {/if}
                </div>
              {/if}
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>
{/snippet}

{#snippet filtersIconSnippet()}<FilterIcon size="22px" />{/snippet}

<div class={classList}>
  <div class="m-filters__mobile">
    <Button
      class="m-filters__mobile-button"
      icon={filtersIconSnippet}
      aria-label="Show filters"
      commandfor="filters-modal"
      command="show-modal"
      onclick={handleFiltersClick}
    >
      Filters
    </Button>

    <BottomSheetDialog slug="filters-modal">
      <div class="m-filters__mobile-dialog__container">
        {@render filtersContent()}
      </div>
    </BottomSheetDialog>
  </div>

  <div class="m-filters__desktop">
    {@render filtersContent()}
  </div>
</div>

<style lang="scss">
  @use '/src/styles/breakpoints';
  @use '/src/styles/typography';

  .m-filters {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);

    &__heading {
      @include typography.h4;
    }

    &__groups {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    &__group {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);

      &--nested {
        gap: var(--spacing-xs);
      }
    }

    &__group-label {
      @include typography.b1;

      &--nested {
        @include typography.b2;
        font-weight: 700;
      }
    }

    &__nested-groups {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    &__details {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    &__summary {
      cursor: pointer;
      list-style: none;
      user-select: none;

      &::-webkit-details-marker {
        display: none;
      }

      &::marker {
        display: none;
      }

      &::before {
        content: '▶';
        display: inline-block;
        margin-right: var(--spacing-xs);
        transition: transform 0.2s ease;
      }
    }

    &__details[open] &__summary::before {
      transform: rotate(90deg);
    }

    :global(.m-filters__tags) {
      justify-content: flex-start;
    }

    &__mobile {
      display: none;
    }

    &__mobile-dialog__container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
      align-items: flex-start;
    }

    &__desktop {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);      
    }

    @include breakpoints.for-tablet-portrait-down {
      .m-filters {
        &__mobile {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        &__desktop {
          display: none;
        }
      }
    }
  }
</style>
