import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createTheme() {
  let currentTheme;
  if (browser) {
    currentTheme = localStorage.getItem('theme-preference') || 'auto';
  }

  const { subscribe, set } = writable<string>(currentTheme);

  return {
    subscribe,
    set: (value: string) => {
      if (browser) {
        localStorage.setItem('theme-preference', value);
        document.firstElementChild?.setAttribute('data-theme', value);
      }
      set(value);
    }
  };
}

export const theme = createTheme();