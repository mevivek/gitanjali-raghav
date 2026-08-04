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
| `look` | How worn the tape is: `grade`, `grain`, `osd`. See the table in [README.md](./README.md#the-three-switches) — `osd: false` hides a fair amount of writing, which is worth knowing before you edit it. `grain` is only a base now; `wear` at the foot of the file multiplies it per screen. |
| `title` | The opening card, which is a **film poster**: her name, the three-line heading, the two-line billing block, the photograph and its crop. There is deliberately nothing above the photograph — see the note in the file. |
| `salt`, `wheels`, `excuse`, `takes`, `cold`, `playback`, `sideA` | The seven reels, in order. One block each — they are seven different things, so they do not share a shape. |
| `interval` | The framing around the day job: the marquee, the programme board's header (`boardTitle`, `boardScreen`) and the three status lines, plus the three-minute countdown. The jobs themselves come from `work.ts`. |
| `qualityCheck` | The interval's b-side: the **censor certificate**, its six conditions, and everything printed on it. |
| `credits`, `ending` | The cast-and-crew roll and the sign-off. |
| `boot` | The two lines on the tracking screen that plays before the title card. |
| `notFound` | The 404 — the only screen that is not part of the tape. |
| `sound` | The five blips: the transport clunk, the key click, reel 06's tick and ping, and the rewind sweep. All numbers — frequencies, gains, decays. Changing them changes what the deck sounds like. |
| `positions`, `wear` | Two per-screen tables, both eleven long: the timecode the counter shows, and how scuffed each screen is. |

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
- **06 Playback** — tap the photograph on the beat. The combo lights bulbs
  across the frame, brings the light up, and steps her look from bare face to in
  character. `looks` is a threshold table like the ones below, but it carries two
  strings: what is printed in the frame, and her aside.
- **07 Side A** — the inlay card, six songs on a loop. Tap one to play it.

And the interval has a second screen behind it:

- **b-side · the certificate** — the card a censor board staples to the front of
  a print, made out to herself. Six "conditions of certification", three pass and
  three fail, each with a note in the margin that appears with its stamp. Pressing
  the stamp takes the next unexamined line in order, one impression per press;
  when all six are done the signature comes down and **passed with remarks** lands
  across the card. `summaryPartial` and `summaryAll` are templates: `{done}`,
  `{total}`, `{pass}` and `{fail}` are filled in with counts.

  This was a carbon-paper QA form until the third handoff. The joke did not change
  — three fails, signed off anyway — it just moved onto stationery that every Hindi
  film actually opens on. `particulars` is the block of facts about the "film";
  `rating` and `ratingNote` are the U/A box.

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

### Side A names songs, and does not quote them

`sideA.tracks` is six song **titles**. It used to be three fragments of the
lyrics — they were her captions, so they belonged to the site more than a title
does — with three blank ruled lines beside them to make the card look real. The
second design handoff filled all six rows with titles instead, and that is worth
keeping for a reason beyond the design: a lyric is somebody's copyright and a
title is not, and this is a public page under her name. The paragraph underneath
still says the captions were these songs. It just no longer quotes them.

**That paragraph is load-bearing, and the third handoff dropped it.** It is kept
here anyway: it is the sentence that says the six titles were her captions, which
is the whole reason the card can name them at all. Do not remove it to tidy the
screen up.

The same six titles appear in `playback.tracks`, where reel 06 cycles through
them. If you change one list, change the other.

### Side A's blank tail is the point

Each track carries a `sec` running time, and those six times add up to 25:42.
`sideSeconds` is 45 minutes. **The position strip is drawn against 45 minutes, not
against the sum of the tracks** — so the segments stop about four fifths of the way
along and the rest of the strip is bare tape, which is what `hands.idle` ("rest of
the side is blank — on purpose") is describing.

The bundle had this the other way round: it labelled the strip `00:00`–`45:00` and
then sized each segment as a fraction of the six tracks' own total, so they filled
the strip end to end and the card claimed a 45-minute side with exactly 45 minutes
recorded on it. A home-made tape with a blank tail is both more honest and a better
joke, so the sizing was changed rather than the label.

### `alt` and `hand` are not the same sentence

The handwritten line is her voice; the alt text describes what is in the frame for
someone who cannot see it. Never make them the same string.

`red-and-gold.jpg` is used twice and cropped differently each time — the whole
frame on reel 03, and hard into her face on the title card — so it has two
different alt texts. That is on purpose, not a duplicate to tidy up.
(`portrait.jpg` used to be the pair that needed this.)

### Photographs

Images live in `src/assets/photos/` (**not** `public/`) so Astro optimises
them: each is re-encoded to WebP at three widths and served with a `srcset`.
That is why the built site is ~3.5MB with the photographs it uses instead of far
more.

**Committed at full resolution** — 1080×1080 for the Instagram set, exactly as
downloaded, never resized on disk. Astro generates the variants at build time and
the browser picks one, so a high-density screen gets the full file while an
ordinary one does not pay for it. Do not pre-shrink anything you add.

**One exception, and it is a crop rather than a shrink.** `cafe-stance.jpg` is the
third handoff's photograph at its full 3120×4160, and `playback-portrait.jpg` is a
1080×1350 crop of it framed head-and-shoulders. Reel 06 wants the crop, because
that reel is about her face stepping from bare to in character and the original is
a full-length shot in which her face is a few dozen pixels. Both files are
committed: the crop because it is what is used, the original because a crop is a
decision and the next person should be able to make a different one.

**Seventeen files, and three of them unused by this cut.** `palace.jpg` was a
thumbnail on a reel that no longer exists; `cafe-stance.jpg` is the uncropped
original above; `portrait.jpg` is her 320×320 avatar, which the poster card and
the new reel-06 photograph between them retired. All three stay on disk — a file
that was reviewed and approved is not something a redesign should quietly delete.

**Each photograph individually approved.** Four candidates were turned down
specifically because someone other than her was recognisable in them — her
mother, her sister, her brother, a friend at Holi. They have not been asked and
cannot consent by proxy. If any are wanted later, ask the people in them first.

## 2. The basics — `src/data/site.ts`

| Field | What to write |
|---|---|
| `name` | Spelled as on her LinkedIn. Her Instagram spells it "Gitanjali"; she uses both. |
| `title` | The browser tab, the search result and the bold line of every share preview. Her name alone. Resist appending a tagline — it briefly said "— Home Video", which is the design's internal name and reads badly in bold beside her photograph. |
| `description` | The grey line under the title. Under ~155 characters, or search truncates it mid-sentence. |
| `socials` | Instagram and LinkedIn, set as the last two lines of the credit roll. Each needs `role` (what the row is for — "distributed by"), `who` (the handle, which is what shows) and `note` (the half-line under it, dropped on a short screen). `label` is still the platform and is the link's accessible name, because "@gitanjaliraghav" on its own does not say where it goes. Instagram is first and keeps the pink. |
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
  current: true,          // adds the "now showing" chip
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

**The follower count.** Reel 04's badge on the keeper reads `posted · 10.7k`
(`takes.postedLabel`). Nobody has asked whether she is happy for her follower
count to be on the page. It is one string in `tape.ts` and the page is `noindex`
until she signs off, but a GitHub Pages site on a public repository is readable
by anyone with the URL, indexed or not.

### Settled

**Her current job title is *Quality Associate*** — confirmed, and the same as
the Highspring row above it. That repetition is real: she changed employer and
kept doing the job. Her LinkedIn still says *Accounts Receivable, Order to
Cash*, so treat that profile as the stale one rather than the source of truth
if the two ever disagree again.

### Facts

- [ ] The year she joined Highspring (Vaco Binary Semantics) — the end date is known, the start is not
- [ ] What she studied at MJPRU. **Two design handoffs have now written `B.Sc`
      against the university and it has been declined twice** — nothing confirms
      it, and a guess about a real person's degree does not go on her page because
      a design tool filled the gap in. One word in `work.ts` (`study[0].what`) once
      she says. Both handoffs also shortened the institution to "Rohilkhand
      University"; the full name is what it is called, so the interval's layout
      gives way to it instead.
- [ ] The two earlier education entries LinkedIn returned with dates but no institution: 2013–2015 and 2012–2013

### Assets

- [x] ~~**A proper headshot.**~~ **Done.** This was the most urgent item here for
      two sessions: `portrait.jpg`, her 320×320 Instagram avatar, was doing three
      jobs and being upscaled 2–3× on reel 06. The third handoff brought a
      3120×4160 photograph. Reel 06 now uses a 1080×1350 head-and-shoulders crop of
      it, and the title card and the share image are a crop of `red-and-gold.jpg`,
      so `portrait.jpg` is used nowhere.
- [ ] Any photos she would rather have than the ones pulled from Instagram —
      still worth asking. Everything on the site except the new café photograph
      came off her Instagram grid.
- [ ] Whether she is happy with the café photograph being the one that fills a
      screen on reel 06. It is the only image here that did not come from a public
      post of her own, so it is the one she is least likely to have expected.

**The share image** is `public/og.jpg`, built from `scripts/og-template.html`.
If you change the headline or the intro line in `tape.ts`, that image still
says the old thing until it is re-rendered — the template's comment header says
how. It is the one asset that does not update itself when the copy does.

### Permissions

- [ ] Confirm she is happy with every photograph on the site being on a public
      page — including the café photograph on reel 06, which is the one that did
      not come off her own Instagram
- [ ] Confirm the follower count in reel 04 (above)
- [ ] Confirm her name in handwriting on the b-side's signature line
      (`qualityCheck.signature`). It is a joke signature on a joke certificate, but
      it is still her name in a hand on a public page
- [ ] Then set `approved: true`

---

## What the tape dropped

Two things the old site had that the design has nowhere to put. Both are in the
git history at `f36c0a9` if they are wanted back.

- **Her Instagram captions.** The old photo wall printed her own caption under
  each photograph — `Main arse se khud se zara laapata hoon`, `You gotta keep
  your head up ✌🏾`, and eleven others. The reels use their own handwritten
  lines instead, so the captions are no longer shown anywhere. Reel 07 mentions
  them without quoting any — and since the second handoff it does not even quote
  the lyrics, only the song titles. They were the most unambiguously *her*
  writing on the site, so this is the loss worth knowing about.
  `f36c0a9:src/data/gallery.ts`
- **A contact email and a CV link.** The old `site.ts` had fields for both, and
  the end credits have room for links but no form or address. Nothing was ever
  filled in — `email` was always `null` — so nothing published has changed.
