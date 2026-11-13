#!/usr/bin/env node
/*
 * cli.js — command-line front end for the Danionella codon optimizer.
 *
 * Reads a peptide or coding sequence, runs the same engine as the web tool
 * (codon.js), and prints the result as JSON (default) or FASTA. No dependencies.
 *
 *   node cli.js --seq MACGTWKLLAGT
 *   node cli.js --seq MACGT... --species tax9606 --cpg strong --variants 3
 *   echo MACGTWKLLAGT | node cli.js --fasta
 *   node cli.js --list-species
 *
 * As a library instead:  const { optimize } = require('./codon.js');
 */
'use strict';
const fs = require('fs');
const { optimize } = require('./codon.js');

// exit quietly if the reader (e.g. `| head`) closes the pipe early
process.stdout.on('error', (e) => { if (e.code === 'EPIPE') process.exit(0); throw e; });

const HELP = `codon-optimize — codon-optimize a peptide or coding sequence (fish/other species)

Usage:
  codon-optimize [--seq <SEQUENCE>] [options]
  echo <SEQUENCE> | codon-optimize [options]

Input:
  --seq, -s <str>     Peptide (1-letter) or coding sequence. If omitted, read from stdin.
  --mode <m>          auto | pep | dna            (default auto)
  --species <id>      Codon table id, e.g. tax9606 (default dcerebrum). See --list-species.

Design:
  --cpg <m>           CpG avoidance: off | mild | strong   (default mild)
  --variants, -n <N>  Also design N alternative sequences   (default 0)
  --k <N>             Repeat window, bp                      (default 12)
  --tries <N>         Candidates sampled per sequence        (default 300)
  --minfrac <f>       Drop codons rarer than this fraction   (default 0.08)
  --homo <N>          Flag homopolymer runs of this length   (default 7)
  --seed <N>          Random seed (same seed = same output)  (default 1)
  --no-both           Do not check the reverse strand for repeats/sites
  --context <seq>     A sequence variants must not share long stretches with.
                      Repeatable: --context SEQ1 --context SEQ2

Output:
  --fasta             Print FASTA instead of JSON
  --list-species      Print the available codon tables and exit
  --help, -h          This help

Exit status is non-zero on bad input.`;

function parseArgs(argv) {
  const o = { context: [] };
  const next = (i, name) => {
    if (i + 1 >= argv.length) { throw new Error('missing value for ' + name); }
    return argv[++i];
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case '--help': case '-h': o.help = true; break;
      case '--list-species': o.listSpecies = true; break;
      case '--fasta': o.fasta = true; break;
      case '--no-both': o.bothStrands = false; break;
      case '--seq': case '-s': o.sequence = argv[++i]; break;
      case '--mode': o.mode = next(i++, a); break;
      case '--species': o.species = next(i++, a); break;
      case '--cpg': o.cpg = next(i++, a); break;
      case '--variants': case '-n': o.variants = +next(i++, a); break;
      case '--k': o.k = +next(i++, a); break;
      case '--tries': o.tries = +next(i++, a); break;
      case '--minfrac': o.minFrac = +next(i++, a); break;
      case '--homo': o.homopolymer = +next(i++, a); break;
      case '--seed': o.seed = +next(i++, a); break;
      case '--context': o.context.push(next(i++, a)); break;
      default:
        if (a[0] === '-') throw new Error('unknown option: ' + a);
        if (o.sequence == null) o.sequence = a;          // positional sequence
        else throw new Error('unexpected argument: ' + a);
    }
  }
  if (!o.context.length) delete o.context;
  return o;
}

function toFasta(result) {
  const wrap = (s) => (s.match(/.{1,60}/g) || []).join('\n');
  const out = ['>optimized ' + result.species + ' | ' + result.peptide.length + 'aa', wrap(result.optimized)];
  result.variants.forEach((v, i) => { out.push('>variant_' + (i + 1), wrap(v.sequence)); });
  return out.join('\n') + '\n';
}

function main() {
  let opts;
  try { opts = parseArgs(process.argv.slice(2)); }
  catch (e) { process.stderr.write('error: ' + e.message + '\n\n' + HELP + '\n'); process.exit(2); }

  if (opts.help) { process.stdout.write(HELP + '\n'); return; }
  if (opts.listSpecies) {
    let group = null;
    for (const s of optimize.species()) {
      if (s.group !== group) { group = s.group; process.stdout.write('\n' + group + ':\n'); }
      process.stdout.write('  ' + s.id.padEnd(12) + s.label + '\n');
    }
    return;
  }

  if (opts.sequence == null) {
    try { opts.sequence = fs.readFileSync(0, 'utf8'); }   // stdin
    catch (e) { opts.sequence = ''; }
  }
  // allow FASTA-ish stdin: drop header lines
  opts.sequence = String(opts.sequence).split('\n').filter((l) => l[0] !== '>').join('');

  let result;
  try { result = optimize(opts); }
  catch (e) { process.stderr.write('error: ' + e.message + '\n'); process.exit(1); }

  if (!result.checksPassed)
    process.stderr.write('warning: internal checks failed: ' + result.checks.join('; ') + '\n');

  process.stdout.write(opts.fasta ? toFasta(result) : JSON.stringify(result, null, 2) + '\n');
}

main();
