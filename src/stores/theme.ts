import { writable } from 'svelte/store';

function createTheme() {
  let currentTheme;
  if (!import.meta.env.SSR) {
    currentTheme = localStorage.getItem('theme-preference') || 'auto';
  }

  const { subscribe, set } = writable<string>(currentTheme);

  return {
    subscribe,
    set: (value: string) => {
      if (!import.meta.env.SSR) {
        localStorage.setItem('theme-preference', value);
        document.firstElementChild?.setAttribute('data-theme', value);
      }
      set(value);
    }
  };
}

export const theme = createTheme();