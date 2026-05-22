declare module '@public/cms/meta.yml' {
  import type { SiteMeta } from '@schemas/site-meta';
  const value: SiteMeta;
  export default value;
}

declare module '@public/cms/home.yml' {
  import type { HomeConfig } from '@schemas/home-config';
  const value: HomeConfig;
  export default value;
}