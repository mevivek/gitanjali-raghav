# Filling in the site

Everything on this website comes from text files. You never need to touch a
component to change what the page says.

Two rules the build enforces for you:

- **`TODO` blocks publishing.** Anything still unknown is written as a `TODO`.
  `npm run check` fails while any remain, so an unfinished page cannot go live.
- **`draft: true` hides an entry.** Drafts stay in the repo and stay visible to
  you, but never reach the built site. Anything not yet confirmed by Gitanjali
  is marked this way.

Run `npm run check` any time to see exactly what is left.

---

## 1. The basics — `src/data/site.ts`

| Field | What to write |
|---|---|
| `tagline` | One line under her name. Her own words, not a job description. This is the single most important sentence on the site. |
| `description` | 140–160 characters. Shows up in Google results and link previews. |
| `role` | Her exact job title. |
| `organisation` | Currently `Genpact`. |
| `location` | City, country. |
| `intro` | Two or three sentences, the way she'd introduce herself out loud. |
| `email` | Only add this **with her consent** — it goes on a public page. Delete the field to hide the contact button entirely. |
| `socials` | Instagram is already filled in. Add the LinkedIn URL. |
| `resume` | Filename of a PDF placed in `public/`, or leave as `null`. |

## 2. The timeline — `src/content/timeline/*.md`

The centrepiece. One file per event. Career events appear on one side, life
events on the other, sharing a year axis.

```markdown
---
year: 2023              # required — the number on the axis, and the sort key
lane: career            # required — "career" or "life"
title: Programme Lead   # required — short headline
org: Genpact            # optional — employer or place
dateLabel: 2023 — now   # optional — shown under the title
order: 0                # optional — orders entries within the same year
image: goa-2024.jpg     # optional — filename in public/img/
imageAlt: On the beach  # required whenever image is set
draft: false            # true hides it from the site
---

Two or three sentences. Concrete beats vague: what she owned, who she worked
with, what changed because she was there. Numbers if there are any.
```

**Currently in place:**

| File | Lane | Status |
|---|---|---|
| `2012-earlier-study.md` | career | Draft — LinkedIn has the dates, not the institution |
| `2013-earlier-study.md` | career | Draft — LinkedIn has the dates, not the institution |
| `2015-mjpru.md` | career | Dates confirmed; needs the degree subject |
| `2022-highspring.md` | career | Title confirmed; needs start year and description |
| `2024-coastline.md` | life | Live — written from Instagram, rewrite in her voice |
| `2026-genpact.md` | career | Start date confirmed; needs description |
| `2026-reels.md` | life | Live — written from Instagram, rewrite in her voice |

To add a year, add a file. Nothing else needs changing.

> **Note on employers.** Highspring and Vaco Binary Semantics are the same
> company: Vaco Holdings rebranded on 31 March 2025 and Vaco Binary Semantics
> became Highspring India. Both names will appear on her CV, so the entry
> carries both. Genpact, from 22 May 2026, is the current role — her LinkedIn
> has not caught up with the move yet.

## 3. Life cards — `src/content/life/*.md`

Short standalone cards: hobbies, what's on repeat, what she's into right now.

```markdown
---
title: Currently
icon: '✨'      # a single emoji
order: 0        # lower numbers appear first
draft: false
---

A sentence or two.
```

## 4. Writing — `src/content/notes/*.md`

Optional. The whole section hides itself when nothing is published, so if she
doesn't want it, delete the folder and it simply disappears.

## 5. Photos

`public/img/portrait.jpg` is currently her Instagram profile picture, at its
original **320×320**. That is small: it is displayed at 152px so it stays
sharp, but it cannot go bigger without looking soft. **A proper headshot at
1000px or more is the single biggest visual upgrade available to this site** —
drop one in as `portrait.jpg` and nothing else needs changing.

Put other image files in `public/img/` and reference them by filename. Two
things matter:

- **Self-host them.** Instagram's image URLs are signed and expire after a few
  days, so they cannot be linked to directly. Download, then commit the file.
- **Every image needs `imageAlt`.** The build fails without it. Describe what's
  in the picture, not "photo of Gitanjali".

> Her Instagram being public does not make its photos free to republish. Get
> her explicit yes on each image before it goes on the site.

---

## What we still need from her

This is the whole list. Nothing here can be looked up — it has to come from her.

**Positioning**
- [ ] Exact job title at Genpact, and her team or function
- [ ] City she's based in
- [ ] The one-line description of what she does, in her voice
- [ ] Who the site is really for — recruiters, clients, collaborators, friends
- [ ] Whether `she/her` is right

**Career**
- [ ] Genpact: her formal job title, and what she owns within Order to Cash
- [ ] Highspring / Vaco Binary Semantics: the year she joined, and what she did
- [ ] Anything before that
- [ ] What she studied at MJPRU — LinkedIn lists the university, not the subject
- [ ] The two earlier education entries (2013–2015, 2012–2013) — LinkedIn
      returned these with the institution names blank
- [ ] Certifications, awards, recognitions
- [ ] Skills, tools, languages spoken

**Life**
- [ ] Hobbies and creative outlets
- [ ] Travel — where she's been, where she's from, favourites
- [ ] What she's reading, learning or listening to right now
- [ ] Fun facts, quirks, pets, causes she cares about
- [ ] **Anything that must not go on a public page**

**Assets**
- [ ] A headshot, plus any candids she's happy to publish
- [ ] Colours or fonts she likes — the current palette is a starting point, not a decision
- [ ] Public contact email, with her consent
- [ ] Custom domain, if she wants one

**The fastest way to supply most of this:** open her LinkedIn profile →
**More → Save to PDF**, and drop the file in the repo. That covers almost the
entire career section in one step.
