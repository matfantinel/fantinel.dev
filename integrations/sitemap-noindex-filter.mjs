import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { join } from 'path';

export default function sitemapNoindexFilter() {
  return {
    name: 'sitemap-noindex-filter',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        const sitemapPath = fileURLToPath(new URL('./sitemap-0.xml', dir));
        
        if (!existsSync(sitemapPath)) {
          return;
        }

        let sitemap = readFileSync(sitemapPath, 'utf-8');
        const urlRegex = /<url>[\s\S]*?<\/url>/g;
        const locRegex = /<loc>(.*?)<\/loc>/;
        
        const urls = sitemap.match(urlRegex) || [];
        const filteredUrls = [];

        for (const urlBlock of urls) {
          const locMatch = urlBlock.match(locRegex);
          if (!locMatch) continue;
          
          const url = locMatch[1];
          const urlPath = url.replace('https://fantinel.dev', '');
          const htmlPath = join(fileURLToPath(dir), urlPath === '/' ? 'index.html' : urlPath.replace(/\/$/, '') + '/index.html');
          
          if (existsSync(htmlPath)) {
            const html = readFileSync(htmlPath, 'utf-8');
            if (!html.includes('<meta name="robots" content="noindex, nofollow"')) {
              filteredUrls.push(urlBlock);
            }
          } else {
            filteredUrls.push(urlBlock);
          }
        }

        const newSitemap = sitemap.replace(
          /<urlset[^>]*>[\s\S]*<\/urlset>/,
          (match) => {
            const opening = match.match(/<urlset[^>]*>/)[0];
            return `${opening}\n${filteredUrls.join('\n')}\n</urlset>`;
          }
        );

        const fs = await import('fs/promises');
        await fs.writeFile(sitemapPath, newSitemap, 'utf-8');
      }
    }
  };
}
