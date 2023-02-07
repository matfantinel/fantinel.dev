import type { BlogPost } from '$lib/utils/types';
import { writable, type Writable } from 'svelte/store';
export const post: Writable<BlogPost> = writable();