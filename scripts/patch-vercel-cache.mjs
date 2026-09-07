import { existsSync, readFileSync, writeFileSync } from 'node:fs';

// Vercel's build cache is configured via the `cache` field in the Build Output
// API config (.vercel/output/config.json). Paths listed there are re-populated
// in the build sandbox on subsequent deployments.
//
// https://vercel.com/docs/build-output-api/configuration#cache
//
// IMPORTANT: declaring `cache` replaces Vercel's default cache list, so
// `node_modules/**` must be included explicitly to keep dependency caching.
// The Astro build cache lives outside node_modules (.astro-cache) so that
// `npm install` cannot prune it between the cache restore and the build.
const configPath = '.vercel/output/config.json';

if (existsSync(configPath)) {
  const config = JSON.parse(readFileSync(configPath, 'utf8'));
  config.cache = ['node_modules/**', '.astro-cache/**'];
  writeFileSync(configPath, JSON.stringify(config, null, '\t') + '\n');
}
