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
