# gitanjali-raghav

Personal site for Geetanjali Raghav — a Bollywood-VHS home-video tape rather
than a CV. Nine screens on one strip: a title card, six reels, an interval for
the day job, and end credits. Built with [Astro](https://astro.build) and
published to GitHub Pages.

Built from the `Home Video` design in the Claude Design handoff bundle. The
previous version of this site — a light-themed photo wall with a work list — is
in the git history at `f36c0a9`.

> **Status: live, and the voice is now hers.**
> The reel copy came from the design rather than being written from her public
> profiles, which is what the old site's did. Two things are still outstanding
> before this should be findable in search: reel 05 names her follower count and
> she has not been asked about that, and the current job title in
> `src/data/work.ts` disagrees with the design. See [CONTENT.md](./CONTENT.md).
>
> The page carries a `noindex` tag until `approved` in `src/data/site.ts` is
> `true`, so it stays out of search until she has seen it.

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
| `npm run deploy` | Builds and pushes to `gh-pages` |

## Editing the content

All of it lives in two text files — no component ever needs touching:

```
src/data/tape.ts       every word on the tape, the reels, the look
src/data/site.ts       name, description, social links, the publish gate
src/data/work.ts       the jobs and the university on the interval card
src/assets/photos/     image files
```

[CONTENT.md](./CONTENT.md) explains every field in plain English.

### The three switches

`look` at the top of `src/data/tape.ts` sets how worn the tape is. The defaults
are what the design shipped with, so the site looks like what she was shown.

| Switch | Default | What it does |
|---|---|---|
| `grade` | `'poster'` | `'clean'`, `'poster'` or `'tape'`. **`'tape'` is the full VHS look** — scanlines, the head-switching band along the bottom, and each reel's own colour treatment instead of one uniform grade. The other two trade that per-reel character for consistency. |
| `grain` | `80` | Film grain over everything, 0–80. |
| `osd` | `false` | The on-screen display: `reel 01 / 06`, the running timecode, the burnt-in date stamps, and the progress bar on wide screens. **Off by default**, which is worth knowing — turning it on is the single biggest change to how the tape reads, and there is a fair amount of writing in `tape.ts` that nobody currently sees. |

Both land on `<html>` as data attributes and become four numbers in
`src/styles/tape.css`; every overlay reads one of them.

## How it's put together

- **Content as data.** Every word lives in `src/data/`, never inside a
  component. The reels are one array; adding a seventh is adding an object.
- **The tape is a scroll container, not a transform.** The design prototype
  moved the strip with a JS-driven `translate3d` and an index in component
  state. This is native scroll snapping instead, which looks the same and gets
  three things the prototype could not: it works with no JavaScript, it takes
  keyboard input on its own, and the flick has real platform momentum. Script
  then adds what genuinely needs it — knowing which reel is in front, which is
  what the dimming, the progress rail and the timecode key off, plus the two
  transport buttons and drag-to-scrub on a wide screen. With JavaScript off,
  all nine screens are still reachable by swipe, wheel, arrow key and the
  play / resume / rewind links, which are real anchors.
- **Motion is additive, with one deliberate exception.** Every animation
  decorates a layout that is already complete, so the reduced-motion
  kill-switch in `global.css` can disable them all. The exception is the end
  credits: `creep` *carries* the credits rather than decorating them, and
  freezing it would park the names off the top of the screen. So it only ever
  runs under `prefers-reduced-motion: no-preference`, and under `reduce` the
  roll becomes a static scrollable list. It also pauses on hover and focus,
  which WCAG 2.2.2 asks for.
- **Images are optimised, not just uploaded.** Photos live in `src/assets/` so
  Astro re-encodes each to WebP at three widths with a `srcset`. Explicit
  `width` caps the fallback — without it Astro ships the full 1080px original
  as the base `src`.
- **No third-party requests.** All four fonts are self-hosted, latin subsets
  only; no analytics, no CDN, no tracking. Caveat is declared by hand in
  `global.css` because its package ships one stylesheet covering all four
  subsets, and the Cyrillic ones would be committed on every deploy for glyphs
  that never render.

### Theming

The palette is five colours over three near-blacks in `src/styles/tokens.css`.
Change those and the tape reskins. Per-reel gradients live in `src/data/tape.ts`
next to the copy they belong to. There is no light theme — a cassette on a CRT
does not have one — so there is no theme toggle and no stored preference.

The type sizes in the same file come in three sets: phone, wide (≥900px, where
the tape turns sideways) and short (≤700px tall, a phone held landscape). Short
wins over wide, so it is declared last.

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

**Every deploy:**

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

## Known gaps

- **`og:image` points at a file that does not exist.** `Base.astro` emits
  `/gitanjali-raghav/og.png` for link previews and there is no `og.png` in
  `public/`. Pre-existing, and a link to the site currently previews without an
  image. A single 1200×630 still from one of the reels would fix it.
- **`portrait.jpg` is 320×320** — her Instagram profile picture, and the
  lowest-resolution image here. It sits in the cassette window at roughly
  284px so it holds, but only just.
