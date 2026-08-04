# Working in this repo

A personal site for Geetanjali Raghav — a VHS home-video tape, eleven screens on
one scroll-snapped strip. [README.md](./README.md) explains how it is built and
[CONTENT.md](./CONTENT.md) explains how to change what it says. This file is
only the things that will bite you.

## Where it stands

The tape is live at <https://mevivek.dev/gitanjali-raghav>. **Eleven screens**: a
title card, seven reels that are each interactive in their own way, an interval
for the day job, that interval's b-side, and end credits.

**A second design handoff was applied on 2026-08-04** and is what took it from
nine screens to eleven. It added reel 06 (Playback — tap on the beat) and the
interval's b-side (a QA form she runs on herself), renumbered Side A to reel 07,
rewrote the title card's heading and the interval's rows, replaced the piano with
interaction blips, and narrowed the wide panel to 560px with sprockets and a
bezel around it. Three things in that bundle were deliberately **not** taken:
its `grain: 46` / `osd: true` defaults, its desktop contact sheet (an alternate
layout the designer built but did not select), and its `B.Sc` against the
university — see below. Check `git log` before assuming a difference from the
bundle is an oversight.

**Three things are waiting on her, and none of them are code.** Do not decide
any of them on her behalf:

1. **`approved: false` in `src/data/site.ts`** keeps every page `noindex`. It
   flips when she has seen the site and wants to be findable. Hers to say.
2. **Reel 04's "posted · 10.7k" badge names her follower count.** Nobody has
   asked whether she is happy with that on a public page. One string in
   `src/data/tape.ts`.
3. **A headshot, and this is now the most visible gap on the site.**
   `portrait.jpg` is her Instagram avatar at 320×320 — the lowest-resolution
   image here. It was shown at ~284px in the cassette window and in the share
   image, where it holds. **Reel 06 now fills a whole screen with the same
   file** — ~420 CSS px on a phone, ~600 on a desktop — so it is upscaled 2–3×
   and is plainly the softest thing on the tape. Anything 1000px+ is the single
   biggest upgrade available and needs only a file swap (then re-render `og.jpg`
   and bump `ASSET_VERSION`). If she supplies one, that fixes three places.

`CONTENT.md` has the longer list of smaller unknowns — her Highspring start
year, what she studied at MJPRU. On that last one: **the second handoff wrote
`B.Sc` and it was not adopted.** Nothing confirms it. Do not let a later bundle
quietly put a guessed qualification on a real person's page.

**One open question from the last session.** The reels used to show a sliver of
their neighbours on iOS Safari. It was fixed by measuring `visualViewport.height`
into `--screen-h` rather than trusting `100dvh`, plus re-snapping by hand on
resize. That was verified in Chromium, which cannot reproduce the original
symptom — so **if a sliver is still showing on a real iPhone, that fix is the
place to start.** Whether the bleed is even along the tape or grows the further
along you are tells you which half is wrong: even means the height, growing means
the re-snap is not firing.

## Branches and deploying

- **`main` is the default branch.** It was briefly
  `claude/personal-professional-website-jlhzqu`; anything that still assumes
  that is out of date. Open pull requests against `main`.
- **Deploying does not go through `main`, or through Actions.** `npm run deploy`
  builds locally and pushes the result to `gh-pages` using git plumbing. Actions
  creates jobs on this repository but never assigns them a runner, which is why.
  It follows that **the live site can be ahead of `main`** — check both before
  concluding something is or is not shipped.
- If `npm run deploy` fails to push, the local `gh-pages` ref is behind the
  remote. Fix it with `git fetch origin gh-pages && git update-ref
  refs/heads/gh-pages origin/gh-pages`, then deploy again. **Never force-push
  `gh-pages`** — another session may have deployed to it.
- `public/.nojekyll` must stay. Without it Pages runs Jekyll, Jekyll ignores
  `_astro/`, and the site deploys with no CSS and no fonts.

## The scroll container is not where you would guess

**On a phone the document scrolls; above 900px an inner element does.** That is
load-bearing, not incidental: Safari and Chrome only collapse their own toolbars
when *the page* scrolls, so a fixed-height tape with an inner scroller sits in a
letterbox between full-size browser chrome forever. Three things follow, and
undoing any of them breaks the layout in a way that is not obvious from the diff:

- The chrome and the wear overlays are `position: fixed`. On a phone the tape is
  eleven screens tall, so `absolute` pins them to the top of the strip and they
  scroll away with the first reel.
- `html, body` use `min-height`, not `height`. `height: 100%` caps the document
  at one screen and the snapping has nothing to scroll.
- The `IntersectionObserver` in `index.astro` uses `root: null`. Which element
  scrolls changes with the breakpoint and a root cannot be changed after the
  observer is built, so measuring against the viewport is the only thing correct
  at both sizes.

Screens are sized in `dvh` on purpose. `svh` would leave a band of background
once the toolbars collapse and `lvh` would spill the next screen into view while
they are still up.

## Three things that are easy to get wrong

**No client-side `<script>` may import `src/data/tape.ts`.** That module imports
fifteen photographs. Pulling it into the client bundle's module graph makes the
build emit all fifteen originals as assets — 2.6MB that nothing references —
even though Vite tree-shakes the bindings back out of the JS. Pass what a script
needs on a `data-` attribute instead; every reel already does this — including
the table of tape positions, which rides on the transport counter.

That rule is also why **sound is asked for with an event, not a function call**:
a reel does
`document.dispatchEvent(new CustomEvent('tape:blip', { detail: 'click' }))` and
`TapeChrome.astro` is the only thing that listens. Importing across components
would drag the data module into a second bundle; a global would need a
load order. The event needs neither, and no-ops if the chrome's script never ran.

**Bump `ASSET_VERSION` in `src/layouts/Base.astro` when you change `og.jpg`,
`favicon.svg` or `apple-touch-icon.png`.** Cloudflare fronts `mevivek.dev` and
serves images with `max-age=14400` — four hours. Astro's own output is
content-hashed and immune; these three live in `public/` under fixed names, so
replacing one in place leaves the old file being served while the HTML (cached
ten minutes) has already moved on. It matters most for `og.jpg`: social
platforms cache a preview against the image URL more or less indefinitely.

**Icons are paths; `og:image` is absolute.** An icon is fetched by the browser
that already has the page, so building it from `Astro.site` made `npm run
preview` fetch its favicon from production. A social scraper has no page to
resolve a relative path against, so that one must stay absolute.

## Before changing the opening card

`public/og.jpg` is a picture of the title card, generated from
`scripts/og-template.html` and committed. It does not rebuild itself. Change the
headline or the intro and the share image still shows the old wording until it
is re-rendered — and `site.description` and `og:image:alt` quote it too.

To re-render it there is no need to add Playwright to this project — the
container already has Chromium at
`/opt/pw-browsers/chromium-1194/chrome-linux/chrome`. Install `playwright` into a
scratch directory with `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`, point
`executablePath` at that binary, load the template at 1200×630 and screenshot it
as a JPEG. The template mirrors the title card by hand, so any change to
`TitleCard.astro`'s composition has to be made in both.

## Two clocks, and neither may run off-screen

Reel 06's beat and the interval's countdown are both timers, and both are started
and stopped by a `MutationObserver` on their screen's `data-active` — the
attribute `index.astro`'s IntersectionObserver already maintains. The credits
roll works the same way. **Do not start a timer on load.** A metronome ticking
from reel 01 and an interval that empties out before anybody reaches it are the
two failures this arrangement exists to prevent.

Related, and it cost a debugging round: **the first `measure()` call ends in
`restore()`, which schedules a jump to whichever screen it believed was in
front.** So the landing screen has to be settled *before* `measure()` runs, or a
deep link lands correctly and then slides back to the title card a frame later.

## Outstanding, and not ours to decide

- **`approved: false` in `src/data/site.ts` keeps every page `noindex`.** Do not
  flip it. It is a deliberate human decision and it is hers.
- **Reel 04's "posted · 10.7k" badge names her follower count** and she has not
  been asked about it. Do not add anything else of that kind without asking.
- Four photographs were turned down because someone other than her was
  recognisable in them. Nobody can consent by proxy — ask the people in them
  first. `palace.jpg` is in the repo but unused by the current cut; leave it.

## Two more that cost time last session

**The build emits no `.js` files, and that is correct.** Every component script
is standalone and small enough that Astro inlines them into `index.html` (70KB,
16KB gzipped — it was 48KB before the second handoff added two screens and the
blips). `find dist -name '*.js'` returning nothing is not a broken build. The
built weight is otherwise unchanged: 38 WebP variants, ~3.2MB, because the
photographs and their widths did not move.

**Browser UI colour is not something the page controls.** `theme-color` and
`color-scheme: dark` are both set and correct. iOS Safari honours them; **Chrome
on iOS ignores `theme-color` entirely** and follows the system appearance, and
desktop Chrome only applies it to installed-PWA window frames. There is nothing
left to fix here, so do not go looking — the only route to a genuinely chromeless
shell is Add to Home Screen, which would need a manifest that does not exist yet.

## When something looks wrong on the live site

Check whether the browser is showing a stale build before debugging the code —
HTML is cached for ten minutes, and phones hold on longer. Append a query string
to bypass it (`?x=1`). Several rounds of last session were spent on symptoms that
turned out to be a cached page — including two screenshots of a build three
deploys old.

`npm run deploy` is the only thing that changes the live site. A merge to `main`
does not: check `git log origin/gh-pages -1` to see which commit is actually
serving.
