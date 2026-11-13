/*
 * Equivalence test: proves codon.js produces exactly what the web page (index.html)
 * produces, so the standalone engine and the tool can never silently drift apart.
 *
 * For each case it drives the real page in a headless browser (setting the same form
 * fields and the same random seed) and compares the optimized sequence and every
 * variant against codon.js's optimize() called with matching options.
 *
 * Requires Playwright (dev-only), e.g. `npm i -D playwright`, then run with
 * `node test/equivalence.test.js`. The library itself has no dependencies.
 */
const path = require('path');
const assert = require('assert');
const CodonLib = require('../docs/codon.js');

const PAGE = 'file://' + path.resolve(__dirname, '..', 'docs', 'index.html');

const CASES = [
  { name: 'default peptide',        opts: { sequence: 'MACGTWKLLAGT' } },
  { name: 'mild + variants',        opts: { sequence: 'GSGATNFSLLKQAGDVEENPGP', variants: 3 } },
  { name: 'strong cpg',             opts: { sequence: 'MKTAYIAKQRQISFVKSHFSRQLEERLGLIEVQ', cpg: 'strong' } },
  { name: 'cpg off',                opts: { sequence: 'MKTAYIAKQRQISFVKSHFSRQLEERLGLIEVQ', cpg: 'off' } },
  { name: 'human, seed 42',         opts: { sequence: 'MWKLLAGTACGTMACGT', species: 'tax9606', seed: 42 } },
  { name: 'dna input',              opts: { sequence: 'ATGGCTTGTGGAACTTGG', mode: 'auto' } },
  { name: 'k=18, tries=120',        opts: { sequence: 'MAEGEITTFTALTEKFNLPPGNYKKPKLLYCSNGGHFLRILPDGTVDGTRDRSDQHIQLQLSAESVGEVYIKSTETGQYLAMDTDGLLYGSQTPNEECLFLERLEENHYNTYISKKHAEKNWFVGLKKNGSCKRGPRTHYGQKAILFLPLPVSSD', k: 18, tries: 120 } },
  { name: 'with context + variants', opts: { sequence: 'MACGTWKLLAGTKKPKLLYCSNGG', variants: 2, context: ['ATGGCTTGTGGAACTTGGAAGCTGCTGGCTGGAACC'] } },
];

(async () => {
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('pageerror', (e) => { console.error('PAGE ERROR:', e.message); process.exitCode = 1; });
  await page.goto(PAGE);

  let failures = 0;
  for (const c of CASES) {
    const o = Object.assign(CodonLib.optimize.defaults(), c.opts);

    // drive the page form to match the options, with a fixed seed
    const fromPage = await page.evaluate(async (o) => {
      const set = (id, v) => { const el = document.getElementById(id); el.value = v; };
      set('inp', o.sequence);
      set('species', o.species);
      set('mode', o.mode);
      set('cpgmode', o.cpg);
      set('minfrac', o.minFrac);
      set('k', o.k);
      set('tries', o.tries);
      set('homo', o.homopolymer);
      document.getElementById('both').checked = o.bothStrands !== false;
      document.getElementById('ctx').value = (Array.isArray(o.context) ? o.context : []).join('\n');
      const want = o.variants > 0;
      document.getElementById('wantvar').checked = want;
      document.getElementById('n').disabled = !want;
      if (want) set('n', o.variants);
      current = o.seed | 0;           // fix the seed the page will use
      await run(false);               // run without reseeding
      return {
        optimized: editorSequence(),
        variants: (editor.opts && editor.opts.variants) ? editor.opts.variants.slice() : [],
        err: document.getElementById('err').textContent.trim(),
      };
    }, o);

    const lib = CodonLib.optimize(c.opts);

    try {
      assert.strictEqual(fromPage.err, '', 'page reported an error: ' + fromPage.err);
      assert.strictEqual(lib.optimized, fromPage.optimized, 'optimized sequence differs');
      assert.deepStrictEqual(lib.variants.map((v) => v.sequence), fromPage.variants, 'variants differ');
      console.log('  ok   ' + c.name);
    } catch (e) {
      failures++;
      console.error('  FAIL ' + c.name + ' — ' + e.message);
      console.error('       page: ' + fromPage.optimized + ' ' + JSON.stringify(fromPage.variants));
      console.error('       lib : ' + lib.optimized + ' ' + JSON.stringify(lib.variants.map((v) => v.sequence)));
    }
  }

  await browser.close();
  if (failures) { console.error('\n' + failures + ' case(s) failed'); process.exit(1); }
  console.log('\nall ' + CASES.length + ' cases match the web page');
})();
