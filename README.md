# gitanjali-raghav

Personal and professional website for Gitanjali Raghav.

A static site built with [Astro](https://astro.build) and Tailwind CSS,
published to GitHub Pages. It leads with a photo wall and keeps the work
history to a few lines — a personal site that mentions a job, rather than a CV
with a hobbies section bolted on.

> **Status: live, and readable — but the voice is not hers yet.**
> The tagline and the life cards were written *from* her public profiles, not
> *by* her. They are accurate but generic, and replacing them is the single
> biggest improvement left. See [CONTENT.md](./CONTENT.md).
>
> The page also carries a `noindex` tag until `approved` in `src/data/site.ts`
> is set to `true`, so it stays out of search until she has seen it.

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
src/data/site.ts            name, tagline, facts, contact, social links
src/data/work.ts            roles, companies, years
src/data/gallery.ts         the photo wall
src/content/life/*.md       hobby and interest cards
src/assets/photos/          image files
```

[CONTENT.md](./CONTENT.md) explains every field in plain English.

## How it's put together

- **Content as data.** Every fact lives in `src/data/` or Markdown, never
  inside a component. The life cards are a Zod-typed content collection, so a
  malformed entry fails the build instead of rendering an empty section.
- **Three safety nets.** `TODO` marks a missing fact and blocks publishing.
  `draft: true` hides an unverified life card. `approved: false` keeps the
  whole page out of search.
- **Images are optimised, not just uploaded.** Photos live in `src/assets/` so
  Astro re-encodes each to WebP at three widths with a `srcset`. Explicit
  `width` caps the fallback — without it Astro ships the full 1080px original
  as the base `src`, which alone was 900KB of the build.
- **Motion is additive.** Every animation decorates a layout that is already
  complete. With JavaScript off or `prefers-reduced-motion` set, the page
  renders fully.
- **No third-party requests.** Fonts are self-hosted; no analytics, no CDN, no
  tracking. The only client-side JavaScript is the theme toggle.

### Theming

The whole palette is six colours in `src/styles/tokens.css`, defined once for
light and once for dark. Changing them reskins the site; nothing else needs
editing. Each accent has a `-text` variant darkened to meet AA contrast — use
those for anything a person has to read.

## Deploying

Published from a branch, not GitHub Actions — Actions creates jobs on this
repository but never assigns them a runner, so the build is done locally and
the result is pushed to `gh-pages`.

**Already live** — GitHub enabled Pages automatically when `gh-pages` was
first pushed. If it ever needs setting by hand: **Settings → Pages → Build and
deployment → Source: Deploy from a branch → `gh-pages` → `/ (root)`**.

The address is `mevivek.dev`, not `mevivek.github.io`: that account serves a
user site on the custom domain, and GitHub 301s every project path to match.
This is why `site` in `astro.config.mjs` is set to the custom domain — pointing
it at github.io would emit canonical and Open Graph URLs that instantly
redirect.

**Every deploy after that:**

```bash
npm run deploy
```

That builds, reports any unfilled content, commits `dist/` to `gh-pages`, and
pushes. It uses git plumbing rather than checking the branch out, so your
working tree and current branch are never touched. Give it about a minute,
then:

```
https://mevivek.dev/gitanjali-raghav
```

> `public/.nojekyll` must stay where it is. GitHub Pages runs Jekyll by
> default, and Jekyll ignores any directory beginning with an underscore —
> which is where Astro puts every stylesheet and font (`_astro/`). Without
> that file the site deploys with no styling at all.

An Actions-based workflow lives in the git history if runners ever start
working: `git show ed4f5bb:.github/workflows/deploy.yml`.

### Preview mode

The page carries `<meta name="robots" content="noindex, nofollow">` while
*either* of these is true:

1. any `TODO` placeholder remains, or
2. `approved` in `src/data/site.ts` is `false`.

Both are evaluated at build time. The first clears itself; the second is a
deliberate human decision — being factually complete is not the same as being
ready to be found in search, and that call is hers.

`npm run deploy` runs the content check in warn-only mode, so it lists what is
outstanding without blocking a preview deploy.

> A GitHub Pages site on a public repository is public. Anyone with the URL can
> read it, indexed or not. Keep the repository private until she is happy with
> what it says about her.

### Custom domain

Drop `base` from `astro.config.mjs`, set `site` to the domain, and add a
`public/CNAME` file containing the hostname.
