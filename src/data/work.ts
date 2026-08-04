/**
 * Where she's worked, and where she studied. Deliberately just the facts —
 * role, place, years.
 *
 * No descriptions here by design: the tape says what it thinks of the day
 * job in one paragraph on the interval card, and a wall of bullet points
 * underneath would undo it. Anyone who wants the detail can read her
 * LinkedIn, which is linked on the end credits.
 *
 * Newest first. Both lists render as the same kind of row on the interval,
 * which is how the design drew them.
 */

export interface Job {
  role: string;
  company: string;
  /** Shown as-is, e.g. "2022 — 2026" or "May 2026 — now". */
  years: string;
  /** Marks the current role. Renders the "on air" badge. */
  current?: boolean;
  /** Optional aside — a former company name. Kept short; shown after a dot. */
  note?: string;
}

export const work: Job[] = [
  {
    /*
     * This is her LinkedIn title, and it disagrees with the design.
     *
     * The Home Video design labelled this role "Quality Associate" — the
     * same title as the Highspring row below it, which is very likely how
     * the slip happened. Her LinkedIn title is the one kept, because this
     * is a factual claim about a real person on a page under her name and
     * LinkedIn is the closer source. Worth a single question to her; it is
     * a one-string change either way.
     */
    role: 'Accounts Receivable, Order to Cash',
    company: 'Genpact',
    years: 'May 2026 — now',
    current: true,
  },
  {
    // Her start year here is not known. "until May 2026" is what can be
    // said accurately — she left for Genpact that month. Replace with the
    // full range once she confirms when she joined.
    role: 'Quality Associate',
    company: 'Highspring',
    years: 'until May 2026',
    note: 'formerly Vaco Binary Semantics',
  },
];

export interface Study {
  /** The subject. Optional — omitted rather than guessed at. */
  what?: string;
  /** The institution. */
  where: string;
  /** The town, shown where a job shows its employer. */
  place?: string;
  years: string;
}

export const study: Study[] = [
  {
    // LinkedIn gives the institution and the dates but not the subject, so
    // only those are shown. Add `what` once she says what she read.
    where: 'Mahatma Jyotiba Phule Rohilkhand University',
    place: 'Bareilly',
    years: '2015 — 2018',
  },
];
