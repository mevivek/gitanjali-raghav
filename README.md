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

**One-time setup** — go to **Settings → Pages → Build and deployment** and set
*Source* to **GitHub Actions**. Nothing publishes until this is done; it cannot
be enabled from code.

After that, every push to `main` or `claude/personal-professional-website-jlhzqu`
runs `.github/workflows/deploy.yml`, which checks the content, builds, and
publishes to:

```
https://mevivek.github.io/gitanjali-raghav
```

### Preview mode

The site currently deploys while placeholders remain, so it can be reviewed on
a real device. Two things make that safe:

- **The page carries `<meta name="robots" content="noindex, nofollow">` for as
  long as any placeholder exists.** It is computed at build time from the
  content itself and vanishes on its own when the last `TODO` is filled — there
  is nothing to remember to remove. A draft about a real person stays out of
  search results.
- CI runs `npm run check -- --warn-only`, which reports what is unfilled and
  annotates the run without blocking it.

**When the content is complete**, drop `-- --warn-only` from the workflow. The
check becomes a hard gate again and any unfilled field fails the deploy.

> A GitHub Pages site on a public repository is public. Anyone with the URL can
> read it, indexed or not. Keep the repository private until she is happy with
> what it says about her.

### Custom domain

Drop `base` from `astro.config.mjs`, set `site` to the domain, and add a
`public/CNAME` file containing the hostname.
