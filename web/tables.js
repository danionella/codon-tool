/*
 * tables.js — data for the codon tool, kept separate so it is easy to read and edit.
 *
 *   - geneticCode:       codon → amino acid (standard code; shared by every species)
 *   - species:           per-organism codon usage. Each has a label, the group it is
 *                        shown under, its genome assembly, the CDS count it was counted
 *                        over, and frequencies: the fraction each codon is used among the
 *                        synonyms for its amino acid (the fractions for one amino acid sum
 *                        to ~1). Edit a number, add a species, and the tool picks it up.
 *   - restrictionSites:  recognition sequence → enzyme/motif name, flagged in results.
 *
 * Loaded by web/index.html as a <script> (defines window.CODON_DATA) and by
 * web/codon.js via require(). Plain data only — no code, no dependencies.
 */
var CODON_DATA = {
  geneticCode: {
    "TTT": "F", "TTC": "F", "TTA": "L", "TTG": "L", "TCT": "S", "TCC": "S", "TCA": "S", "TCG": "S",
    "TAT": "Y", "TAC": "Y", "TAA": "*", "TAG": "*", "TGT": "C", "TGC": "C", "TGA": "*", "TGG": "W",
    "CTT": "L", "CTC": "L", "CTA": "L", "CTG": "L", "CCT": "P", "CCC": "P", "CCA": "P", "CCG": "P",
    "CAT": "H", "CAC": "H", "CAA": "Q", "CAG": "Q", "CGT": "R", "CGC": "R", "CGA": "R", "CGG": "R",
    "ATT": "I", "ATC": "I", "ATA": "I", "ATG": "M", "ACT": "T", "ACC": "T", "ACA": "T", "ACG": "T",
    "AAT": "N", "AAC": "N", "AAA": "K", "AAG": "K", "AGT": "S", "AGC": "S", "AGA": "R", "AGG": "R",
    "GTT": "V", "GTC": "V", "GTA": "V", "GTG": "V", "GCT": "A", "GCC": "A", "GCA": "A", "GCG": "A",
    "GAT": "D", "GAC": "D", "GAA": "E", "GAG": "E", "GGT": "G", "GGC": "G", "GGA": "G", "GGG": "G"
  },

  species: {
    "dcerebrum": {
      label: "Danionella cerebrum", group: "Ray-finned fish",
      assembly: "MAKER annotation, Kadobianskyi 2019 (published as D. translucida)", cds: 19327,
      frequencies: {
        "TTT": 0.455, "TTC": 0.545, "TTA": 0.067, "TTG": 0.139, "TCT": 0.214, "TCC": 0.181, "TCA": 0.164, "TCG": 0.068,
        "TAT": 0.413, "TAC": 0.587, "TAA": 0.305, "TAG": 0.199, "TGT": 0.503, "TGC": 0.497, "TGA": 0.496, "TGG": 1.000,
        "CTT": 0.154, "CTC": 0.208, "CTA": 0.074, "CTG": 0.358, "CCT": 0.323, "CCC": 0.233, "CCA": 0.318, "CCG": 0.126,
        "CAT": 0.444, "CAC": 0.556, "CAA": 0.296, "CAG": 0.704, "CGT": 0.121, "CGC": 0.154, "CGA": 0.135, "CGG": 0.127,
        "ATT": 0.344, "ATC": 0.505, "ATA": 0.151, "ATG": 1.000, "ACT": 0.267, "ACC": 0.295, "ACA": 0.305, "ACG": 0.133,
        "AAT": 0.409, "AAC": 0.591, "AAA": 0.485, "AAG": 0.515, "AGT": 0.159, "AGC": 0.215, "AGA": 0.264, "AGG": 0.199,
        "GTT": 0.241, "GTC": 0.227, "GTA": 0.107, "GTG": 0.424, "GCT": 0.345, "GCC": 0.270, "GCA": 0.270, "GCG": 0.114,
        "GAT": 0.513, "GAC": 0.487, "GAA": 0.381, "GAG": 0.619, "GGT": 0.217, "GGC": 0.241, "GGA": 0.343, "GGG": 0.198
      },
    },
    "tax7955": {
      label: "Zebrafish (Danio rerio)", group: "Ray-finned fish",
      assembly: "GCF_000002035.6", cds: 57060,
      frequencies: {
        "TTT": 0.477, "TTC": 0.523, "TTA": 0.078, "TTG": 0.133, "TCT": 0.210, "TCC": 0.174, "TCA": 0.179, "TCG": 0.057,
        "TAT": 0.434, "TAC": 0.566, "TAA": 0.315, "TAG": 0.178, "TGT": 0.529, "TGC": 0.471, "TGA": 0.507, "TGG": 1.000,
        "CTT": 0.144, "CTC": 0.179, "CTA": 0.075, "CTG": 0.390, "CCT": 0.328, "CCC": 0.228, "CCA": 0.317, "CCG": 0.127,
        "CAT": 0.437, "CAC": 0.563, "CAA": 0.293, "CAG": 0.707, "CGT": 0.123, "CGC": 0.163, "CGA": 0.123, "CGG": 0.116,
        "ATT": 0.347, "ATC": 0.479, "ATA": 0.174, "ATG": 1.000, "ACT": 0.273, "ACC": 0.276, "ACA": 0.333, "ACG": 0.118,
        "AAT": 0.425, "AAC": 0.575, "AAA": 0.508, "AAG": 0.492, "AGT": 0.169, "AGC": 0.211, "AGA": 0.283, "AGG": 0.193,
        "GTT": 0.227, "GTC": 0.230, "GTA": 0.116, "GTG": 0.427, "GCT": 0.329, "GCC": 0.290, "GCA": 0.273, "GCG": 0.109,
        "GAT": 0.491, "GAC": 0.509, "GAA": 0.386, "GAG": 0.614, "GGT": 0.221, "GGC": 0.264, "GGA": 0.350, "GGG": 0.165
      },
    },
    "tax7957": {
      label: "Goldfish (Carassius auratus)", group: "Ray-finned fish",
      assembly: "GCF_003368295.1", cds: 96414,
      frequencies: {
        "TTT": 0.447, "TTC": 0.553, "TTA": 0.073, "TTG": 0.131, "TCT": 0.206, "TCC": 0.183, "TCA": 0.171, "TCG": 0.060,
        "TAT": 0.422, "TAC": 0.578, "TAA": 0.320, "TAG": 0.193, "TGT": 0.540, "TGC": 0.460, "TGA": 0.487, "TGG": 1.000,
        "CTT": 0.140, "CTC": 0.188, "CTA": 0.076, "CTG": 0.393, "CCT": 0.320, "CCC": 0.248, "CCA": 0.306, "CCG": 0.127,
        "CAT": 0.433, "CAC": 0.567, "CAA": 0.280, "CAG": 0.720, "CGT": 0.133, "CGC": 0.158, "CGA": 0.115, "CGG": 0.117,
        "ATT": 0.335, "ATC": 0.490, "ATA": 0.174, "ATG": 1.000, "ACT": 0.261, "ACC": 0.290, "ACA": 0.321, "ACG": 0.128,
        "AAT": 0.414, "AAC": 0.586, "AAA": 0.489, "AAG": 0.511, "AGT": 0.170, "AGC": 0.210, "AGA": 0.277, "AGG": 0.199,
        "GTT": 0.218, "GTC": 0.236, "GTA": 0.115, "GTG": 0.430, "GCT": 0.319, "GCC": 0.304, "GCA": 0.265, "GCG": 0.112,
        "GAT": 0.482, "GAC": 0.518, "GAA": 0.372, "GAG": 0.628, "GGT": 0.223, "GGC": 0.267, "GGA": 0.335, "GGG": 0.175
      },
    },
    "tax90988": {
      label: "Fathead minnow (Pimephales promelas)", group: "Ray-finned fish",
      assembly: "GCF_016745375.1", cds: 48041,
      frequencies: {
        "TTT": 0.440, "TTC": 0.560, "TTA": 0.072, "TTG": 0.136, "TCT": 0.197, "TCC": 0.188, "TCA": 0.168, "TCG": 0.073,
        "TAT": 0.405, "TAC": 0.595, "TAA": 0.300, "TAG": 0.196, "TGT": 0.536, "TGC": 0.464, "TGA": 0.504, "TGG": 1.000,
        "CTT": 0.134, "CTC": 0.194, "CTA": 0.077, "CTG": 0.388, "CCT": 0.305, "CCC": 0.260, "CCA": 0.286, "CCG": 0.149,
        "CAT": 0.414, "CAC": 0.586, "CAA": 0.287, "CAG": 0.713, "CGT": 0.124, "CGC": 0.165, "CGA": 0.118, "CGG": 0.128,
        "ATT": 0.322, "ATC": 0.501, "ATA": 0.177, "ATG": 1.000, "ACT": 0.253, "ACC": 0.290, "ACA": 0.308, "ACG": 0.148,
        "AAT": 0.399, "AAC": 0.601, "AAA": 0.485, "AAG": 0.515, "AGT": 0.164, "AGC": 0.209, "AGA": 0.265, "AGG": 0.199,
        "GTT": 0.209, "GTC": 0.242, "GTA": 0.109, "GTG": 0.439, "GCT": 0.302, "GCC": 0.319, "GCA": 0.242, "GCG": 0.137,
        "GAT": 0.462, "GAC": 0.538, "GAA": 0.362, "GAG": 0.638, "GGT": 0.212, "GGC": 0.270, "GGA": 0.327, "GGG": 0.190
      },
    },
    "tax8090": {
      label: "Medaka (Oryzias latipes)", group: "Ray-finned fish",
      assembly: "GCF_002234675.1", cds: 44778,
      frequencies: {
        "TTT": 0.439, "TTC": 0.561, "TTA": 0.054, "TTG": 0.122, "TCT": 0.181, "TCC": 0.228, "TCA": 0.146, "TCG": 0.066,
        "TAT": 0.324, "TAC": 0.676, "TAA": 0.263, "TAG": 0.196, "TGT": 0.445, "TGC": 0.555, "TGA": 0.541, "TGG": 1.000,
        "CTT": 0.122, "CTC": 0.193, "CTA": 0.058, "CTG": 0.450, "CCT": 0.285, "CCC": 0.293, "CCA": 0.275, "CCG": 0.147,
        "CAT": 0.344, "CAC": 0.656, "CAA": 0.249, "CAG": 0.751, "CGT": 0.089, "CGC": 0.180, "CGA": 0.103, "CGG": 0.142,
        "ATT": 0.296, "ATC": 0.559, "ATA": 0.144, "ATG": 1.000, "ACT": 0.231, "ACC": 0.339, "ACA": 0.276, "ACG": 0.154,
        "AAT": 0.308, "AAC": 0.692, "AAA": 0.443, "AAG": 0.557, "AGT": 0.132, "AGC": 0.246, "AGA": 0.240, "AGG": 0.247,
        "GTT": 0.210, "GTC": 0.274, "GTA": 0.084, "GTG": 0.432, "GCT": 0.298, "GCC": 0.342, "GCA": 0.236, "GCG": 0.124,
        "GAT": 0.386, "GAC": 0.614, "GAA": 0.347, "GAG": 0.653, "GGT": 0.185, "GGC": 0.294, "GGA": 0.313, "GGG": 0.208
      },
    },
    "tax105023": {
      label: "Killifish (Nothobranchius furzeri)", group: "Ray-finned fish",
      assembly: "GCF_001465895.1", cds: 36794,
      frequencies: {
        "TTT": 0.438, "TTC": 0.562, "TTA": 0.058, "TTG": 0.116, "TCT": 0.187, "TCC": 0.220, "TCA": 0.149, "TCG": 0.070,
        "TAT": 0.316, "TAC": 0.684, "TAA": 0.264, "TAG": 0.192, "TGT": 0.499, "TGC": 0.501, "TGA": 0.544, "TGG": 1.000,
        "CTT": 0.117, "CTC": 0.200, "CTA": 0.065, "CTG": 0.444, "CCT": 0.308, "CCC": 0.271, "CCA": 0.283, "CCG": 0.138,
        "CAT": 0.339, "CAC": 0.661, "CAA": 0.231, "CAG": 0.769, "CGT": 0.106, "CGC": 0.158, "CGA": 0.114, "CGG": 0.131,
        "ATT": 0.280, "ATC": 0.574, "ATA": 0.146, "ATG": 1.000, "ACT": 0.222, "ACC": 0.348, "ACA": 0.269, "ACG": 0.160,
        "AAT": 0.302, "AAC": 0.698, "AAA": 0.440, "AAG": 0.560, "AGT": 0.134, "AGC": 0.240, "AGA": 0.245, "AGG": 0.246,
        "GTT": 0.213, "GTC": 0.268, "GTA": 0.091, "GTG": 0.428, "GCT": 0.332, "GCC": 0.329, "GCA": 0.229, "GCG": 0.110,
        "GAT": 0.405, "GAC": 0.595, "GAA": 0.329, "GAG": 0.671, "GGT": 0.210, "GGC": 0.268, "GGA": 0.323, "GGG": 0.199
      },
    },
    "tax31033": {
      label: "Fugu (Takifugu rubripes)", group: "Ray-finned fish",
      assembly: "GCF_901000725.2", cds: 46294,
      frequencies: {
        "TTT": 0.398, "TTC": 0.602, "TTA": 0.053, "TTG": 0.120, "TCT": 0.166, "TCC": 0.235, "TCA": 0.132, "TCG": 0.084,
        "TAT": 0.311, "TAC": 0.689, "TAA": 0.265, "TAG": 0.204, "TGT": 0.445, "TGC": 0.555, "TGA": 0.531, "TGG": 1.000,
        "CTT": 0.104, "CTC": 0.211, "CTA": 0.054, "CTG": 0.460, "CCT": 0.265, "CCC": 0.313, "CCA": 0.258, "CCG": 0.164,
        "CAT": 0.312, "CAC": 0.688, "CAA": 0.225, "CAG": 0.775, "CGT": 0.097, "CGC": 0.183, "CGA": 0.101, "CGG": 0.144,
        "ATT": 0.267, "ATC": 0.592, "ATA": 0.142, "ATG": 1.000, "ACT": 0.197, "ACC": 0.372, "ACA": 0.249, "ACG": 0.181,
        "AAT": 0.309, "AAC": 0.691, "AAA": 0.426, "AAG": 0.574, "AGT": 0.127, "AGC": 0.256, "AGA": 0.218, "AGG": 0.257,
        "GTT": 0.178, "GTC": 0.291, "GTA": 0.082, "GTG": 0.449, "GCT": 0.274, "GCC": 0.375, "GCA": 0.213, "GCG": 0.138,
        "GAT": 0.368, "GAC": 0.632, "GAA": 0.324, "GAG": 0.676, "GGT": 0.185, "GGC": 0.316, "GGA": 0.287, "GGG": 0.213
      },
    },
    "tax7994": {
      label: "Mexican cavefish (Astyanax mexicanus)", group: "Ray-finned fish",
      assembly: "GCF_000372685.2", cds: 41116,
      frequencies: {
        "TTT": 0.423, "TTC": 0.577, "TTA": 0.060, "TTG": 0.105, "TCT": 0.193, "TCC": 0.204, "TCA": 0.149, "TCG": 0.063,
        "TAT": 0.356, "TAC": 0.644, "TAA": 0.311, "TAG": 0.207, "TGT": 0.477, "TGC": 0.523, "TGA": 0.482, "TGG": 1.000,
        "CTT": 0.115, "CTC": 0.189, "CTA": 0.071, "CTG": 0.460, "CCT": 0.306, "CCC": 0.277, "CCA": 0.281, "CCG": 0.137,
        "CAT": 0.358, "CAC": 0.642, "CAA": 0.209, "CAG": 0.791, "CGT": 0.102, "CGC": 0.189, "CGA": 0.104, "CGG": 0.142,
        "ATT": 0.310, "ATC": 0.522, "ATA": 0.167, "ATG": 1.000, "ACT": 0.256, "ACC": 0.324, "ACA": 0.283, "ACG": 0.137,
        "AAT": 0.356, "AAC": 0.644, "AAA": 0.437, "AAG": 0.563, "AGT": 0.157, "AGC": 0.233, "AGA": 0.240, "AGG": 0.224,
        "GTT": 0.190, "GTC": 0.221, "GTA": 0.117, "GTG": 0.472, "GCT": 0.318, "GCC": 0.324, "GCA": 0.241, "GCG": 0.117,
        "GAT": 0.431, "GAC": 0.569, "GAA": 0.319, "GAG": 0.681, "GGT": 0.202, "GGC": 0.290, "GGA": 0.314, "GGG": 0.195
      },
    },
    "tax8030": {
      label: "Atlantic salmon (Salmo salar)", group: "Ray-finned fish",
      assembly: "GCF_000233375.1", cds: 97576,
      frequencies: {
        "TTT": 0.339, "TTC": 0.661, "TTA": 0.041, "TTG": 0.100, "TCT": 0.172, "TCC": 0.253, "TCA": 0.130, "TCG": 0.066,
        "TAT": 0.289, "TAC": 0.711, "TAA": 0.250, "TAG": 0.247, "TGT": 0.520, "TGC": 0.480, "TGA": 0.503, "TGG": 1.000,
        "CTT": 0.078, "CTC": 0.217, "CTA": 0.085, "CTG": 0.479, "CCT": 0.270, "CCC": 0.375, "CCA": 0.248, "CCG": 0.106,
        "CAT": 0.303, "CAC": 0.697, "CAA": 0.196, "CAG": 0.804, "CGT": 0.104, "CGC": 0.181, "CGA": 0.074, "CGG": 0.132,
        "ATT": 0.220, "ATC": 0.609, "ATA": 0.171, "ATG": 1.000, "ACT": 0.205, "ACC": 0.403, "ACA": 0.261, "ACG": 0.131,
        "AAT": 0.276, "AAC": 0.724, "AAA": 0.339, "AAG": 0.661, "AGT": 0.143, "AGC": 0.235, "AGA": 0.220, "AGG": 0.290,
        "GTT": 0.139, "GTC": 0.278, "GTA": 0.105, "GTG": 0.478, "GCT": 0.256, "GCC": 0.430, "GCA": 0.207, "GCG": 0.107,
        "GAT": 0.324, "GAC": 0.676, "GAA": 0.231, "GAG": 0.769, "GGT": 0.181, "GGC": 0.303, "GGA": 0.257, "GGG": 0.259
      },
    },
    "tax9606": {
      label: "Human (Homo sapiens)", group: "Lobe-finned fish",
      assembly: "GCF_000001405.39", cds: 123938,
      frequencies: {
        "TTT": 0.495, "TTC": 0.505, "TTA": 0.089, "TTG": 0.138, "TCT": 0.197, "TCC": 0.201, "TCA": 0.164, "TCG": 0.047,
        "TAT": 0.473, "TAC": 0.527, "TAA": 0.276, "TAG": 0.223, "TGT": 0.490, "TGC": 0.510, "TGA": 0.500, "TGG": 1.000,
        "CTT": 0.144, "CTC": 0.182, "CTA": 0.076, "CTG": 0.370, "CCT": 0.304, "CCC": 0.301, "CCA": 0.298, "CCG": 0.098,
        "CAT": 0.447, "CAC": 0.553, "CAA": 0.284, "CAG": 0.716, "CGT": 0.081, "CGC": 0.156, "CGA": 0.115, "CGG": 0.193,
        "ATT": 0.381, "ATC": 0.432, "ATA": 0.187, "ATG": 1.000, "ACT": 0.263, "ACC": 0.329, "ACA": 0.305, "ACG": 0.103,
        "AAT": 0.502, "AAC": 0.498, "AAA": 0.464, "AAG": 0.536, "AGT": 0.163, "AGC": 0.229, "AGA": 0.238, "AGG": 0.217,
        "GTT": 0.200, "GTC": 0.229, "GTA": 0.130, "GTG": 0.441, "GCT": 0.280, "GCC": 0.381, "GCA": 0.251, "GCG": 0.087,
        "GAT": 0.498, "GAC": 0.502, "GAA": 0.459, "GAG": 0.541, "GGT": 0.172, "GGC": 0.314, "GGA": 0.271, "GGG": 0.243
      },
    },
    "tax10090": {
      label: "Mouse (Mus musculus)", group: "Lobe-finned fish",
      assembly: "GCF_000001635.27", cds: 92967,
      frequencies: {
        "TTT": 0.462, "TTC": 0.538, "TTA": 0.076, "TTG": 0.135, "TCT": 0.197, "TCC": 0.206, "TCA": 0.152, "TCG": 0.048,
        "TAT": 0.436, "TAC": 0.564, "TAA": 0.262, "TAG": 0.237, "TGT": 0.495, "TGC": 0.505, "TGA": 0.501, "TGG": 1.000,
        "CTT": 0.138, "CTC": 0.191, "CTA": 0.082, "CTG": 0.377, "CCT": 0.316, "CCC": 0.287, "CCA": 0.302, "CCG": 0.095,
        "CAT": 0.426, "CAC": 0.574, "CAA": 0.264, "CAG": 0.736, "CGT": 0.082, "CGC": 0.151, "CGA": 0.123, "CGG": 0.185,
        "ATT": 0.349, "ATC": 0.479, "ATA": 0.172, "ATG": 1.000, "ACT": 0.256, "ACC": 0.333, "ACA": 0.307, "ACG": 0.104,
        "AAT": 0.447, "AAC": 0.553, "AAA": 0.416, "AAG": 0.584, "AGT": 0.161, "AGC": 0.236, "AGA": 0.233, "AGG": 0.227,
        "GTT": 0.184, "GTC": 0.245, "GTA": 0.127, "GTG": 0.444, "GCT": 0.298, "GCC": 0.369, "GCA": 0.249, "GCG": 0.085,
        "GAT": 0.461, "GAC": 0.539, "GAA": 0.426, "GAG": 0.574, "GGT": 0.178, "GGC": 0.316, "GGA": 0.269, "GGG": 0.237
      },
    },
    "tax10116": {
      label: "Rat (Rattus norvegicus)", group: "Lobe-finned fish",
      assembly: "GCF_015227675.2", cds: 74846,
      frequencies: {
        "TTT": 0.454, "TTC": 0.546, "TTA": 0.075, "TTG": 0.135, "TCT": 0.197, "TCC": 0.206, "TCA": 0.153, "TCG": 0.049,
        "TAT": 0.430, "TAC": 0.570, "TAA": 0.259, "TAG": 0.234, "TGT": 0.494, "TGC": 0.506, "TGA": 0.507, "TGG": 1.000,
        "CTT": 0.138, "CTC": 0.191, "CTA": 0.083, "CTG": 0.377, "CCT": 0.316, "CCC": 0.286, "CCA": 0.300, "CCG": 0.097,
        "CAT": 0.419, "CAC": 0.581, "CAA": 0.265, "CAG": 0.735, "CGT": 0.085, "CGC": 0.148, "CGA": 0.123, "CGG": 0.182,
        "ATT": 0.349, "ATC": 0.477, "ATA": 0.174, "ATG": 1.000, "ACT": 0.256, "ACC": 0.333, "ACA": 0.305, "ACG": 0.106,
        "AAT": 0.445, "AAC": 0.555, "AAA": 0.417, "AAG": 0.583, "AGT": 0.163, "AGC": 0.233, "AGA": 0.235, "AGG": 0.227,
        "GTT": 0.186, "GTC": 0.244, "GTA": 0.127, "GTG": 0.444, "GCT": 0.295, "GCC": 0.370, "GCA": 0.247, "GCG": 0.088,
        "GAT": 0.452, "GAC": 0.548, "GAA": 0.428, "GAG": 0.572, "GGT": 0.178, "GGC": 0.315, "GGA": 0.269, "GGG": 0.238
      },
    },
    "tax10029": {
      label: "Chinese hamster / CHO (Cricetulus griseus)", group: "Lobe-finned fish",
      assembly: "GCF_003668045.3", cds: 45959,
      frequencies: {
        "TTT": 0.476, "TTC": 0.524, "TTA": 0.078, "TTG": 0.142, "TCT": 0.204, "TCC": 0.201, "TCA": 0.161, "TCG": 0.042,
        "TAT": 0.463, "TAC": 0.537, "TAA": 0.269, "TAG": 0.233, "TGT": 0.513, "TGC": 0.487, "TGA": 0.498, "TGG": 1.000,
        "CTT": 0.146, "CTC": 0.182, "CTA": 0.085, "CTG": 0.367, "CCT": 0.325, "CCC": 0.283, "CCA": 0.311, "CCG": 0.081,
        "CAT": 0.458, "CAC": 0.542, "CAA": 0.274, "CAG": 0.726, "CGT": 0.087, "CGC": 0.146, "CGA": 0.129, "CGG": 0.180,
        "ATT": 0.370, "ATC": 0.454, "ATA": 0.176, "ATG": 1.000, "ACT": 0.274, "ACC": 0.321, "ACA": 0.323, "ACG": 0.082,
        "AAT": 0.478, "AAC": 0.522, "AAA": 0.430, "AAG": 0.570, "AGT": 0.170, "AGC": 0.224, "AGA": 0.235, "AGG": 0.223,
        "GTT": 0.194, "GTC": 0.231, "GTA": 0.135, "GTG": 0.441, "GCT": 0.306, "GCC": 0.361, "GCA": 0.261, "GCG": 0.072,
        "GAT": 0.485, "GAC": 0.515, "GAA": 0.445, "GAG": 0.555, "GGT": 0.187, "GGC": 0.306, "GGA": 0.272, "GGG": 0.234
      },
    },
    "tax9544": {
      label: "Rhesus macaque (Macaca mulatta)", group: "Lobe-finned fish",
      assembly: "GCF_003339765.1", cds: 67214,
      frequencies: {
        "TTT": 0.491, "TTC": 0.509, "TTA": 0.089, "TTG": 0.136, "TCT": 0.193, "TCC": 0.203, "TCA": 0.160, "TCG": 0.050,
        "TAT": 0.466, "TAC": 0.534, "TAA": 0.280, "TAG": 0.225, "TGT": 0.487, "TGC": 0.513, "TGA": 0.495, "TGG": 1.000,
        "CTT": 0.143, "CTC": 0.181, "CTA": 0.076, "CTG": 0.375, "CCT": 0.300, "CCC": 0.303, "CCA": 0.291, "CCG": 0.105,
        "CAT": 0.444, "CAC": 0.556, "CAA": 0.278, "CAG": 0.722, "CGT": 0.083, "CGC": 0.165, "CGA": 0.117, "CGG": 0.198,
        "ATT": 0.381, "ATC": 0.436, "ATA": 0.183, "ATG": 1.000, "ACT": 0.263, "ACC": 0.329, "ACA": 0.299, "ACG": 0.110,
        "AAT": 0.498, "AAC": 0.502, "AAA": 0.461, "AAG": 0.539, "AGT": 0.163, "AGC": 0.231, "AGA": 0.227, "AGG": 0.210,
        "GTT": 0.196, "GTC": 0.228, "GTA": 0.130, "GTG": 0.445, "GCT": 0.275, "GCC": 0.383, "GCA": 0.247, "GCG": 0.095,
        "GAT": 0.494, "GAC": 0.506, "GAA": 0.452, "GAG": 0.548, "GGT": 0.170, "GGC": 0.322, "GGA": 0.266, "GGG": 0.242
      },
    },
    "tax9823": {
      label: "Pig (Sus scrofa)", group: "Lobe-finned fish",
      assembly: "GCF_000003025.6", cds: 61621,
      frequencies: {
        "TTT": 0.465, "TTC": 0.535, "TTA": 0.082, "TTG": 0.130, "TCT": 0.181, "TCC": 0.216, "TCA": 0.146, "TCG": 0.061,
        "TAT": 0.433, "TAC": 0.567, "TAA": 0.264, "TAG": 0.218, "TGT": 0.457, "TGC": 0.543, "TGA": 0.517, "TGG": 1.000,
        "CTT": 0.134, "CTC": 0.197, "CTA": 0.065, "CTG": 0.392, "CCT": 0.279, "CCC": 0.328, "CCA": 0.265, "CCG": 0.128,
        "CAT": 0.400, "CAC": 0.600, "CAA": 0.251, "CAG": 0.749, "CGT": 0.076, "CGC": 0.174, "CGA": 0.112, "CGG": 0.207,
        "ATT": 0.352, "ATC": 0.473, "ATA": 0.174, "ATG": 1.000, "ACT": 0.236, "ACC": 0.353, "ACA": 0.274, "ACG": 0.137,
        "AAT": 0.466, "AAC": 0.534, "AAA": 0.437, "AAG": 0.563, "AGT": 0.152, "AGC": 0.243, "AGA": 0.215, "AGG": 0.216,
        "GTT": 0.182, "GTC": 0.246, "GTA": 0.113, "GTG": 0.458, "GCT": 0.256, "GCC": 0.409, "GCA": 0.222, "GCG": 0.112,
        "GAT": 0.458, "GAC": 0.542, "GAA": 0.428, "GAG": 0.572, "GGT": 0.157, "GGC": 0.340, "GGA": 0.250, "GGG": 0.253
      },
    },
    "tax9031": {
      label: "Chicken (Gallus gallus)", group: "Lobe-finned fish",
      assembly: "GCF_016699485.2", cds: 59050,
      frequencies: {
        "TTT": 0.501, "TTC": 0.499, "TTA": 0.091, "TTG": 0.148, "TCT": 0.199, "TCC": 0.182, "TCA": 0.167, "TCG": 0.052,
        "TAT": 0.446, "TAC": 0.554, "TAA": 0.299, "TAG": 0.221, "TGT": 0.459, "TGC": 0.541, "TGA": 0.480, "TGG": 1.000,
        "CTT": 0.152, "CTC": 0.163, "CTA": 0.074, "CTG": 0.371, "CCT": 0.300, "CCC": 0.268, "CCA": 0.317, "CCG": 0.115,
        "CAT": 0.449, "CAC": 0.551, "CAA": 0.301, "CAG": 0.699, "CGT": 0.098, "CGC": 0.153, "CGA": 0.103, "CGG": 0.157,
        "ATT": 0.380, "ATC": 0.404, "ATA": 0.216, "ATG": 1.000, "ACT": 0.271, "ACC": 0.268, "ACA": 0.336, "ACG": 0.125,
        "AAT": 0.483, "AAC": 0.517, "AAA": 0.485, "AAG": 0.515, "AGT": 0.162, "AGC": 0.239, "AGA": 0.262, "AGG": 0.227,
        "GTT": 0.235, "GTC": 0.204, "GTA": 0.143, "GTG": 0.418, "GCT": 0.314, "GCC": 0.279, "GCA": 0.308, "GCG": 0.099,
        "GAT": 0.542, "GAC": 0.458, "GAA": 0.475, "GAG": 0.525, "GGT": 0.192, "GGC": 0.276, "GGA": 0.301, "GGG": 0.231
      },
    },
    "tax8364": {
      label: "Xenopus tropicalis", group: "Lobe-finned fish",
      assembly: "GCF_000004195.4", cds: 45044,
      frequencies: {
        "TTT": 0.577, "TTC": 0.423, "TTA": 0.125, "TTG": 0.158, "TCT": 0.228, "TCC": 0.174, "TCA": 0.181, "TCG": 0.044,
        "TAT": 0.525, "TAC": 0.475, "TAA": 0.392, "TAG": 0.205, "TGT": 0.515, "TGC": 0.485, "TGA": 0.403, "TGG": 1.000,
        "CTT": 0.192, "CTC": 0.132, "CTA": 0.107, "CTG": 0.285, "CCT": 0.322, "CCC": 0.217, "CCA": 0.375, "CCG": 0.087,
        "CAT": 0.523, "CAC": 0.477, "CAA": 0.385, "CAG": 0.615, "CGT": 0.106, "CGC": 0.125, "CGA": 0.115, "CGG": 0.124,
        "ATT": 0.414, "ATC": 0.317, "ATA": 0.269, "ATG": 1.000, "ACT": 0.295, "ACC": 0.246, "ACA": 0.376, "ACG": 0.083,
        "AAT": 0.544, "AAC": 0.456, "AAA": 0.536, "AAG": 0.464, "AGT": 0.179, "AGC": 0.195, "AGA": 0.299, "AGG": 0.230,
        "GTT": 0.276, "GTC": 0.189, "GTA": 0.191, "GTG": 0.344, "GCT": 0.323, "GCC": 0.268, "GCA": 0.336, "GCG": 0.072,
        "GAT": 0.587, "GAC": 0.413, "GAA": 0.531, "GAG": 0.469, "GGT": 0.199, "GGC": 0.223, "GGA": 0.346, "GGG": 0.231
      },
    },
    "tax8355": {
      label: "Xenopus laevis", group: "Lobe-finned fish",
      assembly: "GCF_017654675.1", cds: 72864,
      frequencies: {
        "TTT": 0.585, "TTC": 0.415, "TTA": 0.129, "TTG": 0.166, "TCT": 0.236, "TCC": 0.168, "TCA": 0.188, "TCG": 0.041,
        "TAT": 0.540, "TAC": 0.460, "TAA": 0.397, "TAG": 0.200, "TGT": 0.542, "TGC": 0.458, "TGA": 0.403, "TGG": 1.000,
        "CTT": 0.196, "CTC": 0.131, "CTA": 0.107, "CTG": 0.271, "CCT": 0.338, "CCC": 0.199, "CCA": 0.386, "CCG": 0.076,
        "CAT": 0.535, "CAC": 0.465, "CAA": 0.401, "CAG": 0.599, "CGT": 0.115, "CGC": 0.114, "CGA": 0.121, "CGG": 0.114,
        "ATT": 0.423, "ATC": 0.313, "ATA": 0.264, "ATG": 1.000, "ACT": 0.303, "ACC": 0.235, "ACA": 0.385, "ACG": 0.077,
        "AAT": 0.554, "AAC": 0.446, "AAA": 0.545, "AAG": 0.455, "AGT": 0.183, "AGC": 0.185, "AGA": 0.311, "AGG": 0.226,
        "GTT": 0.282, "GTC": 0.188, "GTA": 0.192, "GTG": 0.337, "GCT": 0.334, "GCC": 0.251, "GCA": 0.352, "GCG": 0.062,
        "GAT": 0.593, "GAC": 0.407, "GAA": 0.547, "GAG": 0.453, "GGT": 0.210, "GGC": 0.214, "GGA": 0.366, "GGG": 0.210
      },
    },
    "tax7227": {
      label: "Fruit fly (Drosophila melanogaster)", group: "Non-fish",
      assembly: "GCF_000001215.4", cds: 30704,
      frequencies: {
        "TTT": 0.380, "TTC": 0.620, "TTA": 0.052, "TTG": 0.181, "TCT": 0.085, "TCC": 0.228, "TCA": 0.099, "TCG": 0.203,
        "TAT": 0.381, "TAC": 0.619, "TAA": 0.392, "TAG": 0.331, "TGT": 0.307, "TGC": 0.693, "TGA": 0.277, "TGG": 1.000,
        "CTT": 0.099, "CTC": 0.153, "CTA": 0.093, "CTG": 0.422, "CCT": 0.130, "CCC": 0.321, "CCA": 0.258, "CCG": 0.291,
        "CAT": 0.407, "CAC": 0.593, "CAA": 0.309, "CAG": 0.691, "CGT": 0.164, "CGC": 0.326, "CGA": 0.157, "CGG": 0.148,
        "ATT": 0.342, "ATC": 0.460, "ATA": 0.198, "ATG": 1.000, "ACT": 0.173, "ACC": 0.369, "ACA": 0.203, "ACG": 0.256,
        "AAT": 0.455, "AAC": 0.545, "AAA": 0.300, "AAG": 0.700, "AGT": 0.141, "AGC": 0.244, "AGA": 0.094, "AGG": 0.112,
        "GTT": 0.194, "GTC": 0.232, "GTA": 0.112, "GTG": 0.463, "GCT": 0.193, "GCC": 0.441, "GCA": 0.177, "GCG": 0.189,
        "GAT": 0.538, "GAC": 0.462, "GAA": 0.341, "GAG": 0.659, "GGT": 0.217, "GGC": 0.422, "GGA": 0.288, "GGG": 0.074
      },
    },
    "tax6239": {
      label: "C. elegans", group: "Non-fish",
      assembly: "GCF_000002985.6", cds: 28338,
      frequencies: {
        "TTT": 0.477, "TTC": 0.523, "TTA": 0.109, "TTG": 0.232, "TCT": 0.207, "TCC": 0.129, "TCA": 0.258, "TCG": 0.156,
        "TAT": 0.558, "TAC": 0.442, "TAA": 0.491, "TAG": 0.179, "TGT": 0.556, "TGC": 0.444, "TGA": 0.330, "TGG": 1.000,
        "CTT": 0.250, "CTC": 0.173, "CTA": 0.091, "CTG": 0.144, "CCT": 0.178, "CCC": 0.086, "CCA": 0.536, "CCG": 0.199,
        "CAT": 0.612, "CAC": 0.388, "CAA": 0.653, "CAG": 0.347, "CGT": 0.216, "CGC": 0.095, "CGA": 0.237, "CGG": 0.091,
        "ATT": 0.534, "ATC": 0.315, "ATA": 0.151, "ATG": 1.000, "ACT": 0.326, "ACC": 0.175, "ACA": 0.345, "ACG": 0.154,
        "AAT": 0.624, "AAC": 0.376, "AAA": 0.583, "AAG": 0.417, "AGT": 0.150, "AGC": 0.101, "AGA": 0.290, "AGG": 0.071,
        "GTT": 0.390, "GTC": 0.219, "GTA": 0.157, "GTG": 0.234, "GCT": 0.357, "GCC": 0.197, "GCA": 0.315, "GCG": 0.131,
        "GAT": 0.680, "GAC": 0.320, "GAA": 0.625, "GAG": 0.375, "GGT": 0.206, "GGC": 0.124, "GGA": 0.591, "GGG": 0.078
      },
    },
    "tax7159": {
      label: "Mosquito (Aedes aegypti)", group: "Non-fish",
      assembly: "GCF_002204515.2", cds: 28043,
      frequencies: {
        "TTT": 0.333, "TTC": 0.667, "TTA": 0.073, "TTG": 0.215, "TCT": 0.100, "TCC": 0.185, "TCA": 0.117, "TCG": 0.231,
        "TAT": 0.347, "TAC": 0.653, "TAA": 0.407, "TAG": 0.264, "TGT": 0.437, "TGC": 0.563, "TGA": 0.329, "TGG": 1.000,
        "CTT": 0.111, "CTC": 0.137, "CTA": 0.105, "CTG": 0.358, "CCT": 0.172, "CCC": 0.194, "CCA": 0.287, "CCG": 0.347,
        "CAT": 0.452, "CAC": 0.548, "CAA": 0.435, "CAG": 0.565, "CGT": 0.162, "CGC": 0.176, "CGA": 0.224, "CGG": 0.221,
        "ATT": 0.333, "ATC": 0.487, "ATA": 0.180, "ATG": 1.000, "ACT": 0.186, "ACC": 0.328, "ACA": 0.189, "ACG": 0.297,
        "AAT": 0.422, "AAC": 0.578, "AAA": 0.455, "AAG": 0.545, "AGT": 0.172, "AGC": 0.195, "AGA": 0.119, "AGG": 0.098,
        "GTT": 0.251, "GTC": 0.241, "GTA": 0.157, "GTG": 0.351, "GCT": 0.233, "GCC": 0.344, "GCA": 0.221, "GCG": 0.203,
        "GAT": 0.540, "GAC": 0.460, "GAA": 0.572, "GAG": 0.428, "GGT": 0.272, "GGC": 0.268, "GGA": 0.339, "GGG": 0.121
      },
    },
    "tax7460": {
      label: "Honeybee (Apis mellifera)", group: "Non-fish",
      assembly: "GCF_003254395.2", cds: 23382,
      frequencies: {
        "TTT": 0.549, "TTC": 0.451, "TTA": 0.302, "TTG": 0.236, "TCT": 0.194, "TCC": 0.125, "TCA": 0.160, "TCG": 0.174,
        "TAT": 0.611, "TAC": 0.389, "TAA": 0.520, "TAG": 0.165, "TGT": 0.562, "TGC": 0.438, "TGA": 0.315, "TGG": 1.000,
        "CTT": 0.168, "CTC": 0.104, "CTA": 0.068, "CTG": 0.123, "CCT": 0.289, "CCC": 0.137, "CCA": 0.353, "CCG": 0.220,
        "CAT": 0.626, "CAC": 0.374, "CAA": 0.679, "CAG": 0.321, "CGT": 0.159, "CGC": 0.087, "CGA": 0.174, "CGG": 0.072,
        "ATT": 0.387, "ATC": 0.261, "ATA": 0.352, "ATG": 1.000, "ACT": 0.267, "ACC": 0.183, "ACA": 0.309, "ACG": 0.240,
        "AAT": 0.677, "AAC": 0.323, "AAA": 0.669, "AAG": 0.331, "AGT": 0.189, "AGC": 0.158, "AGA": 0.330, "AGG": 0.178,
        "GTT": 0.292, "GTC": 0.168, "GTA": 0.252, "GTG": 0.288, "GCT": 0.292, "GCC": 0.196, "GCA": 0.288, "GCG": 0.224,
        "GAT": 0.663, "GAC": 0.337, "GAA": 0.640, "GAG": 0.360, "GGT": 0.324, "GGC": 0.212, "GGA": 0.342, "GGG": 0.122
      },
    },
    "tax7108": {
      label: "Fall armyworm / Sf9 (Spodoptera frugiperda)", group: "Non-fish",
      assembly: "GCF_011064685.1", cds: 29994,
      frequencies: {
        "TTT": 0.359, "TTC": 0.641, "TTA": 0.147, "TTG": 0.175, "TCT": 0.170, "TCC": 0.164, "TCA": 0.176, "TCG": 0.152,
        "TAT": 0.368, "TAC": 0.632, "TAA": 0.427, "TAG": 0.243, "TGT": 0.456, "TGC": 0.544, "TGA": 0.329, "TGG": 1.000,
        "CTT": 0.104, "CTC": 0.170, "CTA": 0.125, "CTG": 0.279, "CCT": 0.254, "CCC": 0.214, "CCA": 0.290, "CCG": 0.242,
        "CAT": 0.425, "CAC": 0.575, "CAA": 0.468, "CAG": 0.532, "CGT": 0.119, "CGC": 0.220, "CGA": 0.129, "CGG": 0.128,
        "ATT": 0.298, "ATC": 0.362, "ATA": 0.340, "ATG": 1.000, "ACT": 0.281, "ACC": 0.231, "ACA": 0.268, "ACG": 0.220,
        "AAT": 0.450, "AAC": 0.550, "AAA": 0.500, "AAG": 0.500, "AGT": 0.168, "AGC": 0.169, "AGA": 0.225, "AGG": 0.179,
        "GTT": 0.194, "GTC": 0.233, "GTA": 0.201, "GTG": 0.372, "GCT": 0.273, "GCC": 0.258, "GCA": 0.206, "GCG": 0.263,
        "GAT": 0.447, "GAC": 0.553, "GAA": 0.514, "GAG": 0.486, "GGT": 0.257, "GGC": 0.336, "GGA": 0.269, "GGG": 0.139
      },
    },
    "tax7719": {
      label: "Ciona intestinalis", group: "Non-fish",
      assembly: "GCF_000224145.3", cds: 20938,
      frequencies: {
        "TTT": 0.592, "TTC": 0.408, "TTA": 0.208, "TTG": 0.230, "TCT": 0.196, "TCC": 0.121, "TCA": 0.255, "TCG": 0.104,
        "TAT": 0.529, "TAC": 0.471, "TAA": 0.486, "TAG": 0.163, "TGT": 0.595, "TGC": 0.405, "TGA": 0.351, "TGG": 1.000,
        "CTT": 0.231, "CTC": 0.105, "CTA": 0.100, "CTG": 0.125, "CCT": 0.285, "CCC": 0.156, "CCA": 0.424, "CCG": 0.134,
        "CAT": 0.592, "CAC": 0.408, "CAA": 0.675, "CAG": 0.325, "CGT": 0.171, "CGC": 0.083, "CGA": 0.200, "CGG": 0.080,
        "ATT": 0.430, "ATC": 0.272, "ATA": 0.298, "ATG": 1.000, "ACT": 0.290, "ACC": 0.186, "ACA": 0.389, "ACG": 0.135,
        "AAT": 0.493, "AAC": 0.507, "AAA": 0.640, "AAG": 0.360, "AGT": 0.187, "AGC": 0.137, "AGA": 0.312, "AGG": 0.155,
        "GTT": 0.388, "GTC": 0.157, "GTA": 0.194, "GTG": 0.262, "GCT": 0.357, "GCC": 0.152, "GCA": 0.358, "GCG": 0.132,
        "GAT": 0.633, "GAC": 0.367, "GAA": 0.674, "GAG": 0.326, "GGT": 0.325, "GGC": 0.158, "GGA": 0.350, "GGG": 0.167
      },
    },
    "tax45351": {
      label: "Nematostella vectensis", group: "Non-fish",
      assembly: "GCF_000209225.1", cds: 33915,
      frequencies: {
        "TTT": 0.492, "TTC": 0.508, "TTA": 0.114, "TTG": 0.166, "TCT": 0.183, "TCC": 0.149, "TCA": 0.194, "TCG": 0.112,
        "TAT": 0.407, "TAC": 0.593, "TAA": 0.308, "TAG": 0.260, "TGT": 0.490, "TGC": 0.510, "TGA": 0.432, "TGG": 1.000,
        "CTT": 0.206, "CTC": 0.164, "CTA": 0.132, "CTG": 0.218, "CCT": 0.290, "CCC": 0.206, "CCA": 0.333, "CCG": 0.171,
        "CAT": 0.474, "CAC": 0.526, "CAA": 0.469, "CAG": 0.531, "CGT": 0.140, "CGC": 0.158, "CGA": 0.150, "CGG": 0.104,
        "ATT": 0.339, "ATC": 0.412, "ATA": 0.250, "ATG": 1.000, "ACT": 0.247, "ACC": 0.240, "ACA": 0.324, "ACG": 0.189,
        "AAT": 0.457, "AAC": 0.543, "AAA": 0.475, "AAG": 0.525, "AGT": 0.174, "AGC": 0.189, "AGA": 0.262, "AGG": 0.187,
        "GTT": 0.247, "GTC": 0.263, "GTA": 0.173, "GTG": 0.318, "GCT": 0.280, "GCC": 0.241, "GCA": 0.288, "GCG": 0.191,
        "GAT": 0.500, "GAC": 0.500, "GAA": 0.466, "GAG": 0.534, "GGT": 0.245, "GGC": 0.259, "GGA": 0.291, "GGG": 0.205
      },
    },
    "tax7668": {
      label: "Sea urchin (Strongylocentrotus purpuratus)", group: "Non-fish",
      assembly: "GCF_000002235.5", cds: 38052,
      frequencies: {
        "TTT": 0.423, "TTC": 0.577, "TTA": 0.095, "TTG": 0.151, "TCT": 0.183, "TCC": 0.159, "TCA": 0.211, "TCG": 0.095,
        "TAT": 0.423, "TAC": 0.577, "TAA": 0.337, "TAG": 0.249, "TGT": 0.554, "TGC": 0.446, "TGA": 0.415, "TGG": 1.000,
        "CTT": 0.182, "CTC": 0.216, "CTA": 0.124, "CTG": 0.232, "CCT": 0.318, "CCC": 0.214, "CCA": 0.337, "CCG": 0.131,
        "CAT": 0.557, "CAC": 0.443, "CAA": 0.416, "CAG": 0.584, "CGT": 0.133, "CGC": 0.104, "CGA": 0.125, "CGG": 0.086,
        "ATT": 0.289, "ATC": 0.505, "ATA": 0.205, "ATG": 1.000, "ACT": 0.230, "ACC": 0.296, "ACA": 0.321, "ACG": 0.153,
        "AAT": 0.452, "AAC": 0.548, "AAA": 0.399, "AAG": 0.601, "AGT": 0.182, "AGC": 0.171, "AGA": 0.301, "AGG": 0.251,
        "GTT": 0.228, "GTC": 0.303, "GTA": 0.187, "GTG": 0.282, "GCT": 0.312, "GCC": 0.276, "GCA": 0.305, "GCG": 0.106,
        "GAT": 0.567, "GAC": 0.433, "GAA": 0.467, "GAG": 0.533, "GGT": 0.284, "GGC": 0.204, "GGA": 0.345, "GGG": 0.166
      },
    },
    "tax559292": {
      label: "Budding yeast (S. cerevisiae S288C)", group: "Absolutely not fish",
      assembly: "GCF_000146045.2", cds: 5983,
      frequencies: {
        "TTT": 0.595, "TTC": 0.405, "TTA": 0.277, "TTG": 0.279, "TCT": 0.260, "TCC": 0.157, "TCA": 0.212, "TCG": 0.097,
        "TAT": 0.567, "TAC": 0.433, "TAA": 0.472, "TAG": 0.231, "TGT": 0.621, "TGC": 0.379, "TGA": 0.297, "TGG": 1.000,
        "CTT": 0.130, "CTC": 0.059, "CTA": 0.143, "CTG": 0.113, "CCT": 0.310, "CCC": 0.158, "CCA": 0.407, "CCG": 0.124,
        "CAT": 0.642, "CAC": 0.358, "CAA": 0.685, "CAG": 0.315, "CGT": 0.141, "CGC": 0.060, "CGA": 0.070, "CGG": 0.042,
        "ATT": 0.460, "ATC": 0.260, "ATA": 0.280, "ATG": 1.000, "ACT": 0.343, "ACC": 0.211, "ACA": 0.308, "ACG": 0.138,
        "AAT": 0.596, "AAC": 0.404, "AAA": 0.584, "AAG": 0.416, "AGT": 0.163, "AGC": 0.111, "AGA": 0.474, "AGG": 0.213,
        "GTT": 0.387, "GTC": 0.202, "GTA": 0.218, "GTG": 0.194, "GCT": 0.369, "GCC": 0.221, "GCA": 0.297, "GCG": 0.113,
        "GAT": 0.651, "GAC": 0.349, "GAA": 0.701, "GAG": 0.299, "GGT": 0.454, "GGC": 0.197, "GGA": 0.226, "GGG": 0.122
      },
    },
    "tax4896": {
      label: "Fission yeast (S. pombe)", group: "Absolutely not fish",
      assembly: "GCF_000002945.1", cds: 5122,
      frequencies: {
        "TTT": 0.719, "TTC": 0.281, "TTA": 0.270, "TTG": 0.244, "TCT": 0.325, "TCC": 0.129, "TCA": 0.197, "TCG": 0.089,
        "TAT": 0.656, "TAC": 0.344, "TAA": 0.590, "TAG": 0.208, "TGT": 0.619, "TGC": 0.381, "TGA": 0.202, "TGG": 1.000,
        "CTT": 0.255, "CTC": 0.073, "CTA": 0.091, "CTG": 0.066, "CCT": 0.456, "CCC": 0.170, "CCA": 0.275, "CCG": 0.099,
        "CAT": 0.724, "CAC": 0.276, "CAA": 0.714, "CAG": 0.286, "CGT": 0.308, "CGC": 0.120, "CGA": 0.168, "CGG": 0.062,
        "ATT": 0.570, "ATC": 0.203, "ATA": 0.227, "ATG": 1.000, "ACT": 0.422, "ACC": 0.192, "ACA": 0.265, "ACG": 0.122,
        "AAT": 0.660, "AAC": 0.340, "AAA": 0.626, "AAG": 0.374, "AGT": 0.161, "AGC": 0.099, "AGA": 0.235, "AGG": 0.107,
        "GTT": 0.479, "GTC": 0.172, "GTA": 0.209, "GTG": 0.140, "GCT": 0.473, "GCC": 0.180, "GCA": 0.260, "GCG": 0.088,
        "GAT": 0.709, "GAC": 0.291, "GAA": 0.683, "GAG": 0.317, "GGT": 0.418, "GGC": 0.166, "GGA": 0.324, "GGG": 0.092
      },
    },
    "tax644223": {
      label: "Pichia pastoris (Komagataella phaffii)", group: "Absolutely not fish",
      assembly: "GCF_000027005.1", cds: 5040,
      frequencies: {
        "TTT": 0.578, "TTC": 0.422, "TTA": 0.178, "TTG": 0.291, "TCT": 0.260, "TCC": 0.174, "TCA": 0.208, "TCG": 0.095,
        "TAT": 0.514, "TAC": 0.486, "TAA": 0.400, "TAG": 0.339, "TGT": 0.623, "TGC": 0.377, "TGA": 0.261, "TGG": 1.000,
        "CTT": 0.171, "CTC": 0.084, "CTA": 0.123, "CTG": 0.153, "CCT": 0.339, "CCC": 0.180, "CCA": 0.379, "CCG": 0.102,
        "CAT": 0.617, "CAC": 0.383, "CAA": 0.604, "CAG": 0.396, "CGT": 0.141, "CGC": 0.051, "CGA": 0.120, "CGG": 0.052,
        "ATT": 0.466, "ATC": 0.298, "ATA": 0.236, "ATG": 1.000, "ACT": 0.362, "ACC": 0.238, "ACA": 0.277, "ACG": 0.123,
        "AAT": 0.534, "AAC": 0.466, "AAA": 0.519, "AAG": 0.481, "AGT": 0.159, "AGC": 0.104, "AGA": 0.456, "AGG": 0.181,
        "GTT": 0.388, "GTC": 0.217, "GTA": 0.178, "GTG": 0.217, "GCT": 0.401, "GCC": 0.245, "GCA": 0.275, "GCG": 0.079,
        "GAT": 0.617, "GAC": 0.383, "GAA": 0.595, "GAG": 0.405, "GGT": 0.358, "GGC": 0.156, "GGA": 0.364, "GGG": 0.122
      },
    },
    "tax511145": {
      label: "E. coli K-12 MG1655", group: "Absolutely not fish",
      assembly: "GCF_011750975.1", cds: 4328,
      frequencies: {
        "TTT": 0.571, "TTC": 0.429, "TTA": 0.128, "TTG": 0.130, "TCT": 0.147, "TCC": 0.151, "TCA": 0.123, "TCG": 0.154,
        "TAT": 0.565, "TAC": 0.435, "TAA": 0.638, "TAG": 0.070, "TGT": 0.442, "TGC": 0.558, "TGA": 0.292, "TGG": 1.000,
        "CTT": 0.104, "CTC": 0.106, "CTA": 0.037, "CTG": 0.495, "CCT": 0.161, "CCC": 0.122, "CCA": 0.192, "CCG": 0.525,
        "CAT": 0.571, "CAC": 0.429, "CAA": 0.350, "CAG": 0.650, "CGT": 0.383, "CGC": 0.401, "CGA": 0.065, "CGG": 0.095,
        "ATT": 0.508, "ATC": 0.423, "ATA": 0.069, "ATG": 1.000, "ACT": 0.167, "ACC": 0.437, "ACA": 0.129, "ACG": 0.267,
        "AAT": 0.445, "AAC": 0.555, "AAA": 0.760, "AAG": 0.240, "AGT": 0.148, "AGC": 0.276, "AGA": 0.036, "AGG": 0.020,
        "GTT": 0.259, "GTC": 0.217, "GTA": 0.154, "GTG": 0.370, "GCT": 0.163, "GCC": 0.270, "GCA": 0.212, "GCG": 0.355,
        "GAT": 0.624, "GAC": 0.376, "GAA": 0.686, "GAG": 0.314, "GGT": 0.339, "GGC": 0.403, "GGA": 0.107, "GGG": 0.151
      },
    },
    "tax1423": {
      label: "Bacillus subtilis", group: "Absolutely not fish",
      assembly: "RefSeq", cds: 492228,
      frequencies: {
        "TTT": 0.681, "TTC": 0.319, "TTA": 0.195, "TTG": 0.157, "TCT": 0.203, "TCC": 0.129, "TCA": 0.235, "TCG": 0.102,
        "TAT": 0.651, "TAC": 0.349, "TAA": 0.630, "TAG": 0.141, "TGT": 0.450, "TGC": 0.550, "TGA": 0.229, "TGG": 1.000,
        "CTT": 0.240, "CTC": 0.114, "CTA": 0.049, "CTG": 0.245, "CCT": 0.282, "CCC": 0.089, "CCA": 0.184, "CCG": 0.445,
        "CAT": 0.670, "CAC": 0.330, "CAA": 0.507, "CAG": 0.493, "CGT": 0.183, "CGC": 0.210, "CGA": 0.096, "CGG": 0.160,
        "ATT": 0.502, "ATC": 0.372, "ATA": 0.125, "ATG": 1.000, "ACT": 0.156, "ACC": 0.161, "ACA": 0.407, "ACG": 0.276,
        "AAT": 0.560, "AAC": 0.440, "AAA": 0.703, "AAG": 0.297, "AGT": 0.104, "AGC": 0.227, "AGA": 0.259, "AGG": 0.092,
        "GTT": 0.280, "GTC": 0.261, "GTA": 0.195, "GTG": 0.263, "GCT": 0.243, "GCC": 0.210, "GCA": 0.277, "GCG": 0.269,
        "GAT": 0.635, "GAC": 0.365, "GAA": 0.680, "GAG": 0.320, "GGT": 0.182, "GGC": 0.343, "GGA": 0.313, "GGG": 0.161
      },
    },
    "tax3702": {
      label: "Arabidopsis thaliana", group: "Absolutely not fish",
      assembly: "GCF_000001735.4", cds: 48146,
      frequencies: {
        "TTT": 0.539, "TTC": 0.461, "TTA": 0.141, "TTG": 0.226, "TCT": 0.282, "TCC": 0.118, "TCA": 0.213, "TCG": 0.096,
        "TAT": 0.544, "TAC": 0.456, "TAA": 0.362, "TAG": 0.206, "TGT": 0.597, "TGC": 0.403, "TGA": 0.433, "TGG": 1.000,
        "CTT": 0.258, "CTC": 0.157, "CTA": 0.108, "CTG": 0.110, "CCT": 0.390, "CCC": 0.107, "CCA": 0.343, "CCG": 0.160,
        "CAT": 0.634, "CAC": 0.366, "CAA": 0.563, "CAG": 0.437, "CGT": 0.157, "CGC": 0.068, "CGA": 0.117, "CGG": 0.089,
        "ATT": 0.416, "ATC": 0.326, "ATA": 0.258, "ATG": 1.000, "ACT": 0.345, "ACC": 0.189, "ACA": 0.325, "ACG": 0.140,
        "AAT": 0.542, "AAC": 0.458, "AAA": 0.496, "AAG": 0.504, "AGT": 0.165, "AGC": 0.127, "AGA": 0.363, "AGG": 0.206,
        "GTT": 0.407, "GTC": 0.180, "GTA": 0.159, "GTG": 0.253, "GCT": 0.434, "GCC": 0.149, "GCA": 0.289, "GCG": 0.128,
        "GAT": 0.694, "GAC": 0.306, "GAA": 0.530, "GAG": 0.470, "GGT": 0.334, "GGC": 0.138, "GGA": 0.368, "GGG": 0.160
      },
    },
    "tax3055": {
      label: "Chlamydomonas reinhardtii", group: "Absolutely not fish",
      assembly: "GCF_000002595.1", cds: 14411,
      frequencies: {
        "TTT": 0.210, "TTC": 0.790, "TTA": 0.009, "TTG": 0.066, "TCT": 0.064, "TCC": 0.206, "TCA": 0.070, "TCG": 0.212,
        "TAT": 0.131, "TAC": 0.869, "TAA": 0.254, "TAG": 0.299, "TGT": 0.161, "TGC": 0.839, "TGA": 0.447, "TGG": 1.000,
        "CTT": 0.056, "CTC": 0.147, "CTA": 0.040, "CTG": 0.682, "CCT": 0.108, "CCC": 0.365, "CCA": 0.112, "CCG": 0.415,
        "CAT": 0.158, "CAC": 0.842, "CAA": 0.123, "CAG": 0.877, "CGT": 0.083, "CGC": 0.479, "CGA": 0.051, "CGG": 0.293,
        "ATT": 0.226, "ATC": 0.700, "ATA": 0.075, "ATG": 1.000, "ACT": 0.098, "ACC": 0.415, "ACA": 0.131, "ACG": 0.356,
        "AAT": 0.133, "AAC": 0.867, "AAA": 0.098, "AAG": 0.902, "AGT": 0.065, "AGC": 0.384, "AGA": 0.018, "AGG": 0.077,
        "GTT": 0.073, "GTC": 0.201, "GTA": 0.043, "GTG": 0.684, "GCT": 0.121, "GCC": 0.350, "GCA": 0.126, "GCG": 0.403,
        "GAT": 0.174, "GAC": 0.826, "GAA": 0.087, "GAG": 0.913, "GGT": 0.110, "GGC": 0.645, "GGA": 0.073, "GGG": 0.172
      },
    }
  },

  restrictionSites: {
    "GAATTC": "EcoRI", "GATATC": "EcoRV", "GGATCC": "BamHI", "AAGCTT": "HindIII",
    "CTCGAG": "XhoI", "GCGGCCGC": "NotI", "GGTACC": "KpnI", "TCTAGA": "XbaI",
    "GTCGAC": "SalI", "CCCGGG": "SmaI/XmaI", "ACTAGT": "SpeI", "ATCGAT": "ClaI",
    "CATATG": "NdeI", "GAGCTC": "SacI", "CTGCAG": "PstI", "GCTAGC": "NheI",
    "AGATCT": "BglII", "GCATGC": "SphI", "GGGCCC": "ApaI", "CCATGG": "NcoI",
    "ACCGGT": "AgeI", "TCCGGA": "BspEI", "ACGCGT": "MluI", "CCTAGG": "AvrII",
    "CTTAAG": "AflII", "TGTACA": "BsrGI", "ATGCAT": "NsiI", "GACGTC": "AatII",
    "TTCGAA": "BstBI", "CGTACG": "BsiWI", "CGATCG": "PvuI", "CCGCGG": "SacII",
    "GTTAAC": "HpaI", "AGTACT": "ScaI", "TACGTA": "SnaBI", "GGCGCGCC": "AscI",
    "TTAATTAA": "PacI", "GGCCGGCC": "FseI", "ATTTAAAT": "SwaI", "GTTTAAAC": "PmeI",
    "CCTGCAGG": "SbfI", "GGTCTC": "BsaI", "CGTCTC": "BsmBI", "GAAGAC": "BbsI",
    "GCTCTTC": "SapI", "CACCTGC": "AarI", "AATAAA": "polyA signal"
  },
};

if (typeof module !== "undefined" && module.exports) module.exports = CODON_DATA;
if (typeof window !== "undefined") window.CODON_DATA = CODON_DATA;
