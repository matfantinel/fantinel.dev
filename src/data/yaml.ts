// This file gets the YAML settings, types them and exports them
// And also does some handling of the images

import type { HomeConfig } from '@schemas/home-config';
import type { SiteMeta } from '@schemas/site-meta';
import homeConfig from '@public/cms/home.yml';
import metaConfig from '@public/cms/meta.yml';
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