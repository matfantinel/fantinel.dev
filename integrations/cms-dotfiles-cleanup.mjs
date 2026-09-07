import { existsSync, readdirSync, rmSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

/**
 * `public/cms` is an Obsidian vault (a git submodule). Its dotfile entries —
 * `.obsidian/` (~10MB of plugin code), `.github/`, `.git`, `.gitignore`,
 * `.DS_Store` — are vault metadata, not website assets, but Astro copies
 * `public/` verbatim into the build output.
 *
 * This strips every dot-entry inside `cms/` from all build output directories
 * once the build is done.
 */
export default function cmsDotfilesCleanup() {
  let root;

  return {
    name: 'cms-dotfiles-cleanup',
    hooks: {
      'astro:config:setup': ({ config }) => {
        root = fileURLToPath(config.root);
      },
      'astro:build:done': ({ dir, logger }) => {
        // Cover every place static output can land: Astro's own outDir, the
        // adapter's client build dir, and the final Vercel Build Output API
        // folder — regardless of which order our hook vs the adapter runs in.
        const outputDirs = new Set([
          fileURLToPath(dir),
          join(root, 'dist/client'),
          join(root, '.vercel/output/static'),
        ]);

        for (const outputDir of outputDirs) {
          const cmsDir = join(outputDir, 'cms');
          if (!existsSync(cmsDir)) continue;

          const removed = [];
          for (const entry of readdirSync(cmsDir, { withFileTypes: true })) {
            if (!entry.name.startsWith('.')) continue;
            rmSync(join(cmsDir, entry.name), { recursive: true, force: true });
            removed.push(entry.name);
          }

          if (removed.length > 0) {
            logger.info(`Removed vault metadata from ${cmsDir}: ${removed.join(', ')}`);
          }
        }
      },
    },
  };
}
