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
| `title` | The opening card: the line above the cassette, the two-line heading, the intro sentence, and what is written on the cassette's paper label. |
| `reels` | The six reels. One object each. |
| `interval` | The framing around the day job. The jobs themselves come from `work.ts`. |
| `credits`, `ending` | The cast-and-crew roll and the sign-off. |

### A reel

```ts
{
  num: '07',
  label: 'Late trains',          // used for the screen's accessible name
  tc: '00:43:10',                // fake running time, only shown if osd is on
  accent: 'var(--tape-gold)',    // headings, handwriting, the frame's edge
  edge: 'rgb(255 197 61 / 34%)', // the accent at low alpha, as an inner glow
  bg: 'radial-gradient(...)',    // full-screen background
  frost: true,                   // optional: freezing mist. Reel 02 uses it.

  title: 'Late trains',
  hand: 'always the 6:40',       // handwritten aside, in her voice
  stamp: 'NOV 2025  06:38',      // burnt-in date stamp, only shown if osd is on
  line: 'A sentence or two.',    // the paragraph under the photograph

  photo: latePlatform,           // imported at the top of the file
  alt: 'A plain description, for people who cannot see it',
  pos: '50% 30%',                // object-position, if the subject is off-centre
  filter: 'saturate(1.4)',       // this reel's own grade — only used by 'tape'
  wash: 'linear-gradient(...)',  // colour bleed across the frame
  thumbs: [{ src: ..., alt: ... }, { src: ..., alt: ... }],
}
```

`alt` and `hand` do different jobs. The handwritten line is her voice; the alt
text describes what is in the frame for someone who cannot see it. Never make
them the same string.

**`filter` is usually ignored.** Only `grade: 'tape'` uses each reel's own
treatment. `'clean'` and `'poster'` replace all six with one uniform grade,
which is what makes them read as a set.

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
| `title` | The browser tab and link previews. |
| `description` | 140–160 characters, for search results and link previews. |
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

### Two things before `approved: true`

**The follower count.** Reel 05's handwritten line is `10.7k of you 😅`. Nobody
has asked whether she is happy for her follower count to be on the page. It is
one string in `tape.ts` and the page is `noindex` until she signs off, but a
GitHub Pages site on a public repository is readable by anyone with the URL,
indexed or not.

**Her current job title.** The design labelled the Genpact role *Quality
Associate*. Her LinkedIn says *Accounts Receivable, Order to Cash*, and that is
what `work.ts` uses, because this is a factual claim about a real person on a
page under her name and LinkedIn is the closer source. The design very likely
picked up the title from the Highspring row below it, which is identical. One
question to her settles it; it is a one-string change either way.

### Facts

- [ ] The year she joined Highspring (Vaco Binary Semantics) — the end date is known, the start is not
- [ ] What she studied at MJPRU
- [ ] The two earlier education entries LinkedIn returned with dates but no institution: 2013–2015 and 2012–2013

### Assets

- [ ] **A proper headshot.** `portrait.jpg` is her Instagram profile picture at
      320×320, shown in the cassette window at ~284px. It holds, but it cannot
      go larger. A photo at 1000px+ is the biggest single upgrade available and
      needs only a file swap.
- [ ] **An `og.png`.** `Base.astro` points link previews at
      `/gitanjali-raghav/og.png` and no such file exists, so sharing the URL
      previews without an image. A 1200×630 still from any reel would do it.
- [ ] Any photos she would rather have than the ones pulled from Instagram

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
