# gitanjali-raghav

Personal site for Geetanjali Raghav — a Bollywood-VHS home-video tape rather
than a CV. Eleven screens on one strip: a title card, seven reels, an interval
for the day job, that interval's b-side, and end credits. Built with
[Astro](https://astro.build) and published to GitHub Pages.

Each reel is a toy rather than a slide. You touch the water and it ripples, hold
a throttle and the odometer runs on, pick the occasion, roll through four takes
until one is worth posting, drag the temperature down until it snows, tap on the
beat until she is in character, and play a song off the inlay card. The
interval's b-side is a quality-assurance form she runs on herself. All of it
optional: with no JavaScript the reels are still seven photographs with her
words under them, and the form comes already filled in.

Built from the `Home Video` design in the Claude Design handoff bundles — two of
them so far. The previous version of this site — a light-themed photo wall with a
work list — is in the git history at `f36c0a9`.

> **Status: live, and the voice is now hers.**
> The reel copy came from the design rather than being written from her public
> profiles, which is what the old site's did. One thing is still outstanding
> before this should be findable in search: reel 04 names her follower count and
> she has not been asked about that. See [CONTENT.md](./CONTENT.md).
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

All of it lives in three text files — no component ever needs touching:

```
src/data/tape.ts       every word on the tape, the reels, the look
src/data/site.ts       name, description, social links, the publish gate
src/data/work.ts       the jobs and the university on the interval card
src/assets/photos/     image files
```

[CONTENT.md](./CONTENT.md) explains every field in plain English.

### The three switches

`look` at the top of `src/data/tape.ts` sets how worn the tape is.

| Switch | Default | What it does |
|---|---|---|
| `grade` | `'poster'` | `'clean'`, `'poster'` or `'tape'`. **`'tape'` is the full VHS look** — scanlines, the head-switching band along the bottom, and each reel's own colour treatment instead of one uniform grade. The other two trade that per-reel character for consistency. |
| `grain` | `80` | Film grain over everything, 0–80. |
| `osd` | `false` | The on-screen display: `reel 01 / 07`, the running timecode, the burnt-in date stamps, and the progress bar on wide screens. **Off by default**, which is worth knowing — turning it on is the single biggest change to how the tape reads, and there is a fair amount of writing in `tape.ts` that nobody currently sees. |

These are *not* simply whatever the newest handoff arrived with. The second
bundle's control panel came set to `grain: 46, osd: true`; both were looked at
and turned down, so the tape keeps the heavier grain and the uncluttered
photographs it already had. Each is still a one-word change.

Both land on `<html>` as data attributes and become four numbers in
`src/styles/tape.css`; every overlay reads one of them.

## How it's put together

- **Content as data.** Every word lives in `src/data/`, never inside a
  component — including the alternative wordings each reel swaps between as you
  play with it. See [CONTENT.md](./CONTENT.md).
- **Interaction is additive, and every control is a real one.** The throttle,
  the chips and the roll button are `<button>`s; the temperature dial is an
  `<input type="range">` rather than the prototype's pointer-drag div, so it
  arrows, pages and announces its value instead of being pointer-only. The
  hold-to-rev throttle also holds on Space and Enter, because a
  pointerdown-only control is unusable from a keyboard. Anything that would be
  dead without JavaScript is not rendered without it — no inert buttons.
- **Sound is synthesised, not served, and it answers you.** Five short blips
  built with Web Audio: a transport clunk when the tape moves (a filtered noise
  burst over a falling thud), a key click on a control, a tick and a rising ping
  on reel 06's beat, and a bandpass sweep when you rewind. No audio file is
  committed and nothing needs licensing — which matters twice over here. The
  soundtrack this tape claims in its own credits is commercial Hindi film music,
  which cannot go on a public page; and there is no melody in any of this, so
  there is nothing to have borrowed either.

  This replaced a slow synthesised piano, which the second design handoff dropped
  in favour of feedback. The piano was pleasant and entirely disconnected from
  anything the visitor did; a cassette deck makes noise because you pressed
  something. It also simplified the button: the piano started playing by itself,
  so a remembered "on" could not be restored without a gesture and the button
  showed a half-lit "armed" face in the meantime. Blips only ever answer an
  action, so the state is just the state. Off by default either way.

  The reels reach the deck by dispatching a `tape:blip` event on the document
  rather than importing it — no load-order coupling in either direction, no
  global to collide with, and a no-op if the chrome's script never ran.
- **The tape finds its picture first.** A second and a half of tracking noise
  before the title card, clickable and Escape-able away. Skipped outright under
  reduced motion and when the URL names a reel — decided in the inline head
  script, so there is not even a frame of it. Its last keyframe sets
  `visibility: hidden`, so a script failure cannot leave an invisible sheet over
  the tape swallowing taps.
- **Every screen has a name.** `#cold-air`, not `#screen-5`. A single reel can be
  linked to and arrives centred, and moving along the tape keeps the URL pointed
  at where you are — with `replaceState`, so the back button leaves the site
  rather than walking back through eleven screens of it.
- **The tape is a scroll container, not a transform.** The design prototype
  moved the strip with a JS-driven `translate3d` and an index in component
  state. This is native scroll snapping instead, which looks the same and gets
  three things the prototype could not: it works with no JavaScript, it takes
  keyboard input on its own, and the flick has real platform momentum. Script
  then adds what genuinely needs it — knowing which reel is in front, which is
  what the dimming, the progress rail and the timecode key off, plus the two
  transport buttons and drag-to-scrub on a wide screen. With JavaScript off,
  all eleven screens are still reachable by swipe, wheel, arrow key and the
  play / resume / rewind links, which are real anchors.
- **On a phone the *document* is that scroll container, deliberately.** Safari
  and Chrome only collapse their own toolbars when the page scrolls. The tape
  was a fixed `100dvh` box with the strip scrolling inside it, so the document
  never moved and both browsers kept full-size chrome permanently — the tape sat
  in a letterbox between them. Handing the scrolling to the document is what
  lets them get out of the way, and it reclaims roughly 60–110px with nothing to
  install. Above 900px it reverts to a fixed viewport with the strip scrolling
  sideways inside it, because there the tape is dragged and there is no chrome
  to reclaim.

  Two things follow from that and must not be undone. The chrome and the wear
  overlays are `position: fixed`, not absolute — on a phone the tape is eleven
  screens tall, so absolute would pin them to the top of the strip and scroll
  them away with the first reel. And `html, body` use `min-height`, not
  `height`: `height: 100%` would cap the document at one screen and the snapping
  would have nothing to scroll.
- **Above 900px it is a strip of film in a gate.** The second handoff narrowed
  the panel from `min(62vw, 720px)` to `min(44vw, 560px)` and added the furniture
  that makes the narrowing read: sprocket perforations along the top and bottom
  edges, and a bezel outlining the centre panel. Both are `position: fixed`,
  wide-only and `pointer-events: none`. The panel width is quoted in every reel
  photograph's `sizes` attribute, so the token and those attributes have to move
  together.
- **`viewport-fit=cover`, with `env(safe-area-inset-*)` behind it.** The page
  paints to the physical edges — behind the notch, under the rounded corners —
  and the padding on the screens, the progress bar, the transport and the rail
  each take `max(design value, inset)` so nothing readable or pressable ends up
  under that furniture. On a flat screen every inset is 0 and the `max()` falls
  back to exactly the design's own numbers.
- **Motion is additive, with one deliberate exception.** Every animation
  decorates a layout that is already complete, so the reduced-motion
  kill-switch in `global.css` can disable them all. The exception is the end
  credits: `creep` *carries* the credits rather than decorating them, and
  freezing it would park the names off the top of the screen. So it only ever
  runs under `prefers-reduced-motion: no-preference`, and under `reduce` — or
  with no script at all — the roll becomes a static scrollable list. It also
  pauses on hover and focus, which WCAG 2.2.2 asks for.
- **The credits wait for you.** The roll does not start on page load; it starts
  when the credits are the screen in front, holds still for `ending.rollDelay`
  so the first names can be read, and replays from the top on every return.
  Previously it ran continuously from load, so by the time anyone reached the
  last screen it was already halfway up.
- **Images are optimised, not just uploaded.** Photos live in `src/assets/` so
  Astro re-encodes each to WebP at three widths with a `srcset`. Explicit
  `width` caps the fallback — without it Astro ships the full 1080px original
  as the base `src`.
- **And prefetched, once the page has settled.** `TapePrefetch.astro` waits for
  `load`, then idle time, then flips every remaining `loading="lazy"` reel photo
  to eager and warms the occasion and take alternatives that are not in the DOM
  at all. Swiping to a reel and swapping an occasion both happen against cache
  instead of the network. It sits out entirely on `Save-Data` or a 2G
  connection: fifteen photographs is a real amount of somebody's data to spend
  on screens they may never reach.
- **The snow has depth.** Reel 05 runs three layers at different tile sizes,
  speeds and opacities, the nearest slightly blurred, and each travels exactly
  one of its own tiles before looping so the pattern never jumps at the seam.
  The design specified a single sheet of identical dots on one translate, which
  reads as a texture sliding over the photograph rather than as weather.
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

### The share image

`public/og.jpg` is what appears when the URL is pasted anywhere. It is a still
life of the title card — the same cassette, fonts and words — so a preview looks
like the page it opens.

Its source is `scripts/og-template.html`, which pulls the fonts and the
photograph straight out of the repository; that file's comment header explains
how to re-render it after a copy change. It is generated once and committed
rather than built on every deploy, because it changes about as often as the
headline does.

JPEG rather than PNG on purpose: the picture is mostly a photograph and a
gradient, and the PNG of it was 896KB against 86KB here — above the size at
which WhatsApp quietly declines to render a preview at all.

The icons alongside it are `public/favicon.svg` (a cassette, drawn to survive
being shrunk to 16px) and `public/apple-touch-icon.png`, a 180×180 raster of
the same mark for iOS home screens, share sheets, and the scrapers that reach
for an apple-touch-icon when a page offers no other raster icon.

> **Changed `og.jpg`, `favicon.svg` or `apple-touch-icon.png`? Bump
> `ASSET_VERSION` in `src/layouts/Base.astro`.**
> Cloudflare fronts `mevivek.dev` and serves images with
> `cache-control: max-age=14400` — four hours. Everything Astro builds is
> content-hashed and so immune, but these three live in `public/` under fixed
> names, so replacing one in place leaves the old file being served for hours:
> the HTML is only cached for ten minutes, so it updates first and then spends
> the rest of the window asking for a stale image. That is exactly what happened
> when the cassette mark replaced the old favicon. The version query makes it a
> new URL and takes effect immediately. The cache cannot be purged from here —
> the zone is not ours.
>
> It matters most for `og.jpg`, and not only because of Cloudflare: Slack,
> WhatsApp and LinkedIn cache a preview against the image URL more or less
> indefinitely, so a redrawn share image under an unchanged name would go on
> showing the old headline to everyone who had already shared the link.

## Known gaps

- **`portrait.jpg` is 320×320, and it is now doing three jobs.** Her Instagram
  profile picture, and the lowest-resolution image here. In the cassette window
  on the title card it sits at roughly 284px and holds. In the share image it is
  the whole picture. And since the second handoff added reel 06 it also fills a
  screen on its own — around 420 CSS px on a phone and 600 on a desktop, which
  from a 320px source is a visible 2–3× upscale and the softest thing on the
  site. A photograph at 1000px or more is still the single biggest upgrade
  available and needs nothing but a file swap, a re-render of `og.jpg` and a
  bump of `ASSET_VERSION`.
- **Reel 06 is a rhythm toy, and rhythm has no non-timing equivalent.** The beat
  is shown as well as heard — four dots, driven by an attribute rather than an
  animation so the reduced-motion kill-switch cannot stop them — and the tap
  surface is a real button, so it plays from the keyboard. But nothing gives
  somebody who cannot perceive the beat a way to build the combo. Nothing on the
  tape depends on succeeding: the reel reads completely at a combo of zero.
