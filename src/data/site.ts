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
  label: string;
  href: string;
}

export const site = {
  /**
   * Spelled as on her LinkedIn. Her Instagram — and this repository — spell
   * it "Gitanjali"; she uses both. LinkedIn's spelling wins here because
   * this is the name a stranger is most likely to search for.
   */
  name: 'Geetanjali Raghav',

  title: 'Geetanjali Raghav — Home Video',

  /**
   * 140–160 characters, for search results and link previews. Deliberately
   * not a job description: the page opens by saying it is not a CV, and a
   * summary that led with the day job would contradict it before anyone
   * arrived.
   */
  description:
    'A home video rather than a CV. Eight reels of hills, salt water, one motorcycle and a very short interval about the day job.',

  /** Shown as two buttons on the end credits. `rel="me"` on both. */
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/gitanjaliraghav/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/geetanjaliraghav/' },
  ] as SocialLink[],

  /**
   * Flip to true once she has seen the site and is happy for it to be found
   * in search. Until then every page carries a noindex tag.
   */
  approved: false,
} as const;

export type Site = typeof site;
