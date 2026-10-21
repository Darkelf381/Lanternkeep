// dispatch.mjs (Lanternkeep Mail Engine) — The Little Red/Green Mail Van clock and delivery receipt.
//
// ── THE DISPATCH CLOCK ──────────────────────────────────────────────────────────
//
// In Lanternkeep, there is no ferry and no river quay.
// Mail travels along the country road in Alta's Little Red Mail Van.
//
// Deliveries run twice daily (Dawn and Dusk runs):
//   - Dawn run: 06:00 UTC (07:00 BST)
//   - Dusk run: 18:00 UTC (19:00 BST)
//
// Counted from Lanternkeep founding epoch (2026-10-18T00:00:00Z).
// Run 1: 2026-10-18 06:00 UTC.

export const DISPATCH_EPOCH_UTC = Date.UTC(2026, 9, 18, 6, 0, 0); // 2026-10-18 06:00 UTC
export const DISPATCH_INTERVAL_MS = 12 * 3600 * 1000; // 12 hours between runs

export function dispatchRunAt(ms = Date.now()) {
  if (ms < DISPATCH_EPOCH_UTC) return 0;
  return Math.floor((ms - DISPATCH_EPOCH_UTC) / DISPATCH_INTERVAL_MS) + 1;
}

export const DISPATCH_LEDGER_REL = 'WHITE_PAGES/dispatch-ledger.md';

export const DISPATCH_LEDGER_PREAMBLE = `# Lanternkeep Dispatch Ledger

One line per mail van run that moved letters: which run it was (the grove clock —
dawn and dusk runs since founding on 2026-10-18), and the commit sha the van READ.

Written by tools/mail-van.mjs.
Engine and receipt logic in tools/dispatch.mjs.

`;

export const DISPATCH_RECEIPT_RE =
  /^- (\d{4}-\d{2}-\d{2}) · run (\d+) · grove: ([0-9a-f]{40}) · (\d+) delivered, (\d+) bounced$/;

export function dispatchReceiptLine({ date, run, groveSha, delivered, bounced }) {
  return `- ${date} · run ${run} · grove: ${groveSha} · ${delivered} delivered, ${bounced} bounced`;
}

export function parseDispatchLedgerText(text) {
  const receipts = [];
  let unrecognized = 0;
  for (const line of String(text ?? '').replace(/\r\n/g, '\n').split('\n')) {
    if (!line.startsWith('- ')) continue;
    const m = DISPATCH_RECEIPT_RE.exec(line);
    if (!m) { unrecognized += 1; continue; }
    receipts.push({
      date: m[1],
      run: Number(m[2]),
      grove_sha: m[3],
      delivered: Number(m[4]),
      bounced: Number(m[5]),
    });
  }
  return { receipts, unrecognized };
}

export function latestDispatch(text) {
  const { receipts } = parseDispatchLedgerText(text);
  return receipts.length ? receipts[receipts.length - 1] : null;
}
