# Filling in the site

Everything on this website comes from a handful of text files. You never need
to touch a component to change what the page says.

Two rules the build enforces for you:

- **`TODO` blocks publishing.** Anything unknown is written as a `TODO`, and
  `npm run check` fails while any remain.
- **`approved: false` in `src/data/site.ts` keeps the page out of search.**
  Every page carries a `noindex` tag until you flip it to `true`. Being
  factually complete is not the same as being ready to be found — that call is
  hers.

Run `npm run check` any time to see what is outstanding.

---

## 1. The basics — `src/data/site.ts`

| Field | What to write |
|---|---|
| `tagline` | The line under her name. **Currently written from her profiles, not by her** — this is the single best thing to replace with her own words. |
| `facts` | The little chips under the tagline. Short and fun. Four is about right. |
| `description` | 140–160 characters, for search results and link previews. |
| `role`, `organisation`, `location` | Shown in metadata and the work list. |
| `email` | `null` by default so no address is exposed. Set a string and the contact button appears. |
| `socials` | Instagram and LinkedIn are in. |
| `resume` | Filename of a PDF in `public/`, or `null` to hide the button. |
| `approved` | `false` until she has seen the site. |

## 2. Work — `src/data/work.ts`

Deliberately just role, place and years. **No descriptions** — this is a
personal site, not a CV, and bullet points are what make those read like
paperwork.

```ts
{
  role: 'Accounts Receivable, Order to Cash',
  company: 'Genpact',
  years: 'May 2026 — now',
  current: true,          // adds the "now" badge
  note: 'formerly X',     // optional aside
}
```

`study` below it works the same way. Its `what` field is optional — right now
only the university and dates are shown, because LinkedIn gave the institution
but not the subject.

## 3. Photos — `src/data/gallery.ts`

Images live in `src/assets/photos/` (**not** `public/`) so Astro optimises
them: each is re-encoded to WebP at three widths and served with a `srcset`.
That is why the whole site is ~1.3MB instead of several times that.

```ts
import newPhoto from '../assets/photos/new-photo.jpg';

{
  src: newPhoto,
  alt: 'A plain description, for people who cannot see it',
  caption: 'Her caption — optional',
}
```

`alt` and `caption` do different jobs. The caption is her voice; the alt text
describes what is in the frame. Never make them the same string, or a screen
reader just reads the emoji aloud.

**Nine photos were pulled from her Instagram; eight are in use.**
`src/assets/photos/glam.jpg` is downloaded but not shown — it is the most
glamour-forward of the set and felt like a call she should make rather than
me. Add it in one line if she wants it.

## 4. Life cards — `src/content/life/*.md`

Short cards: what she is into, in her voice.

```markdown
---
title: Salt water
icon: '🌊'      # a single emoji
order: 1        # lower first
draft: false    # true hides it
---

A sentence or two.
```

---

## Still worth getting from her

**Her words.** The tagline and all four life cards are currently written *from*
her public profiles rather than *by* her. They are accurate, but they are not
her voice, and on a personal site that is the difference between good and
right. Each file says so in a comment.

**Facts**
- [ ] The year she joined Highspring (Vaco Binary Semantics) — the end date is known, the start is not
- [ ] What she studied at MJPRU
- [ ] The two earlier education entries LinkedIn returned with dates but no institution: 2013–2015 and 2012–2013
- [ ] A contact email, if she wants one public

**Assets**
- [ ] **A proper headshot.** `portrait.jpg` is her Instagram profile picture at
      320×320 — displayed at 220px so it stays sharp, but it cannot go larger.
      A photo at 1000px+ is the biggest single upgrade available and needs only
      a file swap.
- [ ] Any photos she would rather have than the ones pulled from Instagram

**Permissions**
- [ ] Confirm she is happy with all eight photographs being on a public page
- [ ] Confirm she is happy for the follower count to be mentioned
- [ ] Then set `approved: true`
