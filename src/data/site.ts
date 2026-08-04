/**
 * Site-wide facts and metadata. Nothing factual belongs in a component.
 *
 * This file used to carry the old site's hero copy — a tagline, a row of
 * fact chips, a contact button. The tape has no room for any of that: its
 * opening words are on the title card and its only outbound links are the
 * two buttons on the end credits. What is left here is the page's identity
 * and the publish gate.
 *
 * `approved` controls whether search engines are allowed to index the page.
 * Leave it false until she has read the site and is happy with it.
 */

/**
 * Cache-buster for the hand-made files in `public/`. **Increment this whenever
 * `og.jpg`, `favicon.svg`, `apple-touch-icon.png` or `video/garden.mp4` changes.**
 *
 * Cloudflare fronts mevivek.dev and serves these with `max-age=14400` — four hours.
 * Everything Astro builds is content-hashed and so immune; these live under fixed
 * names, so replacing one in place leaves the old file being served. A query string
 * makes it a new URL, so the change lands as soon as the HTML does.
 *
 * It lives here, rather than in the layout that first needed it, because two files
 * now depend on it — Base.astro for the icons and the share image, EndCredits.astro
 * for the video — and two copies of a number that must match is a number that will
 * eventually not match.
 *
 * The video taught this the hard way. Its URL was requested once before GitHub
 * Pages had finished publishing the file, Cloudflare cached the resulting 404 under
 * the bare path, and every visitor got that 404 instead of the video — for four
 * hours, with no way to purge from here, because the zone is not ours. Versioning
 * the URL sidesteps a poisoned key as well as a stale file.
 */
export const ASSET_VERSION = 7;

export interface SocialLink {
  /** The platform, and the accessible name of the link. */
  label: string;
  href: string;
  /**
   * The end credits set these two out as a film's slug lines rather than as
   * buttons — a right-aligned role in small caps, then the credit itself. So
   * `role` is what the row is *for* and `who` is the handle it points at.
   */
  role: string;
  who: string;
  /** The half-line under the handle. Dropped on a short screen. */
  note: string;
}

export const site = {
  /**
   * Spelled as on her LinkedIn. Her Instagram — and this repository — spell
   * it "Gitanjali"; she uses both. LinkedIn's spelling wins here because
   * this is the name a stranger is most likely to search for.
   */
  name: 'Geetanjali Raghav',

  /**
   * Her name and nothing else. This is the browser tab, the search result and
   * the bold line of every share preview, so it is the one string a stranger
   * is most likely to see before anything else.
   *
   * It briefly read "Geetanjali Raghav — Home Video". That was wrong twice
   * over: "Home Video" is the *design's* internal name, meaningless to a
   * visitor, and set in bold beside a photograph of her in a link preview it
   * invites a reading nobody wants. The tape can call itself whatever it likes
   * on the page; the title should just say who she is.
   */
  title: 'Geetanjali Raghav',

  /**
   * The grey line under the title in previews and search results. Keep it
   * under ~155 characters or search truncates it mid-sentence.
   *
   * Deliberately not a job description: the page opens by saying it is not a
   * CV, and a summary that led with the day job would contradict it before
   * anyone arrived.
   */
  description:
    'Seven reels of hills, salt water, one motorcycle, a song, and a very short interval about the day job.',

  /**
   * The last two lines of the credit roll, set as slug lines. `rel="me"` on both.
   *
   * They were two filled buttons side by side until the fourth handoff. As rows
   * they read as part of the roll above them rather than as furniture stuck
   * underneath it, and they have room to say which of the two is which — which is
   * the joke in `note`, and the only place on the tape that acknowledges the
   * difference between her Instagram and her LinkedIn.
   */
  socials: [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/gitanjaliraghav/',
      role: 'distributed by',
      who: '@gitanjaliraghav',
      note: 'instagram · the unedited cut',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/geetanjaliraghav/',
      role: 'for enquiries',
      who: 'geetanjaliraghav',
      note: 'linkedin · the sensible one',
    },
  ] as SocialLink[],

  /**
   * Flip to true once she has seen the site and is happy for it to be found
   * in search. Until then every page carries a noindex tag.
   */
  approved: false,
} as const;

export type Site = typeof site;
