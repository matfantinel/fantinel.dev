// Glob import all icons at build time
// Vite will discover and bundle all .svelte files in the icons folder
const iconModules = import.meta.glob(
  ['@assets/icons/*.svelte', '@assets/icons/**/*.svelte'],
  { eager: true }
);

// Build icon map from paths
// '/src/assets/icons/home.svelte' -> 'home'
// '/src/assets/icons/post-types/cool-link.svelte' -> 'post-types/cool-link'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, any> = {};
for (const [path, module] of Object.entries(iconModules)) {
  const match = path.match(/\/icons\/(?<name>.+?)\.svelte$/);
  if (match?.groups?.name) {
    // Get the default export (the Svelte component)
    const component = (module as { default: unknown }).default;
    iconMap[match.groups.name] = component;
  }
}

/**
 * Get an icon component class
 * @param name - Icon name (e.g., 'home', 'post-types/cool-link')
 * @returns The Svelte component class for the icon
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getIcon(name: string): any | undefined {
  return iconMap[name];
}

export function iconExists(name: string): boolean {
  return name in iconMap;
}
