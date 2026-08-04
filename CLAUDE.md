# Working in this repo

A personal site for Geetanjali Raghav — a VHS home-video tape, nine screens on
one scroll-snapped strip. [README.md](./README.md) explains how it is built and
[CONTENT.md](./CONTENT.md) explains how to change what it says. This file is
only the things that will bite you.

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

## Three things that are easy to get wrong

**No client-side `<script>` may import `src/data/tape.ts`.** That module imports
fifteen photographs. Pulling it into the client bundle's module graph makes the
build emit all fifteen originals as assets — 2.6MB that nothing references —
even though Vite tree-shakes the bindings back out of the JS. Pass what a script
needs on a `data-` attribute instead; every reel already does this.

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

## Outstanding, and not ours to decide

- **`approved: false` in `src/data/site.ts` keeps every page `noindex`.** Do not
  flip it. It is a deliberate human decision and it is hers.
- **Reel 04's "posted · 10.7k" badge names her follower count** and she has not
  been asked about it. Do not add anything else of that kind without asking.
- Four photographs were turned down because someone other than her was
  recognisable in them. Nobody can consent by proxy — ask the people in them
  first. `palace.jpg` is in the repo but unused by the current cut; leave it.

## When something looks wrong on the live site

Check whether the browser is showing a stale build before debugging the code —
HTML is cached for ten minutes, and phones hold on longer. Append a query string
to bypass it. Several rounds of this session were spent on symptoms that turned
out to be a cached page.
