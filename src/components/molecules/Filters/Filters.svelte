<script lang="ts">
  import type { FilterGroup } from '@schemas/filter';
  import Tag from '@components/atoms/Tag';
  import Tags from '@components/molecules/Tags';

  let {
    heading,
    filterGroups,
    size = 'responsive',
    tagColor,
    centered = false,
    collapseInnerGroups = false,
    class: className,
  }: {
    heading?: string;
    filterGroups: FilterGroup[];
    size?: 'default' | 'small' | 'responsive';
    tagColor?: 'default' | 'inverted';
    centered?: boolean;
    collapseInnerGroups?: boolean;
    class?: string;
  } = $props();

  function renderFilterGroup(group: FilterGroup, depth: number = 0) {
    const hasNestedGroups = group.groups && group.groups.length > 0;
    const hasTags = group.tags && group.tags.length > 0;

    return {
      group,
      depth,
      hasNestedGroups,
      hasTags
    };
  }
</script>

<div class={['m-filters', className]}>
  {#if heading}
    <h2 class="m-filters__heading">{heading}</h2>
  {/if}

  <div class="m-filters__groups">
    {#each filterGroups as filterGroup}
      {@const rendered = renderFilterGroup(filterGroup)}
      <div class="m-filters__group" data-depth={rendered.depth}>
        <h3 class="m-filters__group-label">{rendered.group.label}</h3>
        
        {#if rendered.hasTags}
          <Tags size={size} class="m-filters__tags" centered={centered}>
            {#each rendered.group.tags as tag}
              <Tag size={size} href={tag.url} selected={tag.active} color={tagColor}>
                {tag.name} ({tag.count})
              </Tag>
            {/each}
          </Tags>
        {/if}

        {#if rendered.hasNestedGroups}
          <div class="m-filters__nested-groups">
            {#each rendered.group.groups as nestedGroup}
              {@const nestedRendered = renderFilterGroup(nestedGroup, rendered.depth + 1)}
              {@const hasActiveTag = nestedRendered.hasTags && nestedRendered.group.tags?.some(tag => tag.active)}
              {#if collapseInnerGroups}
                <details class="m-filters__details" open={hasActiveTag}>
                  <summary class="m-filters__group-label m-filters__group-label--nested m-filters__summary">
                    {nestedRendered.group.label}
                  </summary>
                  <div class="m-filters__group m-filters__group--nested" data-depth={nestedRendered.depth}>
                    {#if nestedRendered.hasTags}
                      <Tags size={size} class="m-filters__tags" centered={centered}>
                        {#each nestedRendered.group.tags as tag}
                          <Tag size={size} href={tag.url} selected={tag.active} color={tagColor}>
                            {tag.name} ({tag.count})
                          </Tag>
                        {/each}
                      </Tags>
                    {/if}
                  </div>
                </details>
              {:else}
                <div class="m-filters__group m-filters__group--nested" data-depth={nestedRendered.depth}>
                  <h4 class="m-filters__group-label m-filters__group-label--nested">{nestedRendered.group.label}</h4>
                  
                  {#if nestedRendered.hasTags}
                    <Tags size={size} class="m-filters__tags" centered={centered}>
                      {#each nestedRendered.group.tags as tag}
                        <Tag size={size} href={tag.url} selected={tag.active} color={tagColor}>
                          {tag.name} ({tag.count})
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
</div>

<style lang="scss">
  @use '/src/styles/breakpoints';
  @use '/src/styles/typography';

  .m-filters {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);

    &__heading {
      @include typography.h3;
      margin: 0;
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
      font-weight: 700;
      margin: 0;
      color: var(--theme--text-color);

      &--nested {
        @include typography.b2;
        font-weight: 700;
        color: var(--theme--text-muted-color);
      }
    }

    &__nested-groups {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      margin-top: var(--spacing-xs);
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
  }
</style>
