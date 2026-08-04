# gitanjali-raghav

Personal site for Geetanjali Raghav — a Bollywood-VHS home-video tape rather
than a CV. Eleven screens on one strip: a title card, seven reels, an interval
for the day job, that interval's b-side, and end credits — plus a 404. Built with
[Astro](https://astro.build) and published to GitHub Pages.

Each reel is a toy rather than a slide. You touch the water and it ripples, hold
a throttle and the odometer runs on, pick the occasion, roll through four takes
until one is worth posting, drag the temperature down until it snows, tap on the
beat until she is in character, and play a song off the inlay card. The
interval's b-side is a censor certificate she makes out to herself. All of it
optional: with no JavaScript the reels are still seven photographs with her
words under them, and the certificate comes already stamped.

Built from the `Home Video` design in the Claude Design handoff bundles — three of
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
| `grain` | `14` | Film grain, 0–80 — but as a *base*, multiplied per screen by the `wear` table further down the same file. |
| `osd` | `false` | The on-screen display: `reel 01 / 07`, the running timecode and the burnt-in reel numbers. **Off by default**, which is worth knowing — turning it on is the single biggest change to how the tape reads, and there is a fair amount of writing in `tape.ts` that nobody currently sees. |

**Grain is no longer flat.** A real cassette is scuffed at the head and tail,
because those are the parts the machine threads and spools past the heads every
single time, and clean in the middle where it has been played less. So `wear`
gives each screen a multiplier — 1.42 on the title card, 0.6 around reel 05,
1.3 on the credits — and the base only has to be 14 where a single flat number
had to be 80 to read at all. Set every entry to 1 for the old behaviour, and put
`grain` back up if you do.

These are *not* simply whatever the newest handoff arrived with. `osd: true` has
been asked for by all three bundles and declined all three times. `grain` was held
at 80 against the second bundle's 46 and then dropped to the third bundle's 14 —
but only because that bundle also brought the wear curve, which is the reason the
number could come down. Each is still a one-word change.

`grade` and `osd` land on `<html>` as data attributes and become four numbers in
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
  transport buttons and drag-to-scrub on a wide screen.

  With JavaScript off, all eleven screens stay reachable. On a phone every route
  works — swipe, wheel, arrow keys once the strip has focus, and the play /
  resume / b-side / rewind links, which are real anchors. On a wide screen the
  keyboard and a horizontal trackpad swipe work, but the anchors do not move it:
  `scroll-snap-type: x mandatory` with centre alignment pulls the browser's own
  fragment scroll back to the panel it started on. That is a scripted-only path
  on desktop, and has been since the strip turned sideways — not a consequence of
  who owns the scroll.
- **The strip is the scroll container at every width, and the mobile letterbox
  is the accepted price.** `.tape` is one viewport tall with `overflow: hidden`;
  `.tape__track` holds the eleven screens' worth of overflow. Because the
  document never scrolls, Safari and Chrome on a phone keep their full-size
  toolbars and the tape sits letterboxed between them.

  That was tried the other way. Handing the scrolling to the document does make
  both browsers collapse their chrome and reclaims roughly 60–110px — see
  `2e9534e` — but it was reverted after being looked at on a real device. The
  trade is recorded rather than rediscovered, so if the letterbox looks like a
  bug, read that commit before undoing this one.

  Two things hold it together and must not be undone. `html, body` use
  `height: 100%`, which is the cap that stops the document scrolling. And the
  chrome, the wear and the cold open are `position: fixed` — they sit outside the
  track, because anything positioned against it travels with the reels.

- **The height is measured, not declared, and decided in one place.** `.tape`
  takes `visualViewport.height` from the script via `--screen-h`, because on iOS
  with `viewport-fit=cover` `100dvh` and the genuinely visible area disagree and
  leave a sliver of the neighbouring reel showing. The screens inside are plain
  `height: 100%`: eleven screens each sizing themselves is eleven chances to
  disagree with the box around them.
- **Above 900px it is a strip of film in a gate.** The second handoff narrowed
  the panel from `min(62vw, 720px)` to `min(44vw, 560px)` and added the furniture
  that makes the narrowing read: sprocket perforations along the top and bottom
  edges, and a bezel outlining the centre panel. Both are `position: fixed`,
  wide-only and `pointer-events: none`. The panel width is quoted in every reel
  photograph's `sizes` attribute, so the token and those attributes have to move
  together.
- **Two kinds of reel, and the mix is deliberate.** Reels 01–03 are full bleed —
  the photograph *is* the screen, with scrims doing the work a frame's shadow used
  to. Reels 04–06 keep a bordered panel with air around it. The first three are
  the ones you meet, and full bleed is what makes a phone feel like it is showing
  a film rather than a page; by reel 04 the tape has established itself and can
  afford to put its photographs behind glass — which is also when the reels start
  needing furniture around the frame (a slate, a thermometer, a mirror's bulbs)
  that wants somewhere to sit other than on top of her.
- **The interval is a cinema foyer.** A lit marquee with twelve staggered bulbs
  over a brass-framed programme board, with the job titles set in the display face
  as slot-in board letters. It is the one screen that admits to being about a job
  and the only one she is not on camera for, so putting it in the building rather
  than on the tape is the right move. On a landscape phone the sign shrinks, the
  board drops its header and the paragraph goes — the primary action staying above
  the transport matters more than a line of commentary.
- **The end credits play under moving footage.** `public/video/garden.mp4` sits
  behind the roll, desaturated and dropped to 42% brightness under a near-opaque
  scrim, so it is the one place the tape stops being made of stills. It is 15MB —
  more than three times the rest of the build — so it is gated three ways: never
  under reduced motion, never on a metered or 2g connection (the same test
  `TapePrefetch` uses), and the `src` is not set until the credits are the screen in
  front. Nobody who leaves before the end of the tape downloads it.
- **Position is shown by two spools, not a progress bar.** They sit either side of
  the transport counter: the supply hub shrinks as the take-up hub grows, off a
  single `--tape-pos` custom property. They replaced an eleven-segment bar across
  the top *and* a matching rail up the edge of a phone, which between them had a
  bug — the bar was gated on `look.osd` and the rail was not, so a wide screen with
  the display off had no indicator while a phone always did. One indicator that is
  always visible beats two that disagreed.
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
  connection: fourteen photographs is a real amount of somebody's data to spend
  on screens they may never reach.
- **The snow has depth.** Reel 05 runs three layers at different tile sizes,
  speeds and opacities, the nearest slightly blurred, and each travels exactly
  one of its own tiles before looping so the pattern never jumps at the seam.
  The design specified a single sheet of identical dots on one translate, which
  reads as a texture sliding over the photograph rather than as weather.
- **No third-party requests.** All five fonts are self-hosted, latin subsets
  only; no analytics, no CDN, no tracking. Caveat is declared by hand in
  `global.css` because its package ships one stylesheet covering all four
  subsets, and the Cyrillic ones would be committed on every deploy for glyphs
  that never render.

  The fifth is the body serif, added by the third handoff: **Tiro Devanagari
  Hindi, and it is here for its Latin.** That family's Latin is a proper
  old-style text serif drawn to sit beside its Devanagari, which is exactly what a
  paragraph on this tape wants — the name is a coincidence of the family rather
  than a reason, and the Devanagari subset is not loaded. Same OFL-1.1 licence as
  the other four. The readouts stayed on VT323, so the deck's furniture and the
  one place she actually talks to you are no longer set in the same face.

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
life of the title card — the same photograph, fonts and words — so a preview looks
like the page it opens. Since the third handoff made the card a poster, this is a
poster too; the only difference is the shape, because the card is portrait and a
share image is 1200×630, so the billing plate sits in the left third rather than
across the bottom. A lobby card rather than a one-sheet.

`og:image:alt` describes the picture in words and has to be changed whenever the
picture is, which is easy to miss — it went on saying "a VHS cassette labelled
'geetanjali raghav'" for a commit longer than that was true.

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
> `ASSET_VERSION` in `src/data/site.ts`.**
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

- **The resolution gap is closed.** `portrait.jpg` — her 320×320 Instagram
  avatar — used to do three jobs at once: the cassette window on the title card,
  the whole of the share image, and the full-screen frame on reel 06, where it was
  upscaled two to three times and was visibly the softest thing on the site. The
  third handoff brought a 3120×4160 photograph, and all three jobs went away with
  it: reel 06 uses that file at its full frame, and the title card and the share
  image are now a crop of `red-and-gold.jpg`. **`portrait.jpg` is used nowhere** and
  is left on disk with `palace.jpg`.
- **Reel 06 is a rhythm toy, and rhythm has no non-timing equivalent.** The beat
  is shown as well as heard — four dots, driven by an attribute rather than an
  animation so the reduced-motion kill-switch cannot stop them — and the tap
  surface is a real button, so it plays from the keyboard. But nothing gives
  somebody who cannot perceive the beat a way to build the combo. Nothing on the
  tape depends on succeeding: the reel reads completely at a combo of zero.
