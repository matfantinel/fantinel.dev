declare module 'dateformat' {
  const value: any;
  export default value;
}

declare module '@stefanjudis/sparkly-text';
declare module 'reading-time/lib/reading-time';

declare module 'svelte-masonry' {
  import type { SvelteComponent } from 'svelte';
  
  export interface MasonryProps {
    colWidth?: string;
    gridGap?: string;
    refreshLayout?: () => void;
  }
  
  export default class Masonry extends SvelteComponent<MasonryProps> {}
}
declare module 'pagefind/pagefind.js';