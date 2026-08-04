#!/usr/bin/env node
/**
 * Publish gate.
 *
 * The site is deliberately built before all of its content is known, so every
 * unknown fact is written as a literal `TODO`. This script fails if any of
 * them survive, which stops a placeholder reaching a public page under a real
 * person's name.
 *
 * Drafts are reported but do not fail the check — they are excluded from the
 * build by design. They are listed so nothing is silently left unpublished.
 *
 *   npm run check                exits 1 if anything is unfilled
 *   npm run check -- --warn-only exits 0 regardless; used while the site is
 *                                still a preview. The page carries a noindex
 *                                tag for as long as placeholders remain, so a
 *                                preview deploy cannot be indexed.
 */

import { scanContent } from './scan.mjs';

const warnOnly = process.argv.includes('--warn-only');

const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

const { placeholders, drafts } = scanContent();

if (drafts.length > 0) {
  const n = drafts.length;
  console.log(`\n${YELLOW}${n} draft entr${n === 1 ? 'y is' : 'ies are'} hidden from the site:${RESET}`);
  for (const file of drafts) console.log(`  ${DIM}${file}${RESET}`);
  console.log(`  ${DIM}These are unconfirmed. Set "draft: false" once verified.${RESET}`);
}

if (placeholders.length === 0) {
  console.log(`\n${GREEN}✓ No placeholders left. Ready to publish.${RESET}\n`);
  process.exit(0);
}

const n = placeholders.length;
const log = warnOnly ? console.log : console.error;

log(`\n${warnOnly ? YELLOW : RED}${warnOnly ? '!' : '✗'} ${n} placeholder${n === 1 ? '' : 's'} still to fill in:${RESET}\n`);

for (const { file, line, text } of placeholders) {
  const excerpt = text.length > 88 ? `${text.slice(0, 88)}…` : text;
  log(`  ${file}:${line}`);
  log(`    ${DIM}${excerpt}${RESET}`);
}

if (warnOnly) {
  console.log(
    `\n${YELLOW}Preview mode.${RESET} Deploying anyway — the page carries a noindex tag`,
  );
  console.log(`${DIM}until every placeholder is filled, so search engines will skip it.${RESET}\n`);

  // Surfaces as a warning annotation in the GitHub Actions run summary.
  if (process.env.GITHUB_ACTIONS) {
    console.log(`::warning::${n} placeholder${n === 1 ? '' : 's'} unfilled — site deployed with noindex`);
  }
  process.exit(0);
}

console.error(`\n${RED}Not ready to publish.${RESET} Replace each TODO above with real content.`);
console.error(`${DIM}See CONTENT.md for what each field expects.${RESET}\n`);
process.exit(1);
