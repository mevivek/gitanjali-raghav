# gitanjali-raghav

Personal and professional website for Gitanjali Raghav.

A static site built with [Astro](https://astro.build) and Tailwind CSS,
published to GitHub Pages. Its signature element is a **two-lane timeline**:
career on one side, life on the other, sharing a single year axis.

> **Status: structure complete, content pending.**
> The design, layout and build pipeline are finished. The biographical content
> is not — see [CONTENT.md](./CONTENT.md) for exactly what is still needed and
> where each piece goes. `npm run check` fails while any placeholder remains,
> so the site cannot accidentally be published half-finished.

## Getting started

```bash
npm install
npm run dev      # http://localhost:4321/gitanjali-raghav
```

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server with hot reload |
| `npm run check` | Lists every unfilled placeholder; fails if any remain |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serves the built output, exactly as deployed |

## Editing the content

All of it lives in text files — no component ever needs touching:

```
src/data/site.ts            name, tagline, role, contact, social links
src/content/timeline/*.md   one file per timeline event
src/content/life/*.md       hobby and interest cards
src/content/notes/*.md      optional short writing
public/img/                 photographs
```

[CONTENT.md](./CONTENT.md) explains every field in plain English.

## How it's put together

- **Content as data.** Every fact lives in Markdown or `site.ts`, never inside
  a component. Content collections are typed with Zod, so a missing or
  malformed field fails the build loudly instead of rendering an empty section.
- **Two safety nets.** `TODO` marks a known-missing fact and blocks publishing.
  `draft: true` marks an unverified entry and excludes it from the built site.
- **Motion is additive.** Every animation decorates a layout that is already
  complete. With JavaScript disabled or `prefers-reduced-motion` set, the page
  renders fully — nothing is hidden behind an animation that might not fire.
- **Mobile first.** Below 768px the two lanes collapse to a single
  chronological column, distinguished by colour.
- **No third-party requests.** Fonts are self-hosted; there is no analytics, no
  CDN and no tracking. The only client-side JavaScript is the observer driving
  the timeline and the theme toggle.

### Theming

The whole palette is six colours in `src/styles/tokens.css`, defined once for
light and once for dark. Changing them reskins the site; nothing else needs
editing. Each accent has a `-text` variant darkened to meet AA contrast — use
those for anything a person has to read.

## Deploying

Pushes to `main` trigger `.github/workflows/deploy.yml`, which runs the
placeholder check, builds, and publishes to GitHub Pages. Enable it once under
**Settings → Pages → Build and deployment → Source: GitHub Actions**.

The site is configured as a *project* site at
`https://mevivek.github.io/gitanjali-raghav`.

To move it to a custom domain: drop `base` from `astro.config.mjs`, set `site`
to the domain, and add a `public/CNAME` file containing the hostname.
