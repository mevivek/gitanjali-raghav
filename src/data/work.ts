/**
 * Where she's worked. Deliberately just the facts — role, place, years.
 *
 * No descriptions here by design: this is a personal site, not a CV, and a
 * wall of bullet points is what makes those feel like paperwork. Anyone who
 * wants the detail can ask, or read her LinkedIn.
 *
 * Newest first. Add a job by adding an object.
 */

export interface Job {
  role: string;
  company: string;
  /** Shown as-is, e.g. "2022 — 2026" or "May 2026 — now". */
  years: string;
  /** Marks the current role so it can be highlighted. */
  current?: boolean;
  /** Optional aside — a former company name, a location. Keep it short. */
  note?: string;
}

export const work: Job[] = [
  {
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
  where: string;
  years: string;
}

export const study: Study[] = [
  {
    // LinkedIn gives the institution and the dates but not the subject, so
    // only those are shown. Add `what` once she says what she read.
    where: 'Mahatma Jyotiba Phule Rohilkhand University, Bareilly',
    years: '2015 — 2018',
  },
];
