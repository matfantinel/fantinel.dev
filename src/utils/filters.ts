import type { FilterGroup } from "@schemas/filter";

// Update active filter URLs to point to base URL (deselect filter)
export const setActiveFilterGroups = (filterGroups: FilterGroup[], baseUrl: string) => {
  return filterGroups?.map((group) => {
    if (group.tags) {
      return {
        ...group,
        tags: group.tags.map((tag) => ({
          ...tag,
          url: tag.url && tag.active ? baseUrl : tag.url,
        })),
      };
    }
    if (group.groups) {
      return {
        ...group,
        groups: group.groups.map((nestedGroup) => ({
          ...nestedGroup,
          tags: nestedGroup.tags?.map((tag) => ({
            ...tag,
            url: tag.url && tag.active ? baseUrl : tag.url,
          })),
        })),
      };
    }
    return group;
  });
}
