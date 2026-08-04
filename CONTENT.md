# Filling in the site

Everything on this website comes from three text files. You never need to touch
a component to change what the page says.

Two rules the build enforces for you:

- **`TODO` blocks publishing.** Anything unknown is written as a `TODO`, and
  `npm run check` fails while any remain.
- **`approved: false` in `src/data/site.ts` keeps the page out of search.**
  Every page carries a `noindex` tag until you flip it to `true`. Being
  factually complete is not the same as being ready to be found — that call is
  hers.

Run `npm run check` any time to see what is outstanding.

---

## 1. The tape — `src/data/tape.ts`

Every word on the site is in this file, in the order you meet it.

| Section | What it holds |
|---|---|
| `look` | How worn the tape is: `grade`, `grain`, `osd`. See the table in [README.md](./README.md#the-three-switches) — `osd: false` hides a fair amount of writing, which is worth knowing before you edit it. |
| `title` | The opening card: the line above the cassette, the three-line heading, the intro sentence, and what is written on the cassette's paper label. |
| `salt`, `wheels`, `excuse`, `takes`, `cold`, `sideA` | The six reels, in order. One block each — they are six different things, so they do not share a shape. |
| `interval` | The framing around the day job. The jobs themselves come from `work.ts`. |
| `credits`, `ending` | The cast-and-crew roll and the sign-off. |
| `sound` | Levels for the synthesised tape hiss. |

### The reels are toys

Each one does something, and most of the copy changes with what the visitor has
done. So a reel holds more than one version of its words:

- **01 Salt water** — touch the photograph and it ripples. The splash count
  drives the grade, the prompt, her aside and the paragraph.
- **02 Two wheels** — hold the throttle and the revs climb, the frame buzzes,
  the odometer runs on. Her aside changes with the revs.
- **03 Any excuse** — four occasions to pick from, each with its own
  photograph, date stamp, aside and paragraph.
- **04 Take four** — roll through four takes. Three are ruined and cold; the
  fourth straightens up and gets posted.
- **05 Cold air** — drag the temperature from 18° down to −4°. Colour drains,
  mist rises, snow starts, rime creeps in.
- **06 Side A** — the inlay card of captions that were only ever song lyrics.
  Tap one to play it.

### Copy that changes: the `Step` tables

Where wording depends on a number, it is a list read top-down — the first entry
whose `min` has been reached wins. **They must stay sorted highest-first.**

```ts
hands: [
  { min: 10, text: 'not coming out, do not ask' },  // 10 splashes or more
  { min: 4,  text: 'this is the good bit' },        // 4 to 9
  { min: 0,  text: 'I said I was only paddling' },  // the opening state
]
```

The bottom entry is what the page ships with — it is what a visitor sees before
touching anything, and what someone with no JavaScript sees for good.

`cold`'s tables are the exception: they run on temperature, so they are sorted
warmest-first and the last entry uses `min: -99` to mean "colder than anything".

### The three blank lines on Side A

`sideA.tracks` has six rows and only three have words. **That is deliberate** —
an inlay card always has more ruled lines than anyone fills in, and the empty
ones are what make it read as a real one. They render as rules, cannot be
focused, and are hidden from screen readers. Adding a fourth lyric is just
filling one in.

`alt` and `hand` do different jobs. The handwritten line is her voice; the alt
text describes what is in the frame for someone who cannot see it. Never make
them the same string.

### Photographs

Images live in `src/assets/photos/` (**not** `public/`) so Astro optimises
them: each is re-encoded to WebP at three widths and served with a `srcset`.
That is why the site is ~2.1MB with fifteen photographs instead of far more.

**Committed at full resolution** — 1080×1080, exactly as downloaded, never
resized on disk. Astro generates the variants at build time and the browser
picks one, so a high-density screen gets the full file while an ordinary one
does not pay for it. Do not pre-shrink anything you add.

**Fifteen photos, each individually approved.** Four candidates were turned
down specifically because someone other than her was recognisable in them — her
mother, her sister, her brother, a friend at Holi. They have not been asked and
cannot consent by proxy. If any are wanted later, ask the people in them first.

## 2. The basics — `src/data/site.ts`

| Field | What to write |
|---|---|
| `name` | Spelled as on her LinkedIn. Her Instagram spells it "Gitanjali"; she uses both. |
| `title` | The browser tab, the search result and the bold line of every share preview. Her name alone. Resist appending a tagline — it briefly said "— Home Video", which is the design's internal name and reads badly in bold beside her photograph. |
| `description` | The grey line under the title. Under ~155 characters, or search truncates it mid-sentence. |
| `socials` | Instagram and LinkedIn. The first one gets the filled button on the end credits. |
| `approved` | `false` until she has seen the site. |

## 3. Work — `src/data/work.ts`

Deliberately just role, place and years. **No descriptions** — the interval
card says what it thinks of the day job in one paragraph, and bullet points
underneath would undo it.

```ts
{
  role: 'Quality Associate',
  company: 'Genpact',
  years: 'May 2026 — now',
  current: true,          // adds the "on air" badge
  note: 'formerly X',     // optional aside, shown after a dot
}
```

`study` below it works the same way and renders as the same kind of row — the
design drew one unbroken list rather than a CV's two labelled blocks. Its `what`
field is optional; right now only the university, town and dates are shown,
because LinkedIn gave the institution but not the subject.

---

## Still worth getting from her

### One thing before `approved: true`

**The follower count.** Reel 05's handwritten line is `10.7k of you 😅`. Nobody
has asked whether she is happy for her follower count to be on the page. It is
one string in `tape.ts` and the page is `noindex` until she signs off, but a
GitHub Pages site on a public repository is readable by anyone with the URL,
indexed or not.

### Settled

**Her current job title is *Quality Associate*** — confirmed, and the same as
the Highspring row above it. That repetition is real: she changed employer and
kept doing the job. Her LinkedIn still says *Accounts Receivable, Order to
Cash*, so treat that profile as the stale one rather than the source of truth
if the two ever disagree again.

### Facts

- [ ] The year she joined Highspring (Vaco Binary Semantics) — the end date is known, the start is not
- [ ] What she studied at MJPRU
- [ ] The two earlier education entries LinkedIn returned with dates but no institution: 2013–2015 and 2012–2013

### Assets

- [ ] **A proper headshot.** `portrait.jpg` is her Instagram profile picture at
      320×320, shown in the cassette window at ~284px. It holds, but it cannot
      go larger. A photo at 1000px+ is the biggest single upgrade available and
      needs only a file swap — and it would improve the share image too, since
      that is the same photograph.
- [ ] Any photos she would rather have than the ones pulled from Instagram

**The share image** is `public/og.jpg`, built from `scripts/og-template.html`.
If you change the headline or the intro line in `tape.ts`, that image still
says the old thing until it is re-rendered — the template's comment header says
how. It is the one asset that does not update itself when the copy does.

### Permissions

- [ ] Confirm she is happy with all fifteen photographs being on a public page
- [ ] Confirm the follower count in reel 05 (above)
- [ ] Then set `approved: true`

---

## What the tape dropped

Two things the old site had that the design has nowhere to put. Both are in the
git history at `f36c0a9` if they are wanted back.

- **Her Instagram captions.** The old photo wall printed her own caption under
  each photograph — `Main arse se khud se zara laapata hoon`, `You gotta keep
  your head up ✌🏾`, and eleven others. The reels use their own handwritten
  lines instead, so the captions are no longer shown anywhere. Reel 06 mentions
  them (`half my captions are lyrics`) without quoting any. They were the most
  unambiguously *her* writing on the site, so this is the loss worth knowing
  about. `f36c0a9:src/data/gallery.ts`
- **A contact email and a CV link.** The old `site.ts` had fields for both, and
  the end credits have room for links but no form or address. Nothing was ever
  filled in — `email` was always `null` — so nothing published has changed.
