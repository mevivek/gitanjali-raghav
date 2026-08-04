#!/usr/bin/env node
/**
 * Publish gate.
 *
 * The site is deliberately built before all of its content is known, so every
 * unknown fact is written as a literal `TODO`. This script fails if any of
 * them survive, which stops a placeholder reaching a public page under a real
 * person's name.
 *
 * It also lists draft entries. Drafts are excluded from the build by design,
 * so they do not fail the check — but they are reported so nothing is
 * silently left unpublished and forgotten.
 *
 * Run directly with `npm run check`. CI runs it before deploying.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));

/** Directories scanned for placeholders. */
const TARGETS = ['src/content', 'src/data'];
const EXTENSIONS = ['.md', '.mdx', '.ts', '.astro'];

const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

/** @returns {string[]} every matching file under `dir`, recursively */
function walk(dir) {
  let found = [];
  let entries;

  try {
    entries = readdirSync(dir);
  } catch {
    return found; // directory does not exist yet — nothing to check
  }

  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      found = found.concat(walk(full));
    } else if (EXTENSIONS.some((ext) => entry.endsWith(ext))) {
      found.push(full);
    }
  }

  return found;
}

const placeholders = [];
const drafts = new Set();

for (const target of TARGETS) {
  for (const file of walk(join(root, target))) {
    const rel = relative(root, file);
    const lines = readFileSync(file, 'utf8').split('\n');

    lines.forEach((line, index) => {
      if (line.includes('TODO')) {
        placeholders.push({ file: rel, line: index + 1, text: line.trim() });
      }
      if (/^draft:\s*true$/.test(line.trim())) {
        drafts.add(rel);
      }
    });
  }
}

if (drafts.size > 0) {
  const count = drafts.size;
  console.log(
    `\n${YELLOW}${count} draft entr${count === 1 ? 'y is' : 'ies are'} hidden from the site:${RESET}`,
  );
  for (const file of drafts) console.log(`  ${DIM}${file}${RESET}`);
  console.log(`  ${DIM}These are unconfirmed. Set "draft: false" once verified.${RESET}`);
}

if (placeholders.length > 0) {
  const count = placeholders.length;
  console.error(`\n${RED}✗ ${count} placeholder${count === 1 ? '' : 's'} still to fill in:${RESET}\n`);

  for (const { file, line, text } of placeholders) {
    const excerpt = text.length > 88 ? `${text.slice(0, 88)}…` : text;
    console.error(`  ${file}:${line}`);
    console.error(`    ${DIM}${excerpt}${RESET}`);
  }

  console.error(`\n${RED}Not ready to publish.${RESET} Replace each TODO above with real content.`);
  console.error(`${DIM}See CONTENT.md for what each field expects.${RESET}\n`);
  process.exit(1);
}

console.log(`\n${GREEN}✓ No placeholders left. Ready to publish.${RESET}\n`);
