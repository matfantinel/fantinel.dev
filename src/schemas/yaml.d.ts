declare module '@public/cms/meta.yml' {
  import type { SiteMeta } from '@schemas/site-meta';
  const value: SiteMeta;
  export default value;
}

declare module '@public/cms/home.yml' {
  import type { HomeConfig } from '@schemas/pages-config';
  const value: HomeConfig;
  export default value;
}

declare module '@public/cms/page-configs/cool-links/single.yaml' {
  import type { CoolLinkSingleConfig } from '@schemas/pages-config';
  const value: CoolLinkSingleConfig;
  export default value;
}

declare module '@public/cms/page-configs/cool-links/archive.yaml' {
  import type { CoolLinkArchiveConfig } from '@schemas/pages-config';
  const value: CoolLinkArchiveConfig;
  export default value;
}

declare module '@public/cms/page-configs/quick-reviews/archive.yaml' {
  import type { QuickReviewArchiveConfig } from '@schemas/pages-config';
  const value: QuickReviewArchiveConfig;
  export default value;
}

declare module '@public/cms/page-configs/photography/archive.yaml' {
  import type { PhotographyArchiveConfig } from '@schemas/pages-config';
  const value: PhotographyArchiveConfig;
  export default value;
}

declare module '@public/cms/page-configs/blog/archive.yaml' {
  import type { BlogArchiveConfig } from '@schemas/pages-config';
  const value: BlogArchiveConfig;
  export default value;
}

declare module '@public/cms/page-configs/timeline/archive.yaml' {
  import type { TimelineArchiveConfig } from '@schemas/pages-config';
  const value: TimelineArchiveConfig;
  export default value;
}

declare module '@public/cms/page-configs/quick-reviews/single.yaml' {
  import type { QuickReviewSingleConfig } from '@schemas/pages-config';
  const value: QuickReviewSingleConfig;
  export default value;
}

declare module '@public/cms/page-configs/photography/single.yaml' {
  import type { PhotographySingleConfig } from '@schemas/pages-config';
  const value: PhotographySingleConfig;
  export default value;
}

declare module '@public/cms/page-configs/blog/single.yaml' {
  import type { BlogSingleConfig } from '@schemas/pages-config';
  const value: BlogSingleConfig;
  export default value;
}