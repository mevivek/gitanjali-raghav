// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Deployed as a GitHub Pages *project* site, so `base` is the repo name.
// If a custom domain is added later: drop `base`, set `site` to the domain,
// and add `public/CNAME`. See README.md.
export default defineConfig({
  site: 'https://mevivek.github.io',
  base: '/gitanjali-raghav',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
