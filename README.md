# Codon optimization for fish

A single-page tool that codon-optimizes a peptide or coding sequence, keeps every codon
editable by hand, and can design alternative sequences encoding the same peptide — so that
repeated elements in one construct (P2A, linkers, tags, a second copy of a gene) are not
identical at the DNA level.

**[Open the tool](https://danionella.github.io/codon-tool/)**

The site is three files in [`web/`](web/) — the page [`index.html`](web/index.html), the engine
[`codon.js`](web/codon.js) it loads, and the data [`tables.js`](web/tables.js) (codon usage and
restriction sites) — with no build step, no third-party dependencies and no network calls.
Download the folder and it works offline. GitHub Pages serves only `web/`, so the page, engine
and data are public but this README and the test are not.

## What it does

Given a peptide (or a coding sequence, whose translation is used), it draws a few hundred
candidate sequences and keeps the best one. Candidates are sampled codon by codon with
probability proportional to codon frequency, biased away from creating CpG dinucleotides,
and scored on codon frequency, CpG content, GC content globally and in 60 bp windows, and
repeats. A short hill-climbing pass then removes any remaining repeated k-mers.

The result is shown with its translation underneath, every codon clickable to swap in a
synonym, and bases differing from a pasted input highlighted. Alongside it: GC, CpG count
and percentage, mean codon fraction, longest internal repeat, and flags for 46 common
restriction sites (including Golden Gate Type IIS enzymes, checked on both strands), the
`AATAAA` polyadenylation signal and homopolymer runs. Flags are reported, not avoided.

### Alternative variants

Tick the box and it designs N further sequences that share no identical stretch longer
than the repeat window with the optimized sequence, with each other, or with any context
sequences you paste in. The longest perfectly identical stretch — not percent identity —
is what drives recombination between repeats, mispriming and synthesis-vendor repeat
filters, so that is what the search constrains and the tables report.

Timings in a browser, 300 samples per sequence: a 22 aa P2A with five variants takes well
under a tenth of a second, a 240 aa protein with four variants about half a second, and a
1368 aa protein with three variants a few seconds.

### Checks

Every result is re-checked before it is shown: ACGT only, a whole number of codons, the
translation identical to the input, no internal stop, and no two sequences identical. The
check also runs on every hand edit, and reports only when something is wrong.

## Programmatic use (library)

The engine is a dependency-free module, [`web/codon.js`](web/codon.js), that the page itself
loads — so it is the same code the tool runs, not a copy. You can call it from your own code,
in Node or in the browser.

In Node:

```js
const { optimize } = require('./web/codon.js');

const result = optimize({ sequence: 'MACGTWKLLAGT', species: 'tax9606', cpg: 'strong', variants: 2 });
console.log(result.optimized);              // "ATG..."
console.log(result.variants[0].sequence);   // an alternative encoding the same peptide
```

In a browser (served from the GitHub Pages site, so no install), it defines `window.CodonLib`:

```html
<script src="https://danionella.github.io/codon-tool/codon.js"></script>
<script>
  const r = CodonLib.optimize({ sequence: 'MACGTWKLLAGT', variants: 2 });
  console.log(r.optimized);
</script>
```

`optimize(options)` returns a plain, JSON-serializable object: `optimized`, `peptide`,
`optimizedStats` (length, GC, CpG count and percent, mean codon fraction, longest internal
repeat, restriction/motif `flags`), a `variants` array, the `parameters` used, and
`checksPassed`/`checks`. Options mirror the web form and all have the same defaults:
`species` (default `dcerebrum`), `mode` (`auto`/`pep`/`dna`), `cpg` (`off`/`mild`/`strong`,
default `mild`), `variants`, `k`, `tries`, `minFrac`, `homopolymer`, `bothStrands`,
`context` (sequences variants must stay distinct from), and `seed` (same seed → same
output). `optimize.species()` lists the available codon tables.

There is no hosted HTTP endpoint: the tool is a static page, so there is no server to run
one. If you want a "submit a sequence, get JSON back" web service, or to call it from another
language, wrap `optimize()` in a handler for whatever runs your code (a serverless function,
or a small local server) — it is a pure function with no I/O.

The page loads `codon.js` for the whole algorithm, so there is only one implementation. The
page keeps its own interactive, cancellable sampling loop on top of it; the test in
[`test/`](test/) drives the actual page in a headless browser and asserts it produces
byte-identical output to `codon.js`'s `optimize()` across a range of inputs, so the two
cannot silently diverge. Run it with `node test/equivalence.test.js` (needs
[Playwright](https://playwright.dev) available, e.g. `npm i -D playwright`).

## Codon tables

33 species, each computed from genome annotations. The numbers live in
[`web/tables.js`](web/tables.js) as plain data — a shared `geneticCode` (codon → amino acid),
then per-species `frequencies` (how often each codon is used among its synonyms), plus the
`restrictionSites` that results are flagged against. To adjust a value, add a species, or add
an enzyme, edit that file; nothing else needs to change. (It is a `.js` file rather than
`.json` or `.yaml` only so the page can load it offline without a build step or a parser
library — the contents are otherwise just data.)

*Danionella cerebrum* is the default. It was computed from the MAKER annotation of
Kadobianskyi et al. (2019), by resolving each transcript's reading frame against its
protein record, keeping CDSs with no ambiguous bases, at least 100 codons, an ATG start
and no internal stop, and taking the longest isoform per gene: **19,327 genes, 10.8 million
codons**. It differs from zebrafish by 0.013 per codon on average (max 0.034), with a
systematic shift toward G and C at the third position (GC3 = 0.547). Whether that reflects
biology or the annotation — gene models built partly on zebrafish protein evidence, on a
2019 draft assembly — is unresolved; recomputing on a chromosome-level *D. cerebrum*
annotation would settle it.

The other 32 species come from CoCoPUTs RefSeq tables: eight fish, nine other vertebrates,
eight invertebrates and seven microbes and plants, including the usual expression hosts
(CHO, Sf9, Pichia, E. coli, yeast). Each table names its assembly accession and CDS count.

## Embedding

The page reports its height to a parent window when loaded in an iframe, so an embed can
resize itself:

```html
<iframe id="codonFrame" src="https://YOUR-USERNAME.github.io/codon-optimization/"
        title="Codon optimization"
        style="width:100%; height:900px; border:0; display:block;"></iframe>
<script>
window.addEventListener('message', function (e) {
  if (e.data && e.data.codonHeight && e.source === document.getElementById('codonFrame').contentWindow) {
    document.getElementById('codonFrame').style.height = (e.data.codonHeight + 20) + 'px';
  }
});
</script>
```

## Caveats

Codon optimization is not a solved problem and this tool makes no claim about expression
levels. It biases codon choice toward what the chosen genome uses, keeps CpG and repeats
down, and reports what it cannot fix. It does not model mRNA secondary structure, splice
sites, ribosome pausing or codon-pair bias, and the genome-wide tables are not weighted by
expression — a table built from highly expressed genes would differ more from these than
the species differ from each other.

## Credits

Codon tables for *Danionella cerebrum* were computed from Kadobianskyi M, Schulze L,
Schuelke M, Judkewitz B (2019), [Hybrid genome assembly and annotation of *Danionella
translucida*](https://doi.org/10.1038/s41597-019-0161-z), *Scientific Data* 6:156. The
species was later described as *D. cerebrum* by Britz, Conway and Rüber (2021).

All other tables are from CoCoPUTs: Alexaki A et al. (2019), [Codon and codon-pair usage
tables](https://doi.org/10.1016/j.jmb.2019.04.021), *Journal of Molecular Biology*
431:2434, computed over the RefSeq assemblies named beside each table.
