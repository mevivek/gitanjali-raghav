/**
 * Scans the content sources for unfilled placeholders and draft entries.
 *
 * Shared by two callers with different jobs:
 *   - scripts/check-content.mjs — the publish gate, run by CI
 *   - src/layouts/Base.astro    — adds a noindex tag while anything is unfilled
 *
 * Keeping one implementation means the page and the gate can never disagree
 * about whether the site is finished.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

/*
 * Deliberately cwd rather than a path derived from import.meta.url: Astro
 * bundles this module when the layout imports it, which moves import.meta.url
 * into the build output and makes a relative root resolve to the wrong place.
 * Both callers — the npm script and the Astro build — run from the project
 * root, so cwd is correct and stable for each.
 */
const ROOT = process.cwd();

const TARGETS = ['src/content', 'src/data'];
const EXTENSIONS = ['.md', '.mdx', '.ts', '.astro'];

/** @returns {string[]} every matching file under `dir`, recursively */
function walk(dir) {
  let found = [];
  let entries;

  try {
    entries = readdirSync(dir);
  } catch {
    return found; // directory does not exist yet — nothing to scan
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

/**
 * @returns {{ placeholders: Array<{file: string, line: number, text: string}>,
 *             drafts: string[] }}
 */
export function scanContent() {
  const placeholders = [];
  const drafts = new Set();

  for (const target of TARGETS) {
    for (const file of walk(join(ROOT, target))) {
      const rel = relative(ROOT, file);

      readFileSync(file, 'utf8')
        .split('\n')
        .forEach((line, index) => {
          if (line.includes('TODO')) {
            placeholders.push({ file: rel, line: index + 1, text: line.trim() });
          }
          if (/^draft:\s*true$/.test(line.trim())) {
            drafts.add(rel);
          }
        });
    }
  }

  return { placeholders, drafts: [...drafts] };
}
