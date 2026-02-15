<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { FilterGroup } from '@schemas/filter';
  import Tag from '@components/atoms/Tag';
  import Tags from '@components/molecules/Tags';

  let {
    heading,
    filterGroups,
    size = 'responsive',
    tagColor,
    centered = false,
    class: className,
  }: {
    heading?: string;
    filterGroups: FilterGroup[];
    size?: 'default' | 'small' | 'responsive';
    tagColor?: 'default' | 'inverted';
    centered?: boolean;
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
        // padding-left: var(--spacing-md);
        gap: var(--spacing-xs);
      }
    }

    &__group-label {
      @include typography.b2;
      font-weight: 600;
      margin: 0;
      color: var(--theme--text-color);

      &--nested {
        @include typography.b3;
        font-weight: 500;
        color: var(--theme--text-muted-color);
      }
    }

    &__nested-groups {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      margin-top: var(--spacing-xs);
    }
  }
</style>
