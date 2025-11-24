declare module 'svelte-masonry' {
  import { SvelteComponentTyped } from 'svelte';

  export interface MasonryProps {
    stretchFirst?: boolean;
    gridGap?: string;
    colWidth?: string;
    items?: any[];
    animate?: boolean;
    duration?: number;
  }

  export default class Masonry extends SvelteComponentTyped<MasonryProps> {}
}
