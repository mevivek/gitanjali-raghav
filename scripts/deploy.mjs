#!/usr/bin/env node
/**
 * Publishes the built site to the `gh-pages` branch.
 *
 * GitHub Pages is configured in "Deploy from a branch" mode, so no Actions
 * runner is involved — this script builds locally and pushes the result.
 *
 *   npm run deploy
 *
 * It writes the branch using git plumbing (write-tree / commit-tree) rather
 * than checking anything out, so your working tree and current branch are
 * never touched. Each deploy is a normal commit on top of the previous one,
 * so the branch has ordinary history and pushes without --force.
 *
 * The content check runs first in warn-only mode: it reports what is still
 * unfilled without blocking, because the page carries a noindex tag for as
 * long as any placeholder remains.
 */

import { execFileSync } from 'node:child_process';
import { existsSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const BRANCH = 'gh-pages';

const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

/** Runs a command, inheriting stdio so its output is visible. */
function run(cmd, args, opts = {}) {
  return execFileSync(cmd, args, { cwd: ROOT, encoding: 'utf8', ...opts });
}

function git(args, env) {
  return run('git', args, { env: { ...process.env, ...env }, stdio: 'pipe' }).trim();
}

// ---------------------------------------------------------------------------

console.log(`${DIM}Building…${RESET}`);
run('npm', ['run', 'build'], { stdio: 'inherit' });

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('dist/index.html missing — the build did not produce a site.');
  process.exit(1);
}

// Belt and braces: public/.nojekyll should already have been copied, but
// without this file GitHub Pages runs Jekyll and silently drops _astro/,
// which strips every stylesheet and font from the site.
writeFileSync(join(DIST, '.nojekyll'), '');

run('node', ['scripts/check-content.mjs', '--warn-only'], { stdio: 'inherit' });

// ---------------------------------------------------------------------------
// Build the branch without touching the working tree.

const indexFile = join(tmpdir(), `gh-pages-index-${process.pid}`);
rmSync(indexFile, { force: true });

const env = { GIT_INDEX_FILE: indexFile };

try {
  // --work-tree=dist means paths are recorded relative to dist/, so the built
  // files land at the root of the branch, which is what Pages serves.
  git(['--work-tree=dist', 'add', '-A', '-f'], env);

  const tree = git(['write-tree'], env);

  let parent = null;
  try {
    parent = git(['rev-parse', '--verify', `refs/heads/${BRANCH}`]);
  } catch {
    // First deploy — the branch does not exist yet.
  }

  const sourceSha = git(['rev-parse', '--short', 'HEAD']);
  const message = `Deploy site from ${sourceSha}`;

  const commitArgs = ['commit-tree', tree, '-m', message];
  if (parent) commitArgs.push('-p', parent);

  const commit = git(commitArgs, env);
  git(['update-ref', `refs/heads/${BRANCH}`, commit], env);

  console.log(`\n${DIM}Pushing ${BRANCH}…${RESET}`);
  run('git', ['push', '-u', 'origin', BRANCH], { stdio: 'inherit' });

  console.log(`\n${GREEN}✓ Deployed.${RESET}`);
  console.log(`${DIM}If this is the first deploy, set Settings → Pages → Source:${RESET}`);
  console.log(`${DIM}"Deploy from a branch" → ${BRANCH} → / (root). Then wait ~1 minute.${RESET}`);
  console.log(`\n  https://mevivek.github.io/gitanjali-raghav\n`);
  console.log(`${YELLOW}Note:${RESET} the repository is public, so this page is readable by anyone`);
  console.log(`${DIM}with the link, even while it carries a noindex tag.${RESET}\n`);
} finally {
  rmSync(indexFile, { force: true });
}
