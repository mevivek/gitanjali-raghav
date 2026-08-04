# Working in this repo

A personal site for Geetanjali Raghav — a VHS home-video tape, eleven screens on
one scroll-snapped strip. [README.md](./README.md) explains how it is built and
[CONTENT.md](./CONTENT.md) explains how to change what it says. This file is
only the things that will bite you.

## Where it stands

The tape is live at <https://mevivek.dev/gitanjali-raghav>. **Eleven screens**: a
title card, seven reels that are each interactive in their own way, an interval
for the day job, that interval's b-side, and end credits. Plus a 404, which is
the only page that is not part of the strip.

**A third design handoff was applied on 2026-08-04**, the same day as the
second. It is the largest so far and it changed the look of the tape rather than
its shape — the screen count did not move. What was taken:

- **The title card is a film poster.** The drawn cassette is gone — shell,
  spools, REC dot, paper label, "that's me". In its place a full-bleed crop of
  `red-and-gold.jpg`, her name in gold script, the headline left-aligned, a
  billing block, and one gold "play the tape" key.
- **Reels 01–03 are full bleed**, 04–06 keep their framed panel. That mix is in
  the bundle and is deliberate — see the long note in `src/styles/tape.css`.
- **Body copy is a serif** (Tiro Devanagari Hindi, latin subset, for its Latin).
  The readouts keep VT323, so the machine and the person are now set differently.
- **Reel 07 is a real inlay card** with a proportional tape-position strip.
- **The b-side is a censor certificate** — U/A rating, particulars, "conditions
  of certification", press-the-stamp, and a verdict slammed across it.
- **The transport grew two spools** that wind between each other as you move.
  They replaced the eleven-segment progress bar *and* the phone's edge rail,
  both of which are gone.
- **Grain is per-screen**: `look.grain` dropped 80 → 14 and a `wear` curve
  multiplies it, so the head and tail of the tape are scuffed and the middle is
  clean.
- **A real photograph for reel 06**, at last. See below.
- **A 404 page**, in the cold open's untuned blue.

**A fourth handoff followed the same day**, and it is small by comparison. The
interval became a cinema foyer — a lit marquee with twelve pulsing bulbs over a
brass-framed "today's programme" board, job titles moved off the serif onto the
display face, and the screen darkened around them so the two read as lit. The end
credits' two social buttons became slug lines (*distributed by* / *for
enquiries*). Side A's spine initialled her name, its blank tail gained a hatch,
and the certificate's margin notes now fade in rather than switching on. The
counter's last stop moved 47:55 → **45:00**, because the poster's billing block
says "running time 45 min" and the counter was the one thing contradicting it.

Three of that bundle's changes were fixes we had already made independently —
sizing Side A's strip against the whole side, holding the certificate's note
height so stamping does not shunt the card, and giving the verdict stamp its own
keyframe so the centring survives. Worth knowing, because it means the bundle and
this repo are converging rather than fighting.

**It also brought a 15MB `garden.mp4`**, which now plays under the end credits —
see "The video, and the three things that stop it loading" below.

Seven things in the third bundle were deliberately **not** taken. Check `git log`
before assuming a difference from a bundle is an oversight:

1. `osd: true` — asked for by all three handoffs, declined all three times.
2. **The title card's top strip** (`home video` / `e-180 · side a`). It was
   dropped on purpose in `5cb2778` and the bundle put it back. Still dropped.
3. **Reel 05 opening at 14°** instead of −4°.
4. **Single-sheet snow.** Reel 05 runs three depth layers here, on purpose.
5. **`B.Sc · Rohilkhand University`** — third time asked, still nothing
   confirms it.
6. **The desktop contact sheet** and **the desktop "cheeks"** (side deck panels
   with a spool and lamps). Both are alternates the designer built but did not
   select — the bundle's own default is `desk: 'strip'`, which is what we have.
7. Its `role="button"` divs, its pointer-drag temperature dial, and its global
   Space-is-next keybinding. We keep real buttons, a range input, and arrow keys
   scoped to the track — Space is reel 02's throttle.

**Two things are waiting on her, and neither is code.** Do not decide either on
her behalf:

1. **`approved: false` in `src/data/site.ts`** keeps every page `noindex`. It
   flips when she has seen the site and wants to be findable. Hers to say.
2. **Reel 04's "posted · 10.7k" badge names her follower count.** Nobody has
   asked whether she is happy with that on a public page. One string in
   `src/data/tape.ts`.

**The headshot gap is closed.** It was the third item on this list for two
sessions. The third handoff brought a 3120×4160 photograph — delivered three times
under three names, all byte-identical — committed once as `playback-portrait.jpg`,
and reel 06 uses it **at its full frame**: a whole standing figure in a café, not a
headshot. It was briefly a 1080×1350 head-and-shoulders crop, on the reasoning that
the reel is about her face; the full frame was chosen instead. If you are wondering
why the reel's key-light glow is aimed off-centre and tight, that is why — a glow
centred on this frame lights the room rather than her, and the light coming up on
her is the whole mechanic. **`portrait.jpg`, the 320×320 avatar that used to do
three jobs, is now used nowhere** — the poster has no cassette window and the share
image is a poster. It is left on disk, like `palace.jpg`.

`CONTENT.md` has the longer list of smaller unknowns — her Highspring start
year, what she studied at MJPRU. On that last one: **two handoffs have now
written `B.Sc` and it has been declined twice.** Nothing confirms it. Do not let
a later bundle quietly put a guessed qualification on a real person's page.

**One open question from the last session.** The reels used to show a sliver of
their neighbours on iOS Safari. It was fixed by measuring `visualViewport.height`
into `--screen-h` rather than trusting `100dvh`, plus re-snapping by hand on
resize. That was verified in Chromium, which cannot reproduce the original
symptom — so **if a sliver is still showing on a real iPhone, that fix is the
place to start.** Whether the bleed is even along the tape or grows the further
along you are tells you which half is wrong: even means the height, growing means
the re-snap is not firing.

## The video, and the three things that stop it loading

`public/video/garden.mp4` — 15MB, H.264, one video track and no audio — plays under
the end credits, graded almost to black. It is the only moving picture on the tape.

**It is more than three times the weight of everything else here** (the rest of the
build is ~4.4MB), so it is gated three ways, all in `EndCredits.astro`:

1. **Reduced motion** — never loaded at all.
2. **A metered or 2g connection** — never loaded, the same `saveData`/`effectiveType`
   test `TapePrefetch` makes before warming the photographs. That rule exists for
   images the visitor will probably look at; it applies with more force to 15MB of
   decoration.
3. **Not until you get there** — the `src` is set by the script when the credits
   become the screen in front, and playback pauses when they stop being it. Verified:
   zero requests for it on the title card, and it only fetches on arrival. Nobody who
   leaves before the end of the tape pays for it.

**It could not be watched in this container, and still has not been.** Chromium here
has no H.264 decoder (`canPlayType('video/mp4; codecs="avc1.42E01E"')` returns
empty) and Playwright's ffmpeg cannot demux MP4, so `play()` rejects with
`MEDIA_ERR_SRC_NOT_SUPPORTED` and the screen falls back to its own gradient. That
fallback is deliberate and it is what any browser without the codec gets — but it
also means **the footage has never been reviewed for who else is in it.** Every
photograph on this site was individually approved and four were turned down because
someone other than her was recognisable. That check is still outstanding for this
file. Watch it on a real device before the site is made findable.

If it ever needs to be smaller, the shape is a few seconds of VP9/WebM with an H.264
fallback at a few hundred KB rather than the 15MB master — and note this container
cannot re-encode it either, for the same codec reason.

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

## The mobile letterbox is a decision, not a bug

**`.tape__track` is the scroller, at every width. The document never scrolls.**
`.tape` is one viewport tall with `overflow: hidden`, and the eleven screens'
worth of overflow lives inside it.

**The visible consequence: on a phone, Safari and Chrome keep their full-size
toolbars, and the tape sits letterboxed between them.** Those browsers only
collapse their chrome when *the page* scrolls, and this page does not. If you
arrive at this repo thinking "the tape is supposed to reach the edge of the
glass, why is there browser furniture top and bottom" — that is this, and it was
chosen.

It has been both ways. `2e9534e` handed the scrolling to the document to win
those 60–110px back; it worked, and was reverted after being seen on a real
device. **Do not re-apply it without asking.** The argument for the other side is
in that commit message in full, so it can be re-read rather than re-derived.

Three things hold the current arrangement together:

- `html, body` use `height: 100%`, not `min-height`. That cap is what stops the
  document scrolling at all.
- The chrome, the wear and the cold open are `position: fixed` — outside the
  track. Anything positioned against the track travels with the reels.
- The `IntersectionObserver` in `index.astro` uses `root: null`. `.tape` clips
  the track to exactly the viewport, so the two rectangles agree; and a root
  cannot be changed after the observer is built, so it is better off assuming as
  little as possible about who scrolls — that has now changed twice.

**`--screen-h` is a separate fix and survives either arrangement.** `.tape` takes
its height from `visualViewport.height`, measured by the script, because on iOS
with `viewport-fit=cover` `100dvh` and the genuinely visible area disagree and
leave a sliver of the neighbouring reel. The screens themselves are plain
`height: 100%` — the height is decided in exactly one place, because eleven
screens each measuring themselves is eleven chances to disagree with the box
around them. `dvh` is the no-script fallback; `svh` and `lvh` are both wrong here.

## Three things that are easy to get wrong

**No client-side `<script>` may import `src/data/tape.ts`.** That module imports
every photograph the tape uses. Pulling it into the client bundle's module graph
makes the build emit all of those originals as assets — megabytes that nothing
references — even though Vite tree-shakes the bindings back out of the JS. Pass
what a script needs on a `data-` attribute instead; every reel already does this,
as do the tape-position and wear tables, which ride on the transport counter.

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
headline or the billing block and the share image still shows the old wording
until it is re-rendered — and `og:image:alt` describes the picture in words, so
that has to move with it. (It said "a VHS cassette labelled 'geetanjali raghav'"
for one commit longer than it was true.)

**The whole title card is driven off one number.** `--step-poster` in
`tokens.css` is `min(13.5% of the panel width, 17% of its height, 92px)`, and her
name, the handwritten line, the gap between blocks and the billing type are all
fractions of it. So the poster scales as one object — but it also means a change
to any one of those sizes should be a change to its fraction, not a new hard
number. The height term is what keeps the plate on screen in landscape; the plate
also scrolls internally as a last resort, and the "swipe up" hint is dropped
under 700px tall because it lands under the transport.

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

## Two tables that must stay eleven long

`positions` and `wear` in `src/data/tape.ts` are both indexed by screen, and both
have to stay `screenCount` entries long. They ride to the client on the transport
counter's `data-` attributes, because **no client script may import
`src/data/tape.ts`** (see below).

`positions` is the timecode the counter shows. `wear` is the grain multiplier, and
a short table is survivable rather than fatal — `index.astro` leaves `--wear`
alone for a screen the table does not cover, so the grain holds its last value
instead of clearing. A wrong-length `positions` is worse: the counter simply stops
updating past the end.

## Outstanding, and not ours to decide

- **`approved: false` in `src/data/site.ts` keeps every page `noindex`.** Do not
  flip it. It is a deliberate human decision and it is hers.
- **Reel 04's "posted · 10.7k" badge names her follower count** and she has not
  been asked about it. Do not add anything else of that kind without asking.
- **The b-side now prints her name as a signature** in handwriting, on a mock
  government certificate. It is a joke signature on a joke document and it reads
  as one, but it is still her name in a hand on a public page — it is one string
  (`qualityCheck.signature`) if she would rather it were initials or a scrawl.
- Four photographs were turned down because someone other than her was
  recognisable in them. Nobody can consent by proxy — ask the people in them
  first. `palace.jpg` and `portrait.jpg` are both in the repo and unused by the
  current cut; leave them.

## Two more that cost time last session

**The build emits no `.js` files, and that is correct.** Every component script
is standalone and small enough that Astro inlines them into the HTML (76KB for
`index.html`, 8KB for the 404 — it was 48KB before the second handoff added two
screens and the blips). `find dist -name '*.js'` returning nothing is not a broken
build. The rest: 43 WebP variants and ~4.4MB, up from 38 and 3.2MB because reel 06
finally has a photograph worth generating widths for — and it is the one image not
capped at 1080, so it alone accounts for six of those variants and about 1MB. See
the note in Playback.astro for why.

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
