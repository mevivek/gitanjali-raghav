/**
 * Every site-wide fact lives here. Nothing factual belongs in a component.
 *
 * Some of this prose was written from her LinkedIn and Instagram rather than
 * by her — it is accurate, but it is not yet her voice. Anything marked with
 * a comment below is worth replacing with her own words.
 *
 * `approved` controls whether search engines are allowed to index the page.
 * Leave it false until she has read the site and is happy with it.
 */

export interface SocialLink {
  label: string;
  href: string;
}

export interface Fact {
  icon: string;
  text: string;
}

export const site = {
  /**
   * Spelled as on her LinkedIn. Her Instagram — and this repository — spell
   * it "Gitanjali"; she uses both. LinkedIn's spelling wins here because
   * this is the professional-facing site.
   */
  name: 'Geetanjali Raghav',
  firstName: 'Geetanjali',
  pronouns: 'she/her',

  title: 'Geetanjali Raghav',

  /**
   * The line under her name, in her own voice ideally. This one is drafted
   * from what her profiles show — order-to-cash work, a pull towards the
   * sea, a camera never far away. Replace it with hers when you can.
   */
  tagline:
    'Order to Cash by day. Coastlines, cameras and a camera roll that is 90% sky the rest of the time.',

  description:
    'Geetanjali Raghav — Accounts Receivable and Order to Cash at Genpact, based in Delhi. Photographs, coastlines, and the occasional excellent outfit.',

  role: 'Accounts Receivable, Order to Cash',
  organisation: 'Genpact',
  location: 'Delhi, India',

  /** Little chips under the hero. Keep them short and keep them fun. */
  facts: [
    { icon: '📍', text: 'Delhi, India' },
    { icon: '🌊', text: 'Happiest near water' },
    { icon: '🎧', text: 'Hindi film songs, always' },
    { icon: '🎬', text: '10k on the other side of the camera' },
  ] as Fact[],

  /**
   * Public contact address. Left null deliberately — putting an email on a
   * public page invites spam, and it is hers to volunteer. Set it to a
   * string and the contact button appears automatically.
   */
  email: null as string | null,

  ctaLabel: 'Come say hi',

  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/gitanjaliraghav/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/geetanjaliraghav/' },
  ] as SocialLink[],

  /** Optional CV in /public. Null hides the download button. */
  resume: null as string | null,

  /**
   * Flip to true once she has seen the site and is happy for it to be found
   * in search. Until then every page carries a noindex tag.
   */
  approved: false,
} as const;

export type Site = typeof site;
