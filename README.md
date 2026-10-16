# ABX Guide v3 — static snapshot

Static GitHub Pages build; no backend, npm, scraper, or scheduled monthly checks.

Includes class-based continuous spectrum bars, drug-to-class search, dynamic insertion of rarer organisms, organism highlighting, site-specific antibiogram source panels, and initial adult syndrome guidance (CAP, HAP/VAP, UTI, SSTI, intra-abdominal infection, meningitis, sepsis).

Important: this build deliberately does not invent susceptibility percentages that were not reliably extractable as structured data from current public IDMP pages. It links the authoritative local antibiogram for UCSF, ZSFG, SFVA, and ambulatory data. A future data-validation pass can populate exact percentages.

Deploy by uploading all files/folders to the root of `abx-guide` and committing to `main`.

Snapshot: 2026-10-16.
