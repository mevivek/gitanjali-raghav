/**
 * Every site-wide fact lives here. Nothing factual belongs in a component.
 *
 * Anything still unknown is written as a placeholder string, prefixed with
 * the marker that `npm run check` looks for. That check fails while any
 * remain, so the site cannot be published with a placeholder still showing.
 * Replace the text, keep the quotes.
 *
 * See CONTENT.md for what each field means and how to write it.
 */

export interface SocialLink {
  label: string;
  href: string;
  /** Shown next to the link; keep it to a few words. */
  note?: string;
}

export const site = {
  /**
   * Spelled as on her LinkedIn profile. Her Instagram — and this repository —
   * spell it "Gitanjali"; she evidently uses both. LinkedIn's spelling wins
   * here because this is the professional-facing site. One-line change if
   * she'd rather it were the other way.
   */
  name: 'Geetanjali Raghav',

  /** Pronouns used throughout the copy. */
  pronouns: 'she/her',

  /** Browser tab + search results. Keep under ~60 characters. */
  title: 'Geetanjali Raghav',

  /**
   * The one line under her name. Her own words are better than anything
   * written for her — this should sound like her, not like a job ad.
   */
  tagline: 'TODO: one line describing what she does, in her own voice',

  /** Search-result and link-preview description. Aim for 140–160 characters. */
  description:
    'TODO: 1–2 sentences for search results and link previews. Her LinkedIn summary opens "As a Quality Associate at Highspring, contributed to global policy compliance by…" — get the full sentence from her and use it.',

  /**
   * Current role, shown in the hero.
   *
   * Her LinkedIn still lists Highspring — it predates this move and has not
   * been updated. Genpact, from 22 May 2026, is current.
   */
  role: 'Accounts Receivable, Order to Cash',
  organisation: 'Genpact',
  location: 'Delhi, India',

  /**
   * Two or three sentences for the About section. Write it the way she would
   * introduce herself out loud.
   */
  intro: 'TODO: two or three sentences introducing her.',

  /** Public contact address. Only add this with her explicit consent. */
  email: 'TODO: public contact email, or delete this field to hide the button',

  /** Primary call to action in the contact section. */
  ctaLabel: 'Say hello',

  socials: [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/gitanjaliraghav/',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/geetanjaliraghav/',
    },
  ] as SocialLink[],

  /**
   * Optional resume in /public. Set to null to hide the download button.
   * Example: 'gitanjali-raghav-cv.pdf'
   */
  resume: null as string | null,
} as const;

export type Site = typeof site;
