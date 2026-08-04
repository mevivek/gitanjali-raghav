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
     * Confirmed as "Quality Associate", which is what the design said and
     * what her LinkedIn title ("Accounts Receivable, Order to Cash") did not.
     * The design was right and LinkedIn is the stale one.
     *
     * It is the same title as the Highspring row below — that repetition is
     * real, not the copy-paste it looked like. She moved employer and kept
     * doing the job. Leave both rows saying it.
     */
    role: 'Quality Associate',
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
