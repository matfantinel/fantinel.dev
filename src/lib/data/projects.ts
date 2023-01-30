import type { Project } from "$lib/utils/types";

export default [
  {
    name: 'Personal Website',
    description:
      'The website you’re seeing right now. Designed to be pretty, simple, and lightweight.',
    image: 'personal-website',
    sourceCode: 'https://github.com/matfantinel/matfantinel.github.io',
    blogPostLink: '/blog-development-sveltekit',
    tags: [{ label: 'Svelte' }, { label: 'Open Source', color: 'secondary' }]
  },
  {
    name: 'Pocket Companion',
    description:
      'A companion app for Animal Crossing New Horizons. Manage your island, tasks and Critterpedia with this handy web app.',
    image: 'pocket-companion',
    link: 'https://pocketcompanion.fantinel.dev/',
    sourceCode: 'https://github.com/matfantinel/acnh-pocket-companion',
    blogPostLink: '/ionic-animal-crossing-companion',
    tags: [{ label: 'Angular' }, { label: 'Ionic' }, { label: 'Open Source', color: 'secondary' }]
  },
  {
    name: 'Gestek',
    description:
      'A web app for managing Beauty Clinics, supporting the entire day-to-day operation, with built-in CRM, ERP and beauty-clinic specific features. I worked on this project as the lead front-end developer for over a year.',
    image: 'gestek',
    link: 'https://gestek.com.br/',
    tags: [{ label: 'Angular' }, { label: 'PWA' }]
  },
  {
    name: 'Moneta',
    description:
      'A (discontinued) desktop applet that displays currency rates and updates during the day. Built for elementary OS.',
    image: 'moneta',
    link: 'https://appcenter.elementary.io/com.github.matfantinel.moneta/',
    sourceCode: 'https://github.com/matfantinel/moneta',
    tags: [{ label: 'Vala' }, { label: 'GTK' }, { label: 'Open Source', color: 'secondary' }]
  },
  {
    name: 'Reminduck',
    description:
      'A (discontinued) simple reminder app for elementary OS, and my first experience writing native desktop apps.',
    image: 'reminduck',
    link: 'https://appcenter.elementary.io/com.github.matfantinel.reminduck/',
    sourceCode: 'https://github.com/matfantinel/reminduck',
    tags: [{ label: 'Vala' }, { label: 'GTK' }, { label: 'Open Source', color: 'secondary' }]
  }
] as Project[];