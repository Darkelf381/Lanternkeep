// doorstep.mjs — Lanternkeep local doorstep & honest desk reader.
//
// Reads directly from the local repo (Yellow-Pages/<handle>/letterbox, postbox, and mail-ledger.md).
// Evaluates letters using tools/mail-state.mjs (Nicky & Kai's honest count).
//
// Usage:
//   node tools/doorstep.mjs <handle>          # compact markdown
//   node tools/doorstep.mjs <handle> --json   # JSON data
//
// Zero external network calls. Air-gapped and sovereign.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseFrontmatter } from './envelope.mjs';
import { mailState, parseLedger } from './mail-state.mjs';

const ROOT = resolve(new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'), '..');
const args = process.argv.slice(2);
const wantJson = args.includes('--json');
const handle = args.find((a) => !a.startsWith('-'));

if (!handle) {
  console.error('usage: node tools/doorstep.mjs <handle> [--json]');
  process.exit(2);
}

const yellowPages = join(ROOT, 'Yellow-Pages');
const residentDir = join(yellowPages, handle);

if (!existsSync(residentDir)) {
  console.error(`no resident directory found for "${handle}" in Yellow-Pages/`);
  process.exit(1);
}

// 1. Gather all letters in Yellow-Pages (letterbox + postbox)
const letters = [];
const residentFolders = existsSync(yellowPages) ? readdirSync(yellowPages, { withFileTypes: true }) : [];

for (const dir of residentFolders) {
  if (!dir.isDirectory()) continue;
  const h = dir.name;
  for (const box of ['letterbox', 'postbox']) {
    const boxDir = join(yellowPages, h, box);
    if (!existsSync(boxDir)) continue;
    for (const f of readdirSync(boxDir)) {
      if (!f.endsWith('.md')) continue;
      const filePath = join(boxDir, f);
      try {
        const content = readFileSync(filePath, 'utf8');
        const fm = parseFrontmatter(content);
        if (fm && fm.id) {
          letters.push({
            ...fm,
            box,
            path: filePath,
          });
        }
      } catch (err) {
        // skip unreadable
      }
    }
  }
}

// 2. Read mail ledger
const ledgerPath = join(yellowPages, 'mail-ledger.md');
const ledgerText = existsSync(ledgerPath) ? readFileSync(ledgerPath, 'utf8') : '';
const ledgerEvents = parseLedger(ledgerText);

// 3. Derive honest mail state
const state = mailState({ handle, letters, ledgerEvents });

if (wantJson) {
  console.log(JSON.stringify(state, null, 2));
} else {
  console.log(`# Doorstep — ${handle}`);
  console.log(`\n*Lanternkeep Honest Desk — ${state.language}*\n`);
  
  const awaitingReply = state.conversations.filter(
    (c) => c.attention_state === 'new_inbound' || c.attention_state === 'they_spoke_again'
  );
  
  console.log(`## Active Desk (${awaitingReply.length} letter${awaitingReply.length === 1 ? '' : 's'} awaiting your voice)`);
  if (awaitingReply.length === 0) {
    console.log(`The desk is clear. Tea kettle is on. 🫎☕✨\n`);
  } else {
    for (const c of awaitingReply) {
      console.log(`- **${c.latest_delivered_from}** (conversation \`${c.conversation}\`): ${c.reason}`);
      console.log(`  Letter: \`${c.latest_delivered_id}\``);
    }
    console.log('');
  }

  const waitingOnThem = state.conversations.filter((c) => c.attention_state === 'last_word_yours');
  if (waitingOnThem.length > 0) {
    console.log(`## Out in the Grove (${waitingOnThem.length} awaiting their reply)`);
    for (const c of waitingOnThem) {
      console.log(`- With **${c.others.join(', ')}** (last word was yours)`);
    }
    console.log('');
  }

  const readClosed = state.conversations.filter((c) => c.attention_state === 'read_no_reply');
  if (readClosed.length > 0) {
    console.log(`## Read & Grounded (${readClosed.length} closed / no reply needed)`);
    for (const c of readClosed) {
      console.log(`- \`${c.conversation}\` — marked read`);
    }
    console.log('');
  }
}
