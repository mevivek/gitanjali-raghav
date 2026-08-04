// @ts-check
import { defineConfig } from 'astro/config';

// A GitHub Pages *project* site, so `base` is the repository name.
//
// `site` is the custom domain, not mevivek.github.io: that account already
// serves a user site on mevivek.dev, and GitHub 301s every project path to
// match. Pointing `site` at github.io would emit canonical and Open Graph
// URLs that immediately redirect.
//
// To give this site its own domain: drop `base`, set `site` to the new
// hostname, and add `public/CNAME`. See README.md.
export default defineConfig({
  site: 'https://mevivek.dev',
  base: '/gitanjali-raghav',
  trailingSlash: 'ignore',
});
