import { createHash } from 'node:crypto';

/**
 * Builds a `cacheKey` for `getStaticPaths()` entries, used by
 * `experimental.incrementalBuild`.
 *
 * The key must fingerprint EVERYTHING that affects the page's output beyond
 * its code — Astro already invalidates pages when their module dependency
 * graph (layouts, components, imported configs) changes, so this only needs
 * to cover the data rendered on the page.
 *
 * `version` is a manual escape hatch: bump it to bust the cache for every
 * page using it (e.g. `buildCacheKey(2, post)` after a data pipeline change).
 */
export function buildCacheKey(version: string | number, ...data: unknown[]): string {
  const hash = createHash('sha256').update(JSON.stringify(data)).digest('hex');
  return `${version}-${hash}`;
}
