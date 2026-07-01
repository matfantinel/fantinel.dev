// This file gets the YAML settings, types them and exports them
// And also does some handling of the images

import type { CoolLinkSingleConfig, HomeConfig, QuickReviewSingleConfig, PhotographySingleConfig, CoolLinkArchiveConfig, QuickReviewArchiveConfig, PhotographyArchiveConfig, BlogArchiveConfig, BlogSingleConfig, TimelineArchiveConfig, GardenConfig, NewsletterConfig } from '@schemas/pages-config';
import type { SiteMeta } from '@schemas/site-meta';
import homeConfig from '@public/cms/home.yml';
import metaConfig from '@public/cms/meta.yml';
import coolLinkSingleConfig from '@public/cms/page-configs/cool-links/single.yaml';
import coolLinkArchiveConfig from '@public/cms/page-configs/cool-links/archive.yaml';
import quickReviewArchiveConfig from '@public/cms/page-configs/quick-reviews/archive.yaml';
import photographyArchiveConfig from '@public/cms/page-configs/photography/archive.yaml';
import blogArchiveConfig from '@public/cms/page-configs/blog/archive.yaml';
import timelineArchiveConfig from '@public/cms/page-configs/timeline/archive.yaml';
import blogSingleConfig from '@public/cms/page-configs/blog/single.yaml';
import quickReviewSingleConfig from '@public/cms/page-configs/quick-reviews/single.yaml';
import photographySingleConfig from '@public/cms/page-configs/photography/single.yaml';
import gardenConfig from '@public/cms/page-configs/garden.yaml';
import newsletterConfig from '@public/cms/page-configs/newsletter.yaml';
import { handleCmsMediaPath, transformStrings } from '@utils/functions';

export function getSiteMeta(): SiteMeta {
  return transformStrings(metaConfig as SiteMeta, (value: string) =>
    value.startsWith('/media/') ? handleCmsMediaPath(value) : value
  );
}

export function getHomeConfig(): HomeConfig {
  return transformStrings(homeConfig as HomeConfig, (value: string) =>
    value.startsWith('/media/') ? handleCmsMediaPath(value) : value
  );
}

export function getCoolLinkSingleConfig(): CoolLinkSingleConfig {
  return transformStrings(coolLinkSingleConfig as CoolLinkSingleConfig, (value: string) =>
    value.startsWith('/media/') ? handleCmsMediaPath(value) : value
  );
}

export function getCoolLinkArchiveConfig(): CoolLinkArchiveConfig {
  return transformStrings(coolLinkArchiveConfig as CoolLinkArchiveConfig, (value: string) =>
    value.startsWith('/media/') ? handleCmsMediaPath(value) : value
  );
}

export function getQuickReviewArchiveConfig(): QuickReviewArchiveConfig {
  return transformStrings(quickReviewArchiveConfig as QuickReviewArchiveConfig, (value: string) =>
    value.startsWith('/media/') ? handleCmsMediaPath(value) : value
  );
}

export function getPhotographyArchiveConfig(): PhotographyArchiveConfig {
  return transformStrings(photographyArchiveConfig as PhotographyArchiveConfig, (value: string) =>
    value.startsWith('/media/') ? handleCmsMediaPath(value) : value
  );
}

export function getBlogArchiveConfig(): BlogArchiveConfig {
  return transformStrings(blogArchiveConfig as BlogArchiveConfig, (value: string) =>
    value.startsWith('/media/') ? handleCmsMediaPath(value) : value
  );
}

export function getTimelineArchiveConfig(): TimelineArchiveConfig {
  return transformStrings(timelineArchiveConfig as TimelineArchiveConfig, (value: string) =>
    value.startsWith('/media/') ? handleCmsMediaPath(value) : value
  );
}

export function getBlogSingleConfig(): BlogSingleConfig {
  return transformStrings(blogSingleConfig as BlogSingleConfig, (value: string) =>
    value.startsWith('/media/') ? handleCmsMediaPath(value) : value
  );
}

export function getQuickReviewSingleConfig(): QuickReviewSingleConfig {
  return transformStrings(quickReviewSingleConfig as QuickReviewSingleConfig, (value: string) =>
    value.startsWith('/media/') ? handleCmsMediaPath(value) : value
  );
}

export function getPhotographySingleConfig(): PhotographySingleConfig {
  return transformStrings(photographySingleConfig as PhotographySingleConfig, (value: string) =>
    value.startsWith('/media/') ? handleCmsMediaPath(value) : value
  );
}

export function getGardenConfig(): GardenConfig {
  return transformStrings(gardenConfig as GardenConfig, (value: string) =>
    value.startsWith('/media/') ? handleCmsMediaPath(value) : value
  );
}

export function getNewsletterConfig(): NewsletterConfig {
  return transformStrings(newsletterConfig as NewsletterConfig, (value: string) =>
    value.startsWith('/media/') ? handleCmsMediaPath(value) : value
  );
}