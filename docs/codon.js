/*
 * codon.js — codon optimization engine for the Danionella codon tool.
 *
 * The whole optimization algorithm lives here: sampling, scoring, repeat
 * removal and metrics. The web page (docs/index.html) loads this file, so the
 * tool and this module run the same code. Use it from your own program to get
 * plain data instead of a drawn page: optimize(options) returns a result object.
 *
 * Works both as a CommonJS module (require('./codon.js')) and as a classic
 * browser script (defines window.CodonLib). No build step, no dependencies.
 *
 * test/equivalence.test.js drives the real page and asserts it produces
 * byte-identical output to this module's optimize(), so the page's interactive
 * sampling loop and this engine cannot silently diverge.
 */
(function (root, factory) {
  // The codon tables and restriction sites live in tables.js (plain, editable data).
  // Get them from require() in Node, or from the global that <script> defined in the browser.
  var DATA;
  if (typeof module !== "undefined" && module.exports) DATA = require("./tables.js");
  else DATA = (root && root.CODON_DATA);
  if (!DATA) throw new Error("codon.js: tables.js must be loaded before codon.js");

  const api = factory(DATA);
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) {
    root.CodonLib = api;
    // Also expose each name on the global object so the web page (index.html),
    // which loads this file as a plain <script>, can call them directly.
    for (const k in api) root[k] = api[k];
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (DATA) {
  "use strict";

  // Assemble the lookup the engine uses from the editable data in tables.js. Each
  // species keeps its raw per-codon frequencies (buildTable applies the minimum-
  // fraction cutoff later); the codon,aa,fraction triples are rebuilt here from the
  // shared genetic code, so the data file does not repeat the code for every species.
  const GENETIC_CODE = DATA.geneticCode;
  const CODON_TABLES = {};
  for (const id in DATA.species) {
    const sp = DATA.species[id];
    const data = Object.keys(sp.frequencies)
      .map((c) => c + "," + GENETIC_CODE[c] + "," + sp.frequencies[c]).join(" ");
    CODON_TABLES[id] = { label: sp.label, group: sp.group, assembly: sp.assembly, cds: sp.cds, data: data };
  }
  const SITES = DATA.restrictionSites;
  const DEFAULT_TAXID = "dcerebrum";

  function buildTable(data, minFrac) {
    const frac = {}, aaOf = {}, options = {};
    for (const tok of data.trim().split(/\s+/)) {
      const [c, a, f] = tok.split(',');
      frac[c] = parseFloat(f); aaOf[c] = a;
      (options[a] = options[a] || []).push(c);
    }
    const opts = {};
    for (const a in options) {
      const ranked = options[a].slice().sort((x, y) => frac[y] - frac[x]);
      let kept = ranked.filter((c) => frac[c] >= minFrac);
      if (kept.length < Math.min(2, ranked.length)) kept = ranked.slice(0, 2);
      opts[a] = kept;
    }
    return { frac, aaOf, options: opts };
  }

  const COMP = { A: 'T', C: 'G', G: 'C', T: 'A' };
  const revcomp = (s) => { let o = ''; for (let i = s.length - 1; i >= 0; i--) o += COMP[s[i]] || 'N'; return o; };
  const gcOf = (s) => { let n = 0; for (const c of s) if (c === 'G' || c === 'C') n++; return s.length ? n / s.length : 0; };
  const cpgOf = (s) => { let n = 0; for (let i = 0; i + 1 < s.length; i++) if (s[i] === 'C' && s[i + 1] === 'G') n++; return n; };

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function translate(table, dna) {
    dna = dna.toUpperCase().replace(/U/g, 'T');
    if (dna.length % 3) throw new Error(`${dna.length} bases is not a whole number of codons`);
    let out = '';
    for (let i = 0; i < dna.length; i += 3) {
      const a = table.aaOf[dna.slice(i, i + 3)];
      if (!a) throw new Error(`"${dna.slice(i, i + 3)}" is not a codon`);
      out += a;
    }
    return out;
  }

  // ---- sampling --------------------------------------------------------------

  function sampleOne(table, aa, rnd, exp, cpgPenalty) {
    // Gly, Ala, Val, Glu and Asp have only G-starting codons, so a codon ending in C
    // in front of one of them forces a CpG. Look one residue ahead and avoid that too.
    const forcedG = [];
    for (let i = 0; i < aa.length; i++)
      forcedG.push(i + 1 < aa.length && table.options[aa[i + 1]].every((c) => c[0] === 'G'));
    let seq = '', prevBase = '';
    for (let i = 0; i < aa.length; i++) {
      const a = aa[i];
      const opts = table.options[a];
      let tot = 0;
      const w = opts.map((c) => {
        let v = Math.pow(table.frac[c], exp);
        if ((prevBase + c).includes('CG')) v *= cpgPenalty;   // CpG made here
        if (forcedG[i] && c.slice(-1) === 'C') v *= cpgPenalty;  // CpG forced next codon
        tot += v; return v;
      });
      let r = rnd() * tot, p = 0;
      while (p < w.length - 1 && (r -= w[p]) > 0) p++;
      seq += opts[p];
      prevBase = opts[p].slice(-1);
    }
    return seq;
  }

  function canon(x, both) { if (!both) return x; const r = revcomp(x); return x <= r ? x : r; }

  function kmerHits(seq, k, pool, both) {
    // number of positions whose k-mer is already in the pool or repeated here
    const own = new Set();
    let hits = 0;
    for (let i = 0; i + k <= seq.length; i++) {
      const key = canon(seq.slice(i, i + k), both);
      if (pool.has(key) || own.has(key)) hits++;
      own.add(key);
    }
    return hits;
  }

  function softCost(table, seq, cpgWeight) {
    let c = 0;
    for (let i = 0; i < seq.length; i += 3) c -= Math.log(table.frac[seq.slice(i, i + 3)]);
    c /= seq.length / 3;
    c += cpgWeight * cpgOf(seq) / Math.max(1, seq.length - 1);
    const g = gcOf(seq);
    c += 3 * (Math.max(0, 0.40 - g) + Math.max(0, g - 0.62));
    return c;
  }

  function hitPositions(seq, k, pool, both) {
    const own = new Set(), pos = [];
    for (let i = 0; i + k <= seq.length; i++) {
      const key = canon(seq.slice(i, i + k), both);
      if (pool.has(key) || own.has(key)) pos.push(i);
      own.add(key);
    }
    return pos;
  }

  function touchUp(table, seq, peptide, k, pool, both, rnd, maxSteps, cpgWeight) {
    // cheap hill climb: re-roll a codon inside a clashing window, keep the change if
    // the number of clashing positions goes down. Among codons that fix the clash
    // equally well, prefer the one that adds no CpG and is the more common codon.
    let pos = hitPositions(seq, k, pool, both);
    for (let step = 0; step < maxSteps && pos.length; step++) {
      const p = pos[(rnd() * pos.length) | 0];
      const lo = Math.floor(p / 3), hi = Math.min(peptide.length - 1, Math.floor((p + k) / 3));
      const i = lo + ((rnd() * (hi - lo + 1)) | 0);
      const cur = seq.slice(3 * i, 3 * i + 3);
      const opts = table.options[peptide[i]].filter((c) => c !== cur);
      if (!opts.length) continue;
      let best = null;
      for (const alt of opts) {
        const cand = seq.slice(0, 3 * i) + alt + seq.slice(3 * i + 3);
        const np = hitPositions(cand, k, pool, both);
        const score = [np.length, cpgWeight ? cpgOf(cand) : 0, -table.frac[alt]];
        if (!best || score[0] < best.score[0] ||
            (score[0] === best.score[0] && score[1] < best.score[1]) ||
            (score[0] === best.score[0] && score[1] === best.score[1] && score[2] < best.score[2]))
          best = { cand, np, score };
      }
      if (best && best.np.length < pos.length) { seq = best.cand; pos = best.np; }
    }
    return { seq, hits: pos.length };
  }

  function designVariants(table, peptide, n, opt) {
    const { k = 12, tries = 400, bothStrands = true, exp = 2, context = [], seed = 0,
            cpgPenalty = 0.1, cpgWeight = 2 } = opt;
    const rnd = mulberry32(seed);
    const pool = new Set();
    const addPool = (s) => {
      for (let i = 0; i + k <= s.length; i++) pool.add(canon(s.slice(i, i + k), bothStrands));
    };
    for (const c of context) addPool(c);
    const out = [];
    for (let v = 0; v < n; v++) {
      let best = null;
      for (let t = 0; t < tries; t++) {
        const cand = sampleOne(table, peptide, rnd, exp, cpgPenalty);
        const hits = kmerHits(cand, k, pool, bothStrands);
        const soft = softCost(table, cand, cpgWeight);
        if (!best || hits < best.hits || (hits === best.hits && soft < best.soft))
          best = { seq: cand, hits, soft };
        if (best.hits === 0 && t > tries / 4) break;      // good enough, stop early
      }
      if (best.hits) {
        const fixed = touchUp(table, best.seq, peptide, k, pool, bothStrands, rnd,
                              40 * best.hits + 200, cpgWeight);
        best = { seq: fixed.seq, hits: fixed.hits, soft: softCost(table, fixed.seq, cpgWeight) };
      }
      out.push(best);
      addPool(best.seq);
    }
    return out;
  }

  // ---- metrics ---------------------------------------------------------------

  function kmerSet(s, k) { const o = new Set(); for (let i = 0; i + k <= s.length; i++) o.add(s.slice(i, i + k)); return o; }

  function maxShared(a, b, both) {
    const test = (k) => {
      if (!k) return true;
      const bs = kmerSet(b, k);
      if (both) for (const x of kmerSet(revcomp(b), k)) bs.add(x);
      for (let i = 0; i + k <= a.length; i++) if (bs.has(a.slice(i, i + k))) return true;
      return false;
    };
    let lo = 0, hi = Math.min(a.length, b.length);
    while (lo < hi) { const m = (lo + hi + 1) >> 1; if (test(m)) lo = m; else hi = m - 1; }
    return lo;
  }

  function selfRepeat(s, both) {
    const test = (k) => {
      if (!k) return true;
      const seen = new Set();
      for (let i = 0; i + k <= s.length; i++) {
        const x = s.slice(i, i + k);
        if (seen.has(x) || (both && seen.has(revcomp(x)))) return true;
        seen.add(x);
      }
      return false;
    };
    let lo = 0, hi = (s.length >> 1) + 1;
    while (lo < hi) { const m = (lo + hi + 1) >> 1; if (test(m)) lo = m; else hi = m - 1; }
    return lo;
  }

  function flags(seq, maxHomo) {
    const f = [];
    for (const m in SITES)
      if (seq.includes(m) || seq.includes(revcomp(m))) f.push(SITES[m]);
    for (const b of 'ACGT') if (seq.includes(b.repeat(maxHomo))) f.push(`${maxHomo}+ ${b}`);
    return [...new Set(f)];
  }

  function meanFrac(table, s) {
    let t = 0, n = 0;
    for (let i = 0; i < s.length; i += 3) { t += table.frac[s.slice(i, i + 3)]; n++; }
    return t / n;
  }

  // (pure, mirrors docs/index.html's sanityCheck)
  function sanityCheck(seqs, peptide, table) {
    const bad = [];
    seqs.forEach((s, i) => {
      const name = seqs.length > 1 ? 'sequence ' + (i + 1) : 'the sequence';
      if (!/^[ACGT]+$/.test(s)) bad.push(name + ': contains a non-ACGT character');
      if (s.length % 3) bad.push(name + ': length ' + s.length + ' is not a whole number of codons');
      if (s.length !== peptide.length * 3) bad.push(name + ': ' + s.length + ' bp for a ' + peptide.length + ' aa peptide');
      let tr = '';
      try { tr = translate(table, s); } catch (e) { bad.push(name + ': ' + e.message); return; }
      if (tr !== peptide) {
        let at = 0; while (at < tr.length && tr[at] === peptide[at]) at++;
        bad.push(name + ': translation differs at residue ' + (at + 1) +
          ' (' + (tr[at] || '-') + ' instead of ' + (peptide[at] || '-') + ')');
      }
      const stop = tr.indexOf('*');
      if (stop >= 0 && stop < tr.length - 1) bad.push(name + ': stop codon at residue ' + (stop + 1));
    });
    if (new Set(seqs).size !== seqs.length) bad.push('two sequences are identical');
    return bad;
  }

  // ---- high-level engine -----------------------------------------------------

  // Synchronous equivalent of the page's designAsync(): draw `tries` candidates
  // per sequence, keep the best by (repeat hits, then soft cost), then hill-climb
  // away any remaining shared k-mers. Identical random-number consumption to the
  // page, so with the same seed it returns the same sequences.
  function designCore(table, peptide, n, opt) {
    const k = opt.k, both = opt.bothStrands;
    const rnd = mulberry32(opt.seed);
    const pool = new Set();
    const addPool = (s) => { for (let i = 0; i + k <= s.length; i++) pool.add(canon(s.slice(i, i + k), both)); };
    (opt.context || []).forEach(addPool);
    const out = [];
    for (let v = 0; v < n; v++) {
      let best = null;
      for (let t = 0; t < opt.tries; t++) {
        const cand = sampleOne(table, peptide, rnd, 2, opt.cpgPenalty);
        const hits = kmerHits(cand, k, pool, both);
        const soft = softCost(table, cand, opt.cpgWeight);
        if (!best || hits < best.hits || (hits === best.hits && soft < best.soft))
          best = { seq: cand, hits: hits, soft: soft };
        if (best.hits === 0 && t > opt.tries / 4) break;   // good enough, stop early
      }
      for (let round = 0; best.hits && round < 60; round++) {
        const fixed = touchUp(table, best.seq, peptide, k, pool, both, rnd, 60, opt.cpgWeight);
        const stuck = fixed.hits === best.hits && fixed.seq === best.seq;
        best = { seq: fixed.seq, hits: fixed.hits, soft: softCost(table, fixed.seq, opt.cpgWeight) };
        if (stuck) break;
      }
      out.push(best.seq);
      addPool(best.seq);
    }
    return out;
  }

  const clamp = (x, lo, hi, dflt) => {
    const v = Number.isFinite(+x) ? +x : dflt;
    return Math.max(lo, Math.min(hi, v));
  };
  const cleanSeq = (s) => String(s == null ? '' : s).toUpperCase().replace(/[^A-Z*]/g, '');

  // Defaults mirror the web form exactly (CpG avoidance "mild", seed 1, etc.).
  const DEFAULTS = {
    species: DEFAULT_TAXID, mode: 'auto', minFrac: 0.08, k: 12, tries: 300,
    bothStrands: true, homopolymer: 7, cpg: 'mild', context: [], variants: 0, seed: 1,
  };

  function speciesList() {
    return Object.keys(CODON_TABLES).map((id) => ({
      id: id, label: CODON_TABLES[id].label, group: CODON_TABLES[id].group,
    }));
  }

  // Main entry point. Takes one options object, returns a plain result object
  // (JSON-serializable). Throws Error on bad input, same messages as the page.
  function optimize(input) {
    const o = Object.assign({}, DEFAULTS, input || {});
    if (!CODON_TABLES[o.species])
      throw new Error('unknown species "' + o.species + '"; see optimize.species() for the list');
    const table = buildTable(CODON_TABLES[o.species].data, clamp(o.minFrac, 0, 0.5, 0.08) || 0);

    const s = cleanSeq(o.sequence);
    if (!s) throw new Error('enter a peptide or a coding sequence');
    const looksDna = s.length >= 3 && s.length % 3 === 0 && /^[ACGTU]+$/.test(s);
    let peptide, dna = null;
    if (o.mode === 'dna' || (o.mode === 'auto' && looksDna)) {
      peptide = translate(table, s); dna = s.replace(/U/g, 'T');
    } else {
      for (const a of s) if (!(a in table.options)) throw new Error('"' + a + '" is not an amino-acid letter');
      peptide = s;
    }

    const k = clamp(o.k, 6, 40, 12) | 0;
    const tries = clamp(o.tries, 20, 3000, 300) | 0;
    const both = o.bothStrands !== false;
    const homo = clamp(o.homopolymer, 4, 12, 7) | 0;
    const cpg = (o.cpg === 'off' || o.cpg === 'mild' || o.cpg === 'strong') ? o.cpg : 'mild';
    const cpgPenalty = cpg === 'off' ? 1 : cpg === 'mild' ? 0.5 : 0.1;
    const cpgWeight = cpg === 'off' ? 0 : cpg === 'mild' ? 2 : 8;
    const ctxIn = Array.isArray(o.context) ? o.context : (o.context ? [o.context] : []);
    const context = ctxIn.map(cleanSeq).filter((c) => c.length >= k);
    const nVar = clamp(o.variants, 0, 12, 0) | 0;
    const seed = (o.seed | 0);

    const common = { k: k, tries: tries, bothStrands: both, cpgPenalty: cpgPenalty, cpgWeight: cpgWeight };
    const main = designCore(table, peptide, 1, Object.assign({ seed: seed, context: context }, common))[0];
    const variants = nVar
      ? designCore(table, peptide, nVar,
          Object.assign({}, common, { seed: seed + 1, context: context.concat([main]) }))
      : [];

    const stat = (seq) => ({
      length: seq.length,
      gc: +gcOf(seq).toFixed(4),
      cpg: cpgOf(seq),
      cpgPercent: +(100 * cpgOf(seq) / Math.max(1, seq.length - 1)).toFixed(2),
      meanCodonFraction: +meanFrac(table, seq).toFixed(4),
      longestInternalRepeat: selfRepeat(seq, both),
      flags: flags(seq, homo),
    });

    const all = [main].concat(variants);
    return {
      species: o.species,
      inputType: dna ? 'dna' : 'peptide',
      peptide: peptide,
      optimized: main,
      optimizedStats: stat(main),
      variants: variants.map((seq) => ({
        sequence: seq,
        stats: stat(seq),
        longestSharedWithOptimized: maxShared(seq, main, both),
      })),
      parameters: { species: o.species, minFrac: table ? (clamp(o.minFrac, 0, 0.5, 0.08) || 0) : 0,
        k: k, tries: tries, bothStrands: both, homopolymer: homo, cpg: cpg, seed: seed, variants: nVar },
      checksPassed: sanityCheck(all, peptide, table).length === 0,
      checks: sanityCheck(all, peptide, table),
    };
  }

  optimize.species = speciesList;
  optimize.defaults = function () { return Object.assign({}, DEFAULTS); };

  return {
    optimize: optimize,
    designCore: designCore,
    speciesList: speciesList,
    // high-level + metrics
    buildTable: buildTable, translate: translate, revcomp: revcomp,
    gcOf: gcOf, cpgOf: cpgOf, meanFrac: meanFrac, flags: flags,
    selfRepeat: selfRepeat, maxShared: maxShared, kmerSet: kmerSet,
    sanityCheck: sanityCheck,
    // sampling / scoring primitives (used by the page's own designAsync)
    mulberry32: mulberry32, sampleOne: sampleOne, canon: canon,
    kmerHits: kmerHits, hitPositions: hitPositions, softCost: softCost,
    touchUp: touchUp,
    // data
    CODON_TABLES: CODON_TABLES, DEFAULT_TAXID: DEFAULT_TAXID, SITES: SITES,
  };
});
