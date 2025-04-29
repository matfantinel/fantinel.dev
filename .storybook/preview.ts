import '../src/styles/global.scss';
import '@stefanjudis/sparkly-text';
import type { Preview } from '@storybook/svelte'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;